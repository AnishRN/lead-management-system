import { useState } from "react";

const CreateLeadModal = ({
    users = [],
    onCreate
}) => {

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        source: "Manual",
        assignedTo: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await onCreate(form);

        setForm({
            name: "",
            email: "",
            phone: "",
            company: "",
            source: "Manual",
            assignedTo: ""
        });

        window.bootstrap.Modal.getInstance(
            document.getElementById("createLeadModal")
        ).hide();
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
                            className="btn-close"
                            data-bs-dismiss="modal"
                        />

                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="modal-body">

                            <div className="mb-3">

                                <label className="form-label">
                                    Name *
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="mb-3">

                                <label className="form-label">
                                    Email *
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="mb-3">

                                <label className="form-label">
                                    Phone
                                </label>

                                <input
                                    type="text"
                                    name="phone"
                                    className="form-control"
                                    value={form.phone}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="mb-3">

                                <label className="form-label">
                                    Company
                                </label>

                                <input
                                    type="text"
                                    name="company"
                                    className="form-control"
                                    value={form.company}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="mb-3">

                                <label className="form-label">
                                    Source
                                </label>

                                <input
                                    type="text"
                                    name="source"
                                    className="form-control"
                                    value={form.source}
                                    onChange={handleChange}
                                />

                            </div>

                            <div>

                                <label className="form-label">
                                    Assign To
                                </label>

                                <select
                                    name="assignedTo"
                                    className="form-select"
                                    value={form.assignedTo}
                                    onChange={handleChange}
                                >

                                    <option value="">
                                        Unassigned
                                    </option>

                                    {users.map(user => (

                                        <option
                                            key={user._id}
                                            value={user._id}
                                        >
                                            {user.name}
                                        </option>

                                    ))}

                                </select>

                            </div>

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
                            >
                                Create Lead
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>

    );

};

export default CreateLeadModal;