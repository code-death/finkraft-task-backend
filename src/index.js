import dotenv from 'dotenv'
import mongoose from "mongoose";
import Express from 'express';
import transactions from './common/routes/transaction.routes'
import bodyParser from "body-parser";

const app = new Express();
app.use(bodyParser.json({limit: '20mb'}));
app.use(bodyParser.urlencoded({limit: '20mb', extended: false}));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.use("*", (req, res, next) => {
    const { hostname, originalUrl, protocol, method } = req;
    console.log(
        `${protocol}://${hostname}:8102${originalUrl}`
    );
    next();
});

app.use('/transactions', transactions)

app.listen(8102, (error) => {
    if (!error) {
        console.log(`API is running on port: 8102! Build something amazing!`);
    }
});

const uri = process.env.MONGO_URL;

async function connectDb() {
    try {
        await mongoose.connect(uri);
        console.log('DB Connection Open');
    } catch (e) {
        console.log(e)
    }
}

connectDb();
