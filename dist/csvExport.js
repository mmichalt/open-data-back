"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
class CsvExport {
    static exportCSV(filename, data) {
        fs.writeFileSync(filename, data);
    }
    static convertToCSV(items) {
        if (!items || items.length === 0) {
            return;
        }
        const separator = ',';
        const keys = Object.keys(items[0]);
        const csvContent = keys.join(separator) + '\r\n' + items.map((item) => {
            return keys.map((key) => {
                let cell = item[key] === null || item[key] === undefined ? '' : item[key];
                cell = cell instanceof Date ? cell.toLocaleDateString() : cell.toString().replace(/"/g, '""');
                return `"${cell}"`;
            }).join(separator);
        }).join('\r\n');
        return csvContent;
    }
}
exports.CsvExport = CsvExport;
//# sourceMappingURL=csvExport.js.map