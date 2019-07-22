import http from 'http';
import {Configuration} from "./config";

export class SSRS {
    public static f(host: string, port: number, reportURL: string, parameters: {[key: string]: any}) {
        return new Promise((resolve, reject) => {
            const authHeader = 'Basic ' + Buffer.from(Configuration.ssrsAuth.username + ':'
                + Configuration.ssrsAuth.password).toString('base64');
            const header = {
                "Authorization": authHeader,
                "Content-Type": 'application/html'
            };
            let result = '';
            let parameterString = '';
            Object.keys(parameters).forEach((el) => {
                parameterString += `&${el}=${String(parameters[el])}`;
            });
            const client = http.request({
                port,
                host,
                headers: header,
                path: `/ReportServer?/${reportURL}${parameterString}&rc:Toolbar=false&rc:HTMLFragment=true`,
                method: 'GET'
            }, (res) => {
                res.setEncoding('binary');
                res.on('data', (chunk) => {
                    result += chunk;
                });
                res.on('end', () => {
                    resolve(result);
                });
            });
            client.on('error', (e) => {
                console.log(e.message);
                reject();
            });
            client.end();
        });
    }
    public static chartIMG(url: string) {

        return new Promise((resolve, reject) => {
            const authHeader = 'Basic ' + Buffer.from(Configuration.ssrsAuth.username + ':'
                + Configuration.ssrsAuth.password).toString('base64');
            const header = {
                "Authorization": authHeader,
                "Content-Type": 'application/html'
            };
            let result = '';
            const client = http.request({
                port: 80,
                host: 'localhost',
                headers: header,
                path: url,
                method: 'POST'
            }, (res) => {
                res.setEncoding('hex');
                res.on('data', (chunk) => {
                    result += chunk;
                });
                res.on('end', () => {
                    resolve(result);
                });
            });
            client.on('error', (e) => {
                console.log(e.message);
                reject();
            });
            client.end();
        });
    }
    public static async finaliseMarkup(data: string, res: any) {
        try {
            const reportImageURL = data.match(/src="http:\/\/([^\\"]|\\")*"/)[0].slice(21, -1);
            let img = await SSRS.chartIMG(reportImageURL);
            img = Buffer.from(Buffer.from(img as string, 'hex')).toString('base64');
            data = data.replace(data.match(/src="http:\/\/([^\\"]|\\")*"/)[0],
                `src="data:image/png;base64,${img}"`);
            return data;
        } catch (e) {
            console.error(e);
        }
    }
}
