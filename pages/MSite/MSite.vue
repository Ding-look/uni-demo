<template>
	<section class="msite">
		<!-- 首页导航 -->
		<nav class="msite_nav">
			<div class="swiper-container" v-if="categorysArr.length">
				<swiper class="swiper-wrapper" indicator-dots circular>
					<swiper-item class="swiper-slide" v-for="(categorys, index) in categorysArr" :key="index">
						<view class="link_to_food" hover-class="view-hover" v-for="category in categorys" :key="category.id">
							<div class="food_container"><img :src="publicPath + category.image_url" /></div>
							<span>{{ category.title }}</span>
						</view>
					</swiper-item>
				</swiper>
			</div>
			<!-- 显示数据加载前样式 -->
			<img :src="`${publicPath}static/images/msite_back.svg`" alt="back" v-else />
		</nav>
		<!-- 首页附近商家 -->
		<div class="msite_shop_list">
			<div class="shop_header">
				<i class="iconfont icon-xuanxiang"></i>
				<span class="shop_header_title">附近商家</span>
			</div>
			<!-- components/ShopList -->
			<ShopList />
		</div>
	</section>
</template>

<script>
import ShopList from '../../components/ShopList/ShopList.vue';
import { mapState, mapActions } from 'vuex';
export default {
	components: {
		ShopList
	},
	data() {
		return {
			publicPath: process.env.BASE_URL
		};
	},
	beforeMount() {
		// app兼容代码
		if (process.env.VUE_APP_PLATFORM === 'app-plus') {
			this.publicPath = './'
		}
	},
	mounted() {
		// 读取食品分类数据
		this.getCategorys();

		// 读取商家列表数据
		this.getShops();
	},
	computed: {
		...mapState('user', ['address', 'userInfo']),
		...mapState('shop', ['categorys']),

		/* 根据categorys数组转换为轮播图适应的二维数组
		  小数组元素个数最大为8个 */
		categorysArr() {
			const arr = [];
			let minArr = [];
			this.categorys.forEach(category => {
				if (minArr.length === 0) {
					arr.push(minArr);
				}
				minArr.push(category);
				if (minArr.length === 8) {
					minArr = [];
				}
			});
			return arr;
		}
	},
	methods: {
		...mapActions('shop', ['getCategorys', 'getShops'])
	}
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl'

.msite // 首页
	width 100%
	.miste-content-wrapper
		position fixed
		top 45px
		bottom 46px
		width 100%
	.msite_nav
		bottom-border-1px(#e4e4e4)
		margin-top 15px
		height 200px
		background #fff
		.swiper-container
			width 100%
			height 100%
			.swiper-wrapper
				width 100%
				height 100%
				.swiper-slide
					display flex
					justify-content center
					align-items flex-start
					flex-wrap wrap
					.link_to_food
						width 25%
						.food_container
							display block
							width 100%
							text-align center
							padding-bottom 10px
							font-size 0
							img
								display inline-block
								width 50px
								height 50px
						span
							display block
							width 100%
							text-align center
							font-size 13px
							color #666
	.msite_shop_list
		top-border-1px(#e4e4e4)
		margin-top 10px
		background #fff
		.shop_header
			display flex
			justify-content left
			padding 10px 10px 0
			.shop_icon
				margin-left 5px
				color #999
			.shop_header_title
				margin-left 4px
				color #999
				font-size 14px
				line-height 20px
				
.view-hover
	background-color rgba(0,0,0,.1)
	opacity .7
</style>
