declare function require(name:string);
const express = require('express');
import helmet from 'helmet';
import router from './routes';
interface IgniteData {
    port: number,
}
class App {
    server:any;

    constructor() {
        this.server = express();
        this.middlewares();
        this.requestMethods();
        this.routes();
    }

    ignite(data: IgniteData) {
        this.server.listen(data.port || 3333, () => {
            console.log(`Server is running on port ${data.port}`);
        })
    }

    hooks() {

    }

    middlewares() {
        this.server.use(helmet());
        this.server.use(express.json());
    }

    requestMethods() {
        this.server.use((req,res, next) => {
            req.only = (data:string[], config:{forceError?: boolean}) => {
                let requestBody = {};
                const values = req.body;
                data.forEach(value => {
                    if(values[value]) {
                        requestBody[value] = values[value];
                    }
                    else {
                        if(config?.forceError) {
                            return new Error(`Invalid param ${value}, dont find on request`)
                        }
                    }
                })

                return requestBody;
            }
            next();
        })
    }

    routes() {
        this.server.use(router);
    }

    websockets() {

    }
}

export default new App;