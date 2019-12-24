<template>
	<view class="weather-index-main">
		<view v-if="modelShow" class="day-model animation-slide-bottom padding-top">
			<view class="flex cf padding-sm align-center">
				<view class="fl padding-lr" @tap="hide7Days"><text class="cuIcon-close" style="font-size: 60rpx;"></text></view>
				<view class="flex-sub text-xl">近7日天气趋势详细</view>
			</view>

			<view class="day-title flex text-lg">
				<view class="day-date">日期</view>
				<view class="flex-sub flex justify-center align-center">白天</view>
				<view class="flex-sub flex justify-center align-center">夜晚</view>
			</view>

			<view v-for="(m, n) in days" :key="n" class="day-item flex margin-bottom-lg">
				<view class="day-date flex justify-center align-center">
					<view class="">
						<view class="margin-bottom-xs">{{ m.date }}</view>
						<view class="text-lg">{{ m.week }}</view>
					</view>
				</view>
				<view class="flex-sub">
					<view class="flex justify-center">{{ m.day.temphigh }}°C</view>
					<view class="flex justify-center align-center">
						<view class="margin-right-xs">{{ m.day.weather }}</view>
						<image class="img" :src="'/static/img/weather/icon/' + getImgId(m.day.weather) + '.png'" mode="aspectFit"></image>
					</view>
					<view class=""></view>
					<view class="flex justify-center">{{ m.day.winddirect }}{{ m.day.windpower }}</view>
				</view>
				<view class="flex-sub">
					<view class="flex justify-center">{{ m.night.templow }}°C</view>
					<view class="flex justify-center align-center">
						<view class="margin-right-xs">{{ m.night.weather }}</view>
						<image class="img" :src="'/static/img/weather/icon/' + getImgId(m.night.weather) + '.png'" mode="aspectFit"></image>
					</view>
					<view class="flex justify-center">{{ m.night.winddirect }}{{ m.night.windpower }}</view>
				</view>
			</view>
		</view>
		<view class="main-title flex align-center" :style="{ paddingTop: statusBar + 'px;', height: 50 + statusBar + 'px' }">
			<view class="flex-sub"><text @tap="navigateBack()" class="cuIcon-back padding-sm text-white" style="font-size: 48rpx;"></text></view>
			<view @tap="navigateTo('../add/add')" class="text-center text-white text-lg text-bold">{{ weatherList[index] && weatherList[index].city ? weatherList[index].city : '' }}</view>
			<view class="flex-sub"></view>

			<view class="flag-box flex align-center justify-center" :style="{ top: statusBar + 48 + 'px' }">
				<view class="flag-item" :class="{ active: i == index }" v-for="(o, i) in weatherList" :key="i"></view>
			</view>
		</view>

		<swiper @change="animationfinish" duration="200" :current="index" style="height: 100%;">
			<swiper-item class="swiper-item main-box bg-brick" :class="'bg-weather-'+i" :style="{ paddingTop: statusBar + 50 + 'px' }" v-for="(obj, i) in weatherList" :key="i">
				<view class="weather-now-c flex align-start">
					<view class="c-text text-white">{{ obj.temp }}</view>
					<view class="padding-top" style="font-size: 70rpx;">°</view>
					<view class="padding-top" style="font-size: 60rpx;">C</view>

					<view class="flex-sub flex justify-end align-center padding-left-xl padding-top">
						<image style="height:120rpx;" :src="'/static/img/weather/icon/' + getImgId(obj.weather) + '.png'" mode="aspectFit"></image>
					</view>
				</view>
				<view class="text-white flex text-xxl" style="height: 200rpx;line-height: 200rpx;">
					<view class="margin-left">{{ obj.date }}</view>
					<view class="margin-left">{{ obj.week }}</view>
					<view class="margin-left">{{ obj.weather }}</view>
					<view class="m-button padding-lr-lg" :class="{ anim: animShow }" @tap="refresh"><text class="cuIcon-refresh"></text></view>
				</view>
				<!-- 占位 -->
				<view :style="{ height: h + 'px' }"></view>
				<view class="flex justify-center align-center text-lg text-white" style="height: 60rpx;">
					<view class="flex-sub text-center">
						<text class="cuIcon-all margin-right-xs" style="font-size: 36rpx;"></text>
						{{ obj.winddirect }}{{ obj.windpower }}
					</view>
					<view style="height: 30rpx;background: #eee;width: 2rpx;"></view>
					<view class="flex-sub text-center">
						<text class="cuIcon-flashlightopen margin-right-xs" style="font-size: 36rpx;"></text>
						湿度:{{ obj.humidity }}%
					</view>
				</view>
				<view class="item-box w-box text-white">
					<view class="day flex align-center padding-lr-xl">
						<view>今日·{{ obj.daily[0].day.weather }}</view>
						<view class="flex-sub "></view>
						<image style="width: 60rpx;" :src="'/static/img/weather/icon/' + getImgId(obj.daily[0].day.weather) + '.png'" mode="aspectFit"></image>
						<view class="padding-left-sm text-right">{{ obj.daily[0].day.temphigh }} / {{ obj.daily[0].night.templow }}°C</view>
					</view>
					<view class="line margin-lr-xl"></view>
					<view class="day flex align-center padding-lr-xl">
						<view>明日·{{ obj.daily[1].day.weather }}</view>
						<view class="flex-sub "></view>
						<image style="width: 60rpx;" :src="'/static/img/weather/icon/' + getImgId(obj.daily[1].day.weather) + '.png'" mode="aspectFit"></image>
						<view class="padding-left-sm text-right">{{ obj.daily[1].day.temphigh }} / {{ obj.daily[1].night.templow }}°C</view>
					</view>
					<view class="line margin-lr"></view>
					<view class="day flex align-center padding-lr-xl">
						<view>{{ obj.daily[2].week }}·{{ obj.daily[2].day.weather }}</view>
						<view class="flex-sub "></view>
						<image style="width: 60rpx;" :src="'/static/img/weather/icon/' + getImgId(obj.daily[2].day.weather) + '.png'" mode="aspectFit"></image>
						<view class="padding-left-sm text-right">{{ obj.daily[2].day.temphigh }} / {{ obj.daily[2].night.templow }}°C</view>
					</view>
					<view class="line margin-lr-xl"></view>
					<view class="more flex align-center justify-center" @tap="show7Days"><view>7天趋势预报</view></view>
				</view>

				<view class="item-box" style="padding:0 30rpx 30rpx;">
					<view class="text-center text-white padding">24小时预报</view>
					<view>
						<scroll-view class="scroll-day p" scroll-x="true" scroll-left="0">
							<view class="scroll-item" v-for="(item, index) in obj.hourly" :key="index">
								<view :class="'text-' + i" :style="{ bottom: 80 + (item.temp - wd.min) * wd.h + 'px' }">{{ item.temp }}°C</view>
								<view :class="'it-' + i" :style="{ bottom: 65 + (item.temp - wd.min) * wd.h + 'px' }"></view>
								<view
									:class="'line-' + i"
									:style="{ height: 65 + (item.temp - wd.min) * wd.h - 68 < 0 ? '0' : 65 + (item.temp - wd.min) * wd.h - 68 + 'px' }"
								></view>
								<view :class="'m-box-' + i">
									<view class="m-box-img padding-xs">
										<image class="img" :src="'/static/img/weather/icon/' + getImgId(item.weather) + '.png'" mode="aspectFit"></image>
									</view>
									<view class="m-box-item">{{ item.weather }}</view>
									<view class="m-box-time">{{ item.time }}</view>
								</view>
							</view>
						</scroll-view>
					</view>
				</view>
				<view class="item-box" style="padding:30rpx 30rpx;">
					<view class="flex align-center">
						<view class="flex-sub text-center">
							<view class="padding">
								<view class="margin-bottom-xs">日出</view>
								<view class="">{{ obj.daily[0].sunrise }}</view>
							</view>
						</view>
						<view class="flex-sub text-center">
							<view class="padding">
								<view class="margin-bottom-xs">日落</view>
								<view class="">{{ obj.daily[0].sunset }}</view>
							</view>
						</view>
						<view class="flex-sub text-center">
							<view class="padding">
								<view class="margin-bottom-xs">气压</view>
								<view class="">{{ obj.pressure }}</view>
							</view>
						</view>
						<view class="flex-sub text-center">
							<view class="padding">
								<view class="margin-bottom-xs">PM2.5</view>
								<view class="">{{ obj.aqi.pm2_5 }}</view>
							</view>
						</view>
					</view>
				</view>

				<view class="item-box" style="padding:0 30rpx 30rpx;">
					<view class="flex padding  align-center padding-bottom-xs">
						<view class="text-xl">空气指数</view>
						<view class="flex-sub text-sm padding-lr"></view>
						<view class="m-tag margin-left-xs" :style="{ background: obj.aqi.aqiinfo.color }">{{ obj.aqi.aqiinfo.level }}</view>
					</view>
					<view class="flex padding-lr text-lg">{{ obj.aqi.aqiinfo.affect }}。{{ obj.aqi.aqiinfo.measure }}</view>
				</view>

				<view class="item-box" v-for="(temp, k) in obj.index" :key="k" style="padding:0 30rpx 30rpx;">
					<view class="flex padding align-center padding-bottom-xs">
						<view class="text-xl">{{ temp.iname }}</view>
						<view class="flex-sub text-sm padding-lr"></view>
						<view class="m-tag margin-left-xs">{{ temp.ivalue }}</view>
					</view>
					<view class="flex padding-lr text-lg">{{ temp.detail }}</view>
				</view>
					
				<view style="margin-bottom: 170rpx;">
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapActions: weatherActions, mapGetters: weatherGetters } = createNamespacedHelpers('weather');
const { mapActions: appActions, mapGetters: appGetters } = createNamespacedHelpers('app');
export default {
	data() {
		return {
			modelShow: false,
			animShow: false,
			id: 0,
			index: 0,
			list: [],
			days: [],
			wd: {
				min: 100,
				max: -100,
				h: 0
			},
			h: 0
		};
	},
	computed: {
		...weatherGetters(['weatherList']),
		...appGetters(['windowHeight','statusBar'])
	},
	async onLoad() {
		if (this.weatherList.length == 0) {
			await this.initWeather();
		}
		this.initLine(this.index);
		this.h = this.windowHeight - this.statusBar - 438 - 95;
	},
	onBackPress(options) {
		if(this.modelShow){
			this.modelShow = false;
			return true;
		}
	},
	methods: {
		...weatherActions(['initWeather']),
		animationfinish(e) {
			this.index = e.detail.current;
			this.initLine(this.index);
		},
		async refresh() {
			if(this.animShow) return;
			this.animShow = true;
			this.$showLoading('获取天气中..');
			await this.initWeather(this.index);
			this.initLine(this.index);

			this.$hideLoading();
			this.animShow = false;
		},
		show7Days() {
			this.days = this.weatherList[this.index].daily;
			this.modelShow = true;
		},
		hide7Days() {
			this.modelShow = false;
		},
		initLine(i) {
			let wo = this.weatherList[i];
			let res = {
				min: 100,
				max: -100,
				h: 0
			};
			if(wo){
				let list = wo.hourly;
				for (var j = 0; j < list.length; j++) {
					res.min = Math.min(res.min, list[j].temp);
					res.max = Math.max(res.max, list[j].temp);
				}
				res.h = 60 / (res.max - res.min);
			}
			this.wd = res;
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
				case '小到中雨':
					return 6;
				case '大雨':
				case '中雨-大雨':
				case '中到大雨':
					return 7;
				case '大雨-暴雨':
				case '大到暴雨':
				case '暴雨':
				case '大暴雨-特大暴雨':
				case '大暴雨到特大暴雨':
				case '暴雨-大暴雨':
				case '暴雨到大暴雨':
				case '大暴雨':
				case '特大暴雨':
					return 8;
				case '雪':
				case '小雪':
					return 9;
				case '小雪-中雪':
				case '小到中雪':
				case '中雪':
					return 10;
				case '中雪-大雪':
				case '中到大雪':
				case '大雪-暴雪':
				case '大到暴雪':
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
.weather-index-main {
	height: 100vh;
	.day-model {
		position: fixed;
		top: 0;
		left: 0;
		width: 750rpx;
		height: 100vh;
		z-index: 999;
		background: #fff;
		color: #333;
		overflow: auto;
		.img {
			height: 60rpx;
			width: 60rpx;
		}
		.day {
			&-title {
				padding: 0 30rpx 30rpx;
			}

			&-item {
				padding: 0 30rpx;
			}
			&-date {
				width: 200rpx;
				padding: 20rpx;
			}
		}
	}
	.main-title {
		position: fixed;
		top: 0;
		left: 0;
		width: 750rpx;
		z-index: 2;
		.flag-box {
			position: fixed;
			left: 0;
			width: 750rpx;
			z-index: 3;
			.flag-item {
				height: 10rpx;
				width: 10rpx;
				border-radius: 50%;
				margin: 4rpx;
				background: #e0e0e0;
				&.active {
					background: #fff;
				}
			}
		}
	}
	.main-box {
		height: 100%;
		overflow-y: auto;
		position: relative;
		.weather {
			&-now-c {
				padding: 0 30rpx;
				color: #fff;
				height: 210rpx;
				.c-text {
					font-size: 180rpx;
				}
			}
		}

		.item-box {
			min-height: 60rpx;
			border-radius: 20rpx;
			margin: 20rpx;
			background: rgba(255, 255, 255, 0.2);
			color: #fff;
			&.w-box {
				.line {
					height: 2rpx;
					background: #eee;
				}
				.day {
					height: 100rpx;
				}
				.more {
					height: 100rpx;
				}
			}
			.m-tag {
				padding: 4rpx 10rpx;
				border-radius: 10rpx;
				font-size: 28rpx;
				background: rgba(0, 0, 0, 0.2);
			}
		}
	}
	.scroll-day {
		white-space: nowrap;
		width: 100%;
		position: relative;
		.scroll-item {
			position: relative;
			width: 140rpx;
			display: inline-block;
			height: 320rpx;
			[class*='it-'] {
				position: absolute;
				height: 8px;
				width: 8px;
				border-radius: 50%;
				border: 4rpx solid #fff;
				margin: -4px 0 0 -4px;
				left: 50%;
			}
			[class*='line-'] {
				position: absolute;
				width: 4rpx;
				margin-left: -2rpx;
				background: #fff;
				left: 50%;
				bottom: 125rpx;
			}

			[class*='text-'] {
				width: 50px;
				height: 10px;
				line-height: 10px;
				text-align: center;
				margin: -5px 0 0 -25px;
				position: absolute;
				border-radius: 50%;
				left: 50%;
			}

			[class*='m-box-'] {
				width: 100%;
				height: 120rpx;
				text-align: center;
				position: absolute;
				left: 0;
				bottom: 0;

				.m-box-img {
					height: 120rpx;
					padding-bottom: 80rpx;
					width: 100%;
					.img {
						width: 100%;
						height: 100%;
					}
				}
				.m-box-item {
					height: 80rpx;
					padding-bottom: 40rpx;
					width: 100%;
				}
				.m-box-time {
					height: 40rpx;

					width: 100%;
				}
			}
		}
	}
	.anim {
		animation: lds-hourglass 1s linear infinite;
	}
	
	.bg-weather{
		&-0{
			background: #FF969C;
		}
		&-1{
			background: #FFCB7B;
		}
		&-2{
			background: #A5CBFF;
		}
		&-3{
			background: #FFDF73;
		}
		&-4{
			background: #F7AEDE;
		}
		&-5{
			background: #A5B6FF;
		}
	}
}

@keyframes lds-hourglass {
	0% {
		transform: rotate(0);
	}
	50% {
		transform: rotate(900deg);
	}
	100% {
		transform: rotate(1800deg);
	}
}
</style>
