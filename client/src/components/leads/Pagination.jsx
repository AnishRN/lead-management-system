const Pagination = ({ page, totalPages, onPageChange }) => {

    if (!totalPages || totalPages <= 1) return null;

    return (

        <div className="d-flex justify-content-center mt-3">

            <button
                className="btn btn-secondary me-2"
                disabled={page === 1}
                onClick={() => onPageChange(page - 1)}
            >
                Prev
            </button>

            <span className="align-self-center">
                Page {page} of {totalPages}
            </span>

            <button
                className="btn btn-secondary ms-2"
                disabled={page === totalPages}
                onClick={() => onPageChange(page + 1)}
            >
                Next
            </button>

        </div>

    );

};

export default Pagination;