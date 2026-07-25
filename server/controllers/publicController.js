const Lead = require("../models/Lead");

const submitLead = async (req, res) => {

    try {

        const {

            name,

            email,

            phone,

            company,

            source,

            message

        } = req.body;

        if (!name || !email) {

            return res.status(400).json({

                success: false,

                message: "Name and email are required."

            });

        }

        const lead = await Lead.create({

            name,

            email,

            phone,

            company,

            source,

            notes: message,

            status: "New",

            assignedTo: null

        });

        res.status(201).json({

            success: true,

            message: "Your enquiry has been submitted successfully.",

            lead

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

    }

};

module.exports = {

    submitLead

};