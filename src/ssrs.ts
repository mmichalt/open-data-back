// tslint:disable-next-line:no-var-requires
const ssrs = require('mssql-ssrs');
// tslint:disable-next-line:no-var-requires
const mhtml2html = require('mhtml2html');
import fs from 'fs';
import http from 'http';

import {Configuration} from "./config";

export class SSRS {
    public static f(callback: any) {
        const authHeader = 'Basic ' + Buffer.from(Configuration.ssrsAuth.username + ':'
            + Configuration.ssrsAuth.password).toString('base64');
        const header = {
            "Authorization": authHeader,
            "Content-Type": 'application/pdf'
        };
        let result = '';
        const client = http.request({
            port: 80,
            host: 'localhost',
            headers: header,
            path: '/ReportServer?/FinanceData/MasterReport&Year=2010&rc:Toolbar=false&rc:HTMLFragment=true',
            method: 'GET'
        }, (res) => {
            console.log(res.headers);
            console.log(res.statusCode);
            console.log(res.statusMessage);
            res.setEncoding('binary');
            res.on('data', (chunk) => {
                result += chunk;
            });
            res.on('end', () => callback(null, result));
        });
        client.on('error', (e) => {
            console.log(e.message);
        });
        client.end();
    }
}
