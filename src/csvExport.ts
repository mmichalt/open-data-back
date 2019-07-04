import generate from "csv-generate";
import * as fs from "fs";
export class CsvExport {
    public static exportCSV(filename: string, data: string): void {
        fs.writeFileSync(filename, data);
    }
    public static convertToCSV(items: any[]): string {
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
            }
        ).join('\r\n');
        return csvContent;
    }
}
