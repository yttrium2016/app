<template>
	<view>
		<cu-custom bgColor="bg-brick "><block slot="content">小程序</block></cu-custom>
		<scroll-view class="info" :scroll-y="true" :scroll-x="false">
			<view class="padding-sm text-lg text-bold">最近使用</view>
			<view class="grid margin-bottom text-center col-4">
				<view class="item-box padding-xs">
					<image class="item-icon" src="/static/img/beiwanglu.png" mode="scaleToFill"></image>
					<view class="item-text text-line text-gray margin-top-xs">程序1</view>
				</view>
				<view class="item-box padding-xs">
					<image class="item-icon" src="/static/img/beiwanglu.png" mode="scaleToFill"></image>
					<view class="item-text text-line text-gray margin-top-xs">程序2</view>
				</view>
				<view class="item-box padding-xs">
					<image class="item-icon" src="/static/img/beiwanglu.png" mode="scaleToFill"></image>
					<view class="item-text text-line text-gray margin-top-xs">程序3</view>
				</view>

				<view class="item-box padding-xs">
					<image class="item-icon" src="/static/img/tixingshixiang.png" mode="scaleToFill"></image>
					<view class="item-text text-line text-gray margin-top-xs">更多</view>
				</view>
			</view>

			<view class="padding-sm text-lg text-bold">我的收藏</view>
			<view class="grid margin-bottom text-center col-4">
				<view class="item-box padding-xs" @tap="openApp" data-title="Brick" data-url="http://old.yangzhenyu.com.cn/#/login">
					<image class="item-icon" src="https://gitee.com/yttrium2016/img/raw/master/20190715152854878.jpg" mode="scaleToFill"></image>
					<view class="item-text text-line text-gray margin-top-xs">Brick</view>
				</view>
				<view class="item-box padding-xs" @tap="openApp" data-title="星空" data-url="https://create-eu.thenightsky.com/">
					<image class="item-icon" src="https://img-cdn-qiniu.dcloud.net.cn/uploads/avatar/000/12/36/47_avatar_max.jpg" mode="scaleToFill"></image>
					<view class="item-text text-line text-gray margin-top-xs">星空</view>
				</view>
			</view>

			<view style="height: 120rpx;"></view>
		</scroll-view>
	</view>
</template>
<script>
import { createNamespacedHelpers, mapGetters, mapActions } from 'vuex';
export default {
	data() {
		return {
		};
	},
	methods: {
		openApp(e) {
			console.log(e.currentTarget.dataset);
			let app = e.currentTarget.dataset;
			this.newView('/pages/app/app');
		}
	}
};
</script>

<style lang="scss">
.info {
	background-color: #fff;
	.item-box {
		.text-line {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.item-icon {
			width: 80rpx;
			height: 80rpx;
			border-radius: 10rpx;
		}
		.item-text {
			font-size: 30rpx;
		}
	}
}
</style>
