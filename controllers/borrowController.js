const Borrow = require("../Models/Borrow");

// Borrow a book
const borrowBook = async (req, res) => {
  try {
    const { studentNumber, category, bookTitle, borrowDate, borrowTime, location } = req.body;

    const newBorrow = new Borrow({
      studentNumber,
      category,
      bookTitle,
      borrowDate: new Date(borrowDate),
      borrowTime,
      location,
    });

    await newBorrow.save();

    res.status(201).json({ message: "Book borrowed successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getBorrowedBooksByStudent = async (req, res) => {
  try {
    const { studentNumber } = req.params; // Extract studentNumber from URL parameters

    const borrowedBooks = await Borrow.find({ studentNumber }); // Find books by student number

    if (borrowedBooks.length === 0) {
      return res.status(404).json({ message: "No borrowed books found for this student number." });
    }

    res.status(200).json(borrowedBooks); // Send the list of borrowed books
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const returnBorrowedBook = async (req, res) => {
  try {
    const { studentNumber, bookId } = req.body; // Extract studentNumber and bookId from request body

    const result = await Borrow.findOneAndDelete({ studentNumber, _id: bookId });

    if (!result) {
      return res.status(404).json({ message: 'Borrowed book not found' });
    }

    res.status(200).json({ message: 'Book returned successfully' });
  } catch (error) {
    console.error('Error returning borrowed book:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { borrowBook, getBorrowedBooksByStudent, returnBorrowedBook };
