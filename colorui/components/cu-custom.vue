<template>
	<view>
		<view class="cu-custom" :style="[{ height: customBar + 'px' }]">
			<view class="cu-bar fixed" :style="style" :class="[bgImage != '' ? 'none-bg text-white bg-img' : '', bgColor]">
				<view class="action" @tap="BackPage" v-if="isBack">
					<text class="cuIcon-back"></text>
					<slot name="backText"></slot>
				</view>
				<view class="content" :style="[{ top: statusBar + 'px' }]"><slot name="content"></slot></view>
				<slot name="right"></slot>
			</view>
		</view>
	</view>
</template>

<script>
import { createNamespacedHelpers, mapGetters, mapActions } from 'vuex';
const { mapActions: appActions, mapGetters: appGetters } = createNamespacedHelpers('app');
export default {
	data() {
		return {
			// statusBar: this.StatusBar,
			// customBar: this.CustomBar
		};
	},
	name: 'cu-custom',
	computed: {
		...appGetters(['statusBar', 'customBar']),
		style() {
			var statusBar = this.statusBar;
			var customBar = this.customBar;
			var bgImage = this.bgImage;
			var style = `height:${customBar}px;padding-top:${statusBar}px;`;
			if (this.bgImage) {
				style = `${style}background-image:url(${bgImage});`;
			}
			return style;
		}
	},
	props: {
		bgColor: {
			type: String,
			default: ''
		},
		isBack: {
			type: [Boolean, String],
			default: false
		},
		bgImage: {
			type: String,
			default: ''
		}
	},
	methods: {
		BackPage() {
			uni.navigateBack({
				delta: 1
			});
		}
	}
};
</script>

<style></style>
