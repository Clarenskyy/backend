const express = require("express");
const { borrowBook, getBorrowedBooksByStudent, returnBorrowedBook } = require("../controllers/borrowController");

const router = express.Router();

// Route to borrow a book
router.post("/borrow", borrowBook);

router.get("/borrow/:studentNumber", getBorrowedBooksByStudent);

router.post("/return", returnBorrowedBook);

module.exports = router;
