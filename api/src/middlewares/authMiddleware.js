import passport from 'passport';


export default (req, res, next) => {
    passport.authenticate(
        'jwt',
        {session: false},
        (err, user) => {
           if(err || !user) {
               return res.status(400).json({
                   message: 'Invalid token',
                   user: user
               });
           } else {
               next();
           }
        })(req, res);
};
