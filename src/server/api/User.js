const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all users
router.get("/", async (req, res, next) => {
    try {
        const allUsers = await prisma.user.findMany();
        res.send(allUsers);
    } catch (err) {
        next(err);
    }
});

// Get user by ID
router.get("/:id", async (req, res, next) => {
    try {
        const userId = parseInt(req.params.id);
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (err) {
        next(err);
    }
});

// Update a user by ID
router.put("/:id", async (req, res, next) => {
    try {
        const userId = parseInt(req.params.id);
        const updatedUserData = req.body;
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: updatedUserData,
        });

        res.json(updatedUser);
    } catch (err) {
        next(err);
    }
});

// Delete a user by ID
router.delete("/:id", async (req, res, next) => {
    try {
        const userId = parseInt(req.params.id);
        await prisma.user.delete({
            where: { id: userId },
        });

        res.status(204).json({ message: "User deleted successfully" });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
