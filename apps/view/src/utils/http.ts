import { AxiosInstance } from 'axios';
/*
 * Api.js
 * This module is responsible for handling all the implementations of our http Request. This module uses Axios to configure the data handling
 */

import axios from 'axios';
import tmpl from 'string-template';
import qs from 'qs';
import nProgress from 'nprogress';

class HttpAdapter extends Object {
    static defaults: any;

    static updateDefaults(config: { baseURL: string | undefined; headers: { 'X-Request-With': string; }; }) {
        const baseURL = process.env.REACT_APP_PROXY_URL;
        HttpAdapter.defaults = { ...this.defaults, ...config, baseURL };
    }

    static createResource(endpoint: string, config = {}) {
        class Resource {
            static endpoint: string;
            static axios: AxiosInstance;
            static config: any;
            static buildURL(pattern = '', data = {}) {
                let stub = tmpl(pattern, data).replace(/\/+$/, '');
                const route = this.endpoint.replace(/\/+$/, '');
                console.log(baseURL, "versus", this.endpoint, "and", route)
                return [`${baseURL}${route}`, stub].join('/').replace(/\/+$/, '');
            }

            static executeRequest(
                data = {},
                pattern = '',
                method = 'GET',
                ctx = {}
            ) {
                let url = this.buildURL(pattern, data);
                console.log(url)
                let config: any = { method, url };
                let key = method.toLowerCase() === 'get' ? 'params' : 'data';
                config[key] = data;
                return this.axios.request(config);
            }

            // Now implement all default methods
            static list(data = {}, ctx = {}) {
                return this.executeRequest(data, '', 'GET', ctx);
            }

            static post(data: {} | undefined, pattern = '{id}', ctx = {}) {
                return this.executeRequest(data, pattern, 'POST', ctx);
            }
            static emit(data: {} | undefined, pattern = 'emit', ctx = {}) {
                return this.executeRequest(data, pattern, 'POST', ctx);
            }

            static send(data: {} | undefined, pattern = 'send', ctx = {}) {
                return this.executeRequest(data, pattern, 'POST', ctx);
            }
        }

        Resource.endpoint = endpoint;
        Resource.config = { ...HttpAdapter.defaults, ...config };
        Resource.axios = axios.create(Resource.config);

        // console.log(Resource.config)
        // Integrating interceptors for request and response
        Resource.axios.interceptors.request.use(
            function (config: any) {
                nProgress.start();
                return config;
            },
            function (error: any) {
                nProgress.done();
                return Promise.reject(error);
            }
        );

        Resource.axios.interceptors.response.use(
            function (response: any) {
                nProgress.done();
                return response;
            },
            function (error: any) {
                nProgress.done();
                return Promise.reject(error);
            }
        );

        return Resource;
    }
}

HttpAdapter.defaults = {
    paramsSerializer: function (params: any) {
        return qs.stringify(params, {
            arrayFormat: 'brackets',
            skipNulls: true,
            indices: false,
            encode: false,
        });
    },
};
const baseURL = process.env.REACT_APP_PROXY_URL;
const defaultConfig = {
    baseURL,
    headers: {
        'X-Request-With': 'XMLHttpRequest'
    }
};

HttpAdapter.updateDefaults(defaultConfig)
export class RequestProxy extends HttpAdapter.createResource("/") { }