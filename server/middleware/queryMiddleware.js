const validateObjectId = require("../utils/validateObjectId");

const queryMiddleware = (req, res, next) => {

    // =====================================
    // Pagination
    // =====================================

    const page = Math.max(parseInt(req.query.page) || 1, 1);

    const limit = Math.min(
        Math.max(parseInt(req.query.limit) || 10, 1),
        100
    );

    const skip = (page - 1) * limit;

    // =====================================
    // Filters
    // =====================================

    const filter = {};

    // Status

    if (req.query.status) {

        filter.status = req.query.status;

    }

    // Assigned User

    if (req.query.assignedTo) {

        if (!validateObjectId(req.query.assignedTo)) {

            return res.status(400).json({

                success: false,

                message: "Invalid assignedTo ID"

            });

        }

        filter.assignedTo = req.query.assignedTo;

    }

    // Date Range

    if (req.query.startDate || req.query.endDate) {

        filter.createdAt = {};

        if (req.query.startDate) {

            const start = new Date(req.query.startDate);

            if (isNaN(start.getTime())) {

                return res.status(400).json({

                    success: false,

                    message: "Invalid startDate"

                });

            }

            filter.createdAt.$gte = start;

        }

        if (req.query.endDate) {

            const end = new Date(req.query.endDate);

            if (isNaN(end.getTime())) {

                return res.status(400).json({

                    success: false,

                    message: "Invalid endDate"

                });

            }

            filter.createdAt.$lte = end;

        }

    }

    // Search

    if (req.query.search) {

        const regex = new RegExp(req.query.search.trim(), "i");

        filter.$or = [

            { name: regex },

            { email: regex },

            { company: regex }

        ];

    }

    // =====================================
    // Sorting
    // =====================================

    const allowedSortFields = [

        "createdAt",

        "updatedAt",

        "name",

        "email",

        "company",

        "status"

    ];

    const sortField = allowedSortFields.includes(req.query.sortBy)

        ? req.query.sortBy

        : "createdAt";

    const sortOrder = req.query.order === "asc" ? 1 : -1;

    const sort = {

        [sortField]: sortOrder

    };

    // =====================================
    // Projection
    // =====================================

    let select = "";

    if (req.query.fields) {

        select = req.query.fields

            .split(",")

            .map(field => field.trim())

            .join(" ");

    }

    // =====================================
    // Attach
    // =====================================

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