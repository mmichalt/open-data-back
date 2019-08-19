import * as express from 'express';
import {CsvExport} from "./csvExport";
import {PeriodicTable} from "./csvImport";
import {FinanceData} from "./financeData";
import {SSRS} from "./ssrs";
export const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const periodic = await PeriodicTable.load();
        res.send(periodic);
    } catch (e) {
        console.error(e);
    }
});

router.get('/financedata', async (req, res) => {
    try {
        const data = await CsvExport.convertToCSV(new FinanceData().data);
        res.send(data);
        await CsvExport.exportCSV('financeData.csv', data);
    } catch (e) {
        console.error(e);
    }
});

router.get('/finance-data/:year', async (req, res) => {
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
