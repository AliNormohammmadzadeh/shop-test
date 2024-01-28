import { Request, Response } from 'express';
import {
  MakeOffItem,
  SortFilterOptions,
  createItem,
  getAllItems,
  getItemById,
  getSortedFilteredItems,
} from '../services/item.service';

export async function createItemHandler(req: Request, res: Response) {
  try {
    const input = req.body;
    const image = req.file as Express.Multer.File;
    const newItem = await createItem(input, image);
    return res.status(201).json(newItem); 
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
}

export async function getAllItemsHandler(req: Request, res: Response) {
  try {
    const items = await getAllItems();
    return res.json(items);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}

export async function getItemByIdHandler(req: Request, res: Response) {
  try {
    const itemId = parseInt(req.params.itemId, 10);
    const item = await getItemById(itemId);
    return res.json(item);
  } catch (error: any) {
    return res.status(404).json({ error: error.message }); 
  }
}

export async function makeOffItemHandler(req: Request, res: Response) {
  const itemId = parseInt(req.params.itemId, 10);

  try {
    const updatedItem = await MakeOffItem(itemId);
    return res.json(updatedItem);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}

export async function getSortedFilteredItemsController(req: Request, res: Response) {
  const options: SortFilterOptions = {
    sortBy: req.query.sortBy as 'price' | 'count' | 'createdAt' || undefined,
    sortOrder: req.query.sortOrder as 'asc' | 'desc' || undefined,
    hasOff: req.query.hasOff === 'true',
  };

  try {
    const items = await getSortedFilteredItems(options);
    return res.json(items);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
