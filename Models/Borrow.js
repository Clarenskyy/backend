const mongoose = require("mongoose");

const BorrowSchema = new mongoose.Schema({
  studentNumber: { type: String, required: true },
  category: { type: String, required: true },
  bookTitle: { type: String, required: true },
  borrowDate: { type: Date, required: true },
  borrowTime: { type: String, required: true },
  location: { type: String, required: true },
});

module.exports = mongoose.model("Borrow", BorrowSchema);
