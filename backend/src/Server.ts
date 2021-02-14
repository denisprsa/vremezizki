import {GlobalAcceptMimesMiddleware, ServerLoader, ServerSettings} from '@tsed/common';
import "@tsed/swagger"; 
import WebSocket, { Server as WSServer } from 'ws'; 

import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import compress from 'compression';
import methodOverride from 'method-override';
import * as Path from 'path';
import DependencyService from './services/DependencyService';
import { WeatherStationData } from './interfaces/WeatherStationData';
import GlobalErrorHandlerMiddleware from './middlewares/GlobalErrorHandlerMiddleware';

const rootDir: string = Path.resolve(__dirname);
const dependencyService: DependencyService = DependencyService.createInstance();

@ServerSettings({
    mount: {
        '/': `${rootDir}/controllers/*.ts`
    },
    componentsScan: [
        `${rootDir}/services/**/**.ts`,
        `${rootDir}/middlewares/**/**.ts`
    ],
    swagger: [
        {
            path: "/api-docs"
        }
    ],
    httpPort: process.env.PORT || 3009,
    httpsPort: false,
    rootDir,
    acceptMimes: ['application/json']
})
export class Server extends ServerLoader {

    /**
     * This method let you configure the express middleware required by your application to works.
     *
     */
    public async $beforeRoutesInit(): Promise<any> {
        await dependencyService.mySqlDatabase.initialize();

        this.use(GlobalAcceptMimesMiddleware)
            .use(cookieParser())
            .use(compress({}))
            .use(methodOverride())
            .use(bodyParser.json())
            .use(bodyParser.urlencoded({
                extended: true
            }));
    }

    /**
     * This function is fired when server is up and running
     *
     */
    public $onReady(): void | Promise<any> {
        const wss = new WSServer({
            server: this.httpServer
        });

        wss.on('connection',  (ws: WebSocket) => {
            let id = Math.random().toString();
            dependencyService.connectedWebSockets.set(id, ws);

            ws.on('close', () => {
                dependencyService.connectedWebSockets.delete(id);
            });
        });
    }

    public async $afterRoutesInit(): Promise<void> {
        this.use(GlobalErrorHandlerMiddleware);
    }

}

let temperature = 20;

function getRandomArbitrary(min: number, max: number): number {
    return Number((Math.random() * (max - min) + min).toFixed(1));
}  

function getGeneratedWeatherData(): WeatherStationData {
    temperature -= 0.3;
    return {
        temperature: temperature,
        dewpoint: getRandomArbitrary(-10, 0),
        humidity: getRandomArbitrary(40, 99),
        windDirection: getRandomArbitrary(0, 359),
        windGusts: getRandomArbitrary(0, 99),
        windNormal: getRandomArbitrary(0, 40),
        pressure: getRandomArbitrary(990, 1030),
        rain: Math.random(),
        datetime: new Date().toISOString()
    }
}
