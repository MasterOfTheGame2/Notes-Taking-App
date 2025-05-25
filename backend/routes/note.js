import express from "express";
import middleware from "../middleware/middleware.js";
const router = express.Router();
router.get("/", middleware, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id }); // only user’s notes
    res.status(200).json({ success: true, notes });
  } catch (error) {
    res.status(500).json({ success: false, message: "No notes" });
  }
});

router.put("/:id", middleware, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedNote = await Note.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      req.body,
      { new: true }
    );
    res.status(200).json({ success: true, updatedNote });
  } catch (error) {
    res.status(500).json({ success: false, message: "Note can't be updated" });
  }
});

router.delete("/:id", middleware, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNote = await Note.findOneAndDelete({
      _id: id,
      userId: req.user.id,
    });
    res.status(200).json({ success: true, deletedNote });
  } catch (error) {
    res.status(500).json({ success: false, message: "Note can't be deleted" });
  }
});
export default router;
