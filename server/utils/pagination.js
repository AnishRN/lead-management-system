const getPagination = (page, limit) => {


    const currentPage = Number(page) || 1;

    const perPage = Number(limit) || 10;


    const skip = (currentPage - 1) * perPage;


    return {

        page: currentPage,

        limit: perPage,

        skip

    };

};


module.exports = getPagination;