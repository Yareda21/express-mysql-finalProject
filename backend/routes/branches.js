import express from 'express';
import { getAllBranches, getBranchById, createBranch, updateBranch, deleteBranch } from '../models/branches.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await getAllBranches();
    res.send(result);
  } catch (err) {
    res.status(500).send("Failed to fetch branches");
  }
});

router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).send("Invalid ID");

  try {
    const result = await getBranchById(id);
    res.send(result);
  } catch (err) {
    res.status(500).send("Failed to fetch branch by ID");
  }
});

router.post('/', async (req, res) => {
  const { name, address, city, state, zip_code, phone } = req.body;
  try {
    const newId = await createBranch(name, address, city, state, zip_code, phone);
    res.status(201).json({ message: "Branch created", branch_id: newId });
  } catch (err) {
    res.status(500).send("Failed to create branch");
  }
});

router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { column, value } = req.body;
  try {
    const result = await updateBranch(id, column, value);
    res.send(result);
  } catch (err) {
    res.status(500).send("Failed to update branch");
  }
});

router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await deleteBranch(id);
    res.status(200).json({ message: "Branch deleted" });
  } catch (err) {
    res.status(500).send("Failed to delete branch");
  }
});

export default router;

