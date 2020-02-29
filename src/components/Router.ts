import { Router as ExpressRouter } from 'express';
import { resolve } from 'path';
declare function require(name:string);
interface Route {
    path: string,
    callback: any,
    method: string,
    middleware: string[]
}
class Router{
    routes: Route[];
    lastRouteMiddlewares: any[];
    constructor() {
        this.routes = [];
        this.lastRouteMiddlewares = [];
    }

    get(path: string, middleware: string[], callback: any){
        let realCallback:any;
        if(typeof(callback) == 'string') {
            const callbackSplited = callback.split('.');
            if(callbackSplited.length !== 2) {
                throw new Error(`Invalid callback for route ${path}, callback needs to look like IndexController.index `);
            }
            else {
                realCallback = require(resolve(__dirname, '..', 'app', 'controllers', callbackSplited[0]))[callbackSplited[1]];
            }
        }
        else {
            throw new Error(`Invalid callback for route ${path}, callback needs to look like IndexController.index `);
        }
        this.routes.push({
            path,
            method: 'GET',
            callback: realCallback,
            middleware
        })
    }

    post(path: string, middleware: string[], callback: any){
        let realCallback:any;
        if(typeof(callback) == 'string') {
            const callbackSplited = callback.split('.');
            if(callbackSplited.length !== 2) {
                throw new Error(`Invalid callback for route ${path}, callback needs to look like IndexController.index `);
            }
            else {
                realCallback = require(resolve(__dirname, '..', 'app', 'controllers', callbackSplited[0]))[callbackSplited[1]];
            }
        }
        else {
            throw new Error(`Invalid callback for route ${path}, callback needs to look like IndexController.index `);
        }
        this.routes.push({
            path,
            method: 'POST',
            callback,
            middleware
        })
    }

    put(path: string, middleware: string[], callback: any){
        let realCallback:any;
        if(typeof(callback) == 'string') {
            const callbackSplited = callback.split('.');
            if(callbackSplited.length !== 2) {
                throw new Error(`Invalid callback for route ${path}, callback needs to look like IndexController.index `);
            }
            else {
                realCallback = require(resolve(__dirname, '..', 'app', 'controllers', callbackSplited[0]))[callbackSplited[1]];
            }
        }
        else {
            throw new Error(`Invalid callback for route ${path}, callback needs to look like IndexController.index `);
        }
        this.routes.push({
            path,
            method: 'PUT',
            callback,
            middleware
        })
    }

    patch(path: string, middleware: string[], callback: any){
        let realCallback:any;
        if(typeof(callback) == 'string') {
            const callbackSplited = callback.split('.');
            if(callbackSplited.length !== 2) {
                throw new Error(`Invalid callback for route ${path}, callback needs to look like IndexController.index `);
            }
            else {
                realCallback = require(resolve(__dirname, '..', 'app', 'controllers', callbackSplited[0]))[callbackSplited[1]];
            }
        }
        else {
            throw new Error(`Invalid callback for route ${path}, callback needs to look like IndexController.index `);
        }
        this.routes.push({
            path,
            method: 'PATCH',
            callback,
            middleware
        })
    }

    delete(path: string, middleware: string[] , callback: any){
        let realCallback:any;
        if(typeof(callback) == 'string') {
            const callbackSplited = callback.split('.');
            if(callbackSplited.length !== 2) {
                throw new Error(`Invalid callback for route ${path}, callback needs to look like IndexController.index `);
            }
            else {
                realCallback = require(resolve(__dirname, '..', 'app', 'controllers', callbackSplited[0]))[callbackSplited[1]];
            }
        }
        else {
            throw new Error(`Invalid callback for route ${path}, callback needs to look like IndexController.index `);
        }
        if(typeof(callback) == 'string') {
            const callbackSplited = callback.split('.');
            if(callbackSplited.length !== 2) {
                return new Error('Route callback is not valid');
            }
        }
        else {
            throw new Error(`Invalid callback for route ${path}`);
        }
        this.routes.push({
            path,
            method: 'DELETE',
            callback,
            middleware
        })
    }

    ignite() {
        const expressRouter = ExpressRouter();
        this.routes.forEach(route => {
            route.middleware.forEach(middleware => {
                const path = resolve(__dirname, '..', 'app', 'middlewares', middleware);
                const middlewareRequest = require(path)['ignite'];
                this.lastRouteMiddlewares.push(middlewareRequest);
            })
            expressRouter[route.method.toLowerCase()](route.path, this.lastRouteMiddlewares, route.callback);
            this.lastRouteMiddlewares = [];
        })
        
        return expressRouter;
    }
}

export default new Router;