import Navbar from "../components/Navbar";

import MemberTable from "../components/members/MemberTable";
import CreateMemberModal from "../components/members/CreateMemberModal";

import useUsers from "../hooks/useUsers";
import useAuth from "../hooks/useAuth";

const Members = () => {

    const { user } = useAuth();

    const {

        users,

        loading,

        error,

        addUser,

        removeUser

    } = useUsers();

    if (user?.role !== "admin") {

        return (

            <>

                <Navbar />

                <div className="container mt-5">

                    <div className="alert alert-danger">

                        You are not authorised to access this page.

                    </div>

                </div>

            </>

        );

    }

    const handleCreate = async (data) => {

        try {

            await addUser(data);

        }

        catch (error) {

            console.error(error);

        }

    };

    return (

        <>

            <Navbar />

            <div className="container mt-4">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h2>

                        Members

                    </h2>

                    <button

                        className="btn btn-success"

                        data-bs-toggle="modal"

                        data-bs-target="#createUserModal"

                    >

                        + Create Member

                    </button>

                </div>

                {

                    error && (

                        <div className="alert alert-danger">

                            {error}

                        </div>

                    )

                }

                <MemberTable

                    users={users}

                    loading={loading}

                    onDelete={removeUser}

                />

            </div>

            <CreateMemberModal

                onCreate={handleCreate}

            />

        </>

    );

};

export default Members;