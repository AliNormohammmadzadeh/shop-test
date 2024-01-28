import express from 'express'
import { CreateUserHandler, DeleteUserByIdHandler, GetAllUsersHandler, GetUserByIdHandler, addItemToShoplistHandler, removeItemFromShoplistController } from '../controllers/user.controller';

const router = express.Router()

router.get('/users', GetAllUsersHandler);
router.get('/users/:id',GetUserByIdHandler)
router.post('/users',CreateUserHandler)
router.post('/users/add-item-to-shoplist', addItemToShoplistHandler);
router.post('/users/remove-item-from-shoplist', removeItemFromShoplistController);
router.delete('/users/:userId', DeleteUserByIdHandler);

export default router;