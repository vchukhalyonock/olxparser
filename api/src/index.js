import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import cors from 'cors';
import schedule from "node-schedule";
import middlewares from './middlewares';
import { initControllers } from './controllers';
import LocalAuthStrategy from './config/auth/LocalAuthStrategy';
import JWTAuthStrategy from './config/auth/JWTAuthStrategy';
import OfferService from "./services/OfferService";

const app = express();
const router = express.Router();
const {
    notFoundMiddleware,
    errorMiddleware
} = middlewares;

passport.use('local', LocalAuthStrategy);
passport.use('jwt', JWTAuthStrategy);

app.use(cors());
app.use(express.urlencoded({ limit: '200mb', extended: true, parameterLimit: 200000 }));
app.use(bodyParser.json({ limit: '24mb' }));

app.use(router);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

initControllers(router);

app.listen(3003,()=>
    console.log(`Server is listening on port 3003`));

const scheduleJob = schedule.scheduleJob('*/5 * * * *', async () => {
    console.log("Schedule Job: Export offers to Call center");
    await OfferService.exportToCallCenter();
});
//scheduleJob.cancel(); //temporary stop

export default app;