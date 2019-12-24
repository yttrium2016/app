<template>
	<view class="weather-add-main">
		<cu-custom bgColor="bg-brick" :isBack="true"><block slot="content">城市管理</block></cu-custom>
		<view class="text-center margin-top-sm" style="color: #e0e0e0;">
			长按条目可删除
		</view>
		<view class="m-add-button bg-brick shadow" @tap="goAddView">
			<text class="cuIcon-add icon"></text>
		</view>
		<view class="m-list">
			<view class="m-item" v-for="(o, i) in weatherList" :key="i" :data-id="o.cityid" @longtap="longLink" >
				<view class="flex align-center" style="height: 140rpx;">
					<view class="">
						<view class="title-text">{{ o.city }}</view>
						<view class="text-sm text-grey">{{ o.date }} {{ o.week }} {{ o.weather }}</view>
					</view>
					<view class="img-box flex-sub text-right padding-lr">
						<image style="height: 80rpx;width: 80rpx;" :src="'/static/img/weather/icon/' + getImgId('多云') + '.png'" mode="aspectFit"></image>
					</view>
					<view class="title-c">{{ o.temp }}°C</view>
				</view>
				<view class="flex align-center text-grey solid-top" style="height: 80rpx; line-height: 80rpx;">
					<view class="text">空气{{ o.aqi.quality }} | 湿度{{ o.humidity }}%</view>
					<view class="flex-sub text text-right">{{ o.templow }} / {{ o.temphigh }}°C</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapActions: weatherActions, mapGetters: weatherGetters } = createNamespacedHelpers('weather');
export default {
	data() {
		return {};
	},
	computed: {
		...weatherGetters(['weatherList'])
	},
	methods: {
		...weatherActions(['initCityList','setWeatherList']),
		longLink(e) {
			if(this.weatherList.length < 2){
				this.$msg('至少也有一个城市的天气');
				return;
			}
			let that = this;
			let id = e.currentTarget.dataset.id;
			uni.showActionSheet({
				itemList: ['删除'],
				success: function(res) {
					if (res.tapIndex == 0) {
						// 删除操作
						that.deleteItem(id);
					}
				}
			});
		},
		deleteItem(id){
			// 持久化删除
			let list = this.$storage.get('cityList');
			list.forEach(temp => {
				if (temp.cityid == id) list.splice(list.indexOf(temp), 1);
			});
			
			// 刷新列表数据
			this.$storage.set('cityList', list);
			this.initCityList();
			
			let weatherList = this.weatherList;
			
			weatherList.forEach(temp => {
				if (temp.cityid == id) weatherList.splice(weatherList.indexOf(temp), 1);
			});
			
			this.setWeatherList(weatherList)
		},
		goAddView(){
			if(this.weatherList.length >= 6){
				this.$msg('最多设置6个地方的天气');
				return;
			}
			this.navigateTo('../city/city');
		},
		getImgId(temp) {
			switch (temp) {
				case '晴':
					return 0;
				case '多云':
				case '阴':
					return 1;
				case '阵雨':
					return 2;
				case '雷阵雨':
				case '雷阵雨伴有冰雹':
					return 3;
				case '雨夹雪':
				case '冻雨':
					return 4;
				case '雨':
				case '小雨':
					return 5;
				case '中雨':
				case '小雨-中雨':
					return 6;
				case '大雨':
				case '中雨-大雨':
					return 7;
				case '大雨-暴雨':
				case '暴雨':
				case '大暴雨-特大暴雨':
				case '暴雨-大暴雨':
				case '大暴雨':
				case '特大暴雨':
					return 8;
				case '雪':
				case '小雪':
					return 9;
				case '小雪-中雪':
				case '中雪':
					return 10;
				case '中雪-大雪':
				case '大雪-暴雪':
				case '阵雪':
				case '大雪':
				case '暴雪':
					return 11;
				case '雾':
				case '浓雾':
				case '强浓雾':
				case '中度霾':
				case '重度霾':
				case '严重霾':
				case '大雾':
				case '特强浓雾':
					return 12;
				case '沙尘暴':
				case '浮尘':
				case '扬沙':
				case '强沙尘暴':
					return 13;
			}
			return 14;
		}
	}
};
</script>

<style lang="scss">
.weather-add-main {
	background: #f7f7f7;
	height: 100vh;
	overflow: auto;
	.m-list {
		padding: 0 20rpx;
		.m-item {
			height: 260rpx;
			border-radius: 8rpx;
			padding: 20rpx 60rpx;
			background: #fff;
			margin-top: 20rpx;
			.title-text {
				font-size: 50rpx;
			}
			.title-c {
				font-size: 55rpx;
			}
		}
	}
	.m-add-button {
		height: 120rpx;
		width: 120rpx;
		z-index: 9;
		border-radius: 50%;
		position: fixed;
		bottom: 40rpx;
		right: 40rpx;
		display: flex;
		align-items: center;
		.icon{
			font-size: 80rpx;
			margin: 0 auto;
		}
		&:active{
			opacity: .7;
		}
	}
}
</style>
