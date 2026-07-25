import { useState } from "react";

const initialForm = {
    name: "",
    email: "",
    phone: "",
    company: "",
    source: "Manual"
};

const CreateLeadModal = ({ onCreate }) => {

    const [form, setForm] = useState(initialForm);

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            await onCreate(form);

            setForm(initialForm);

            document
                .getElementById("closeCreateModal")
                ?.click();

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div
            className="modal fade"
            id="createLeadModal"
            tabIndex="-1"
        >

            <div className="modal-dialog">

                <div className="modal-content">

                    <div className="modal-header">

                        <h5 className="modal-title">

                            Create Lead

                        </h5>

                        <button
                            id="closeCreateModal"
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                        />

                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="modal-body">

                            <input
                                className="form-control mb-3"
                                placeholder="Name"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />

                            <input
                                className="form-control mb-3"
                                placeholder="Email"
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />

                            <input
                                className="form-control mb-3"
                                placeholder="Phone"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                            />

                            <input
                                className="form-control mb-3"
                                placeholder="Company"
                                name="company"
                                value={form.company}
                                onChange={handleChange}
                            />

                            <input
                                className="form-control"
                                placeholder="Source"
                                name="source"
                                value={form.source}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="modal-footer">

                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >

                                Cancel

                            </button>

                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={loading}
                            >

                                {

                                    loading

                                        ? "Creating..."

                                        : "Create Lead"

                                }

                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>

    );

};

export default CreateLeadModal;