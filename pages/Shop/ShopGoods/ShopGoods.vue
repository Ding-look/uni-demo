<template>
	<div>
		<div class="goods">
			<scroll-view class="menu-wrapper" scroll-y>
				<ul>
					<!--current-->
					<li class="menu-item" v-for="(good, index) in shopGoods" :key="index" :class="currentIndex === index && 'current'" @click="clickMenuItem(index)">
						<span class="text bottom-border-1px">
							<img class="icon" :src="good.icon" v-if="good.icon" />
							{{ good.name }}
						</span>
					</li>
				</ul>
			</scroll-view>
			<scroll-view class="foods-wrapper" scroll-y :scroll-top="scrollTo" scroll-with-animation @scroll="updateScrollY">
				<ul ref="foodUL">
					<li class="food-list-hook" v-for="(good, index) in shopGoods" :key="index">
						<h1 class="title">{{ good.name }}</h1>
						<ul id="foodList">
							<li class="food-item bottom-border-1px" v-for="(food, i) in good.foods" :key="i" @click="showFood(food)">
								<div class="icon"><img width="57" height="57" :src="food.icon" /></div>
								<div class="content">
									<h2 class="name">{{ food.name }}</h2>
									<p class="desc">{{ food.description }}</p>
									<div class="extra">
										<span class="count">月售{{ food.sellCount }}份</span>
										<span>好评率{{ food.rating }}%</span>
									</div>
									<div class="price">
										<span class="now">￥{{ food.price }}</span>
										<span class="old" v-if="food.oldPrice">￥{{ food.oldPrice }}</span>
									</div>
									<div class="cartcontrol-wrapper">
										<!-- 加减数量组件components/CartControl -->
										<CartControl :food="food" :shopGoodsIndex="index" :foodsIndex="i" />
									</div>
								</div>
							</li>
						</ul>
					</li>
				</ul>
			</scroll-view>
			<!-- 加减数量组件components/ShopCart -->
			<ShopCart />
		</div>
		<!-- 食物详情组件components/Food -->
		<Food :food="food" ref="food" />
	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import CartControl from '../../../components/CartControl/CartControl.vue';
import Food from '../../../components/Food/Food.vue';
import ShopCart from '../../../components/ShopCart/ShopCart.vue';
export default {
	components: {
		CartControl,
		Food,
		ShopCart
	},
	data() {
		return {
			scrollY: 0, // 右侧滑动的Y轴坐标(根据滑动实时更新)
			tops: [], // 所有右侧分类li的top坐标数组(数据初始化时更新)
			foodsScroll: {}, // 保存右侧滑动对象
			food: {}, // 需要显示的食物对象
			scrollTo: 0	// 自动滚动目标位置
		};
	},
	mounted() {
		// 组件初始化完成后获取商品数据
		this.getShopGoods();
		// 组件初始化完成计算右侧列表所有li的top坐标
		this.initTops();
	},
	computed: {
		...mapState('shop', ['shopGoods']),

		currentIndex() {
			let currentIndex = 0;
			const { tops, scrollY } = this;
			// 根据右侧列表每个li的top坐标和右侧列表当前y坐标计算左侧列表的变化样式(增加一个距离优化用户体验)
			const distance = 100;
			tops.findIndex((item, index) => {
				// 如果y坐标>=当前元素top坐标并且<下一个元素的top坐标就设置currentIndex
				if (scrollY >= item - distance && scrollY < tops[index + 1] - distance) {
					currentIndex = index;
					return currentIndex;
				} else if (scrollY >= item - distance && index === tops.length - 1) {
					// 如果y坐标>=当前元素top坐标并且当前元素是最后一个元素就设置currentIndex
					currentIndex = index;
					return currentIndex;
				}
			});
			return currentIndex;
		}
	},
	methods: {
		...mapActions('shop', ['getShopGoods']),

		// 初始化计算右侧列表每个li的top坐标
		initTops() {
			let _top = 0;
			let tops = [];
			// 获取右侧滑动列表的li数组
			setTimeout(() => {
				const query = uni.createSelectorQuery().in(this);
				const nodes = query.selectAll('.food-list-hook');
				// 遍历dom节点计算每个li的top坐标
				nodes.fields({size: true}, (data) => {
					data.forEach(({height}, index) => {
						this.tops.push(_top)
						_top += height
					})
				}).exec()
			}, 1000)
		},

		// 切换左侧菜单item并联动右侧列表自动滚动到相应位置
		clickMenuItem(index) {
			let { scrollY, tops, foodsScroll } = this;
			this.scrollY = tops[index]
			this.scrollTo = tops[index]
		},
		
		// 根据用户滚动右侧列表更改scrollY属性
		updateScrollY (e) {
			const { scrollTop } = e.detail
			this.scrollY = scrollTop
		},

		// 显示food详情组件
		showFood(food) {
			this.food = food;
			this.$refs.food.toggleShow();
		}
	}
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../../common/stylus/mixins.styl'

.goods
	display flex
	position absolute
	top 195px
	bottom 46px
	width 100%
	background #fff
	overflow hidden
	.menu-wrapper
		flex 0 0 80px
		width 80px
		background #f3f5f7
		.menu-item
			display table
			height 54px
			width 80px
			padding 0 12px
			line-height 14px
			&.current
				position relative
				z-index 10
				margin-top -1px
				background #fff
				color $green
				font-weight 700
				.text
					border-none()
			.icon
				display inline-block
				vertical-align top
				width 12px
				height 12px
				margin-right 2px
				background-size 12px 12px
				background-repeat no-repeat
			.text
				display table-cell
				width 56px
				vertical-align middle
				bottom-border-1px(rgba(7, 17, 27, 0.1))
				font-size 12px
	.foods-wrapper
		flex 1
		.title
			padding-left 14px
			height 26px
			line-height 26px
			border-left 2px solid #d9dde1
			font-size 12px
			color rgb(147, 153, 159)
			background #f3f5f7
		.food-item
			display flex
			margin 18px
			padding-bottom 18px
			bottom-border-1px(rgba(7, 17, 27, 0.1))
			&:last-child
				border-none()
				margin-bottom 0
			.icon
				flex 0 0 57px
				margin-right 10px
				img
					width 57px
					height 57px
			.content
				flex 1
				.name
					margin 2px 0 8px 0
					height 14px
					line-height 14px
					font-size 14px
					color rgb(7, 17, 27)
				.desc, .extra
					line-height 10px
					font-size 10px
					color rgb(147, 153, 159)
				.desc
					line-height 12px
					margin-bottom 8px
				.extra
					.count
						margin-right 12px
				.price
					font-weight 700
					line-height 24px
					.now
						margin-right 8px
						font-size 14px
						color rgb(240, 20, 20)
					.old
						text-decoration line-through
						font-size 10px
						color rgb(147, 153, 159)
				.cartcontrol-wrapper
					position absolute
					right 0
					bottom 12px
</style>
