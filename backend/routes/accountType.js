
import express from 'express';
import {
  getAllAccountTypes,
  getAccountTypeById,
  createAccountType, 
  updateAccountType,
  deleteAccountType
} from '../models/accountTypes.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await getAllAccountTypes();
    res.send(result);
  } catch (err) {
    res.status(500).send("Failed to fetch account types");
  }
});

router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).send("Invalid ID");
  try {
    const result = await getAccountTypeById(id);
    res.send(result);
  } catch (err) {
    res.status(500).send("Failed to fetch account type by ID");
  }
});

router.post('/', async (req, res) => {
  const { type_name, description, minimum_balance, interest_rate } = req.body;
  try {
    const newId = await createAccountType(type_name, description, minimum_balance, interest_rate);
    res.status(201).json({ message: "Account type created", type_id: newId });
  } catch (err) {
    res.status(500).send("Failed to create account type");
  }
});

router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { column, value } = req.body;
  try {
    const result = await updateAccountType(id, column, value);
    res.send(result);
  } catch (err) {
    res.status(500).send("Failed to update account type");
  }
});

router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await deleteAccountType(id);
    res.status(200).json({ message: "Account type deleted" });
  } catch (err) {
    res.status(500).send("Failed to delete account type");
  }
});

export default router;