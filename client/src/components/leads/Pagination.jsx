const Pagination = ({ pagination, onPageChange }) => {

    if (!pagination) return null;

    const pages = [];

    for (let i = 1; i <= pagination.totalPages; i++) {

        pages.push(i);

    }

    return (

        <nav className="mt-4">

            <ul className="pagination justify-content-center">

                {

                    pages.map((page) => (

                        <li
                            key={page}
                            className={`page-item ${
                                page === pagination.page
                                    ? "active"
                                    : ""
                            }`}
                        >

                            <button
                                className="page-link"
                                onClick={() => onPageChange(page)}
                            >

                                {page}

                            </button>

                        </li>

                    ))

                }

            </ul>

        </nav>

    );

};

export default Pagination;