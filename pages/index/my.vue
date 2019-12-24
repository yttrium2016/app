<template>
	<view>
		<scroll-view class="my" :scroll-y="true" :scroll-x="false">
			<view class="my-header bg-brick">
				<view class="label-box flex align-center" :style="'padding-top:' + statusBar + 'px'">
					<view class="flex-sub text-xxl text-bold text-white">我的</view>
					<view style="position: relative;" @tap="newView('../message/message')">
						<view class="cu-tag badge"></view>
						<text class="cuIcon-messagefill icon margin-left text-bold"></text>
					</view>
					<view style="position: relative;" @tap="newView('../setting/setting')">
						<view class="cu-tag badge"></view>
						<text class="cuIcon-settingsfill icon margin-left text-bold"></text>
					</view>
					<!-- #ifdef MP-WEIXIN -->
					<!-- 微信小程序 占位置 -->
					<view style="width: 180rpx;"></view>
					<!-- #endif -->
				</view>
			</view>
			<view class="my-title-box">
				<view class="flex align-center padding-left-sm" style="height: calc(100% - 110rpx);">
					<view class="cu-avatar xl round margin-left-sm" :style="'background-image:url('+userInfo.avatarUrl+');'"></view>
					<view class="margin-left flex-sub">
						<view class="text-xl text-bold padding-bottom-xs">{{userInfo.nickName}}</view>
						<view class="cu-tag round bg-yellow text-white" style="height: 15px;line-height: 15px;">Lv.1</view>
					</view>
					<view class="m-tag shadow">已使用{{days}}天</view>
				</view>
				<view class="flex padding-lr-sm padding-bottom-sm" style="height: 110rpx;">
					<view @tap="$msg('开发中..')" class="m-button flex-sub margin-right-xs flex  justify-center align-center">
						<text class="icon cuIcon-qr_code"></text>
						<view class="margin-left-xs">我的二维码</view>
					</view>
					<view class="margin-tb" style="width: 2rpx; background: rgba(0,0,0,.15);"></view>
					<view @tap="$msg('开发中..')" class="m-button flex-sub margin-left-xs flex align-center justify-center">
						<text class="icon cuIcon-friend"></text>
						<view class="margin-left-xs">添加朋友</view>
					</view>
				</view>
				<!-- 方块内 -->
			</view>
			<!-- card-menu margin-top sm-border-->
			<view class="m-list cu-list menu" >
				<!-- #ifdef MP-WEIXIN -->
				<view class="cu-item arrow">
					<button class="cu-btn content" open-type="contact">
						<text class="cuIcon-btn text-olive"></text>
						<text class="text-grey">微信客服</text>
					</button>
				</view>
				<!-- #endif -->
				
				<view class="cu-item arrow" @tap="$msg('开发中...')">
					<view class="content">
						<text class="cuIcon-settingsfill text-grey"></text>
						<text class="text-grey">系统设置</text>
					</view>
				</view>
				
				
				<view class="bg-mgrey flex line"></view>
				
				
				<view class="cu-item arrow" @tap="goToLogin">
					<view class="content">
						<text class="cuIcon-circlefill text-grey"></text>
						<text class="text-grey">退出登录</text>
					</view>
				</view>
				
				<view class="cu-item arrow">
					<view class="content">
						<image src="/static/logo.png" class="png" mode="aspectFit"></image>
						<text class="text-grey">图片 + 标题</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<button class="cu-btn content" open-type="contact">
						<text class="cuIcon-btn text-olive"></text>
						<text class="text-grey">Open-type 按钮</text>
					</button>
				</view>
				<view class="bg-mgrey flex line"></view>
				
				<view class="cu-item arrow" @tap="goToLogin()">
					<view class="content">
						<text class="cuIcon-emojiflashfill text-pink"></text>
						<text class="text-grey">头像组</text>
					</view>
					<view class="action">
						<view class="cu-avatar-group">
							<view class="cu-avatar round sm" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg);"></view>
							<view class="cu-avatar round sm" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg);"></view>
							<view class="cu-avatar round sm" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg);"></view>
							<view class="cu-avatar round sm" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big91012.jpg);"></view>
						</view>
						<text class="text-grey text-sm">4 人</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-btn text-green"></text>
						<text class="text-grey">按钮</text>
					</view>
					<view class="action">
						<button class="cu-btn round bg-green shadow">
							<text class="cuIcon-upload"></text>
							上传
						</button>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-tagfill text-red  margin-right-xs"></text>
						<text class="text-grey">标签</text>
					</view>
					<view class="action">
						<view class="cu-tag round bg-orange light">音乐</view>
						<view class="cu-tag round bg-olive light">电影</view>
						<view class="cu-tag round bg-blue light">旅行</view>
					</view>
				</view>
				<view class="cu-item arrow" >
					<view class="content">
						<text class="cuIcon-warn text-green"></text>
						<text class="text-grey">文本</text>
					</view>
					<view class="action"><text class="text-grey text-sm">小目标还没有实现！</text></view>
				</view>
				<view class="cu-item">
					<view class="content padding-tb-sm">
						<view>
							<text class="cuIcon-clothesfill text-blue margin-right-xs"></text>
							多行Item
						</view>
						<view class="text-gray text-sm">
							<text class="cuIcon-infofill margin-right-xs"></text>
							小目标还没有实现！
						</view>
					</view>
					<view class="action"><switch class="switch-sex" @change="SwitchSex" :class="skin ? 'checked' : ''" :checked="skin ? true : false"></switch></view>
				</view>
			</view>

			<view style="height: 170rpx;"></view>
		</scroll-view>
	</view>
</template>
<script>
import { createNamespacedHelpers, mapGetters, mapActions } from 'vuex';
const { mapActions: appActions, mapGetters: appGetters } = createNamespacedHelpers('app');
export default {
	data() {
		return {
			skin: null,
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
		};
	},
	computed: {
		...appGetters(['statusBar']),
		days(){
			let now = new Date();
			let create = this.$getDate(this.userInfo.createDate)
			return ((now.getTime() - create.getTime())/1000/60/60/24).toFixed(0);
		}
	},
	methods: {
		...mapActions(['logout']),
		goToLogin(){
			this.logout();
			//#ifdef MP-WEIXIN
			this.toView("/pages/login/wx");
			//#endif
			//#ifdef H5
			this.toView("/pages/login/web");
			//#endif
			//#ifdef APP-PLUS
			this.toView("/pages/login/app");
			//#endif
		},
		SwitchSex(e) {
			this.skin = e.detail.value;
		}
	}
};
</script>

<style lang="scss">
.my {
	background-color: #fff;
	.my-header {
		width: 1050rpx;
		height: calc(10vh + 210rpx);
		margin-left: -150rpx;
		padding: 150rpx;
		border-radius: 0 0 100% 100%;
		.label-box {
			position: absolute;
			top: 0rpx;
			left: 0rpx;
			width: 750rpx;
			height: 10vh;
			padding: 0 55rpx;
			font-size: 42rpx;
			font-weight: 700;
			.icon {
				color: #fff;
				font-size: 48rpx;
			}
		}
	}
	.my-title-box {
		width: 650rpx;
		margin: 50rpx;
		height: 320rpx;
		margin-top: -210rpx;
		margin-bottom: 30rpx;
		background: rgba(255, 255, 255, 0.8);
		border-radius: 24rpx;
		box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.15);
		.m-tag {
			padding: 5rpx 10rpx;
			padding-left: 25rpx;
			border-top-left-radius: 20rpx;
			border-bottom-left-radius: 20rpx;
			background: rgba(0, 0, 0, 0.15);
			color: #f6f6f6;
		}
		.m-button {
			border-radius: 20rpx;
			opacity: 0.7;
			background: transparent;
			color: #333;
			.icon {
				font-size: 40rpx;
			}
		}
	}
	.m-list {
		.line {
			height: 20rpx;
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
