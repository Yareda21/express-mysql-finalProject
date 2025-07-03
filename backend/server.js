import express from "express";
import dotenv from "dotenv";
import branchesRouter from "./routes/branches.js";
import accountTypesRouter from "./routes/accountTypes.js";
import customersRouter from "./routes/customers.js";
import employeesRouter from "./routes/employees.js";
import accountsRouter from "./routes/accounts.js";
import transactionsRouter from "./routes/transactions.js";
import transferRouter from "./routes/transfer.js";

dotenv.config();
const app = express();
app.use(express.json());

app.use("/api/branches", branchesRouter);
app.use("/api/account-types", accountTypesRouter);
app.use("/api/customers", customersRouter);
app.use("/api/employees", employeesRouter);
app.use("/api/accounts", accountsRouter);
app.use("/api/transactions", transactionsRouter);
app.use("/api/transfer", transferRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
