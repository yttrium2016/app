export default [{
	name: 'sum',
	method: 'POST',
	desc: '列表每日的统计',
	// #ifdef MP-WEIXIN
	url: 'https://wx.yttrium2016.cn/cors/accountSum',
	// #endif
	// #ifndef MP-WEIXIN
	url: '/fun/accountSum',
	// #endif
	params: {
		userId:''
	}
},{
	name: 'item',
	method: 'POST',
	desc: '详细信息',
	url: '/app/account/item',
	params: {
		id:'',
		userId:''
	}
},{
	name: 'list',
	method: 'POST',
	desc: '列表查询页面',
	url: '/app/account/list',
	params: {
		userId:'',
		searchText:'',
		maxMoney:'',
		minMoney:'',
		title:'',
		type:'',
		startDate:'',
		endDate:'',
		pageIndex:1,
		pageSize:200,
	}
},{
	name: 'save',
	method: 'POST',
	desc: '记账保存接口',
	url: '/app/account/save',
	params: {
		id:'',
		icon:'',
		title:'',
		color:'',
		type:'',
		money:'',
		remark:'',
		dateTime:'',
		year:'',
		month:'',
		day:'',
		userId:'',
		dataNum:''
	}
},{
	name: 'bill',
	method: 'POST',
	desc: '汇总数据',
	url: '/app/account/bill',
	params: {
		userId:'',
		year:'',
		month:''
	}
}]
