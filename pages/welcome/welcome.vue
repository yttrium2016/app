<template>
	<view class="y-welcome">
		<image src="/static/gif/loading-1.gif" mode="aspectFit" class="load-img gif-white"></image>
		<text class="msg">
			{{ msg }}{{ msgList[index] }}
		</text>
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
			index: 0
		};
	},
	onLoad() {
		setInterval(() => {
			this.index++;
			if (this.index >= 4) this.index = 0;
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
	background: #fefefe;
	height: 100vh;
	.msg {
		position: absolute;
		bottom: 80rpx;
		text-align: center;
		left: 50rpx;
		right: 50rpx;
		color: rgba($color: #616361, $alpha: 0.8);
	}
	.load-img {
		position: absolute;
		bottom: 20rpx;
		left: 25rpx;
		right: 25rpx;
		width: 700rpx;
		height:300rpx;
	}
}
</style>
