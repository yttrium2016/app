export default [{
		name: 'english',
		method: 'POST',
		desc: '英语',
		// #ifdef MP-WEIXIN
		url: 'https://wx.yttrium2016.cn/cors/m-english',
		// #endif
		// #ifndef MP-WEIXIN
		url: '/api/english',
		// #endif
		params: {}
	},
	{
		name: 'wxSignUp',
		method: 'POST',
		desc: '登录',
		// #ifdef MP-WEIXIN
		url: 'https://wx.yttrium2016.cn/cors/wxSignUp',
		// #endif
		// #ifndef MP-WEIXIN
		url: '/app/login/wxSignUp',
		// #endif
		params: {
			code:'',
			data:''
		}
	},
	{
		name: 'qqSignUp',
		method: 'POST',
		desc: '登录',
		// #ifdef MP-WEIXIN
		url: 'https://wx.yttrium2016.cn/cors/qqSignUp',
		// #endif
		// #ifndef MP-WEIXIN
		url: '/app/login/qqSignUp',
		// #endif
		params: {
			openid:'',
			data:''
		}
	},
	{
		name: 'login',
		method: 'POST',
		desc: '登录',
		// #ifdef MP-WEIXIN
		url: 'https://wx.yttrium2016.cn/cors/wx',
		// #endif
		// #ifndef MP-WEIXIN
		url: '/app/login/wx',
		// #endif
		params: {
			openid:'',
		}
	},
	{
		name: 'one',
		method: 'POST',
		desc: 'ONE',
		// #ifdef MP-WEIXIN
		url: 'https://wx.yttrium2016.cn/cors/m-one',
		// #endif
		// #ifndef MP-WEIXIN
		url: '/api/one',
		// #endif
		params: {}
	},
	{
		name: 'weather',
		method: 'POST',
		desc: '天气',
		// #ifdef MP-WEIXIN
		url: 'https://wx.yttrium2016.cn/cors/m-api-weather',
		// #endif

		// #ifndef MP-WEIXIN
		url: '/api/weather',
		// #endif
		params: {
			city: '',
			ip: '',
			citycode: '',
			cityid: '',
			location: ''
		}
	},
	{
		name: 'test',
		method: 'POST',
		desc: '测试',
		url: '/fun/test',
		params: {}
	}
]
