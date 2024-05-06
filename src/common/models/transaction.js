import mongoose from "mongoose";

const Schema = mongoose.Schema;


const transactionSchema = new Schema({
    TransactionID: {
        isRequired: true,
        type: String
    },
    CustomerName: {
        isRequired: true,
        type: String
    },
    TransactionDate: {
        isRequired: true,
        type: Date
    },
    Amount: {
        isRequired: true,
        type: Number
    },
    Status: {
        isRequired: true,
        type: String
    },
    InvoiceURL: {
        isRequired: true,
        type: String
    }
})

export default mongoose.model('transaction', transactionSchema);
