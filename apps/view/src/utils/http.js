/*
 * Api.js
 * This module is responsible for handling all the implementations of our http Request. This module uses Axios to configure the data handling
 */

import axios from 'axios';
import tmpl from 'string-template';
import qs from 'qs';
import nProgress from 'nprogress';

class ResourceFactory extends Object {
    // Factory class that generates resource classes. This is required to produce API endpoints. Each class will have the basic endpoints it needs

    static updateDefaults(config) {
        // update the defaults by taking whatever is there and adding the new stuff to it.
        ResourceFactory.defaults = { ...this.defaults, ...config };
    }

    static createResource(endpoint, config = {}) {
        class Resource {
            static buildURL(pattern = '', data = {}) {
                let stub = tmpl(pattern, data).replace(/\/+$/, '');
                return [this.endpoint, stub].join('/').replace(/\/+$/, '');
            }

            static executeRequest(
                data = {},
                pattern = '',
                method = 'GET',
                ctx = {}
            ) {
                let url = this.buildURL(pattern, data);
                let config = { method, url };
                let key = method.toLowerCase() === 'get' ? 'params' : 'data';
                config[key] = data;
                return this.axios.request(config);
            }

            // Now implement all default methods
            static list(data = {}, ctx = {}) {
                return this.executeRequest(data, '', 'GET', ctx);
            }

            static post(data, pattern = '{id}', ctx = {}) {
                console.log(data)
                return this.executeRequest(data, pattern, 'POST', ctx);
            }
        }

        Resource.endpoint = endpoint;
        Resource.config = { ...ResourceFactory.defaults, ...config };
        Resource.axios = axios.create(Resource.config);

        // Integrating interceptors for request and response
        Resource.axios.interceptors.request.use(
            function (config) {
                nProgress.start();
                return config;
            },
            function (error) {
                nProgress.done();
                return Promise.reject(error);
            }
        );

        Resource.axios.interceptors.response.use(
            function (response) {
                nProgress.done();
                return response;
            },
            function (error) {
                nProgress.done();
                return Promise.reject(error);
            }
        );

        return Resource;
    }
}

ResourceFactory.defaults = {
    paramsSerializer: function (params) {
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
    baseURL: baseURL,
    headers: {
        'X-Request-With': 'XMLHttpRequest'
    }
};

ResourceFactory.updateDefaults(defaultConfig)
export class Send extends ResourceFactory.createResource("/send") { }
export class Emit extends ResourceFactory.createResource("/emit") { }
