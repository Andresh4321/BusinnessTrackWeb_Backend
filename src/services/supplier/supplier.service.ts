

import { ISupplierRepository } from "../../repositories/supplier/supplier.respository";
import { ISupplier } from "../../models/supplier/supplier.models";
import SupplierRepository from "../../repositories/supplier/supplier.respository";

let supplierRepository = new SupplierRepository();
export class SupplierService{
    async createSupplier(data: Partial<ISupplier>){
        const emailExists = await supplierRepository.getSupplierByEmail(data.email!);
        if(emailExists){
            throw new Error("Email already exists");
        }
        const nameExists = await supplierRepository.getSupplierByName(data.name!);
        if(nameExists){
            throw new Error("Supplier name already exists");
        }
        const newSupplier = await supplierRepository.createSupplier(data);
        return newSupplier;
    }
    async getSupplierById(id: string){
        const supplier = await supplierRepository.getSupplierById(id);
        if(!supplier){
            throw new Error("Supplier not found");
        }
        return supplier;
    }
    async getSupplierByEmail(email: string){
        const supplier = await supplierRepository.getSupplierByEmail(email);
        if(!supplier){
            throw new Error("Supplier not found");
        }
        return supplier;
    }
    async getSupplierByName(name: string){
        const supplier = await supplierRepository.getSupplierByName(name);
        if(!supplier){
            throw new Error("Supplier not found");
        }
        return supplier;
    }
    async getSupplierByProduct(product: string){
        const suppliers = await supplierRepository.getSupplierByProduct(product);
        if(!suppliers){
            throw new Error("No suppliers found for this product");
        }
        return suppliers;
    }

    async updateSupplierById(id: string, data: Partial<ISupplier>){
        const supplier = await supplierRepository.getSupplierById(id);
        if(!supplier){
            throw new Error("Supplier not found");
        }
        if(supplier.email !== data.email){
            const emailExists = await supplierRepository.getSupplierByEmail(data.email!);

            if(emailExists){
                throw new Error("Email already exists");
            }
        }
        if(supplier.name !== data.name){
            const nameExists = await supplierRepository.getSupplierByName(data.name!);
            if(nameExists){
                throw new Error("Supplier name already exists");
            }
        }

        const updatedSupplier = await supplierRepository.updateSupplierById(id, data);
        return updatedSupplier;
    }
    async deleteSupplierById(id: string){
        const deleted = await supplierRepository.deleteSupplierbyId(id);
        if(!deleted){
            throw new Error("Supplier not found");
        }
        return true;
    }
    async getAllSuppliers(page: number, limit: number){
        const { suppliers, total } = await supplierRepository.getAllSuppliers(page, limit);
        return { suppliers, total };
    }
}

