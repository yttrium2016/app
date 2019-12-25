<template>
	<view class="y-welcome font-xwlogo">
		<!-- <image src="/static/gif/welcome.gif" mode="aspectFill" class="load-img gif-white"></image> -->

		<view class="loading-box"><view class="loading" data-loader="circle-side"></view></view>
		<text class="msg">{{ msg }}{{ msgList[msgIndex] }}</text>
	</view>
</template>

<script>
// 欢迎页面 检查登陆的
// 如果 登陆依然存在 去主页
// 如果 不存在 去登陆页面
export default {
	data() {
		return {
			msg: '登录中',
			msgList: ['.', '..', '...', '....'],
			msgIndex: 0
		};
	},
	onLoad() {
		setInterval(() => {
			this.msgIndex++;
			if (this.msgIndex >= 4) this.msgIndex = 0;
		}, 500);

		setTimeout(() => {
			// this.toView('/pages/index/index');
		}, 3000);
	}
};
</script>

<style lang="scss">
.y-welcome {
	position: relative;
	background: #fff;
	height: 100vh;
	.msg {
		position: absolute;
		bottom: 80rpx;
		text-align: center;
		left: 50rpx;
		right: 50rpx;
		color: rgba($color: #616361, $alpha: 0.8);
	}
	.loading-box {
		position: absolute;
		bottom: 140rpx;
		left: 0;
		right: 0;
		.loading {
			width: 70rpx;
			height: 70rpx;
			border-width: 6rpx;
			margin: auto;
		}
	}

	.load-img {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		width: 100%;
	}
}
</style>
