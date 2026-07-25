import { useEffect, useState } from "react";

import { getTimeline } from "../../api/leadApi";

const TimelineModal = ({
    show,
    leadId,
    onClose
}) => {

    const [timeline, setTimeline] = useState([]);

    const loadTimeline = async () => {

        try {

            const { data } = await getTimeline(leadId);

            setTimeline(data.timeline);

        }

        catch (error) {

            console.error(error);

        }

    };

    useEffect(() => {

        if (show && leadId) {

            loadTimeline();

        }

    }, [show, leadId]);

    if (!show) return null;

    return (

        <div className="modal d-block">

            <div className="modal-dialog modal-lg">

                <div className="modal-content">

                    <div className="modal-header">

                        <h5>Lead Timeline</h5>

                        <button
                            className="btn-close"
                            onClick={onClose}
                        />

                    </div>

                    <div className="modal-body">

                        {

                            timeline.length === 0

                                ?

                                <p>No activities found.</p>

                                :

                                timeline.map((item, index) => (

                                    <div
                                        key={index}
                                        className="border-bottom mb-3 pb-2"
                                    >

                                        <strong>

                                            {item.type}

                                        </strong>

                                        <br />

                                        {

                                            item.type === "activity"

                                                ?

                                                item.action

                                                :

                                                item.text

                                        }

                                        <br />

                                        <small>

                                            {new Date(
                                                item.createdAt
                                            ).toLocaleString()}

                                        </small>

                                    </div>

                                ))

                        }

                    </div>

                </div>

            </div>

        </div>

    );

};

export default TimelineModal;