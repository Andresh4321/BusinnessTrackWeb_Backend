 import mongoose, { Document, Schema } from "mongoose";
import { SupplierType } from "../../types/supplier/supplier.type";
const supplierSchema: Schema= new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        contact_number: { type: String, required: true },
        products: [{ type: String }],
},
{
    timestamps: true,
}
)
export interface ISupplier extends SupplierType, Document{
    _id: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
export const SupplierModel = mongoose.model<ISupplier>('Supplier', supplierSchema);



