import { useState } from "react";

import toast from "react-hot-toast";

import { createPublicLead } from "../../api/publicApi";
const PublicLeadForm = () => {

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({

        name: "",

        email: "",

        phone: "",

        company: "",

        source: "Website"

    });

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            await createPublicLead(formData);

            toast.success(

                "Thank you! Your enquiry has been submitted."

            );

            setFormData({

                name: "",

                email: "",

                phone: "",

                company: "",

                source: "Website"

            });

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Unable to submit enquiry."

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="card shadow-sm border-0">

            <div className="card-body p-4">

                <form onSubmit={handleSubmit}>

                    <div className="row">

                        <div className="col-md-6 mb-3">

                            <label className="form-label">

                                Name

                            </label>

                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="form-label">

                                Email

                            </label>

                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />

                        </div>

                    </div>

                    <div className="row">

                        <div className="col-md-6 mb-3">

                            <label className="form-label">

                                Phone

                            </label>

                            <input
                                type="text"
                                name="phone"
                                className="form-control"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="form-label">

                                Company

                            </label>

                            <input
                                type="text"
                                name="company"
                                className="form-control"
                                value={formData.company}
                                onChange={handleChange}
                            />

                        </div>

                    </div>

                    <div className="mb-4">

                        <label className="form-label">

                            Source

                        </label>

                        <select
                            name="source"
                            className="form-select"
                            value={formData.source}
                            onChange={handleChange}
                        >

                            <option value="Website">

                                Website

                            </option>

                            <option value="Referral">

                                Referral

                            </option>

                            <option value="LinkedIn">

                                LinkedIn

                            </option>

                            <option value="Facebook">

                                Facebook

                            </option>

                            <option value="Instagram">

                                Instagram

                            </option>

                            <option value="Other">

                                Other

                            </option>

                        </select>

                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={loading}
                    >

                        {

                            loading

                                ? "Submitting..."

                                : "Submit Enquiry"

                        }

                    </button>

                </form>

            </div>

        </div>

    );

};

export default PublicLeadForm;
