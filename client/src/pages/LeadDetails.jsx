import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import toast from "react-hot-toast";

import Navbar from "../components/Navbar";

import Loader from "../components/common/Loader";

import LeadCard from "../components/leads/LeadCard";
import EditLeadModal from "../components/leads/EditLeadModal";
import AssignLeadModal from "../components/leads/AssignLeadModal";
import TimelineModal from "../components/leads/TimelineModal";

import useLeads from "../hooks/useLeads";
import useUsers from "../hooks/useUsers";

import { getLead } from "../api/leadApi";

import useAuth from "../hooks/useAuth";

const LeadDetails = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const { user } = useAuth();

    const { users } = useUsers();

    const {

        updateLead,

        deleteLead,

        assignLead,

        updateStatus

    } = useLeads();

    const [lead, setLead] = useState(null);

    const [loading, setLoading] = useState(true);

    const [showEdit, setShowEdit] = useState(false);

    const [showAssign, setShowAssign] = useState(false);

    const [showTimeline, setShowTimeline] = useState(false);

    const loadLead = async () => {

        try {

            setLoading(true);

            const { data } = await getLead(id);

            setLead(data.lead);

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Unable to load lead."

            );

            navigate("/dashboard");

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadLead();

    }, [id]);

    const handleUpdate = async (formData) => {

        await updateLead(id, formData);

        setShowEdit(false);

        loadLead();

    };

    const handleAssign = async (memberId) => {

        await assignLead(id, memberId);

        setShowAssign(false);

        loadLead();

    };

    const handleDelete = async () => {

        const confirmDelete = window.confirm(

            "Delete this lead?"

        );

        if (!confirmDelete) return;

        await deleteLead(id);

        navigate("/dashboard");

    };

    const handleStatusChange = async (e) => {

        await updateStatus(

            id,

            e.target.value

        );

        loadLead();

    };

    if (loading) {

        return (

            <>
                <Navbar />
                <Loader />
            </>

        );

    }

    if (!lead) {

        return (

            <>
                <Navbar />

                <div className="container mt-5">

                    <div className="alert alert-danger">

                        Lead not found.

                    </div>

                </div>

            </>

        );

    }

    return (

        <>

            <Navbar />

            <div className="container mt-4">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h2>

                        Lead Details

                    </h2>

                    <button
                        className="btn btn-secondary"
                        onClick={() => navigate("/dashboard")}
                    >

                        Back

                    </button>

                </div>

                <LeadCard lead={lead} />

                <div className="mt-4 d-flex flex-wrap gap-2">

                    {

                        user?.role === "admin" &&

                        <>

                            <button
                                className="btn btn-primary"
                                onClick={() => setShowEdit(true)}
                            >

                                Edit

                            </button>

                            <button
                                className="btn btn-warning"
                                onClick={() => setShowAssign(true)}
                            >

                                Assign

                            </button>

                            <button
                                className="btn btn-danger"
                                onClick={handleDelete}
                            >

                                Delete

                            </button>

                        </>

                    }

                    <button
                        className="btn btn-info"
                        onClick={() => setShowTimeline(true)}
                    >

                        Timeline

                    </button>

                </div>

                <div className="card mt-4">

                    <div className="card-body">

                        <h5>

                            Lead Status

                        </h5>

                        <select
                            className="form-select mt-3"
                            value={lead.status}
                            onChange={handleStatusChange}
                        >

                            <option value="New">

                                New

                            </option>

                            <option value="Contacted">

                                Contacted

                            </option>

                            <option value="Qualified">

                                Qualified

                            </option>

                            <option value="Won">

                                Won

                            </option>

                            <option value="Lost">

                                Lost

                            </option>

                        </select>

                    </div>

                </div>

            </div>

            <EditLeadModal

                show={showEdit}

                lead={lead}

                onClose={() => setShowEdit(false)}

                onSave={handleUpdate}

            />

            <AssignLeadModal

                show={showAssign}

                users={users.filter(

                    (u) => u.role === "member"

                )}

                onClose={() => setShowAssign(false)}

                onAssign={handleAssign}

            />

            <TimelineModal

                show={showTimeline}

                leadId={id}

                onClose={() => setShowTimeline(false)}

            />

        </>

    );

};

export default LeadDetails;