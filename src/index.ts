import cors from "cors";
import express from "express";
import {router} from './routes';

const app = express();
const port = 8080;

const corsOptions = {
    origin: "http://localhost:4200"
};

app.use(cors(corsOptions));
app.use('/', router);

app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );
