import jwt from 'jsonwebtoken';
import passport from 'passport';
import Controller, { VERB } from '../core/Controller';

import { JWT_SECRET } from '../config/auth/JWTAuthStrategy';

class AuthController extends Controller {
    get routes() {
        return [
            {
                route: '/auth',
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
                    return res.status(400).json({
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
