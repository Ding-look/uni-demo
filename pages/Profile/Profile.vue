<template>
	<section class="profile">
		<section class="profile-number">
			<view class="profile-link" hover-class="view-hover"  @click="loginLink">
				<div class="profile_image">
					<i class="iconfont icon-person" v-if="!userInfo.user_photo"></i>
					<img :src="publicPath + userInfo.user_photo" v-else />
					<!-- <open-data type="userAvatarUrl" v-else></open-data> -->
				</div>
				<div class="user-info">
					<p class="user-info-top">
						<span v-if="!userInfo.name">登录/注册</span>
						<span v-else>{{userInfo.name}}</span>
						<!-- <open-data type="userNickName" v-else></open-data> -->
					</p>
					<p class="user-info-phone">
						<span class="user-icon"><i class="iconfont icon-shouji icon-mobile"></i></span>
						<span class="icon-mobile-number">{{ userPhone }}</span>
					</p>
				</div>
				<span class="arrow"><i class="iconfont icon-jiantou1"></i></span>
			</view>
		</section>
		<section class="profile_info_data border-1px">
			<ul class="info_data_list">
				<view class="info_data_link" hover-class="view-hover">
					<span class="info_data_top">
						<span>{{userBalance}}</span>
						元
					</span>
					<span class="info_data_bottom">我的余额</span>
				</view>
				<view class="info_data_link" hover-class="view-hover">
					<span class="info_data_top">
						<span>{{userCoupon}}</span>
						个
					</span>
					<span class="info_data_bottom">我的优惠</span>
				</view>
				<view class="info_data_link" hover-class="view-hover">
					<span class="info_data_top">
						<span>{{userIntegral}}</span>
						分
					</span>
					<span class="info_data_bottom">我的积分</span>
				</view>
			</ul>
		</section>
		<section class="profile_my_order border-1px">
			<!-- 积分商城 -->
			<view class="my_order" hover-class="view-hover">
				<span><i class="iconfont icon-jifen"></i></span>
				<div class="my_order_div">
					<span>积分商城</span>
					<span class="my_order_icon"><i class="iconfont icon-jiantou1"></i></span>
				</div>
			</view>
			<!-- 会员卡 -->
			<view class="my_order" hover-class="view-hover">
				<span><i class="iconfont icon-vip"></i></span>
				<div class="my_order_div">
					<span>会员卡</span>
					<span class="my_order_icon"><i class="iconfont icon-jiantou1"></i></span>
				</div>
			</view>
		</section>
	</section>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
	data() {
		return {
			publicPath: process.env.BASE_URL
		}
	},
	mounted() {
		// app兼容代码
		if (process.env.VUE_APP_PLATFORM === 'app-plus') {
			this.publicPath = './'
		}
	},
	computed: {
		...mapState('user', ['userInfo']), 
		
		// 判断显示用户余额
		userBalance () {
			return this.userInfo.balance ? this.userInfo.balance.toFixed(2) : '0.00'
		},
		
		// 判断显示用户优惠
		userCoupon () {
			return this.userInfo.coupon || 0
		},
		
		// 判断显示用户积分
		userIntegral () {
			return this.userInfo.integral || 0
		},
		
		// 判断是否显示显示手机号
		userPhone() {
			return this.userInfo.phone || '暂无绑定手机号';
		}
	},
	methods: {
		...mapActions('user', ['removeLocalUserInfo']),
		
		// 判断去往那个链接(有用户信息提示是否退出登录, 没有用户信息去登录)
		loginLink() {
			if (this.userInfo.id) {
				this.logout()
			} else {
				uni.navigateTo({
				    url: '../Login/Login'
				});
			}
		},
		// 退出登录
		logout() {
			const vm = this
			uni.showModal({
				title: '确定退出登录？',
				success ({confirm, cancel}) {
					if (confirm) {
						// 清除用户信息
						vm.removeLocalUserInfo();
					}
				}
			})
		}
	}
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl'

.profile // 我的
	width 100%
	overflow hidden
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
	.profile-number
		.profile-link
			clearFix()
			position relative
			display block
			background #02a774
			padding 20px 10px
			.profile_image
				float left
				width 60px
				height 60px
				border-radius 50%
				overflow hidden
				vertical-align top
				.icon-person
					background #e4e4e4
					font-size 62px
				img 
					width 100%
					height 100%
			.user-info
				float left
				margin-top 8px
				margin-left 15px
				p
					font-weight 700
					font-size 18px
					color #fff
					&.user-info-top
						padding-bottom 8px
					&.user-info-phone
						display flex
						align-items center
					.user-icon
						display inline-block
						margin-left -15px
						margin-right 5px
						width 20px
						height 20px
						.icon-mobile
							font-size 30px
							vertical-align text-top
					.icon-mobile-number
						font-size 14px
						color #fff
						margin-left 10px
						margin-top: 8px
			.arrow
				width 20px
				height 20px
				position absolute
				right 15px
				top 40%
				.icon-jiantou1
					color #fff
					font-size 12px
					line-height 20px
	.profile_info_data
		bottom-border-1px(#e4e4e4)
		width 100%
		background #fff
		overflow hidden
		.info_data_list
			clearFix()
			.info_data_link
				float left
				width 33%
				text-align center
				border-right 1px solid #f1f1f1
				.info_data_top
					display block
					width 100%
					font-size 14px
					color #333
					padding 15px 5px 10px
					span
						display inline-block
						font-size 30px
						color #f90
						font-weight 700
						line-height 30px
				.info_data_bottom
					display inline-block
					font-size 14px
					color #666
					font-weight 400
					padding-bottom 10px
			.info_data_link:nth-of-type(2)
				.info_data_top
					span
						color #ff5f3e
			.info_data_link:nth-of-type(3)
				border 0
				.info_data_top
					span
						color #6ac20b
	.profile_my_order
		background #fff
		.my_order
			display flex
			align-items center
			padding-left 15px
			border-bottom 1px solid #f1f1f1
			>span
				display flex
				align-items center
				width 20px
				height 20px
				>.iconfont
					margin-left -10px
					font-size 30px
				.icon-order-s
					color #02a774
				.icon-jifen
					color #ff5f3e
				.icon-vip
					color #f90
				.icon-fuwu
					color #02a774
			.my_order_div
				width 100%
				padding 18px 10px 18px 0
				font-size 16px
				color #333
				display flex
				justify-content space-between
				span
					display block
				.my_order_icon
					width 10px
					height 10px
					.icon-jiantou1
						color #bbb
						font-size 10px
						
</style>
