const express = require("express");
const router = express.Router();
const userModel = require("../Models/userModel");
const Joi = require("joi");

router.use(express.json());

const userJoiSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    repeatPassword: Joi.string().valid(Joi.ref('password')).required().strict()
});



function validateUser(req, res, next) {
    const { error } = userJoiSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}




// GET all users
router.get("/users", async (req, res) => {
    try {
        const data = await userModel.find();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "500-Internal server error" });
    }
});

// GET each user by ID
router.get("/users/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const data = await userModel.findById(id);
        if (!data) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

// POST a new user
router.post("/users", validateUser, async (req, res) => {
    try {
        const data = await userModel.create(req.body);
        res.status(201).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// PUT to update a user
router.put("/users/:id", validateUser, async (req, res) => {
    try {
        const updatedUser = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// PATCH to partially update a user
router.patch("/users/:id", validateUser, async (req, res) => {
    try {
        const updatedUser = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// DELETE a user
router.delete("/users/:id", async (req, res) => {
    try {
        const deletedUser = await userModel.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
