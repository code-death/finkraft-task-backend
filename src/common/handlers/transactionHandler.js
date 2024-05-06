
import transactionHelper from '../helpers/transactionHelper';
import dayjs from "dayjs";

export function validateTransaction(input) {
    try {
        const validation = {
            isValid: true,
            message: ""
        }

        const requiredKeys = ['TransactionID', 'CustomerName', 'TransactionDate', 'Amount', 'Status', 'InvoiceURL'];
        const missingKeys = requiredKeys.filter(key => !Object.prototype.hasOwnProperty.call(input, key));

        if (missingKeys.length > 0) {
            validation.isValid = false;
            validation.message = `Missing required key(s): ${missingKeys.join(', ')}`;
            return validation;
        }

        const types = {
            TransactionID: 'string',
            CustomerName: 'string',
            TransactionDate: 'string',
            Amount: 'number',
            Status: 'string',
            InvoiceURL: 'string'
        };

        Object.entries(types).forEach(([key, expectedType]) => {
            if (typeof input[key] !== expectedType) {
                validation.isValid = false;
                validation.message = `Invalid type for ${key}. Expected type: ${expectedType}`;
            }
        });

        if (!dayjs(input.TransactionDate).isValid()) {
            validation.isValid = false;
            validation.message = 'Invalid date format for TransactionDate';
        }

        return validation
    } catch (e) {
        throw e
    }
}

export async function addNewTransactionHandler(input) {
    return await transactionHelper.addObject({...input, TransactionDate: dayjs(input.TransactionDate)});
}

export async function getTransactionDetailsHandler(input) {
    return await transactionHelper.getObjectById(input);
}

export async function updateTransactionDetailsHandler(input) {
    return await transactionHelper.updateObjectById(input.objectId, input.updateObject);
}

export async function getTransactionListHandler(input) {
    const list = await transactionHelper.getAllObjects(input);
    const count = await transactionHelper.getAllObjectCount(input);
    return { list, count };
}

export async function deleteTransactionHandler(input) {
    return await transactionHelper.deleteObjectById(input);
}

export async function getTransactionByQueryHandler(input) {
    return await transactionHelper.getObjectByQuery(input);
}
