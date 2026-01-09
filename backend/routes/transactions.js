import express from "express";
import {
    getAllTransactions,
    getTransactionById,
    createTransaction,
    updateTransaction,
    removeTransaction,
} from "../database/models/transactions.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const transactions = await getAllTransactions();
        res.json(transactions);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch transactions" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const tx = await getTransactionById(req.params.id);
        if (!tx) return res.status(404).json({ error: "Not found" });
        res.json(tx);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch transaction" });
    }
});

router.post("/", async (req, res) => {
    try {
        const id = await createTransaction(req.body);
        res.status(201).json({ transaction_id: id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create transaction" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const rows = await updateTransaction(req.params.id, req.body);
        if (!rows) return res.status(404).json({ error: "Not found" });
        res.json({ updated: rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update transaction" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const rows = await removeTransaction(req.params.id);
        if (!rows) return res.status(404).json({ error: "Not found" });
        res.json({ deleted: rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete transaction" });
    }
});

export default router;
