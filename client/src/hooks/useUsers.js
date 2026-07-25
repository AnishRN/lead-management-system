import { useEffect, useState } from "react";

import { getUsers } from "../api/userApi";

const useUsers = () => {

    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    // Declare BEFORE useEffect
    const loadUsers = async () => {

        try {

            setLoading(true);

            const { data } = await getUsers();

            setUsers(data.users);

            setError(null);

        }

        catch (err) {

            setError(

                err.response?.data?.message ||

                "Unable to fetch users."

            );

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadUsers();

    }, []);

    return {

        users,

        loading,

        error,

        reload: loadUsers

    };

};

export default useUsers;