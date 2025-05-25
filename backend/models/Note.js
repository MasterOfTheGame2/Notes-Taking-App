import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true, // optional: adds createdAt and updatedAt fields
  }
);

const Note = mongoose.model("Note", NoteSchema);

export default Note;
