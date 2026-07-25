import { useState, useEffect, useCallback } from "react";

import { getUsers } from "../api/userApi";

const useUsers = () => {

    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    const fetchUsers = useCallback(async () => {

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

    }, []);

    useEffect(() => {

        fetchUsers();

    }, [fetchUsers]);

    return {

        users,

        loading,

        error,

        fetchUsers

    };

};

export default useUsers;