export default [{
	name: 'info',
	method: 'POST',
	desc: '英语',
	url: '/app/target/info',
	params: {
		userId:'',
	}
},
{
	name: 'editOutType',
	method: 'POST',
	desc: '修改outType',
	url: '/fun/editOutType',
	params: {
		id:'',
		outType:''
	}
},
{
	name: 'notAll',
	method: 'POST',
	desc: '修改outType',
	url: '/fun/notOutType',
	params: {}
}]
