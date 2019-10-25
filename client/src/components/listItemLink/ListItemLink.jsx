import React from "react";
import { Link } from "react-router-dom";
import { string } from "prop-types";

const ListItemLink = React.forwardRef((props, ref) => <Link {...props}/>);

ListItemLink.propTypes = {
    to: string.isRequired
};

export default ListItemLink;
