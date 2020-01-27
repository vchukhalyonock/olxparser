import React from "react";
import { func } from "prop-types";
import {
    OutlinedInput,
    InputAdornment,
    Grid
} from "@material-ui/core";
import {
    Search as SearchIcon
} from "@material-ui/icons";


const Search = (props) => {
    const { onChange } = props;
    return (
        <Grid item xs={4}>
            <OutlinedInput
                id="search"
                label="Search"
                type="search"
                fullWidth={true}
                startAdornment={<InputAdornment position="start"><SearchIcon/></InputAdornment>}
                onChange={onChange}
            />
        </Grid>
    );
};

Search.propTypes = {
    onChange: func.isRequired
};

export default Search;

