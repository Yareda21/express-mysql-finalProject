import express from "express";
import {
    getAllBranches,
    getBranchById,
    createBranch,
    updateBranch,
    removeBranch,
} from "../database/models/branches.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const branches = await getAllBranches();
        res.json(branches);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch branches" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const branch = await getBranchById(req.params.id);
        if (!branch) return res.status(404).json({ error: "Not found" });
        res.json(branch);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch branch" });
    }
});

router.post("/", async (req, res) => {
    try {
        const id = await createBranch(req.body);
        res.status(201).json({ branch_id: id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create branch" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const rows = await updateBranch(req.params.id, req.body);
        if (!rows) return res.status(404).json({ error: "Not found" });
        res.json({ updated: rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update branch" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const rows = await removeBranch(req.params.id);
        if (!rows) return res.status(404).json({ error: "Not found" });
        res.json({ deleted: rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete branch" });
    }
});

export default router;
