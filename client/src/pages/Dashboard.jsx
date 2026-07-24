import Navbar from "../components/Navbar";

const Dashboard = () => {

    return (

        <>

            <Navbar />

            <div className="container mt-5">

                <h2>

                    Dashboard

                </h2>

                <hr />

                <div className="row">

                    <div className="col-md-3">

                        <div className="card p-4 shadow">

                            <h5>

                                Total Leads

                            </h5>

                            <h2>

                                --

                            </h2>

                        </div>

                    </div>

                    <div className="col-md-3">

                        <div className="card p-4 shadow">

                            <h5>

                                Assigned Leads

                            </h5>

                            <h2>

                                --

                            </h2>

                        </div>

                    </div>

                    <div className="col-md-3">

                        <div className="card p-4 shadow">

                            <h5>

                                New Leads

                            </h5>

                            <h2>

                                --

                            </h2>

                        </div>

                    </div>

                    <div className="col-md-3">

                        <div className="card p-4 shadow">

                            <h5>

                                Closed Leads

                            </h5>

                            <h2>

                                --

                            </h2>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );

};

export default Dashboard;