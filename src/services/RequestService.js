import axios from 'axios';
import React from 'react';
import config from '../config/config';
import base64 from 'base-64';
import AppStorage from './AppStorage';
import NProgress from 'nprogress';

import ToastService from "./ToastService";
import translate from "./translate";

/**
 * Create an Axios Client with defaults
 */

const device = {
    model: 'web',
    uuid: '1234567890'
};

NProgress.configure({showSpinner: false});

class RequestService extends React.Component {
    handleSuccess = (response) => {
        return response;
    };

    handleError = (error) => {
        console.error(error);
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // this.redirectTo(document, '/')
                    break;
                case 404:
                    // this.redirectTo(document, '/404')
                    break;
                default:
                    // this.redirectTo(document, '/500')
                    break;
            }
        }
        return Promise.reject(error)
    };

    redirectTo = (document, path) => {
        document.location = path
    };

    get(path, callback) {
        let service = axios.create({
            baseURL: config.api.url,
            timeout: 30000,
            headers: {
                'Authorization': 'Basic ' + base64.encode(device.uuid + ':' + AppStorage.get('token')),
                'Content-Type': 'application/json'
            }
        });
        service.interceptors.response.use(this.handleSuccess, this.handleError);
        this.service = service;
        return this.service.get(path).then(
            (response) => callback(response.data, response.status)
        );
    }

    patch(path, payload, callback) {
        let service = axios.create({
            baseURL: config.api.url,
            timeout: 30000,
            headers: {
                'Authorization': 'Basic ' + base64.encode(device.uuid + ':' + AppStorage.get('token')),
                'Content-Type': 'application/json'
            }
        });
        service.interceptors.response.use(this.handleSuccess, this.handleError);
        this.service = service;
        return this.service.request({
            method: 'PATCH',
            url: path,
            responseType: 'json',
            data: payload
        }).then((response) => callback(response.data, response.status));
    }

    get(path, payload, callback, error, props) {
        NProgress.start(true);
        let service = axios.create({
            baseURL: config.api.url,
            timeout: 30000,
            headers: {
                'Authorization': 'Basic ' + base64.encode(device.uuid + ':' + AppStorage.get('token')),
                'Content-Type': 'application/json'
            }
        });
        service.interceptors.response.use(this.handleSuccess, this.handleError);
        this.service = service;

        return this.service.request({
            method: 'GET',
            url: path,
            responseType: 'json',
            data: payload
        }).then((response) => {
                NProgress.done();
                if (response.data.result === 0) {
                    (callback && (callback(response.data, response.status)));
                } else if (response.data.result < 0) {
                    if (response.data.result === -15) {
                        AppStorage.remove(['token', 'userInfo', 'current_filer']);
                        props && props.reAuthorize(false);
                    }
                    ToastService.error(translate.get('ERROR'), response.data.message, null, response.data.result);
                } else {
                    if (response.data.result === 15) {
                        AppStorage.remove(['token', 'userInfo', 'current_filter']);
                        props && props.reAuthorize(false);
                    }
                    (error && (error(response.data, response.status)));
                    ToastService.warn(translate.get('WARNING'), response.data.message, null, response.data.result);
                }
            }
        ).catch((error) => {
            NProgress.done();
            // Error
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log('RESPONSE', error.response);
                // console.log(error.response.status);
                // console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log('REQUEST', error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            ToastService.error('ERROR', error.message);
            console.log('REQUEST_SERVICE', error);
        });

    }

    upload(path, payload, callback) {
        NProgress.start(true);
        let service = axios.create({
            baseURL: config.api.url,
            timeout: 60000,
            headers: {
                'Authorization': 'Basic ' + base64.encode(device.uuid + ':' + AppStorage.get('token')),
                'Content-Type': 'multipart/form-data'
            }
        });
        service.interceptors.response.use(this.handleSuccess, this.handleError);
        this.service = service;

        return this.service.request({
            method: 'GET',
            url: path,
            responseType: 'json',
            data: payload
        }).then((response) => {
                NProgress.done();
                if (response.data.result === 0) {
                    (callback && (callback(response.data, response.status)))
                } else if (response.data.result < 0) {
                    if (response.data.result === -15) {
                        AppStorage.remove('token');
                        AppStorage.remove('current_filter');
                        document.location.replace('/');
                    }
                    ToastService.error(translate.get('ERROR'), response.data.message, null, response.data.result);
                } else {
                    ToastService.warn(translate.get('WARNING'), response.data.message, null, response.data.result);
                }
            }
        ).catch((error) => {
            NProgress.done();
            // Error
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // console.log(error.response.status);
                // console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log('REQUEST', error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            ToastService.error('ERROR', error.message);
        });
    }
}


export default new RequestService();