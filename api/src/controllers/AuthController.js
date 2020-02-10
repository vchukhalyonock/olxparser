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

    /**
     * @api {post} /auth Login
     * @apiGroup Authentication
     * @apiVersion 1.0.0
     *
     * @apiParam {Object} user object with login password
     *
     * @apiHeader {String} Content-Type=application/json
     *
     * @apiParamExample {json} Request-Example:
     * {
     *     "login": "admin",
     *     "password": "admin"
     * }
     *
     * @apiSuccessExample {json} Success-Response:
     * HTTP/1.1 200 OK
     * {
     *      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImFkbWluIiwiaWF0IjoxNTgxMzI1NzYwfQ.iRLzWvxs2U_go5iKTiDu2gis9p0tbiH8F_aOtl32vxI"
     * }
     *
     * @apiErrorExample {json} Error-Response:
     * HTTP/1.1 404 Not Found
     * {
     *     "message": "Invalid login or password",
     *     "user": false
     * }
     */
    login(req, res, next) {
        passport.authenticate(
            'local',
            {session: false},
            (err, user) => {
                if(err || !user) {
                    return res.status(404).json({
                        message: 'Invalid login or password',
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
