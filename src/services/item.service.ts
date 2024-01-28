import path from "path";
import fs from 'fs';
import Item from "../models/Item";
import { client } from "../config/redis";
import { promisify } from "util";


interface ItemInput {
    name: string;
    price: number;
    image: Express.Multer.File;
    has_off: boolean;
    off_percentage_value: number;
    count: number;
}

export interface SortFilterOptions {
  sortBy?: 'price' | 'count' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
  hasOff?: boolean;
}


const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

export async function createItem(input: ItemInput, image: Express.Multer.File) {
    try {
        const imagePath = path.join(__dirname, '..', '../uploads', image.filename);
        fs.renameSync(image.path, imagePath);
        
        const filename = path.basename(imagePath);
        const newItem = await Item.create({
          ...input,
          image: filename, 
          off_percentage_value: process.env.OFF_PERCENTAGE ? parseInt(process.env.OFF_PERCENTAGE, 10) : 0,
        });
        
        console.log('Item created:', newItem);
        return newItem.toJSON();
    } catch (err: any) {
        throw new Error(err);
    }
}

export async function getAllItems() {
    const cacheKey = 'all_items';

    try {
        const cachedItems = await client.get(cacheKey);

        if (cachedItems) {
          console.log('Items retrieved from cache.');
          return JSON.parse(cachedItems);
        }

        const items = await Item.findAll();

        await client.setEx(cacheKey, 3600, JSON.stringify(items));

        return items.map(item => item.toJSON());
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function getItemById(itemId: number) {
    const cacheKey = `item_${itemId}`;

    try {
        const cachedItem = await client.get(cacheKey);

        if (cachedItem) {
          console.log(`Item ${itemId} retrieved from cache.`);
          return JSON.parse(cachedItem);
        }

        const item = await Item.findByPk(itemId);

        if (!item) {
          throw new Error('Item not found');
        }

        await client.setEx(cacheKey, 3600, JSON.stringify(item.toJSON()));

        return item.toJSON();
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function MakeOffItem(itemId: number){
    try {
        const item = await Item.findByPk(itemId);
        if(!item){
          throw new Error('Item not found')
        }
        console.log(item.has_off)
        await item.update({ has_off: !item.has_off });

        console.log(`Item ${itemId} has_off parameter updated to ${!item.has_off}`);
        return item.toJSON();
    } catch (error:any) {
        throw new Error(error)
  }
}

export async function getSortedFilteredItems(options: SortFilterOptions = {}) {
    try {
        const { sortBy = 'createdAt', sortOrder = 'asc', hasOff } = options;
        const cacheKey = `GetSortedFilteredItems:${sortBy}:${sortOrder}:${hasOff}`;

        const cachedData = await getAsync(cacheKey);
        if (cachedData) {
          console.log('Items fetched from Redis cache');
          return JSON.parse(cachedData);
        }

        const whereClause: any = {};
        if (hasOff !== undefined) {
          whereClause.has_off = hasOff;
        }

        const items = await Item.findAll({
          where: whereClause,
          order: [[sortBy, sortOrder]],
        });

        const itemsData = items.map(item => item.toJSON());

        await setAsync(cacheKey, JSON.stringify(itemsData));
        console.log('Items fetched from the database');

        return itemsData;
    } catch (error: any) {
        throw new Error(error);
    }
}