<template>
	<view class="y-login-app">
		<view class="bg-img align-center" style="height: 420rpx;">
			<image class="login-bg" src="/static/img/login_bg.png" mode="scaleToFill"></image>
			<view class="padding-xl text-white text-box">
				<view class="padding-xs margin-top-xl text-xxl text-bold text-center">Brick</view>
				<view class="padding-xs text-lg text-center">一个让自己变得更好的App.</view>
			</view>
		</view>
		<view class="login-btn-box">
			<view class="flex align-center  text-lg padding-tb-xs text-gray">
				<button @tap="qqlogin" class="item-btn flex-sub cu-btn bg-gradual-blue lg flex align-center justify-center" style="background: #5BA0FD;">
					<fa-icon type="qq" size="18" color="#fff"></fa-icon>
					<view class="margin-left">QQ登录</view>
				</button>
			</view>
			<view class="flex align-center  text-lg padding-tb-xs text-gray">
				<button @tap="checkWeChat" class="item-btn flex-sub cu-btn bg-gradual-blue margin-tb-sm lg flex align-center justify-center" style="background: #5BA0FD;">
					<fa-icon type="weixin" size="18" color="#fff"></fa-icon>
					<view class="margin-left">微信登录</view>
				</button>
			</view>
			<view class="flex padding-tb-xl justify-center text-sm text-gray">
				登录注册代表您已阅读并同意
				<text @tap="$msg('后续会添加网络链接')" style="color: rgb(91, 160, 253);">Brick隐私协议</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			qqlogin(){
				this.$msg('QQ登录')
			},
			checkWeChat(){
				this.$msg('微信登录')
			}
		}
	}
</script>

<style lang="scss">
.y-login-app {
	height: 100vh;
	background: #fff;
	.login-bg {
		position: absolute;
		left: 0;
		height: 500rpx;
		width: 750rpx;
		z-index: 1;
		top: 0;
	}
	.text-box {
		position: absolute;
		width: 750rpx;
		z-index: 2;
		left: 0;
		top: 0;
	}
	.login-btn-box {
		position: fixed;
		width: 750rpx;
		padding: 0 100rpx;
		bottom: 80rpx;
		.item-btn {
			border-radius: 100rpx;
		}
	}
}
</style>
