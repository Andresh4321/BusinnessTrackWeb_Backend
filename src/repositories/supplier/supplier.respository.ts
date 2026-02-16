

 import { ISupplier, SupplierModel } from "../../models/supplier/supplier.models";

export  interface ISupplierRepository{
    createSupplier(data: Partial<ISupplier>): Promise<ISupplier>;
    getSupplierByEmail(email: string): Promise<ISupplier | null>;
    getSupplierByName(name: string): Promise<ISupplier | null>;
    getSupplierById(id: string): Promise<ISupplier | null>;
    getSupplierByProduct(product: string): Promise<ISupplier[] | null>;
    deleteSupplierbyId(id: string): Promise<boolean>;
    updateSupplierById(id: string, data: Partial<ISupplier>): Promise<ISupplier | null>;
    getAllSuppliers(page: number, limit: number): Promise<{suppliers: ISupplier[]; total: number;}>;
}

export class SupplierRepository implements ISupplierRepository{
    async createSupplier(data: Partial<ISupplier>){
        const newSupplier = new SupplierModel(data);
        await newSupplier.save();
        return newSupplier;
    }
    async getSupplierByEmail(email: string){
        const supplier = await SupplierModel.findOne({ "email": email });
        return supplier;
    }
    async getSupplierByName(name: string){
        const supplier = await SupplierModel.findOne({ "name": name });
        return supplier;
    }
    async getSupplierById(id: string) {
        const supplier = await SupplierModel.findById(id);
        return supplier;
    }
    async getSupplierByProduct(product: string){
        const suppliers = await SupplierModel.find({ products: product });
        return suppliers.length > 0 ? suppliers : null;
    }
    async deleteSupplierbyId(id: string){
        const result = await SupplierModel.findByIdAndDelete(id);
        return result ? true : false;
    }
    async updateSupplierById(id: string, data: Partial<ISupplier>){
        const updatedSupplier = await SupplierModel.findByIdAndUpdate(id, data, { new: true });
        return updatedSupplier;
    }
    async getAllSuppliers(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const suppliers = await SupplierModel.find()
        .skip(skip)
        .limit(limit);
    const total = await SupplierModel.countDocuments();
    return { suppliers, total };
}
}           
export default SupplierRepository;

