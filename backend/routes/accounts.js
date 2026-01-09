import express from "express";
import {
    getAllAccounts,
    getAccountById,
    createAccount,
    updateAccount,
    removeAccount,
} from "../database/models/accounts.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const accounts = await getAllAccounts();
        res.json(accounts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch accounts" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const account = await getAccountById(req.params.id);
        if (!account) return res.status(404).json({ error: "Not found" });
        res.json(account);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch account" });
    }
});

router.post("/", async (req, res) => {
    try {
        const id = await createAccount(req.body);
        res.status(201).json({ account_id: id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create account" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const rows = await updateAccount(req.params.id, req.body);
        if (!rows) return res.status(404).json({ error: "Not found" });
        res.json({ updated: rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update account" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const rows = await removeAccount(req.params.id);
        if (!rows) return res.status(404).json({ error: "Not found" });
        res.json({ deleted: rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete account" });
    }
});

export default router;
