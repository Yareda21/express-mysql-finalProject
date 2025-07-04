import express from 'express';
import {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction
} from '../models/transactions.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await getAllTransactions();
    res.send(result);
  } catch (err) {
    res.status(500).send("Failed to fetch transactions");
  }
});

router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).send("Invalid ID");

  try {
    const result = await getTransactionById(id);
    res.send(result);
  } catch (err) {
    res.status(500).send("Failed to fetch transaction by ID");
  }
});

router.post('/', async (req, res) => {
  const { account_id, transaction_type, amount, description, timestamps } = req.body;
  try {
    const newId = await createTransaction(account_id, transaction_type, amount, description, timestamps);
    res.status(201).json({ message: "Transaction created", transaction_id: newId });
  } catch (err) {
    res.status(500).send("Failed to create transaction");
  }
});

router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { column, value } = req.body;
  try {
    const result = await updateTransaction(id, column, value);
    res.send(result);
  } catch (err) {
    res.status(500).send("Failed to update transaction");
  }
});

router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await deleteTransaction(id);
    res.status(200).json({ message: "Transaction deleted" });
  } catch (err) {
    res.status(500).send("Failed to delete transaction");
  }
});

export default router;
