import Vue from 'vue'
import App from './App'
import store from './store'
import request from './utils/request'
import storage from './utils/storage'
import tools from './utils/tools'
import {
	showLoading,
	hideLoading,
	msg,
	success,
	hideToast,
	getDate
} from './utils/uniapp'

import tools from './api/new.js'


/**
 * 自定义的 title
 * <cu-custom bgColor="bg-brick" :isBack="true">
 * 	<block slot="backText">返回</block>
 * 	<block slot="content">设置</block>
 * </cu-custom>
 */
import cuCustom from './colorui/components/cu-custom.vue'
/**
 * Font Awesome 图标 http://www.fontawesome.com.cn/faicons/
 * <fa-icon type="home" size="22" color="#666" @click="testJS"></fa-icon>
 */
import faIcon from "@/components/fa-icon.vue"

// 设置自定义控件
Vue.component('cu-custom', cuCustom)
Vue.component('fa-icon', faIcon)

// 默认方法设置
Vue.prototype.$store = store;
Vue.prototype.$request = request;
Vue.prototype.$storage = storage;
Vue.prototype.$showLoading = showLoading;
Vue.prototype.$hideLoading = hideLoading;
Vue.prototype.$msg = msg;
Vue.prototype.$success = success;
Vue.prototype.$hideToast = hideToast;
Vue.prototype.$getDate = getDate;
Vue.prototype.$tools = tools;


Vue.prototype.newView = url => {
	uni.navigateTo({
		url: url,
		animationType: 'pop-in',
		animationDuration: 200
	});
};

Vue.prototype.toView = url => {
	uni.redirectTo({
		url: url,
		animationType: 'pop-in',
		animationDuration: 200
	});
};

Vue.prototype.backView = () => {
	uni.navigateBack({
		delta: 1
	});
};

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()

/**
 * 通用JS 时间序列化
 */
Date.prototype.Format = function(fmt) {
	let o = {
		'M+': this.getMonth() + 1, //月份
		'd+': this.getDate(), //日
		'H+': this.getHours(), //小时
		'h+': this.getHours(), //小时
		'm+': this.getMinutes(), //分
		's+': this.getSeconds(), //秒
		'q+': Math.floor((this.getMonth() + 3) / 3), //季度
		S: this.getMilliseconds() //毫秒
	}
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
	for (let k in o)
		if (new RegExp('(' + k + ')').test(fmt))
			fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
	return fmt
}
