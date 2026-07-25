const leadStatusColor = (status) => {

    switch (status) {

        case "New":

            return "primary";

        case "Contacted":

            return "info";

        case "Qualified":

            return "success";

        case "Proposal Sent":

            return "warning";

        case "Closed":

            return "dark";

        case "Lost":

            return "danger";

        default:

            return "secondary";

    }

};

export default leadStatusColor;