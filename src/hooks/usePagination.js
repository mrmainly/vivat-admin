import { useState } from "react";

const usePagination = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState();

    const handlePage = (value) => {
        setCurrentPage(value);
    };

    const getTotalPage = (value) => {
        setTotalPage(value);
    };

    return {
        currentPage,
        totalPage,
        handlePage,
        getTotalPage,
    };
};

export default usePagination;
