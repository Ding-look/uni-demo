<template>
	<section class="order">
		<section class="order_no_login" v-if="!userInfo.id">
			<img class="background" :src="`${publicPath}static/images/person.png`" />
			<h3>登录后查看外卖订单</h3>
			<button @click="toLogin">立即登录</button>
		</section>
		<!-- 登录后内容 -->
		<section class="order_login" v-else>
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					<text class="cuIcon-title text-orange "></text> 订单列表
				</view>
			</view>
			<view class="cu-list menu-avatar" v-if="orderList.length">
				<view href="javascrip:;" class="cu-item arrow" v-for="(order, index) in orderList" :key="index" hover-class="view-hover">
					<view class="cu-avatar round lg" :style="'background-image:url('+order.img+')'"></view>
					<view class="content">
						<view class="text-grey">{{order.date}}</view>
						<view class="text-gray text-sm flex">
							<view class="text-cut text-black">
								共{{order.count}}件商品
							</view> 
						</view>
						<view class="text-gray text-sm flex">
							<view class="text-cut text-orange">
								{{order.desc}}
							</view> 
						</view>
					</view>
				</view>
			</view>
			<!-- 显示数据加载前样式 -->
			<ul class="loading-list" v-else>
				<li v-for="(item, index) in 3" :key="index"><img class="loading-img" :src="`${publicPath}/static/images/shop_back.svg`" alt="back" /></li>
			</ul>
		</section>
	</section>
</template>

<script>
import {mapState, mapActions} from "vuex"
export default {
	mounted () {
		// 组件初始化完成请求订单列表数据
		this.getOrderList()
		
		// app兼容代码
		if (process.env.VUE_APP_PLATFORM === 'app-plus') {
			this.publicPath = './'
		}
	},
	data () {
		return {
			publicPath: process.env.BASE_URL
		}
	},
	computed: {
		...mapState('user', ['userInfo']),
		...mapState('order', ['orderList'])
	},
	methods: {
		...mapActions('order', ['getOrderList']),
		
		// 去登录
		toLogin () {
			uni.navigateTo({
				url: '../Login/Login'
			})
		}
	}
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl'

.order // 订单
	width 100%
	.header
		background-color #02a774
		position fixed
		z-index 100
		left 0
		top 0
		width 100%
		height 45px
		.header_search
			position absolute
			left 15px
			top 50%
			transform translateY(-50%)
			width 10%
			height 50%
			.icon-sousuo
				font-size 25px
				color #fff
		.header_title
			position absolute
			top 50%
			left 50%
			transform translate(-50%, -50%)
			width 50%
			color #fff
			text-align center
			.header_title_text
				font-size 20px
				color #fff
				display block
		.header_login
			font-size 14px
			color #fff
			position absolute
			right 15px
			top 50%
			transform translateY(-50%)
			.header_login_text
				color #fff
	.order_no_login
		text-align center
		>img
			width 225px
			height 225px
			.background
				display block
		>h3
			padding 10px 0
			font-size 17px
			color #6a6a6a
		>button
			display inline-block
			background #02a774
			font-size 14px
			color #fff
			border 0
			outline none
			border-radius 5px
			padding 0 10px
			&.button-hover
				opacity .7
	.order_login
		.cu-list
			.view-hover
				background-color rgba(0,0,0,.1)
		.loading-list
			margin-top 5px
			.loading-img 
				width 100%
				height 100px
	
</style>
