const express = require("express");
const router = express.Router();
const postModel = require("../Models/postModel");

// Middleware to parse JSON bodies
router.use(express.json());

// GET all posts
router.get("/posts", async (req, res) => {
    try {
        const data = await postModel.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "500-Internal server error" });
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
      res.status(500).json({message: "Internal server error" });
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

// PUT to update a post
router.put("/posts/:id", async (req, res) => {
    try {
        const updatedUser = await postModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// PATCH to partially update a post
router.patch("/posts/:id", async (req, res) => {
    try {
        const updatedUser = await postModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// DELETE a post
router.delete("/posts/:id", async (req, res) => {
    try {
        const deletedUser = await postModel.findByIdAndDelete(req.params.id);
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
