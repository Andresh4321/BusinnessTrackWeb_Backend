import { Router } from "express";
import { SupplierController } from "../../controllers/supplier/supplier.controller";

const router = Router();
const supplierController = new SupplierController();

// Create supplier
router.post('/', supplierController.createSupplier);

// Get all suppliers with pagination
router.get('/', supplierController.getAllSuppliers);

// Get supplier by ID
router.get('/:id', supplierController.getSupplierById);

// Get supplier by email
router.get('/email/:email', supplierController.getSupplierByEmail);

// Get supplier by name
router.get('/name/:name', supplierController.getSupplierByName);

// Get suppliers by product
router.get('/product/:product', supplierController.getSupplierByProduct);

// Update supplier
router.put('/:id', supplierController.updateSupplierById);

// Delete supplier
router.delete('/:id', supplierController.deleteSupplierById);

export default router;