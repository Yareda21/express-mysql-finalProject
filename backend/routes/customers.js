
import express from 'express';
import {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer
} from '../models/customers.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await getAllCustomers();
    res.send(result);
  } catch (err) {
    res.status(500).send("Failed to fetch customers");
  }
});

router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).send("Invalid ID");
  try {
    const result = await getCustomerById(id);
    res.send(result);
  } catch (err) {
    res.status(500).send("Failed to fetch customer by ID");
  }
});

router.post('/', async (req, res) => {
  const { first_name, last_name, email, phone, address, city, state, zip_code, DOB, SSN } = req.body;
  try {
    const newId = await createCustomer(first_name, last_name, email, phone, address, city, state, zip_code, DOB, SSN);
    res.status(201).json({ message: "Customer created", customer_id: newId });
  } catch (err) {
    res.status(500).send("Failed to create customer");
  }
});

router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { column, value } = req.body;
  try {
    const result = await updateCustomer(id, column, value);
    res.send(result);
  } catch (err) {
    res.status(500).send("Failed to update customer");
  }
});

router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await deleteCustomer(id);
    res.status(200).json({ message: "Customer deleted" });
  } catch (err) {
    res.status(500).send("Failed to delete customer");
  }
});

export default router;
