import express from 'express';
import bodyParser from 'body-parser';
import middlewares from './middlewares';
import { initControllers } from './controllers';

const app = express();
const router = express.Router();
const {
    notFoundMiddleware,
    errorMiddleware
} = middlewares;


app.use(express.urlencoded({ limit: '200mb', extended: true, parameterLimit: 200000 }));
app.use(bodyParser.json({ limit: '24mb' }));

app.use(router);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

initControllers(router);

app.listen(3003,()=>
    console.log(`Server is listening on port 3003`));

export default app;