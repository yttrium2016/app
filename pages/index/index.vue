<template>
	<view>
		<home v-if="homeType == 'home'"></home>
		<info v-if="homeType == 'mark'"></info>
		<target v-if="homeType == 'favor'"></target>
		<my v-if="homeType == 'people'"></my>
		<!-- tabbar -->
		<view class="cu-bar tabbar bg-brick shadow foot">
			<view class="action" data-cur="home" @tap="barTap">
				<view class="cuIcon-cu-image"><text class="lg text-while" :class="homeType == 'home' ? 'cuIcon-homefill' : 'cuIcon-home'"></text></view>
				<view class="text-while">首页</view>
			</view>
			<view class="action" data-cur="mark" @tap="barTap">
				<view class="cuIcon-cu-image"><text class="lg text-while " :class="homeType == 'mark' ? 'cuIcon-markfill' : 'cuIcon-mark'"></text></view>
				<view class="text-while">功能</view>
			</view>
			<view class="action" data-cur="favor" @tap="barTap">
				<view class="cuIcon-cu-image"><text class="lg text-while" :class="homeType == 'favor' ? 'cuIcon-favorfill' : 'cuIcon-favor'"></text></view>
				<view class="text-while">打卡</view>
			</view>
			<view class="action" data-cur="people" @tap="barTap">
				<view class="cuIcon-cu-image"><text class="lg text-while " :class="homeType == 'people' ? 'cuIcon-peoplefill' : 'cuIcon-people'"></text></view>
				<view class="text-while">我的</view>
			</view>
		</view>
	</view>
</template>

<script>
import { createNamespacedHelpers, mapGetters, mapActions } from 'vuex';
const { mapActions: settingActions, mapGetters: settingGetters } = createNamespacedHelpers('setting');
import Home from '@/pages/index/home.vue';
import Target from '@/pages/index/target.vue';
import My from '@/pages/index/my.vue';
import Info from '@/pages/index/info.vue';
export default {
	components: {
		Home,
		Info,
		Target,
		My
	},
	data() {
		return {
			data: {}
		};
	},
	onLoad() {
		
	},
	computed: {
		...settingGetters(['homeType'])
	},
	methods: {
		...settingActions(['setHomeType']),
		barTap(e) {
			this.setHomeType(e.currentTarget.dataset.cur);
		}
	}
};
</script>

<style lang="scss"></style>
