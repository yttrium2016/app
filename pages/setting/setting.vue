<template>
	<view>
		<view class="m-setting">
			<cu-custom bgColor="bg-brick" :isBack="true">
				<block slot="backText">返回</block>
				<block slot="content">设置</block>
			</cu-custom>

			<view class="m-list cu-list menu">
				<view class="flex line"></view>
				<view class="cu-item arrow">
					<view class="content"><text class="text-grey">个人资料</text></view>
				</view>
				<view class="cu-item arrow">
					<view class="content"><text class="text-grey">实名认证</text></view>
				</view>
				<view class="cu-item arrow">
					<view class="content"><text class="text-grey">其他设置</text></view>
				</view>

				<view class="flex line"></view>

				<view class="cu-item">
					<view class="content padding-tb-sm"><text class="text-grey">消息推送</text></view>
					<view class="action"><switch @change="SwitchSex" :class="skin ? 'checked' : ''" :checked="skin ? true : false"></switch></view>
				</view>

				<view class="flex line"></view>

				<view class="cu-item arrow">
					<view class="content"><text class="text-grey">清除缓存</text></view>
				</view>
				<view class="cu-item arrow">
					<view class="content"><text class="text-grey">关于</text></view>
				</view>
				<view class="cu-item arrow">
					<view class="content"><text class="text-grey">检测更新</text></view>
					<view class="action"><text class="text-grey text-sm">当前版本2.0.8</text></view>
				</view>

				<view class="flex line"></view>
				<view class="flex line"></view>

				<view class="cu-item flex justify-center" @tap="goToLogin()">
					<button class="cu-btn content" style="justify-content: center;color: #f33;">退出登录</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { createNamespacedHelpers, mapGetters, mapActions } from 'vuex';
export default {
	data() {
		return {
			skin: true
		};
	},
	methods: {
		...mapActions(['logout']),
		SwitchSex(e) {
			this.skin = e.detail.value;
		},
		goToLogin(){
			this.logout();
			//#ifdef MP-WEIXIN
			this.redirectTo("/pages/login/wx");
			//#endif
			//#ifdef H5
			this.redirectTo("/pages/login/web");
			//#endif
			//#ifdef APP-PLUS
			this.redirectTo("/pages/login/app");
			//#endif
		}
	}
};
</script>

<style lang="scss">
.m-setting {
	height: 100vh;
	background: #f7f7f7;
	.m-list {
		.logo-box {
			height: 160rpx;
			.logo {
				height: 120rpx;
				width: 120rpx;
				border-radius: 50%;
				background: #f7f7f7;
				background: rgba(0, 0, 0, 0.1);
				padding: 10rpx;
			}
		}
		.line {
			height: 20rpx;
			background: transparent;
			&::after {
				position: absolute;
				top: 0;
				left: 0;
				-webkit-box-sizing: border-box;
				box-sizing: border-box;
				width: 200%;
				height: 200%;
				border-radius: inherit;
				content: ' ';
				-webkit-transform: scale(0.5);
				-ms-transform: scale(0.5);
				transform: scale(0.5);
				-webkit-transform-origin: 0 0;
				-ms-transform-origin: 0 0;
				transform-origin: 0 0;
				pointer-events: none;
			}
		}
	}
}
</style>
