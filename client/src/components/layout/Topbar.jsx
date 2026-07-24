import useAuth from "../../hooks/useAuth";

const Topbar = () => {

    const { user } = useAuth();

    return (

        <header
            style={{
                height: "70px",
                background: "#ffffff",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0 30px",
                borderBottom: "1px solid #ddd"
            }}
        >

            <h3>

                Dashboard

            </h3>

            <div>

                <strong>

                    {user?.name}

                </strong>

                <p
                    style={{
                        margin: 0,
                        fontSize: "14px"
                    }}
                >

                    {user?.role}

                </p>

            </div>

        </header>

    );

};

export default Topbar;