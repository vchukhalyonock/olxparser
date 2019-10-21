import config from '../config';
import mongoose from 'mongoose';

const { host, port, dbname, user, password} = config.mongodb;
const mongoConnectionString = `mongodb://${host}:${port}/${dbname}`;
mongoose.connect(mongoConnectionString,
    {
        useNewUrlParser: true,
        user: user,
        pass: password
    });

mongoose.Promise = global.Promise;

export default mongoose.connection;

