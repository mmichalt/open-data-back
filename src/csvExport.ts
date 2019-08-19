import * as fs from "fs";
import * as util from 'util';
const writeFile = util.promisify(fs.writeFile);
export class CsvExport {
    public static async exportCSV(filename: string, data: string): Promise<void> {
       await writeFile(filename, data);
    }
    public static convertToCSV(items: any[]): Promise<string> {
        return new Promise<string>((resolve, reject) => {
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
            resolve(csvContent);
        });
    }
}
