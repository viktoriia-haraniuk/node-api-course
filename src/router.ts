import { Router } from "express";
import {body, oneOf, validationResult} from "express-validator";
import {handleInputErrors} from "./modules/middleware";
import {
  createProduct,
  deleteProduct,
  getOneProduct,
  getProducts,
  updateProduct
} from "./handlers/product";
import {
  createUpdate,
  deleteUpdate,
  getOneUpdate,
  getUpdates,
  updateUpdate
} from "./handlers/update";

const router = Router();

//product
router.get('/product', getProducts);
router.get('/product/:id', getOneProduct);
router.put('/product/:id', body('name').isString(), handleInputErrors, updateProduct);
router.post('/product',body('name').isString(), handleInputErrors, createProduct);
router.delete('/product/:id', deleteProduct);

//update
router.get('/update', getUpdates);
router.get('/update/:id', getOneUpdate);
router.put('/update/:id',
    body('title').optional,
    body('body').optional,
    body('status').isIn(['IN_PROGRESS', 'LIVE', 'DEPRECATED', 'ARCHIVED']).optional(),
    body('version').optional,
    handleInputErrors,
    updateUpdate);
router.post('/update',
    body('title').exists().isString(),
    body('body').exists().isString(),
    body('productId').exists().isString(),
    handleInputErrors,
    createUpdate);
router.delete('/update/:id', deleteUpdate);

//update point
router.get('/updatepoint', () => {});
router.get('/updatepoint/:id', () => {});
router.put('/updatepoint/:id',
    body('name').optional().isString(),
    body('description').optional().isString(),
    () => {});
router.post('/updatepoint',
    body('name').isString(),
    body('description').isString(),
    body('updateId').exists().isString(),
    () => {});
router.delete('/updatepoint/:id', () => {});

router.use((err, req, res, next) => {
  console.log(err);
  res.json({message: 'in router handler'});
})
export default router;