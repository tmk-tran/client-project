// const multer = require("multer");

// const storage = multer.memoryStorage(); // Store files in memory

// // Export the multer configuration as a function
// module.exports = multer({ storage: storage });

const multer = require("multer");

const storage = multer.memoryStorage(); // or other storage configuration
const upload = multer({ storage: storage });

module.exports = { upload };
