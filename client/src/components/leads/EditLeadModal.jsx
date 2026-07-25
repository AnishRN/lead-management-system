import { useEffect, useState } from "react";

const EditLeadModal = ({
    show,
    lead,
    onClose,
    onSave
}) => {

    const [form, setForm] = useState({});

    useEffect(() => {

        if (lead) {

            setForm({

                name: lead.name,
                email: lead.email,
                phone: lead.phone,
                company: lead.company,
                source: lead.source,
                status: lead.status

            });

        }

    }, [lead]);

    if (!show) return null;

    const handleChange = (e) => {

        setForm({

            ...form,
            [e.target.name]: e.target.value

        });

    };

    return (

        <div className="modal d-block">

            <div className="modal-dialog">

                <div className="modal-content">

                    <div className="modal-header">

                        <h5>Edit Lead</h5>

                        <button
                            className="btn-close"
                            onClick={onClose}
                        />

                    </div>

                    <div className="modal-body">

                        <input
                            className="form-control mb-2"
                            name="name"
                            value={form.name || ""}
                            onChange={handleChange}
                        />

                        <input
                            className="form-control mb-2"
                            name="email"
                            value={form.email || ""}
                            onChange={handleChange}
                        />

                        <input
                            className="form-control mb-2"
                            name="phone"
                            value={form.phone || ""}
                            onChange={handleChange}
                        />

                        <input
                            className="form-control mb-2"
                            name="company"
                            value={form.company || ""}
                            onChange={handleChange}
                        />

                        <select
                            className="form-select"
                            name="status"
                            value={form.status || "New"}
                            onChange={handleChange}
                        >

                            <option>New</option>
                            <option>Contacted</option>
                            <option>Qualified</option>
                            <option>Won</option>
                            <option>Lost</option>

                        </select>

                    </div>

                    <div className="modal-footer">

                        <button
                            className="btn btn-secondary"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button
                            className="btn btn-primary"
                            onClick={() => onSave(form)}
                        >
                            Save
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default EditLeadModal;