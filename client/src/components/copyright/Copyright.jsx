import {
    Link,
    Typography
} from "@material-ui/core";
import React from "react";

export default () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://obyava.ua/">
                Obyava.UA
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}