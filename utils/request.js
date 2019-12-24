import {
	AJAX_DEFAULT_CONFIG
} from '@/config/index.js'

import {
	reqInterceptors,
	resInterceptors
} from '@/interceptors/index.js'

/**
 * 原生虽然好 功能不够 我就自己封装一下吧
 * 有参考网上封装
 * 结合自己需求封装
 * 作者:杨振宇
 */
class Request {
	constructor(config = {}) {
		this.config = {};
		this.config.baseUrl = config.baseUrl ? config.baseUrl : '';
		this.config.dataType = config.dataType ? config.dataType : 'json';
		this.config.responseType = config.responseType ? config.responseType : 'text';
		this.config.header = config.header ? config.header : {};
		this.reqInterceptors = null;
		this.resInterceptors = null;
		this.interceptors = {
			request: fn => {
				this.reqInterceptors = fn;
			},
			response: fn => {
				this.resInterceptors = fn;
			}
		}
	}
	async ajax(config = {}) {
		return this._request(config);
	}
	async get(config = {}) {
		return this._request(config, "GET");
	}
	async post(config = {}) {
		return this._request(config, "POST");
	}

	setConfig(config = {}) {
		this.config = this._deepCopy(this._merge(this.config, config));
	}
	getConfig() {
		return this.config;
	}
	_request(config, method) {
		const _this = this;
		let temp = this._deepCopy(this._merge(this.config, config));
		let lastConfig = {};
		if (this.reqInterceptors && typeof this.reqInterceptors === 'function') {
			// 有请求拦截器
			let reqInterceptors = this.reqInterceptors(temp);
			if (!reqInterceptors) {
				//返回false
				console.warn('请求被拦截。')
				return false;
			} else if (Object.prototype.toString.call(reqInterceptors) === "[object Promise]") {
				// 返回了一个Promise对象
				return reqInterceptors;
			}
			lastConfig = this._deepCopy(reqInterceptors);
		} else {
			lastConfig = this._deepCopy(temp);
		}
		let fullUrl = '';
		if (lastConfig.url.indexOf('http://') != -1 || lastConfig.url.indexOf('https://') != -1) {
			fullUrl = lastConfig.url;
		} else {
			fullUrl = lastConfig.baseUrl + lastConfig.url;
		}

		if (method && typeof method == 'string') {
			switch (method.toUpperCase()) {
				case 'GET':
					lastConfig.method = 'GET';
					break
				case 'POST':
					lastConfig.method = 'POST';
					break
			}
		}

		if (lastConfig.method.toUpperCase() == 'POST') {
			lastConfig.header['content-type'] = 'application/x-www-form-urlencoded'
		}

		return new Promise((resolve, reject) => {
			uni.request({
				url: fullUrl,
				method: lastConfig.method,
				data: lastConfig.data ? lastConfig.data : {},
				header: lastConfig.header,
				dataType: lastConfig.dataType,
				responseType: lastConfig.responseType,
				async complete(response) {
					let res = response;
					if (_this.resInterceptors && typeof _this.resInterceptors === 'function') {
						let resInterceptors = _this.resInterceptors(res);
						if (!resInterceptors) {
							reject('返回值已被您拦截！');
							return;
						} else if (Object.prototype.toString.call(resInterceptors) === "[object Promise]") {
							try {
								let promiseRes = await resInterceptors;
								resolve(promiseRes)
							} catch (error) {
								reject(error)
							}
						} else {
							res = resInterceptors;
						}
					}
					resolve(res);
				}
			});
		})
	}
	_merge(oldConfig, newConfig) {
		let retultConfig = this._deepCopy(oldConfig);
		if (!newConfig || !Object.keys(newConfig).length) return retultConfig;
		for (let key in newConfig) {
			if (key === 'header') {
				if (Object.prototype.toString.call(newConfig[key]) === '[object Object]') {
					for (let objKey in newConfig[key]) {
						retultConfig[key][objKey] = newConfig[key][objKey];
					}
				}
			} else {
				retultConfig[key] = newConfig[key];
			}
		}
		return retultConfig;
	}
	_deepCopy(obj) {
		let result = Array.isArray(obj) ? [] : {};
		for (let key in obj) {
			if (obj.hasOwnProperty(key)) {
				if (typeof obj[key] === 'object') {
					result[key] = this._deepCopy(obj[key]);
				} else {
					result[key] = obj[key];
				}
			}
		}
		return result;
	}
}

let request = new Request(AJAX_DEFAULT_CONFIG)
request.interceptors.request(reqInterceptors);
request.interceptors.response(resInterceptors);

export default request;
