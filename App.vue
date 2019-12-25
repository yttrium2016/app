<script>
import store from '@/store';
import storage from '@/utils/storage';
export default {
	onLaunch: function() {
		initAppInfo();

		console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};

function initAppInfo() {
	// 获取系统信息用于App 系统
	uni.getSystemInfo({
		success: function(e) {
			if (e && e.errMsg == 'getSystemInfo:ok') {
				store.dispatch('app/setLanguage', e.language);
				store.dispatch('app/setModel', e.model);
				store.dispatch('app/setPixelRatio', e.pixelRatio);
				store.dispatch('app/setPlatform', e.platform);
				store.dispatch('app/setScreenHeight', e.screenHeight);
				store.dispatch('app/setScreenWidth', e.screenWidth);
				store.dispatch('app/setStatusBarHeight', e.statusBarHeight);
				store.dispatch('app/setSystem', e.system);
				store.dispatch('app/setWindowBottom', e.windowBottom);
				store.dispatch('app/setWindowHeight', e.windowHeight);
				store.dispatch('app/setWindowTop', e.windowTop);
				store.dispatch('app/setWindowWidth', e.windowWidth);
				store.dispatch('app/setSafeArea', e.safeArea);
				
				// #ifndef MP
				// app
				store.dispatch('app/setStatusBar', e.statusBarHeighta);
				if (e.platform == 'android') {
					store.dispatch('app/setCustomBar', e.statusBarHeight + 50);
				} else {
					store.dispatch('app/setCustomBar', e.statusBarHeight + 45);
				}
				// #endif
				
				// #ifdef MP-WEIXIN
				// weixin小程序
				store.dispatch('app/setStatusBar', e.statusBarHeighta);
				let custom = wx.getMenuButtonBoundingClientRect();
				store.dispatch('app/setCustom', custom);
				store.dispatch('app/setCustomBar', custom.bottom + custom.top - e.statusBarHeight);
				// #endif
				
				// #ifdef MP-ALIPAY
				store.dispatch('app/setStatusBar', e.statusBarHeighta);
				store.dispatch('app/setCustomBar', e.statusBarHeight + e.titleBarHeight);
				// #endif
				
				// #ifdef H5
				store.dispatch('app/setStatusBar', e.statusBarHeight);
				// #endif
			}
		}
	});
	
	// 初始化 home类型
	store.dispatch('setting/setHomeType', 'home');
	
	
	let dbCityList = storage.get('cityList');
	if (!dbCityList || dbCityList.length == 0) {
		// 天气相关 必须要有个长兴
		let cityList = [{ cityid: 3245, parentid: 383, citycode: '101210202', city: '长兴县', index: 'Z', keyword: '长兴县ZHANGXINGXIANZXX' }];
		storage.set('cityList', cityList);
	}
}
</script>

<style>
/*每个页面公共css */
@import 'colorui/main.css';
@import 'colorui/icon.css';
@import 'colorui/animation.css';
/* 字体 */
@import 'common/font/xwlogo.scss';
@import 'common/font/happy.scss';
@import 'common/scss/common.scss';
@import 'common/scss/loading.scss';

</style>
