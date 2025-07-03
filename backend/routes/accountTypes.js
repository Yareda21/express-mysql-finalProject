import express from "express";
import {
    getAllAccountTypes,
    getAccountTypeById,
    createAccountType,
    updateAccountType,
    removeAccountType,
} from "../database/models/accountTypes.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const types = await getAllAccountTypes();
        res.json(types);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch account types" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const type = await getAccountTypeById(req.params.id);
        if (!type) return res.status(404).json({ error: "Not found" });
        res.json(type);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch account type" });
    }
});

router.post("/", async (req, res) => {
    try {
        const id = await createAccountType(req.body);
        res.status(201).json({ type_id: id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create account type" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const rows = await updateAccountType(req.params.id, req.body);
        if (!rows) return res.status(404).json({ error: "Not found" });
        res.json({ updated: rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update account type" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const rows = await removeAccountType(req.params.id);
        if (!rows) return res.status(404).json({ error: "Not found" });
        res.json({ deleted: rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete account type" });
    }
});

export default router;


