import React, { Component } from "react";
import ListItemLink from "../../listItemLink";
import {
    ListItem,
    ListItemIcon,
    ListItemText
} from "@material-ui/core";
import { object } from 'prop-types';
import { menuClick } from "../../../actions/menu";
import { connect } from "react-redux";

class MenuItem extends Component {
    menuClick = () => {
        const { item } = this.props;
        this.props.onMenuClick(item.name);
    };

    render() {
        const { item } = this.props;
        return (
            <ListItem
                to={item.path}
                button
                component={ListItemLink}
                onClick={this.menuClick}
            >
                <ListItemIcon>
                    {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name}/>
            </ListItem>
        );
    }
}

MenuItem.propTypes = {
    item: object.isRequired
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    onMenuClick: (title) => {
        dispatch(menuClick(title));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuItem);