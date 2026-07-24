import { NavLink } from "react-router-dom";
import { FaHome, FaUserPlus } from "react-icons/fa";

const Sidebar = () => {

    const menu = [

        {
            name: "Dashboard",
            path: "/dashboard",
            icon: <FaHome />
        },

        {
            name: "Create Lead",
            path: "/dashboard/create",
            icon: <FaUserPlus />
        }

    ];

    return (

        <aside
            style={{
                width: "240px",
                minHeight: "100vh",
                background: "#1f2937",
                color: "#fff",
                padding: "20px"
            }}
        >

            <h2
                style={{
                    marginBottom: "30px"
                }}
            >
                Lead Manager
            </h2>

            {

                menu.map((item) => (

                    <NavLink

                        key={item.path}

                        to={item.path}

                        style={({ isActive }) => ({

                            display: "flex",

                            alignItems: "center",

                            gap: "10px",

                            padding: "12px",

                            marginBottom: "10px",

                            color: "white",

                            textDecoration: "none",

                            borderRadius: "8px",

                            background: isActive
                                ? "#374151"
                                : "transparent"

                        })}

                    >

                        {item.icon}

                        {item.name}

                    </NavLink>

                ))

            }

        </aside>

    );

};

export default Sidebar;