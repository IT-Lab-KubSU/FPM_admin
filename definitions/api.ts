/* tslint:disable */
/* eslint-disable */
/**
 * OpenAPI definition
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import type { Configuration } from './configuration';
import type { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from './common';
import type { RequestArgs } from './base';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, BaseAPI, RequiredError } from './base';

/**
 * 
 * @export
 * @interface New
 */
export interface New {
    /**
     * 
     * @type {number}
     * @memberof New
     */
    'creationTime': number;
    /**
     * 
     * @type {number}
     * @memberof New
     */
    'id': number;
    /**
     * 
     * @type {Array<string>}
     * @memberof New
     */
    'images': Array<string>;
    /**
     * 
     * @type {boolean}
     * @memberof New
     */
    'status': boolean;
    /**
     * 
     * @type {string}
     * @memberof New
     */
    'text': string;
    /**
     * 
     * @type {string}
     * @memberof New
     */
    'title': string;
}
/**
 * 
 * @export
 * @interface NewRequest
 */
export interface NewRequest {
    /**
     * 
     * @type {Array<string>}
     * @memberof NewRequest
     */
    'images': Array<string>;
    /**
     * 
     * @type {boolean}
     * @memberof NewRequest
     */
    'status': boolean;
    /**
     * 
     * @type {string}
     * @memberof NewRequest
     */
    'text': string;
    /**
     * 
     * @type {string}
     * @memberof NewRequest
     */
    'title': string;
}
/**
 * 
 * @export
 * @interface PageNew
 */
export interface PageNew {
    /**
     * 
     * @type {Array<New>}
     * @memberof PageNew
     */
    'data': Array<New>;
    /**
     * 
     * @type {number}
     * @memberof PageNew
     */
    'limit': number;
    /**
     * 
     * @type {number}
     * @memberof PageNew
     */
    'page': number;
    /**
     * 
     * @type {number}
     * @memberof PageNew
     */
    'totalElements': number;
    /**
     * 
     * @type {number}
     * @memberof PageNew
     */
    'totalPages': number;
}

/**
 * NewsApi - axios parameter creator
 * @export
 */
export const NewsApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {NewRequest} newRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createNew: async (newRequest: NewRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'newRequest' is not null or undefined
            assertParamExists('createNew', 'newRequest', newRequest)
            const localVarPath = `/news`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(newRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteNew: async (id: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('deleteNew', 'id', id)
            const localVarPath = `/news/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getNewById: async (id: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('getNewById', 'id', id)
            const localVarPath = `/news/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {number} [limit] 
         * @param {number} [page] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getNews: async (limit?: number, page?: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/news`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (limit !== undefined) {
                localVarQueryParameter['limit'] = limit;
            }

            if (page !== undefined) {
                localVarQueryParameter['page'] = page;
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {New} _new 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateNew: async (_new: New, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter '_new' is not null or undefined
            assertParamExists('updateNew', '_new', _new)
            const localVarPath = `/news`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(_new, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * NewsApi - functional programming interface
 * @export
 */
export const NewsApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = NewsApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {NewRequest} newRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createNew(newRequest: NewRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.createNew(newRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteNew(id: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.deleteNew(id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getNewById(id: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<New>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getNewById(id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {number} [limit] 
         * @param {number} [page] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getNews(limit?: number, page?: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PageNew>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getNews(limit, page, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {New} _new 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateNew(_new: New, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.updateNew(_new, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * NewsApi - factory interface
 * @export
 */
export const NewsApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = NewsApiFp(configuration)
    return {
        /**
         * 
         * @param {NewRequest} newRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createNew(newRequest: NewRequest, options?: any): AxiosPromise<void> {
            return localVarFp.createNew(newRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteNew(id: number, options?: any): AxiosPromise<void> {
            return localVarFp.deleteNew(id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getNewById(id: number, options?: any): AxiosPromise<New> {
            return localVarFp.getNewById(id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {number} [limit] 
         * @param {number} [page] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getNews(limit?: number, page?: number, options?: any): AxiosPromise<PageNew> {
            return localVarFp.getNews(limit, page, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {New} _new 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateNew(_new: New, options?: any): AxiosPromise<void> {
            return localVarFp.updateNew(_new, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * NewsApi - object-oriented interface
 * @export
 * @class NewsApi
 * @extends {BaseAPI}
 */
export class NewsApi extends BaseAPI {
    /**
     * 
     * @param {NewRequest} newRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof NewsApi
     */
    public createNew(newRequest: NewRequest, options?: AxiosRequestConfig) {
        return NewsApiFp(this.configuration).createNew(newRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {number} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof NewsApi
     */
    public deleteNew(id: number, options?: AxiosRequestConfig) {
        return NewsApiFp(this.configuration).deleteNew(id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {number} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof NewsApi
     */
    public getNewById(id: number, options?: AxiosRequestConfig) {
        return NewsApiFp(this.configuration).getNewById(id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {number} [limit] 
     * @param {number} [page] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof NewsApi
     */
    public getNews(limit?: number, page?: number, options?: AxiosRequestConfig) {
        return NewsApiFp(this.configuration).getNews(limit, page, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {New} _new 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof NewsApi
     */
    public updateNew(_new: New, options?: AxiosRequestConfig) {
        return NewsApiFp(this.configuration).updateNew(_new, options).then((request) => request(this.axios, this.basePath));
    }
}



