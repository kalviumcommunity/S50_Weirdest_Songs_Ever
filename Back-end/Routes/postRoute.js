const express = require("express");
const router = express.Router();
<<<<<<< HEAD:Routes/postRoute.js
const postModel = require("../Models/postModel");
=======
const userModel = require("../../Models/userModel");
>>>>>>> ad1b53d584bdc1dfd5c41cf925a7bcb3b10a5f95:Back-end/Routes/postRoute.js

// Middleware to parse JSON bodies
router.use(express.json());

// GET all posts
router.get("/posts", async (req, res) => {
    try {
        const data = await postModel.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});


// GET specific posts
router.get("/posts/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const data = await postModel.findById(id);
        if (!data) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});




// POST a new post
router.post("/posts", async (req, res) => {
    try {
        const data = await postModel.create(req.body);
        res.status(201).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// PUT to update a Post
router.put("/posts/:id", async (req, res) => {
    try {
        const updatedPost = await postModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPost) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.json(updatedPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// PATCH to partially update a Post
router.patch("/posts/:id", async (req, res) => {
    try {
        const updatedPost = await postModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPost) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.json(updatedPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// DELETE a Post
router.delete("/posts/:id", async (req, res) => {
    try {
        const deletedPost = await postModel.findByIdAndDelete(req.params.id);
        if (!deletedPost) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.json({ message: "Post deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
