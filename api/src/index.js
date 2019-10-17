import express from 'express';

const app = express();

app.use(express.json());

app.get('/', function (req, res) {
    return res.status(200).send({message: "It works!"});
});

app.listen(3003,()=>
    console.log(`Server is listening on port 3003`));

export default app;