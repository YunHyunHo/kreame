import axios from "axios";

const DEFAULT_SERVER_URL = 'http://localhost:8080';
const DEFAULT_ACCESS_KEY = 'N4gdubumGsrvzFFzewu4hQ==';

export const setDefaultAxios = () => {
    console.log("setting axios defaults...");
    axios.defaults.url = DEFAULT_SERVER_URL;
    axios.defaults.headers.common['Access-Control-Allow-Credentials'] = true;
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    axios.defaults.headers.common['Access-Control-Expose-Headers'] = '*';
    console.log("setting axios defaults done");
}

const authFunction = async (token, setToken) => {
    return new Promise((resolve, reject) => {
        axios.get(DEFAULT_SERVER_URL + '/api/auth', {
            params: {
                key: DEFAULT_ACCESS_KEY
            }
        }).then((res) => {
            if (res.data.status === 'OK') {
                setToken(res.data.data.key);
                resolve(res)
            } else {
                reject(res)
            }
        })
    })
}

export const axiosGetFunction = async (url, token, setToken) => {
    const config = {};
    config.headers = {
        contentType: 'application/x-www-form-urlencoded',
        authorization: 'bearer ' + token
    }
    return new Promise((resolve, reject) => {
        axios.get(DEFAULT_SERVER_URL + url, config).then(async (res) => {
            if (res.data.status === 'UNAUTHORIZED') {
                await authFunction(token, setToken).then(() => {
                    config.authorization = 'bearer ' + token;
                    axios.get(DEFAULT_SERVER_URL + url, config).then((res1) => {
                        resolve(res1)
                    })
                })
            } else if (res.data.status === 'OK') {
                resolve(res);
            } else {
                reject(res);
            }
        })
    })
}

export const axiosPostFunction = async (url, formData, hasFile, token, setToken) => {
    const config = {};
    config.headers = {
        contentType: 'application/x-www-form-urlencoded',
        authorization: 'bearer ' + token
    }
    if (hasFile === true) {
        config.headers.contentType = 'multipart/form-data'
    }
    console.log(config);
    return new Promise((resolve, reject) => {
        axios.post(DEFAULT_SERVER_URL + url, formData, config).then(async (res) => {
            if (res.data.status === 'UNAUTHORIZED') {
                await authFunction(token, setToken).then(() => {
                    console.log(config)
                    config.headers['authorization'] = 'bearer ' + token;
                    axios.post(DEFAULT_SERVER_URL + url, formData, config).then((res2) => {
                        resolve(res2);
                    })
                })
            } else if (res.data.status === 'OK') {
                resolve(res);
            } else {
                reject(res);
            }
        }).catch((reject) => {
            console.log(reject);
        })
    })
}
