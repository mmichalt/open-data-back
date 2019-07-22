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

app.get("/finance-data/:year", async (req, res) => {
    try {
        let reportUrl: string;
        let yearParam: any;
        if (req.params.year === 'all') {
            reportUrl = 'FinanceData/OverallByYearReport';
            yearParam = {};
        } else {
            reportUrl = 'FinanceData/PerYearReport';
            yearParam = {year: req.params.year};
        }
        const report = await SSRS.f('localhost', 80, reportUrl, yearParam);
        const finalizedMarkup = await SSRS.finaliseMarkup(report as string, res);
        res.send(finalizedMarkup);
    } catch (e) {
        console.error(e);
    }
});

app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );
