import LocalStrategy from 'passport-local';
import config from '../../config';

export default new LocalStrategy({
    usernameField: 'login',
    passwordField: 'password'
}, (login, password, done) => {
    if( login.toLowerCase() === config.main.user.toLowerCase() && password === config.main.password) {
        return done(null, {login: login});
    } else {
        return done(null, false);
    }
});
