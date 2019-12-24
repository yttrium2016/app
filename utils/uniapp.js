export const showLoading = (title = '',isMask = true) => {
	uni.showLoading({
		title: title,
		mask: isMask
	});
}

export const getDate = (temp = null) => {
	if(typeof(temp)=="string"){
		temp = temp.replace(/-/g,'/')
		return new Date(temp);
	}else if(typeof temp == 'number'){
		return new Date(temp);
	}
	return new Date();
}

export const hideLoading = () => {
	uni.hideLoading();
}
export const success = (config, cb) => {
	msg(config, cb, true)
}
export const msg = (config, cb, success = false) => {
	if (typeof config == 'string') {
		uni.showToast({
			title: config,
			duration: 1200,
			icon: success ? 'success' : 'none'
		});
		if (cb && typeof cb == 'function') {
			setTimeout(() => {
				cb();
			}, 1300)
		}
	} else if (typeof config == 'object') {
		uni.showToast(config);
		if (cb && typeof cb == 'function') {
			setTimeout(() => {
				cb();
			}, config.duration ? config.duration + 100 : 1300)
		}
	}

}

export const hideToast = () => {
	uni.hideToast()
}
