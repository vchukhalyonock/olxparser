import React, { Component, createRef } from "react";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import { login as makeLogin} from "../../actions/auth";
import { connect} from "react-redux";
import { withStyles } from "@material-ui/core";

const styles = theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});


class Login extends Component {

    constructor(props) {
        super(props);
        this.loginInput = createRef();
        this.passwordInput = createRef();
    }


    loginSubmitHandler = (event) => {
        const login = this.loginInput.current.value;
        const password = this.passwordInput.current.value;
        this.props.onLogin(login, password);
        event.preventDefault();
    };

    render() {
        const { classes } = this.props;

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline>
                    <div className={classes.paper}>
                        <Typography component="h1" variant="h5">
                            Sign In
                        </Typography>
                        <form className={classes.form} noValidate onSubmit={this.loginSubmitHandler}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Login"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                inputRef={this.loginInput}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-passwords"
                                inputRef={this.passwordInput}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign In
                            </Button>
                        </form>
                    </div>
                </CssBaseline>
            </Container>
        )
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    token: state.auth.token
});

const mapDispatchToProps = dispatch => ({
    onLogin: (login, password) => {
        dispatch(makeLogin(login, password));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Login));