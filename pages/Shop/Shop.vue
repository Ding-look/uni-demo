<template>
	<div>
		<!-- components/ShopHeader -->
		<ShopHeader />
		<div class="tab">
			<div class="tab-item"><view hover-class="view-hover" :class="tabLinkClass[0]" @click="switchComponent(0)">点餐</view></div>
			<div class="tab-item"><view hover-class="view-hover" :class="tabLinkClass[1]" @click="switchComponent(1)">评价</view></div>
			<div class="tab-item"><view hover-class="view-hover" :class="tabLinkClass[2]" @click="switchComponent(2)">商家</view></div>
		</div>
		<!-- components/ShopGoods -->
		<ShopGoods v-show="showComponent(0)" />
		<!-- components/ShopRatings -->
		<ShopRatings v-show="showComponent(1)" />
		<!-- components/ShopInfo -->
		<ShopInfo v-show="showComponent(2)" />
	</div>
</template>

<script>
import ShopHeader from "../../components/ShopHeader/ShopHeader.vue"
import ShopGoods from "./ShopGoods/ShopGoods.vue";
import ShopRatings from "./ShopRatings/ShopRatings.vue";
import ShopInfo from "./ShopInfo/ShopInfo.vue";
export default {
	components: {
		ShopHeader,
		ShopGoods,
		ShopRatings,
		ShopInfo
	},
	data() {
		return {
			currentComponentIndex: 0 // 当前显示组件索引, 0 ShopGoods, 1 ShopRatings, 2 ShopInfo
		};
	},
	computed: {
		// tabItem按钮绑定样式
		tabLinkClass () {
			const tClass = []
			tClass[this.currentComponentIndex] = 'router-link-active'
			return tClass
		}
	},
	methods: {
		// 切换展示组件
		switchComponent(index) {
			this.currentComponentIndex = index;
		},
		// 展示组件
		showComponent(index) {
			return this.currentComponentIndex === index;
		}
	}
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl'

.tab
	height 40px
	line-height 40px
	background #fff
	bottom-border-1px(rgba(7, 17, 27, 0.1))
	.tab-item
		float left
		width 33.33333%
		text-align center
		font-size 14px
		color rgb(77, 85, 93)
		view
			display block
			position relative
			color #999999
			&.router-link-active
				color #02a774
				&::after
					content ''
					position absolute
					left 50%
					bottom 1px
					width 35px
					height 2px
					transform translateX(-50%)
					background #02a774
</style>
