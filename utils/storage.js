const mKey = 'brick-'

const get = function(key) {
	return uni.getStorageSync(mKey + key);
}

const set = function(key, value) {
	try {
		uni.setStorageSync(mKey + key, value);
	} catch (e) {}
}


const rm = function(key) {
	try {
		uni.removeStorageSync(mKey + key);
	} catch (e) {}
}

export default {
	get,
	set,
	rm
}
