const Lead = require("../models/Lead");
const Activity = require("../models/Activity");
const User = require("../models/User");
const LEAD_STATUS = require("../constants/leadStatus");
const validateObjectId = require("../utils/validateObjectId");

// ======================================================
// Create Lead
// POST /api/leads
// Admin Only
// ======================================================

const createLead = async (req, res) => {

    try {

        const {
            name,
            email,
            phone,
            company,
            source,
            assignedTo,
        } = req.body;


        if (!name || !email) {

            return res.status(400).json({
                success: false,
                message: "Name and email are required",
            });

        }


        const lead = await Lead.create({

            name,
            email,
            phone,
            company,
            source,
            assignedTo: assignedTo || null,
            createdBy: req.user._id,

        });


        await Activity.create({

            lead: lead._id,

            user: req.user._id,

            action: "Lead Created",

        });


        const populatedLead = await Lead.findById(lead._id)
            .populate("assignedTo", "name email role")
            .populate("createdBy", "name email");


        res.status(201).json({

            success: true,

            message: "Lead created successfully",

            lead: populatedLead,

        });


    } catch (error) {

        console.error(error);

        res.status(500).json({

            success:false,

            message:"Internal Server Error"

        });

    }

};



// ======================================================
// Get All Leads
// GET /api/leads
// ======================================================

const getAllLeads = async (req,res)=>{

    try{

        let query={};


        if(req.user.role==="member"){

            query.assignedTo=req.user._id;

        }


        const leads = await Lead.find(query)

            .populate("assignedTo","name email role")

            .populate("createdBy","name email")

            .sort({createdAt:-1});


        res.status(200).json({

            success:true,

            count:leads.length,

            leads

        });


    }catch(error){

        console.error(error);

        res.status(500).json({

            success:false,

            message:"Internal Server Error"

        });

    }

};



// ======================================================
// Get Lead By ID
// GET /api/leads/:id
// ======================================================

const getLeadById = async(req,res)=>{

    try{


        const lead = await Lead.findById(req.params.id)

            .populate("assignedTo","name email role")

            .populate("createdBy","name email");



        if(!lead){

            return res.status(404).json({

                success:false,

                message:"Lead not found"

            });

        }



        if(

            req.user.role==="member" &&

            (!lead.assignedTo ||

            lead.assignedTo._id.toString() !== req.user._id.toString())

        ){

            return res.status(403).json({

                success:false,

                message:"Access denied"

            });

        }



        res.status(200).json({

            success:true,

            lead

        });


    }catch(error){

        console.error(error);

        res.status(500).json({

            success:false,

            message:"Internal Server Error"

        });

    }

};



// ======================================================
// Update Lead
// PUT /api/leads/:id
// ======================================================

const updateLead = async(req,res)=>{

    try{


        const lead = await Lead.findById(req.params.id);


        if(!lead){

            return res.status(404).json({

                success:false,

                message:"Lead not found"

            });

        }



        if(

            req.user.role==="member" &&

            (!lead.assignedTo ||

            lead.assignedTo.toString() !== req.user._id.toString())

        ){

            return res.status(403).json({

                success:false,

                message:"Access denied"

            });

        }



        const oldData = {

            name:lead.name,

            email:lead.email,

            company:lead.company

        };



        Object.assign(lead,req.body);


        await lead.save();



        await Activity.create({

            lead:lead._id,

            user:req.user._id,

            action:"Lead Updated",

            oldValue:JSON.stringify(oldData),

            newValue:JSON.stringify(req.body)

        });



        res.status(200).json({

            success:true,

            message:"Lead updated successfully",

            lead

        });


    }catch(error){

        console.error(error);

        res.status(500).json({

            success:false,

            message:"Internal Server Error"

        });

    }

};



// ======================================================
// Delete Lead
// DELETE /api/leads/:id
// Admin Only
// ======================================================

const deleteLead = async(req,res)=>{

    try{


        const lead = await Lead.findById(req.params.id);


        if(!lead){

            return res.status(404).json({

                success:false,

                message:"Lead not found"

            });

        }


        await Activity.create({

            lead:lead._id,

            user:req.user._id,

            action:"Lead Deleted"

        });


        await lead.deleteOne();



        res.status(200).json({

            success:true,

            message:"Lead deleted successfully"

        });



    }catch(error){

        console.error(error);

        res.status(500).json({

            success:false,

            message:"Internal Server Error"

        });

    }

};



// ======================================================
// Assign Lead
// PATCH /api/leads/:id/assign
// Admin Only
// ======================================================

const assignLead = async(req,res)=>{

    try{


        const {assignedTo}=req.body;


        const lead = await Lead.findById(req.params.id);


        if(!lead){

            return res.status(404).json({

                success:false,

                message:"Lead not found"

            });

        }


        const oldUser = lead.assignedTo;


        lead.assignedTo = assignedTo;


        await lead.save();



        await Activity.create({

            lead:lead._id,

            user:req.user._id,

            action:"Lead Assigned",

            oldValue:String(oldUser),

            newValue:String(assignedTo)

        });



        res.status(200).json({

            success:true,

            message:"Lead assigned successfully",

            lead

        });



    }catch(error){

        console.error(error);

        res.status(500).json({

            success:false,

            message:"Internal Server Error"

        });

    }

};



// ======================================================
// Update Status
// PATCH /api/leads/:id/status
// ======================================================

const updateLeadStatus = async(req,res)=>{

    try{


        const {status}=req.body;


        const lead = await Lead.findById(req.params.id);


        if(!lead){

            return res.status(404).json({

                success:false,

                message:"Lead not found"

            });

        }


        const oldStatus = lead.status;


        lead.status=status;


        await lead.save();



        await Activity.create({

            lead:lead._id,

            user:req.user._id,

            action:"Status Changed",

            oldValue:oldStatus,

            newValue:status

        });



        res.status(200).json({

            success:true,

            message:"Status updated successfully",

            lead

        });



    }catch(error){

        console.error(error);

        res.status(500).json({

            success:false,

            message:"Internal Server Error"

        });

    }

};



module.exports={

    createLead,

    getAllLeads,

    getLeadById,

    updateLead,

    deleteLead,

    assignLead,

    updateLeadStatus

};