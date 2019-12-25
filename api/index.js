import request from '@/utils/request'
import _pick from 'lodash/pick'
import _assign from 'lodash/assign'
import _isEmpty from 'lodash/isEmpty'

import {
	API_DEFAULT_CONFIG
} from '@/config/index.js'

/**
 * 自动遍历去添加 超级TMD方便啊
 * 加上自己的module 可以无限生成爽翻
 */

const modulesFiles = require.context('@/api/modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
	// set './app.js' => 'app'
	const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
	const value = modulesFiles(modulePath)
	modules[moduleName] = value.default
	return modules
}, {})


console.log(modules,"modules");

class MakeApi {
	constructor(options) {
		// 最后的返回的
		this.api = {}
		this.apiBuilder(options)
	}

	apiBuilder({
		sep = '/',
		config = {},
		debug = false
	}) {
		Object.keys(config).map(namespace => {
			this._apiSingleBuilder({
				namespace,
				sep,
				debug,
				config: config[namespace]
			})
		})
	}
	_apiSingleBuilder({
		namespace,
		sep = '/',
		config = {},
		debug = false
	}) {
		config.forEach(api => {
			const {
				name,
				desc,
				params,
				method,
				url
			} = api


			// user.js 里面名字为 logon 的接口 那名字为 user/login 请求
			Object.defineProperty(this.api, `${namespace.toLowerCase()}${sep}${name}`, {
				value(outerParams, outerOptions) {
					const _data = _isEmpty(outerParams) ? params : _pick(_assign({}, params, outerParams), Object.keys(params))
					const _options = {
						url,
						desc,
						method
					}
					return request.ajax(_assign({
						data: ''
					}, _assign(_options, outerOptions), {
						data: _data
					}))
				}
			})
		})
	}
}

export default new MakeApi({
	config: modules,
	...API_DEFAULT_CONFIG
})['api']
