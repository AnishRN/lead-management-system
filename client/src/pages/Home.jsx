import { Link } from "react-router-dom";

import PublicLeadForm from "../components/public/PublicLeadForm";

const Home = () => {

    return (

        <div
            className="bg-light py-5"
            style={{
                minHeight: "100vh"
            }}
        >

            <div className="container">

                <div className="row justify-content-center">

                    <div className="col-lg-7 col-md-9">

                        <div className="text-center mb-4">

                            <h1 className="fw-bold">

                                Lead Management System

                            </h1>

                            <p className="text-muted">

                                Interested in our services? Fill out the enquiry form below and our team will contact you shortly.

                            </p>

                        </div>

                        <PublicLeadForm />

                        <div className="text-center mt-4">

                            <Link
                                to="/login"
                                className="btn btn-outline-dark"
                            >

                                Staff Login

                            </Link>

                        </div>

                        <footer className="text-center mt-5 small text-muted">

                            Built for{" "}

                            <a
                                href="https://digitalheroesco.com"
                                target="_blank"
                                rel="noreferrer"
                            >

                                Digital Heroes Training Task

                            </a>

                        </footer>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default Home;