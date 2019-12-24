<template>
	<view class="y-home">
		<view class="home-title align-center flex justify-center bg-brick">
			<view class="logo-box bg-white" @tap="initView()">
				<image :src="userInfo.avatarUrl" mode="scaleToFill" style="width: 100%;height: 100%;border-radius: 50%;"></image>
			</view>
			<view class="padding-xl text-white animation-scale-up" @tap="newView('/pages/weather/index/index')">
				<view class="padding-xs text-bold text-center" style="font-size: 60rpx;">
					{{ weatherList[0] && weatherList[0].temp ? weatherList[0].temp : '' }}°{{ weatherList[0] && weatherList[0].weather ? weatherList[0].weather : '' }}
				</view>
				<view class="padding-xs text-lg text-center">
					{{ weatherList[0] && weatherList[0].date ? weatherList[0].date : '' }} {{ weatherList[0] && weatherList[0].week ? weatherList[0].week : '' }}
				</view>
				<view class="padding-xs text-xl text-center">{{ weatherList[0] && weatherList[0].city ? weatherList[0].city : '' }}</view>
			</view>
			<image
				v-for="o in starList"
				:key="o.id"
				src="/static/img/star.png"
				:style="{ animationDelay: (o.t + 1) * 0.05 + 's', width: o.size + 'rpx', height: o.size + 'rpx', left: o.left + 'rpx', top: o.top + 'vh' }"
				mode="scaleToFill"
				class="star animation-scale-up"
			></image>
			<image
				v-for="o in moonList"
				:key="o.id"
				src="/static/img/moon.png"
				:style="{ animationDelay: (o.t + 1) * 0.05 + 's', width: o.size + 'rpx', height: o.size + 'rpx', left: o.left + 'rpx', top: o.top + 'vh' }"
				mode="scaleToFill"
				class="star animation-scale-up"
			></image>
			<image src="/static/gif/wave.gif" mode="widthFix" class="gif gif-black response"></image>
		</view>

		<view class="query-box padding-lr radius shadow-warp shadow-lg bg-white flex align-center">
			<text class="lg text-gray cuIcon-search icon"></text>
			<text class="flex-sub margin-lr-sm">搜索</text>
			<!-- #ifndef H5 -->
			<view style="height: 100rpx;width: 2rpx;background: #f6f6f6;margin-right: 24rpx;"></view>
			<text class="xl text-gray cuIcon-scan icon" style="color: #6788FD;font-size: 40rpx;" @tap="sacn()"></text>
			<!-- #endif -->
		</view>

		<view class="grid margin-bottom text-center col-4" style="margin-top: 80rpx">
			<view
				:key="index"
				v-for="(item, index) in muenList"
				class="padding-sm"
				@tap="btnTap(item)"
				:class="active == item.title ? 'animation-shake' : ''"
				:data-title="item.title"
			>
				<image :src="item.icon" mode="scaleToFill" style="width: 70rpx;height: 70rpx;"></image>
				<view class="text-gray margin-top-xs">{{ item.title }}</view>
			</view>
		</view>

		<view style="height: 20rpx;background: #F8F7FC;"></view>

		<view class="padding text-gray">每日一句</view>

		<view class="m-img bg-img margin-lr bg-mask flex align-center shadow" :style="{ backgroundImage: 'url(' + day.img + ')' }">
			<view class="padding-xl text-white">
				<view class="padding-xs text-lg text-bold">{{ day.content }}</view>
				<view class="padding-xs text-lg">{{ day.note }}</view>
			</view>
		</view>
	</view>
</template>

<script>
import { createNamespacedHelpers, mapGetters, mapActions } from 'vuex';
const { mapActions: weatherActions, mapGetters: weatherGetters } = createNamespacedHelpers('weather');
export default {
	data() {
		return {
			userInfo: {
				id: 1,
				createDate: '2019-08-09 01:39:31',
				updateDate: '2019-08-09 01:39:31',
				nickName: 'Mr杨。',
				language: 'zh_CN',
				country: '中国',
				province: '',
				city: '',
				avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKEuJztGnlsCubIkd6icRRicNvp3vlfuOU7z7ELp8iaAveV5E8Z4LGncV5XI7r4cewHQ0v41eJsVJcxw/132',
				gender: 1,
				type: 'xcx',
				openid: 'o5Pr80KUbphMbiMae_Xqy8ZpBYLY'
			},
			muenList: [
				{ title: '记账本', icon: '/static/img/beiwanglu.png', url: '/pages/account/index/index' },
				{ title: '天气', icon: '/static/img/lvcheng.png', url: '/pages/weather/index/index' },
				{ title: '小游戏', type: 'app', icon: '/static/img/tixingshixiang.png', url: 'https://yttrium2016.gitee.io/notepad/#/game' },
				{ title: '备忘录', type: 'app', icon: '/static/img/rili.png', url: 'https://yttrium2016.gitee.io/notepad/' },
				{ title: '小程序', type: 'app', icon: 'https://gitee.com/yttrium2016/img/raw/master/20190715152854878.jpg', url: 'http://old.yangzhenyu.com.cn/#/login' },
				{ title: '补填大类', icon: 'https://gitee.com/yttrium2016/img/raw/master/20190715152854878.jpg', url: '/pages/account/outType/outType' }
			],
			day: {
				img: '',
				content: '',
				note: ''
			},
			active: '',
			index: 0,
			starList: [],
			moonList: []
		};
	},
	computed: {
		...weatherGetters(['weatherList'])
	},
	mounted() {
		//这边试了下 只有这个可以
		this.initView();
		// this.initHome();
		// this.setMuenList([
		// 	{ title: '记账本', icon: '/static/img/beiwanglu.png', url: '/pages/account/index/index' },
		// 	{ title: '天气', icon: '/static/img/lvcheng.png', url: '/pages/weather/index/index' },
		// 	{ title: '小游戏', type: 'app', icon: '/static/img/tixingshixiang.png', url: 'https://yttrium2016.gitee.io/notepad/#/game' },
		// 	{ title: '备忘录', type: 'app', icon: '/static/img/rili.png', url: 'https://yttrium2016.gitee.io/notepad/' },
		// 	{ title: '小程序', type: 'app', icon: 'https://gitee.com/yttrium2016/img/raw/master/20190715152854878.jpg', url: 'http://old.yangzhenyu.com.cn/#/login' },
		// 	{ title: '补填大类', icon: 'https://gitee.com/yttrium2016/img/raw/master/20190715152854878.jpg', url: '/pages/account/outType/outType' }
		// ]);
	},
	methods: {
		// ...appActions(['setUrl', 'setTitle']),
		// ...homeActions(['initHome', 'setDataTime', 'setMuenList']),
		btnTap(e) {
			this.active = e.title;
			if (e.type == 'app') {
				this.setUrl(e.url);
				this.setTitle(e.title);
				// #ifdef APP-PLUS
				this.newView('/pages/app/app');
				// #endif
			} else {
				this.newView(e.url);
			}
		},
		initView() {
			this.starList = [];
			this.moonList = [];
			let count = this.$tools.randomNum(4, 15);
			for (let i = 0; i < count; i++) {
				if (i < count - 2) {
					this.starList.push(this.getItem());
				} else {
					this.moonList.push(this.getItem());
				}
			}
		},
		getItem() {
			let left = this.$tools.randomNum(20, 740);
			let top = this.$tools.randomNum(1, 35);
			let size = this.$tools.randomNum(20, 90);
			let t = this.$tools.randomNum(1, 30);

			// 头像去除
			while (left < 150 && top < 20) {
				left = this.$tools.randomNum(20, 740);
				top = this.$tools.randomNum(1, 45);
			}

			// 大部分 中间去除
			while (left > 240 && left < 510 && top > 13 && top < 23) {
				left = this.$tools.randomNum(20, 740);
				top = this.$tools.randomNum(1, 45);
			}

			// 超出屏幕宽度 去除
			while (left + size > 750) {
				left = this.$tools.randomNum(20, 740);
				size = this.$tools.randomNum(20, 90);
			}

			return {
				id: this.index++,
				t,
				size,
				left,
				top
			};
		},
		//#ifndef H5
		sacn() {
			uni.scanCode({
				scanType: ['qrCode'],
				success: function(res) {
					console.log('条码类型：' + res.scanType + '\n条码内容：' + res);
				}
			});
		},
		//#endif
	}
};
</script>

<style lang="scss">
.y-home {
	height: 100vh;
	padding-bottom: 140rpx;
	background: #fff;
	position: relative;
	overflow: auto;
	.home-title {
		height: 40vh;
		position: relative;
		.logo-box {
			z-index: 3;
			position: absolute;
			left: 55rpx;
			top: 55rpx;
			height: 100rpx;
			width: 100rpx;
			border-radius: 50%;
			border: 4rpx solid rgba(255, 255, 255, 0.8);
		}
		.gif {
			position: absolute;
			left: 0;
			bottom: -2rpx;
			height: 0;
			display: block;
			height: auto;
			width: 750rpx;
		}
		.star {
			position: absolute;
			height: 40rpx;
			width: 40rpx;
			left: 400rpx;
			top: 56rpx;
			transform: rotate(7deg);
		}
	}
	.query-box {
		position: absolute;
		top: calc(40vh - 50rpx);
		height: 100rpx;
		width: 670rpx;
		left: 0;
		margin: 0rpx 40rpx;
		border-radius: 20rpx;
		color: #b6b6b6;
		.icon {
			color: #b6b6b6;
			font-size: 32rpx;
		}
	}
	.m-img {
		min-height: 350rpx;
		background-size: 100% 100%;
		-moz-background-size: 100% 100%;
		background-repeat: no-repeat;
		border-radius: 20rpx;
	}
}
</style>
