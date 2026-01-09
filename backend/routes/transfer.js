import express from "express";
import { pool } from "../database/db.js";

const router = express.Router();

router.post("/", async (req, res) => {
    const { from_account_id, to_account_id, transfer_amount } = req.body;
    try {
        const [result] = await pool.query("CALL transfer_money(?, ?, ?)", [
            from_account_id,
            to_account_id,
            transfer_amount,
        ]);
        res.json({ success: true, result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message || "Transfer failed" });
    }
});

export default router;
