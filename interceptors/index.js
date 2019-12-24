export const reqInterceptors = function(config) {
	config['header']['token'] = 'CD497EF37BDA6A95B79DF2408F2548EE';
	return config
}

export const resInterceptors = function(res){
	return res.data;
}
