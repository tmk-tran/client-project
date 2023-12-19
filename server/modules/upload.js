const multer = require("multer");

const storage = multer.memoryStorage(); // or other storage configuration
const upload = multer({ storage: storage });

module.exports = { upload };
