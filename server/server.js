const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const connectDB = require("./config/db");

// ======================================================
// Routes
// ======================================================

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const leadRoutes = require("./routes/leadRoutes");
const noteRoutes = require("./routes/noteRoutes");
const publicRoutes = require("./routes/publicRoutes");

const app = express();

// ======================================================
// Middleware
// ======================================================

app.use(cors());

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true
    })
);

// ======================================================
// Home Route
// ======================================================

app.get("/", (req, res) => {

    res.status(200).json({
        success: true,
        message: "Lead Management API Running"
    });

});

// ======================================================
// API Routes
// ======================================================

// Public
app.use("/api/public", publicRoutes);

// Authentication
app.use("/api/auth", authRoutes);

// Users
app.use("/api/users", userRoutes);

// Leads
app.use("/api/leads", leadRoutes);

// Lead Notes
app.use("/api/leads/:id/notes", noteRoutes);

// Individual Notes
app.use("/api/notes", noteRoutes);

// ======================================================
// 404 Handler
// ======================================================

app.use((req, res) => {

    res.status(404).json({
        success: false,
        message: "Route not found"
    });

});

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

    }

    catch (error) {

        console.error("Failed to start server:", error);

        process.exit(1);

    }

};

startServer();