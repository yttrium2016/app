<template>
	<view>
		<scroll-view :scroll-y="!isOpen" class="target">
			<text class="add-btn cuIcon-add" :style="'margin-top:' + statusBar + 'px'"></text>
			<view class="target-header align-center flex justify-center bg-brick" :style="{ marginTop: isOpen ? '0' : '-45vh' }">
				<image class="moon" src="/static/img/noon_bg.png" :style="'margin-top:' + statusBar + 'px'" mode="scaleToFill"></image>
				<view v-if="isOver" class="title"><view class="num text-center margin-top-xs text-white text-bold">已完成</view></view>
				<view v-else class="title">
					<view class="text-center text-xl">今日剩余打卡数</view>
					<view class="num text-center margin-top-xs text-white text-bold">{{ num }}</view>
				</view>

				<view class="text-box" @tap="allTap">
					<view v-if="isOpen" class="text-center margin-top-xs" style="transform:rotate(180deg);"><text class="lg text-white cuIcon-unfold"></text></view>
					<view class="text-center text-lg">{{ !isOpen ? '收起' : '查看全部' }}</view>
					<view v-if="!isOpen" class="text-center margin-top-xs"><text class="lg text-white cuIcon-unfold"></text></view>
				</view>
				<image src="/static/gif/wave.gif" mode="widthFix" class="gif gif-black response"></image>
			</view>
			<view class="bg-white target-item flex align-center">
				<image class="logo" src="/static/img/hb.png" mode="scaleToFill"></image>
				<view class="text-box flex-sub">
					<view class="text-sm text-gray">记录生活</view>
					<view class="text-xl text-black text-bold">每日记账</view>
				</view>
				<view class="margin-right">
					<view v-if="isOver" class="cu-tag line-blue tag radius">已完成</view>
					<button @tap="navigateTo('/pages/account/index/index')" v-else class="cu-btn round bg-blue shadow">打卡</button>
				</view>
			</view>
			<!-- <view class="bg-mgrey target-item flex align-center">
				<image class="logo" src="/static/img/kl.png" mode="scaleToFill"></image>
				<view class="text-box flex-sub">
					<view class="text-sm text-gray">享受生活</view>
					<view class="text-xl text-black text-bold">喝可乐</view>
				</view>
				<view class="margin-right"><view class="cu-tag line-blue tag radius">已完成</view></view>
			</view>
			<view class="bg-white target-item flex align-center">
				<image class="logo" src="/static/img/ps.png" mode="scaleToFill"></image>
				<view class="text-box flex-sub">
					<view class="text-sm text-gray">记录生活</view>
					<view class="text-xl text-black text-bold">记账</view>
				</view>
				<view class="margin-right"><view class="cu-tag line-blue tag radius">已完成</view></view>
			</view>
			<view class="bg-mgrey target-item flex align-center">
				<image class="logo" src="/static/img/kl.png" mode="scaleToFill"></image>
				<view class="text-box flex-sub">
					<view class="text-sm text-gray">享受生活</view>
					<view class="text-xl text-black text-bold">再来一瓶</view>
				</view>
				<view class="margin-right"><button class="cu-btn round bg-blue shadow">打卡</button></view>
			</view> -->

			<!-- 预留下面70px距离 -->
			<view style="height: 100rpx;"></view>
		</scroll-view>
	</view>
</template>

<script>
import { createNamespacedHelpers, mapGetters, mapActions } from 'vuex';
const { mapActions: appActions, mapGetters: appGetters } = createNamespacedHelpers('app');
export default {
	data() {
		return {
			isOpen: true,
			num: 24,
			isOver: false
		};
	},
	computed: {
		...appGetters(['statusBar'])
	},
	methods: {
		allTap() {
			this.isOpen = !this.isOpen;
		}
	}
};
</script>

<style lang="scss">
.target {
	height: 100vh;
	background: #fff;
	position: relative;
	overflow: hidden;
	&.auto {
		overflow: auto;
	}
	.add-btn {
		position: fixed;
		right: 40rpx;
		top: 40rpx;
		width: 80rpx;
		height: 80rpx;
		text-align: center;
		font-size: 60rpx;
		color: #fff;
		line-height: 80rpx;
		z-index: 9;
		&:active {
			opacity: 0.7;
			border-radius: 50%;
			background: rgba(50, 50, 50, 0.3);
		}
	}
	.target-header {
		transition: all 0.6s ease 0s;
		height: 70vh;
		margin-top: -45vh;
		position: relative;
		.text-box {
			width: 750rpx;
			position: absolute;
			top: 55vh;
			z-index: 2;
		}
		.moon {
			position: absolute;
			left: 50rpx;
			top: 70rpx;
			height: 240rpx;
			width: 285rpx;
		}
		.title {
			color: rgba(255, 255, 255, 0.7);
			position: absolute;
			top: 40%;
			left: 0;
			width: 750rpx;
			.num {
				font-size: 100rpx;
			}
		}
		.gif {
			position: absolute;
			height: 0;
			display: block;
			height: auto;
			left: 0;
			bottom: -2rpx;
			z-index: 1;
			width: 750rpx;
		}
	}
	.target-item {
		height: 160rpx;
		.logo {
			height: 100rpx;
			width: 100rpx;
			margin: 30rpx;
		}
		.tag {
			margin-right: 10rpx;
		}
	}
}
</style>
