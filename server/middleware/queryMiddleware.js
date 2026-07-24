const validateObjectId = require("../utils/validateObjectId");

const queryMiddleware = (req, res, next) => {
    // Pagination
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    // Base filter object
    const filter = {};

    // ---------------------------
    // Status Filter
    // ---------------------------
    if (req.query.status) {
        filter.status = req.query.status;
    }

    // ---------------------------
    // Assigned User Filter
    // ---------------------------
    if (req.query.assignedTo) {
        if (!validateObjectId(req.query.assignedTo)) {
            return res.status(400).json({
                success: false,
                message: "Invalid assignedTo ID"
            });
        }
        filter.assignedTo = req.query.assignedTo;
    }

    // ---------------------------
    // Date Range Filter
    // ---------------------------
    if (req.query.startDate || req.query.endDate) {
        filter.createdAt = {};

        if (req.query.startDate) {
            const start = new Date(req.query.startDate);
            if (isNaN(start)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid startDate"
                });
            }
            filter.createdAt.$gte = start;
        }

        if (req.query.endDate) {
            const end = new Date(req.query.endDate);
            if (isNaN(end)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid endDate"
                });
            }
            filter.createdAt.$lte = end;
        }
    }

    // ---------------------------
    // Search (name, email, company)
    // ---------------------------
    if (req.query.search) {
        const searchRegex = new RegExp(req.query.search, "i");

        filter.$or = [
            { name: searchRegex },
            { email: searchRegex },
            { company: searchRegex }
        ];
    }

    // ---------------------------
    // Sorting
    // ---------------------------
    const allowedSortFields = ["createdAt", "name", "email", "status"];
    const sortField = allowedSortFields.includes(req.query.sortBy)
        ? req.query.sortBy
        : "createdAt";

    const sortOrder = req.query.order === "asc" ? 1 : -1;

    const sort = {
        [sortField]: sortOrder
    };

    // ---------------------------
    // Field Selection (projection)
    // ---------------------------
    let select = "";
    if (req.query.fields) {
        // Example: fields=name,email,status
        select = req.query.fields.split(",").join(" ");
    }

    // ---------------------------
    // Attach all options to req
    // ---------------------------
    req.queryOptions = {
        page,
        limit,
        skip,
        filter,
        sort,
        select
    };

    next();
};

module.exports = queryMiddleware;