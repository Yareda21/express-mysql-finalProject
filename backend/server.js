import express from 'express'
import accountRoutes from './routes/accounts.js';
import branchRoutes from './routes/branches.js';
import employeeRoutes from './routes/employees.js';
import customerRoutes from './routes/customers.js';
import accountTypeRoutes from './routes/accountTypes.js';
import transactionRoutes from './routes/transactions.js';

const app = express()
app.use(express.json())

app.use('/api/accounts', accountRoutes);
app.use('/api/account-types', accountTypeRoutes);
app.use('/api/branches', branchRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/transactions', transactionRoutes);


app.listen(3000, () => {
    console.log('Server started on port 3000...');
});