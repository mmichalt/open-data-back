"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const sync_1 = __importDefault(require("csv-parse/lib/sync"));
const fs = __importStar(require("fs"));
class PeriodicTable {
}
PeriodicTable.load = () => {
    const periodicTable = fs.readFileSync("periodic_table.csv", {
        encoding: "utf-8",
        flag: "r"
    });
    return sync_1.default(periodicTable, {
        columns: true,
        skip_empty_lines: true
    }).map((element) => {
        return {
            name: element.Element,
            position: element.AtomicNumber,
            symbol: element.Symbol,
            weight: element.AtomicMass
        };
    });
};
exports.PeriodicTable = PeriodicTable;
//# sourceMappingURL=csvImport.js.map