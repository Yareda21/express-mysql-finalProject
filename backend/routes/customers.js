import express from "express";
import {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    removeCustomer,
} from "../database/models/customers.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const customers = await getAllCustomers();
        res.json(customers);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch customers" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const customer = await getCustomerById(req.params.id);
        if (!customer) return res.status(404).json({ error: "Not found" });
        res.json(customer);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch customer" });
    }
});

router.post("/", async (req, res) => {
    try {
        const id = await createCustomer(req.body);
        res.status(201).json({ customer_id: id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create customer" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const rows = await updateCustomer(req.params.id, req.body);
        if (!rows) return res.status(404).json({ error: "Not found" });
        res.json({ updated: rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update customer" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const rows = await removeCustomer(req.params.id);
        if (!rows) return res.status(404).json({ error: "Not found" });
        res.json({ deleted: rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete customer" });
    }
});

export default router;
