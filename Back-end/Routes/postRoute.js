const express = require("express");
const router = express.Router();
const postModel = require("../Models/postModel");
const Joi = require("joi");

router.use(express.json());

const postJoiSchema = Joi.object({
  songTitle: Joi.string().required(),
  username: Joi.string().required(),
  artist: Joi.string().required(),
  releaseYear: Joi.number().integer().min(1900).max(new Date().getFullYear()),
  imageVideo: Joi.string().uri(),
  genre: Joi.string(),
});

const putJoiSchema = Joi.object({
  songTitle: Joi.string().required(),
  username: Joi.string(),
  artist: Joi.string().required(),
  releaseYear: Joi.number().integer().min(1900).max(new Date().getFullYear()),
  imageVideo: Joi.string().uri(),
  genre: Joi.string(),
});

const patchJoiSchema = Joi.object({
  songTitle: Joi.string(),
  username: Joi.string(),
  artist: Joi.string(),
  releaseYear: Joi.number().integer().min(1900).max(new Date().getFullYear()),
  imageVideo: Joi.string().uri(),
  genre: Joi.string(),
}).min(1);

function validatePost(req, res, next) {
  const { error } = postJoiSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}

function validatePut(req, res, next) {
  const { error } = putJoiSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}

function validatePatch(req, res, next) {
  const { error } = patchJoiSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}

// GET all posts
router.get("/posts", async (req, res) => {
  try {
    const data = await postModel.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "500-Internal server error" });
  }
});

// GET specific post by ID
router.get("/posts/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await postModel.findById(id);
    if (!data) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST a new post with validation
router.post("/posts", validatePost, async (req, res) => {
  try {
    const data = await postModel.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// PUT to update a post
router.put("/posts/:id", validatePut, async (req, res) => {
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

// PATCH to partially update a post
router.patch("/posts/:id", validatePatch, async (req, res) => {
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

// DELETE a post
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
