import React, { useState, useEffect } from "react";

import API from "../api";

const useTags = () => {
    const [tags, setTags] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const getTags = async () => {
            setLoading(true);
            await API.getTopic()
                .then((res) => {
                    setTags(res.data);
                })
                .catch((error) => console.log(error));
            setLoading(false);
        };
        getTags();
    }, []);

    return { tags, loading };
};

export default useTags;
