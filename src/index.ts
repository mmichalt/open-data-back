import cors from "cors";
import express from "express";
import {CsvExport} from "./csvExport";
import {PeriodicTable} from "./csvImport";
import {FinanceData} from "./financeData";
import {SSRS} from "./ssrs";

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

app.get("/finance-data-overall", (req, res) => {
    SSRS.f('localhost', 80, 'FinanceData/OverallByYearReport', {}, (err: any, data: any) => {
        if (err) {
            console.log(err);
        }
        SSRS.finaliseMarkup(data, res);
    });
});

app.get("/finance-data-vis", (req, res) => {
    SSRS.f('localhost', 80, 'FinanceData/PerYearReport', {year: req.query.year}, (err: any, data: any) => {
        if (err) {
            console.log(err);
        }
        SSRS.finaliseMarkup(data, res);
    });
});

// app.get('/img', (req, res) => {
//    SSRS.chartIMG(reportImageURL, (err: any, img: any) => {
//        if (err) {
//            console.log(err);
//        }
//        const decoded = Buffer.from(Buffer.from(img, 'hex')).toString('base64');
//        res.send(decoded);
//    });
// });

app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );
