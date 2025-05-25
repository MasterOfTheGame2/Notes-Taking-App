import express, { Router } from "express";
import Note from "../models/Note.js";
import middleware from "../middleware/middleware.js";

const router = express.Router();

router.post("/add", middleware, async (req, res) => {
  try {
    const { title, description } = req.body;

    const newNote = new Note({
      title,
      description,
      userId: req.user.id,
    });
    await newNote.save();

    res.status(201).json({
      success: true,
      message: "Note created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error in adding note" });
  }
});
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find();
    return res.status(200).json({ success: true, notes });
  } catch (error) {
    return res.status(500).json({ success: false, message: "No notes" });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateNote = await Note.findByIdAndUpdate(id, req.body);
    return res.status(200).json({ success: true, updateNote });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Note can't be updated" });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteNote = await Note.findByIdAndDelete(id);
    return res.status(200).json({ success: true, deleteNote });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Note can't be deleted" });
  }
});

export default router;
