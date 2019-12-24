import storage from '@/utils/storage';
// import api from '@/api'

const state = {
	// 天气相关
	cityList: [],
	weatherList: [],
	dataDate: [],
}
const actions = {
	// 天气相关
	init({
		commit
	}) {
		// 从持久化缓存读取
		let cityList = storage.get('cityList');
		commit('SET_CITY_LIST', cityList);
		// 从持久化缓存读取
		let weatherList = storage.get('weatherList');
		weatherList && commit('SET_WEATHER_LIST', weatherList);
	},
	initCityList({
		commit
	}) {
		// 从持久化缓存读取
		let cityList = storage.get('cityList');
		commit('SET_CITY_LIST', cityList);
	},
	async addCityList({
		commit,
		getters
	}, obj) {
		let cityList = getters.cityList;
		cityList.push(obj);
		commit('SET_CITY_LIST', cityList);

		let weatherList = getters.weatherList;
		let dateTemp = getters.dataDate;
		let cityid = obj.cityid
		let data = null;
		// await api['common/weather']({
		// 	cityid
		// });
		if (data && data.code == 0) {
			let temp = JSON.parse(data.data);
			if (temp && temp.status == 0) {
				weatherList.push(temp.result);
				dateTemp.push(new Date().getTime());
				commit('SET_WEATHER_LIST', weatherList);
				commit('SET_DATA_DATE', dateTemp);
				storage.set('weatherList',weatherList);
			}
		}
		return cityList
	},
	async initWeather({
		commit,
		getters
	}, index = null) {
		if (getters.weatherList.length == 0 || index == null) {
			let weatherList = [];
			let dateTemp = [];
			for (var i = 0; i < getters.cityList.length; i++) {
				let result = {};
				let cityid = getters.cityList[i].cityid
				let data = await api['common/weather']({
					cityid
				});
				if (data && data.code == 0) {
					let temp = JSON.parse(data.data);
					if (temp && temp.status == 0) {
						result = temp.result;
					} else {
						result.msg = temp.msg;
					}
				} else {
					result.msg = data.msg;
				}
				weatherList.push(result)
				dateTemp.push(!result.msg ? new Date().getTime() : 0);
			}
			commit('SET_WEATHER_LIST', weatherList);
			commit('SET_DATA_DATE', dateTemp);
			storage.set('weatherList',weatherList);
			return weatherList;
		} else {
			if (index < getters.weatherList.length) {
				let cityid = getters.cityList[index].cityid
				let t = ((new Date().getTime()) - getters.dataDate[index]) / 1000 / 10; //10秒只能请求一次
				if (t < 1) {
					return getters.weatherList[index];
				}
				let data = await api['common/weather']({
					cityid
				});
				if (data && data.code == 0) {
					let temp = JSON.parse(data.data);
					if (temp && temp.status == 0) {
						let weatherList = getters.weatherList;
						let dateTemp = getters.dataDate;
						weatherList.splice(index, 1, temp.result);
						dateTemp.splice(index, 1, new Date().getTime());
						commit('SET_WEATHER_LIST', weatherList);
						commit('SET_DATA_DATE', dateTemp);
						storage.set('weatherList',weatherList);
						return temp.result;
					}
				}
			}
		}
	}

}

export default {
	// 天气相关
	namespaced: true,
	state,
	actions,
}
