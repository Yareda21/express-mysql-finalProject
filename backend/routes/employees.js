import express from "express";
import {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    removeEmployee,
} from "../database/models/employees.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const employees = await getAllEmployees();
        res.json(employees);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch employees" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const employee = await getEmployeeById(req.params.id);
        if (!employee) return res.status(404).json({ error: "Not found" });
        res.json(employee);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch employee" });
    }
});

router.post("/", async (req, res) => {
    try {
        const id = await createEmployee(req.body);
        res.status(201).json({ employee_id: id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create employee" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const rows = await updateEmployee(req.params.id, req.body);
        if (!rows) return res.status(404).json({ error: "Not found" });
        res.json({ updated: rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update employee" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const rows = await removeEmployee(req.params.id);
        if (!rows) return res.status(404).json({ error: "Not found" });
        res.json({ deleted: rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete employee" });
    }
});

export default router;
