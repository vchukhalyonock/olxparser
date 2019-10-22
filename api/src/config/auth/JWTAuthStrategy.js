import passportJWT from 'passport-jwt';

export const JWT_SECRET = 'olxparser_secret';

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

export default new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: JWT_SECRET
    },
    (jwtPayload, cb) => {
        if(jwtPayload.login) {
            return cb(null, jwtPayload.login)
        } else {
            return cb({error: 'Invalid token'});
        }
    });
