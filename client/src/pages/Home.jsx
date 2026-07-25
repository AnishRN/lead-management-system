import PublicLeadForm from "../components/public/PublicLeadForm";
import { Link } from "react-router-dom";

const Home = () => {

    return (

        <>

            <div className="container mt-5">


                <div className="text-center mb-5">

                    <h1>
                        Get In Touch
                    </h1>

                    <p>
                        Submit your enquiry and our team will contact you.
                    </p>

                </div>


                <PublicLeadForm />


                <div className="text-center mt-4">

                    <p>
                        Are you a staff member?
                    </p>

                    <Link
                        to="/login"
                        className="btn btn-dark"
                    >
                        Staff Login
                    </Link>

                </div>


            </div>


            <footer className="text-center mt-5">

                <p>
                    Built for Digital Heroes Training Task
                </p>

            </footer>

        </>

    );

};


export default Home;
