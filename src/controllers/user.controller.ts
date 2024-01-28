import { Request, Response } from 'express';
import {
  CreateUser,
  DeleteUserById,
  GetAllUsers,
  GetUserById,
  addItemToShoplist,
  removeItemFromShoplist,
} from '../services/user.service';

export async function CreateUserHandler(req: Request, res: Response) {
  try {
    const input = req.body;
    const user = await CreateUser(input);
    return res.status(201).json(user);
  } catch (error: any) {
    return res.status(422).json({ error: error.message });
  }
}

export async function GetAllUsersHandler(req: Request, res: Response) {
  try {
    const users = await GetAllUsers();
    return res.json(users);
  } catch (error: any) {
    return res.status(404).json({ error: error.message });
  }
}

export async function GetUserByIdHandler(req: Request, res: Response) {
  try {
    const userId = parseInt(req.params.id, 10);
    const user = await GetUserById(userId);
    return res.json(user);
  } catch (error: any) {
    return res.status(404).json({ error: error.message });
  }
}

export async function DeleteUserByIdHandler(req: Request, res: Response) {
  try {
    const userId = parseInt(req.params.id, 10);
    const result = await DeleteUserById(userId);
    return res.json({ message: result });
  } catch (error: any) {
    return res.status(404).json({ error: error.message });
  }
}

export async function addItemToShoplistHandler(req: Request, res: Response) {
  try {
    const input = req.body;
    await addItemToShoplist(input);
    return res.status(201).json({ message: 'Item added to shoplist successfully.' });
  } catch (error: any) {
    return res.status(422).json({ error: error.message });
  }
}

export async function removeItemFromShoplistController(req: Request, res: Response) {
  try {
    const input = req.body;
    await removeItemFromShoplist(input);
    return res.json({ message: 'Item removed successfully' });
  } catch (error: any) {
    return res.status(404).json({ error: error.message });
  }
}
