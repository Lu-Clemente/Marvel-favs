import axios from 'axios';
import config from "../../../config";

var md5 = require('md5');

const server = "http://gateway.marvel.com:80/v1/public/";
var ts = new Date().getTime().toString();
var hash = md5(`${ts}${config.PRIV_KEY}${config.PUBLIC_KEY}`).toString();

export const header = {
    ts: ts,
    apikey: config.PUBLIC_KEY,
    hash: hash as string
};

const api = axios.create({
    baseURL: server,
    timeout: 10000,
});

export const sendGetRequestFilterName = async (path: string, name: string) => await api.get(`${server}${path}?name=${name}&ts=${ts}&apikey=${config.PUBLIC_KEY}&hash=${hash}`);

export const sendGetRequestFilterId = async (path: string, id: number) => await api.get(`${server}${path}?id=${id}&ts=${ts}&apikey=${config.PUBLIC_KEY}&hash=${hash}`);

export const sendGetRequest = async (path: string) => await api.get(`${server}${path}?ts=${ts}&apikey=${config.PUBLIC_KEY}&hash=${hash}`);

export const sendGetRequestPages = async (path: string, offset: number, limit: number) => await api.get(`${server}${path}?ts=${ts}&apikey=${config.PUBLIC_KEY}&hash=${hash}&offset=${offset}&limit=${limit}`);

export default api;