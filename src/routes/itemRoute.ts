import express from 'express';
import multer from 'multer';
import { createItemHandler, getAllItemsHandler, getItemByIdHandler, getSortedFilteredItemsController, makeOffItemHandler } from '../controllers/item.controller';
import path from 'path';

const router = express.Router();
const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename(req, file, cb) {
      cb(
        null,
        `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
      )
    },
})
  
function checkFileType(file : any, cb: any) {
    const filetypes = /jpg|jpeg|png/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)
  
    if (extname && mimetype) {
      return cb(null, true)
    } else {
      cb('Images only!')
    }
}
  
const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb)
    },
})

router.post('/items', upload.single('image'), createItemHandler);
router.get('/items/sort', getSortedFilteredItemsController);
router.get('/items', getAllItemsHandler);
router.get('/items/', getItemByIdHandler);
router.patch('/items/make-off/:itemId', makeOffItemHandler);

export default router;
