// services/user.service.ts
import { promisify } from "util";
import Item from "../models/Item";
import User from "../models/User";
import { client } from "../config/redis";


export interface UserAttributes {
    id?: number;
    username: string;
    phone: string;
    orderlist: any[]; 
    shoplist: any[];
}

export interface AddItemToShoplistInput {
    phone: string;
    itemId: number;
    quantity: number;
}

export interface RemoveItemFromShoplistInput {
  phone: string;
  itemId: number;
}

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

export async function CreateUser(input: Omit<UserAttributes, 'id'>) {
  try {
    const user = await User.create({ ...input });
    console.log('User created:', user);

    // Clear the Redis cache for GetAllUsers since there's a new user
    await client.del('GetAllUsers');

    return user.toJSON();
  } catch (err: any) {
    throw new Error(err);
  }
}

export async function GetAllUsers() {
  try {
    const cachedData = await getAsync('GetAllUsers');
    if (cachedData) {
      console.log('Users fetched from Redis cache');
      return JSON.parse(cachedData);
    }

    const users = await User.findAll();
    const usersData = users.map(user => user.toJSON());

    await setAsync('GetAllUsers', JSON.stringify(usersData));
    console.log('Users fetched from the database');

    return usersData;
  } catch (err: any) {
    throw new Error(err);
  }
}

export async function GetUserById(userId: number) {
  try {
    const cachedData = await getAsync(`GetUserById:${userId}`);
    if (cachedData) {
      console.log(`User with ID ${userId} fetched from Redis cache`);
      return JSON.parse(cachedData);
    }

    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const userData = user.toJSON();

    await setAsync(`GetUserById:${userId}`, JSON.stringify(userData));
    console.log(`User with ID ${userId} fetched from the database`);

    return userData;
  } catch (err: any) {
    throw new Error(err);
  }
}

export async function DeleteUserById(userId: number) {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error('User not found');
      }
      await user.destroy();
      return 'User deleted successfully';
    } catch (err: any) {
      throw new Error(err);
    }
}

  
export async function addItemToShoplist(input: AddItemToShoplistInput) {
    const user = await User.findOne({
      where: { phone: input.phone },
    });
  
    if (!user) {
      throw new Error(`User with phone number ${input.phone} not found.`);
    }
  
    const item = await Item.findByPk(input.itemId);
  
    if (!item) {
      throw new Error(`Item with ID ${input.itemId} not found.`);
    }
  
    if (item.count < input.quantity) {
      throw new Error(`Not enough items available. Available count: ${item.count}`);
    }
  
    const existingOffItem = user.shoplist.find(item => item.has_off === true);
  
    if (existingOffItem && item.has_off) {
      throw new Error('User can only have one item with has_off = true in the shoplist.');
    }
  
    await user.update({
      shoplist: [...user.shoplist, { itemId: input.itemId, quantity: input.quantity, has_off: item.has_off }],
    });
  
    console.log('Item added to shoplist:', item);
}

export async function removeItemFromShoplist(input: RemoveItemFromShoplistInput) {
  try {
    const user = await User.findOne({
      where: { phone: input.phone },
    });
    if (!user) {
      throw new Error(`User with phone number ${input.phone} not found.`);
    }

    const itemIndex = user.shoplist.findIndex((item) => item.itemId === input.itemId);
    if (itemIndex === -1) {
      throw new Error(`Item with ID ${input.itemId} not found in the shoplist.`);
    }

    const updatedShoplist = [...user.shoplist.slice(0, itemIndex), ...user.shoplist.slice(itemIndex + 1)];
    await user.update({
      shoplist: updatedShoplist,
    });

    console.log('Item removed from shoplist:', input.itemId);

    return { message: 'Item removed successfully'};
  } catch (error: any) {
    throw new Error(error);
  }
}