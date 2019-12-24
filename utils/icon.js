const modulesFiles = require.context('../static/img/account/icon', true, /\.png$/)

// 转化
let iconNames = [];
modulesFiles.keys().reduce((modules, modulePath) => {
	const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
	iconNames.push(moduleName)
}, {})

export default iconNames;