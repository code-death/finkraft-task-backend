import {setServerError, setSuccess} from "../../utility/responseUtility";
import {Router} from "express";
import {
    addNewTransactionHandler, bulkUploadDataFromCsvHandler, deleteTransactionHandler,
    getTransactionDetailsHandler,
    getTransactionListHandler, updateTransactionDetailsHandler, validateTransaction
} from "../handlers/transactionHandler";
import _ from "lodash";
import multer from "multer";

const router = new Router();
const upload = multer();

router.post('/bulk-upload', upload.single('transactions'), async (req, res) => {
    try {
        const file = req.file;

        if (!file) {
            throw 'CSV file is required';
        }

        await bulkUploadDataFromCsvHandler(file.buffer);
        setSuccess(res, {
            message: 'Data uploaded successfully'
        });
    } catch (err) {
        console.error(err);
        setServerError(res, {
            message: err
        });
    }
});

router.route('/list').post(async (req, res) => {
    try {
        let filter = {};
        const inputData = {...req.body};
        filter.pageNum = inputData.pageNum ? inputData.pageNum : 1;
        filter.pageSize = inputData.pageSize ? inputData.pageSize : 50;

        const outputResult = await getTransactionListHandler(filter);
        setSuccess(res, {
            transactionList: outputResult.list ? outputResult.list : [],
            transactionCount: outputResult.count ? outputResult.count : 0,
        })
    } catch (err) {
        console.log(err);
        setServerError(res, {
            message: err
        })
    }
});

router.route('/new').post(async (req, res) => {
    try {
        if (!_.isEmpty(req.body)) {
            const transactionValidation = validateTransaction(req.body.transaction);
            if (transactionValidation.isValid) {
                const outputResult = await addNewTransactionHandler(req.body.transaction);
                setSuccess(res, {
                    transaction: outputResult ? outputResult : {}
                })
            } else {
                throw transactionValidation.message
            }
        } else {
            throw 'no request body sent'
        }
    } catch (err) {
        console.log(err)
        setServerError(res, {
            message: err
        })
    }
});

router.route('/:id').get(async (req, res) => {
    try {
        if (req.params.id) {
            const gotTransaction = await getTransactionDetailsHandler(req.params);
            setSuccess(res, {
                transaction: gotTransaction ? gotTransaction : {}
            })
        } else {
            throw 'no id param sent'
        }
    } catch (err) {
        console.log(err)
        setServerError(res, {
            message: err
        })
    }
});

router.route('/:id/update').post(async (req, res) => {
    try {
        if (!_.isEmpty(req.params.id) && !_.isEmpty(req.body) && !_.isEmpty(req.body.transaction)) {
            let input = {
                objectId: req.params.id,
                updateObject: req.body.transaction
            }
            const updateObjectResult = await updateTransactionDetailsHandler(input);
            setSuccess(res, {
                transaction: updateObjectResult ? updateObjectResult : {}
            })
        } else {
            throw 'no body or id param sent'
        }
    } catch (err) {
        console.log(err)
        setServerError(res, {
            message: err
        })
    }
});

router.route('/:id/remove').post(async (req, res) => {
    try {
        if (req.params.id) {
            const deletedTransaction = await deleteTransactionHandler(req.params.id);
            setSuccess(res, {
                hasTransactionDeleted: true
            });
        } else {
            throw 'no id param sent'
        }
    } catch (err) {
        console.log(err)
        setServerError(res, {
            message: err
        })
    }
});

export default router;
