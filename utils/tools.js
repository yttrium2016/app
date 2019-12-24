import {
	Base64
} from 'js-base64';

const base64encode = (str) => {
	return Base64.encode(str);
}

const base64decode = (str) => {
	return Base64.decode(str);
}

const isJsonStr = (str) => {
	if (typeof str == 'string') {
		try {
			let temp = JSON.parse(str);
			if (temp) {
				return true;
			} else {
				return false;
			}
		} catch (e) {
			return false;
		}
	} else {
		return false;
	}
}

const getDateShow = (value) => {
	let date = new Date();
	let key = '';
	if (typeof value == 'number') {
		key = new Date(value).Format('yyyyMMdd');
	} else
	if (typeof value == 'string') {
		if (value.length == 8) {
			key = value;
		} else {
			value = value.replace(/-/g, "").replace(/ /g, "").replace(/:/g, "").replace(/\//g, "");
			if (value.length > 8) {
				key = value.substr(0, 8);
			} else {
				key = value
			}
		}
	}
	let now = date.Format('yyyyMMdd');
	let yesterday = new Date(date.setDate(date.getDate() - 1)).Format('yyyyMMdd');
	if (key == now) {
		return '今天'
	} else if (key == yesterday) {
		return '昨天'
	} else if (key.toString().length == 8) {
		return key.substr(0, 4) + '年' + key.substr(4, 2) + '月' + key.substr(6, 2) + '日';
	}
	return date.Format("yyyy年MM月dd日");
}


const randomNum = (minNum, maxNum) => {
	switch (arguments.length) {
		case 1:
			return parseInt(Math.random() * minNum + 1, 10);
			break;
		case 2:
			return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
			//或者 Math.floor(Math.random()*( maxNum - minNum + 1 ) + minNum );
			break;
		default:
			return 0;
			break;
	}
}


export default {
	isJsonStr,
	getDateShow,
	base64decode,
	base64encode,
	randomNum
}
