// this one need to work very much )))


// import fs from 'fs';
// import path from 'path';
// import { createItem, getAllItems } from '../services/item.service';
// import Item from '../models/Item';

// interface ItemInput {
//   name: string;
//   price: number;
//   image: Express.Multer.File;
//   has_off: boolean;
//   off_percentage_value: number;
//   count: number;
// }

// const createMockFile = (filename: string): Express.Multer.File => ({
//   fieldname: 'image-test',
//   originalname: filename,
//   encoding: '7bit',
//   mimetype: 'image/jpeg',
//   size: 12345,
//   stream: fs.createReadStream(path.join(__dirname, '..', '..' ,'uploads', filename)),
//   destination: path.join(__dirname, '..',  '..' ,'uploads'), 
//   filename: filename,
//   path: path.join(__dirname, '..', '..' ,'uploads', filename),
//   buffer: Buffer.from([]),
// });

// describe('Item Service', () => {
//   describe('createItem', () => {
//     it('should create a new item', async () => {
//       const mockInput: ItemInput = {
//         name: 'Test Item',
//         price: 20,
//         image: createMockFile('image-test.jpg'),
//         has_off: false,
//         off_percentage_value: 0,
//         count: 10,
//       };

//       const mockItem = {
//         ...mockInput,
//         image: 'image-test.jpg',
//         off_percentage_value: 0,
//       };

//       jest.spyOn(Item, 'create').mockResolvedValue(mockItem as any);

//       const mockRenameSync = jest.spyOn(fs, 'renameSync');
//       mockRenameSync.mockImplementation(() => {});

//       const newItem = await createItem(mockInput, mockInput.image);

//       expect(newItem).toEqual(mockItem);

//       expect(mockRenameSync).toHaveBeenCalledWith(
//         mockInput.image.path,
//         path.join(__dirname, '..', '..' ,'uploads', 'image-test.jpg')
//       );
//     });
//   });
//   describe('getAllItems', () => {
//     it('should get all items', async () => {
//       const mockItems = [
//         {
//           id: 1,
//           name: 'Item 1',
//           price: 30,
//           image: 'item1.jpg',
//           has_off: true,
//           off_percentage_value: 10,
//           count: 5,
//         },
//         {
//           id: 2,
//           name: 'Item 2',
//           price: 25,
//           image: 'item2.jpg',
//           has_off: false,
//           off_percentage_value: 0,
//           count: 8,
//         },
//       ];

//       // Mock Item.findAll function
//       jest.spyOn(Item, 'findAll').mockResolvedValue(mockItems as any);

//       const items = await getAllItems();

//       expect(items).toEqual(
//         expect.arrayContaining([
//           expect.objectContaining({
//             id: 1,
//             name: 'Item 1',
//             price: 30,
//             image: expect.any(String),
//             has_off: true,
//             off_percentage_value: 10,
//             count: 5,
//           }),
//           expect.objectContaining({
//             id: 2,
//             name: 'Item 2',
//             price: 25,
//             image: expect.any(String),
//             has_off: false,
//             off_percentage_value: 0,
//             count: 8,
//           }),
//         ])
//       );
//     });
//   });
// });
