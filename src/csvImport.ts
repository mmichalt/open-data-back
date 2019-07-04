import parse from "csv-parse/lib/sync";
import * as fs from "fs";
import {IPeriodicElement} from "./periodicElement";

export class PeriodicTable {
    public static load = () => {
        const periodicTable = fs.readFileSync("periodic_table.csv", {
            encoding: "utf-8",
            flag: "r"
        });
        return parse(periodicTable, {
            columns: true,
            skip_empty_lines: true
        }).map((element: any) => {
            return {
                name: element.Element,
                position: element.AtomicNumber,
                symbol: element.Symbol,
                weight: element.AtomicMass
            };
        });
    }
}
