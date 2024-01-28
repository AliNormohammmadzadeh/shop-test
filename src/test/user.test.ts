// services/user.service.test.ts
import * as userService from '../services/user.service';

describe('User Service', () => {
  describe('CreateUser', () => {
    it('should create a new user', async () => {
      jest.spyOn(userService, 'CreateUser').mockResolvedValueOnce({
        id: 1,
        username: 'TestUser',
        phone: '1234567890',
        orderlist: [],
        shoplist: [],
      });

      const userInput = {
        username: 'TestUser',
        phone: '1234567890',
        orderlist: [],
        shoplist: [],
      };

      const newUser = await userService.CreateUser(userInput);

      expect(newUser).toEqual({
        id: 1,
        username: 'TestUser',
        phone: '1234567890',
        orderlist: [],
        shoplist: [],
      });
    });
  });

  describe('GetAllUsers', () => {
    it('should get all users', async () => {
      jest.spyOn(userService, 'GetAllUsers').mockResolvedValueOnce([
        {
          id: 1,
          username: 'User1',
          phone: '123',
          orderlist: [],
          shoplist: [],
        },
        {
          id: 2,
          username: 'User2',
          phone: '456',
          orderlist: [],
          shoplist: [],
        },
      ]);

      const users = await userService.GetAllUsers();

      expect(users).toEqual([
        {
          id: 1,
          username: 'User1',
          phone: '123',
          orderlist: [],
          shoplist: [],
        },
        {
          id: 2,
          username: 'User2',
          phone: '456',
          orderlist: [],
          shoplist: [],
        },
      ]);
    });
  });

  describe('GetUserById', () => {
    it('should get a user by ID', async () => {
      jest.spyOn(userService, 'GetUserById').mockResolvedValueOnce({
        id: 1,
        username: 'TestUser',
        phone: '1234567890',
        orderlist: [],
        shoplist: [],
      });

      const userId = 1;
      const user = await userService.GetUserById(userId);

      expect(user).toEqual({
        id: 1,
        username: 'TestUser',
        phone: '1234567890',
        orderlist: [],
        shoplist: [],
      });
    });
  });

  describe('addItemToShoplist', () => {
    it('should add an item to the shoplist', async () => {
      jest.spyOn(userService, 'addItemToShoplist').mockImplementation(async (input: userService.AddItemToShoplistInput) => {
        return Promise.resolve();
      });

      const input: userService.AddItemToShoplistInput = {
        phone: '1234567890',
        itemId: 1,
        quantity: 2,
      };

      await userService.addItemToShoplist(input);

      // add later
    });
  });

  describe('removeItemFromShoplist', () => {
    it('should remove an item from the shoplist', async () => {
      jest.spyOn(userService, 'removeItemFromShoplist').mockImplementation(async (input: userService.RemoveItemFromShoplistInput) => {
        return Promise.resolve({ message: 'Item removed successfully' });
      });

      const input: userService.RemoveItemFromShoplistInput = {
        phone: '1234567890',
        itemId: 1,
      };

      const result = await userService.removeItemFromShoplist(input);

      expect(result).toEqual({ message: 'Item removed successfully' });
    });
  });
});
