const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const leadRoutes = require("./routes/leadRoutes");
const noteRoutes = require("./routes/noteRoutes");

const app = express();

// ======================================================
// Middleware
// ======================================================

app.use(cors());
app.use(express.json());

// ======================================================
// Home Route
// ======================================================

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Lead Management API Running"
    });
});

// ======================================================
// Routes
// ======================================================

app.use("/api/auth", authRoutes);

app.use("/api/leads", leadRoutes);

// Nested Note Routes
app.use("/api/leads/:id/notes", noteRoutes);

// Standalone Note Routes (Delete)
app.use("/api/notes", noteRoutes);

// ======================================================
// Server
// ======================================================

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {

        await connectDB();

        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });

    } catch (error) {

        console.error(error);

    }
};

startServer();