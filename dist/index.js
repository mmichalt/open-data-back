"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const csvExport_1 = require("./csvExport");
const csvImport_1 = require("./csvImport");
const financeData_1 = require("./financeData");
const app = express_1.default();
const port = 8080;
const corsOptions = {
    origin: "http://localhost:4200"
};
app.use(cors_1.default(corsOptions));
app.get("/", (req, res) => {
    res.send(csvImport_1.PeriodicTable.load());
});
app.get("/financedata", (req, res) => {
    const data = csvExport_1.CsvExport.convertToCSV(new financeData_1.FinanceData().data);
    res.send(data);
    csvExport_1.CsvExport.exportCSV('financeData.csv', data);
});
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map