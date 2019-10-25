import jwt from 'jsonwebtoken';
import passport from 'passport';
import Controller, { VERB } from '../core/Controller';

import { JWT_SECRET } from '../config/auth/JWTAuthStrategy';
import { AUTH_URL } from "../constants/urls";

class AuthController extends Controller {
    get routes() {
        return [
            {
                route: AUTH_URL,
                verb: VERB.POST,
                public: true,
                handler: this.login
            }
        ]
    }

    login(req, res, next) {
        passport.authenticate(
            'local',
            {session: false},
            (err, user) => {
                if(err || !user) {
                    return res.status(404).json({
                        message: 'Invalid login or user',
                        user: user
                    });
                }

                req.login(user, {session: false}, (err) => {
                    if(err) {
                        res.send(err);
                    }

                    const token = jwt.sign(user, JWT_SECRET);
                    return res.json({token: token});
                })
        })(req, res);
    }
}

export default new AuthController();
