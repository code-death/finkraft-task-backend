# finkraft task Backend Code Repo

Backend Repo Link - https://github.com/code-death/finkraft-task-backend

Frontend Repo Link - https://github.com/code-death/finkraft-task-frontend

## Deployments

- Backend - https://finkraft-task-backend.onrender.com
- Frontend - https://finkraft-task-frontend.vercel.app

### Features 

1. Upload Transaction Data from a CSV to MongoDb database
2. Update, create, delete a Transaction

### Endpoints

- /transactions/stats - returns stats on basis of transaction status
- /transactions/bulk-upload - parses uploaded single CSV file to JSON and stores it in MongoDb
- /transactions/list - returns list of transactions (Filters used pageNum, pageSize for paginating the data)
- /transactions/new - creates a new entry in the transactions
- /transactions/:id/update - updates any existing entry using the _id generated by MongoDb
- /transactions/:id/remove - removes any existing entry using the _id generated by MongoDb

