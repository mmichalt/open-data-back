import parse from "csv-parse/lib/sync";
import * as fs from "fs";
import {PeriodicElement} from "./periodicElement";
export class PeriodicTable {
    public static load = () => {
        return new Promise ((resolve, reject) => {
            const periodicTable = fs.readFileSync("periodic_table.csv", {
                encoding: "utf-8",
                flag: "r"
            });
            resolve(parse(periodicTable as string, {
                columns: true,
                skip_empty_lines: true
            }).map((element: any) => {
                return new PeriodicElement(
                    element.Element,
                    element.AtomicNumber,
                    element.Symbol,
                    element.AtomicMass
                );
            }));
        });
    }
}
