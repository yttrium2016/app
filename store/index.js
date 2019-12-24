import Vue from 'vue'
import Vuex from 'vuex'
import module from './module'

const modulesFiles = require.context('./modules', true, /\.js$/)

// 转化
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
	// set './app.js' => 'app'
	const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
	const value = modulesFiles(modulePath)
	modules[moduleName] = module(value.default)
	return modules
}, {})

Vue.use(Vuex)

const store = new Vuex.Store({
	modules
})

export default store
