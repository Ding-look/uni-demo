<template>
	<section class="search">
		<div class="search_form" @submit.prevent="search">
			<input type="search" placeholder="请输入商家名称" class="search_input" v-model="keyword" />
			<button class="search_submit" @click="filterSearch">搜索</button>
		</div>
		<scroll-view class="list" v-if="showResult" scroll-y>
			<ul class="list_container">
				<li v-for="item in filterShops" :key="item.id" class="list_li" hover-class="view-hover" @click="toShop">
					<section class="item_left"><img :src="item.image_path" class="restaurant_img" /></section>
					<section class="item_right">
						<div class="item_right_text">
							<p>
								<span>{{ item.name }}</span>
							</p>
							<p>月售 {{ item.month_sales || item.recent_order_num }} 单</p>
							<p>{{ item.delivery_fee || item.float_minimum_order_amount }} 元起送 / 距离{{ item.distance }}</p>
						</div>
					</section>
				</li>
			</ul>
		</scroll-view>
		<div class="search_none" v-else><img class="no-result" :src="`${publicPath}static/images/no_result.jpg`" alt="无结果" /></div>
	</section>
</template>

<script>
export default {
	data() {
		return {
			publicPath: process.env.BASE_URL,
			keyword: '', // 保存输入内容
			searchShops: [
				{
					id: 1,
					name: '东北烧烤',
					image_path: 'https://fuss10.elemecdn.com/8/40/02872ce8aefe75c16d3190e75ad61jpeg.jpeg',
					recent_order_num: 10,
					float_minimum_order_amount: 5,
					distance: 1000
				},
				{
					id: 2,
					name: '东北火爆龙虾',
					image_path: 'https://fuss10.elemecdn.com/8/40/02872ce8aefe75c16d3190e75ad61jpeg.jpeg',
					recent_order_num: 6,
					float_minimum_order_amount: 5,
					distance: 1000
				},
				{
					id: 3,
					name: '东北饺子馆',
					image_path: 'https://fuss10.elemecdn.com/8/40/02872ce8aefe75c16d3190e75ad61jpeg.jpeg',
					recent_order_num: 12,
					float_minimum_order_amount: 5,
					distance: 1000
				},
				{
					id: 4,
					name: '梁小猴炒饭',
					image_path: 'https://fuss10.elemecdn.com/8/40/02872ce8aefe75c16d3190e75ad61jpeg.jpeg',
					recent_order_num: 5,
					float_minimum_order_amount: 5,
					distance: 1000
				},
				{
					id: 5,
					name: '东东寿司烤肉',
					image_path: 'https://fuss10.elemecdn.com/8/40/02872ce8aefe75c16d3190e75ad61jpeg.jpeg',
					recent_order_num: 30,
					float_minimum_order_amount: 5,
					distance: 1000
				},
				{
					id: 6,
					name: '华莱士鸡腿汉堡',
					image_path: 'https://fuss10.elemecdn.com/8/40/02872ce8aefe75c16d3190e75ad61jpeg.jpeg',
					recent_order_num: 27,
					float_minimum_order_amount: 5,
					distance: 1000
				},
				{
					id: 7,
					name: '东东披萨蛋糕',
					image_path: 'https://fuss10.elemecdn.com/8/40/02872ce8aefe75c16d3190e75ad61jpeg.jpeg',
					recent_order_num: 11,
					float_minimum_order_amount: 5,
					distance: 1000
				},
				{
					id: 8,
					name: '沙县小吃',
					image_path: 'https://fuss10.elemecdn.com/8/40/02872ce8aefe75c16d3190e75ad61jpeg.jpeg',
					recent_order_num: 34,
					float_minimum_order_amount: 5,
					distance: 1000
				}
			],
			filterShops: [] // 保存过滤后的商家列表
		};
	},
	mounted() {
		this.filterSearch()
	},
	computed: {
		// 是否显示搜索结果
		showResult () {
			return this.filterShops.length > 0
		}
	},
	watch: {
		// 清空搜索内容自动显示列表所有数据
		keyword (value) {
			if (value === '') {
				this.filterSearch()
			}
			return value
		}
	},
	methods: {
		// 组件内容模拟搜索功能
		filterSearch() {
			// 返回过滤数据
			this.filterShops = this.searchShops.filter(shop => {
				return shop.name.indexOf(this.keyword) > -1;
			});
		},
		// 去商家页面
		toShop () {
			uni.navigateTo({
				url: '../Shop/Shop'
			})
		}
	}
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl'

.search
	width 100%
	height 100%
	overflow hidden
	.search_form
		display flex
		justify-content center
		padding 12px 0;
		background-color #fff
		input
			height 35px
			padding 0 4px
			border-radius 2px
			font-weight bold
			outline none
			&.search_input
				width 74%
				border 4px solid #f2f2f2
				font-size 14px
				color #333
				background-color #f2f2f2
		button
			&.search_submit
				font-size 16px
				color #fff
				background-color #02a774
				height 35px
				line-height 35px
				padding 0 14px
				margin 0
				margin-left -10px
				border-top-left-radius 0
				border-bottom-left-radius 0
				border-top-right-radius 2px
				border-bottom-right-radius 2px
				&::after
					border 0
	.list
		height 'calc(100vh - %s)' % (59px)
		overflow hidden
		.list_container
			background-color #fff
			.list_li
				display flex
				justify-content center
				padding 10px
				border-bottom 1px solid $bc
				.item_left
					margin-right 10px
					.restaurant_img
						width 50px
						height 50px
						display block
				.item_right
					font-size 12px
					flex 1
					.item_right_text
						p
							line-height 12px
							margin-bottom 6px
							&:last-child
								margin-bottom 0
	.search_none
		margin 0 auto
		color #333
		background-color #fff
		text-align center
		margin-top 0.125rem
		.no-result
			width 100%
			height 449px
</style>
