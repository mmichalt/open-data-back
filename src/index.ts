import cors from "cors";
import express from "express";
import * as fs from "fs";
import {CsvExport} from "./csvExport";
import {PeriodicTable} from "./csvImport";
import {FinanceData} from "./financeData";
const app = express();
const port = 8080;

const corsOptions = {
    origin: "http://localhost:4200"
};
app.use(cors(corsOptions));
app.get( "/", ( req, res ) => {
    res.send(PeriodicTable.load());
} );

app.get( "/financedata", ( req, res ) => {
    const data = CsvExport.convertToCSV(new FinanceData().data);
    res.send(data);
    CsvExport.exportCSV('financeData.csv', data);
} );

app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );
