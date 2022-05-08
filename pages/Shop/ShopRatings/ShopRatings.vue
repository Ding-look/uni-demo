<template>
	<scroll-view class="ratings" ref="ratings" scroll-y>
		<div class="ratings-content">
			<div class="overview">
				<div class="overview-left">
					<h1 class="score">{{ shopInfo.score }}</h1>
					<div class="title">综合评分</div>
					<div class="rank">高于周边商家99%</div>
				</div>
				<div class="overview-right">
					<div class="score-wrapper">
						<span class="title">服务态度</span>
						<Star :score="shopInfo.serviceScore" :size="36" v-if="shopInfo.id" />
						<span class="score">{{ shopInfo.serviceScore }}</span>
					</div>
					<div class="score-wrapper">
						<span class="title">商品评分</span>
						<Star :score="shopInfo.foodScore" :size="36" v-if="shopInfo.id" />
						<span class="score">{{ shopInfo.foodScore }}</span>
					</div>
					<div class="delivery-wrapper">
						<span class="title">送达时间</span>
						<span class="delivery">{{ shopInfo.deliveryTime }}分钟</span>
					</div>
				</div>
			</div>

			<div class="split"></div>

			<div class="ratingselect">
				<div class="rating-type border-1px">
					<span class="block positive" :class="selectTypeClass[2]" @click="setSelectType(2)">
						全部
						<span class="count">{{ allSize }}</span>
					</span>
					<span class="block positive" :class="selectTypeClass[0]" @click="setSelectType(0)">
						满意
						<span class="count">{{ positiveSize }}</span>
					</span>
					<span class="block negative" :class="selectTypeClass[1]" @click="setSelectType(1)">
						不满意
						<span class="count">{{ noPositiveSize }}</span>
					</span>
				</div>
				<div class="switch" :class="onlyShowTextClass" @click="toggleOnlyShowText">
					<span class="iconfont icon-check_circle"></span>
					<span class="text">只看有内容的评价</span>
				</div>
			</div>

			<div class="rating-wrapper">
				<ul>
					<li class="rating-item" v-for="(rating, index) in filterRatings" :key="index">
						<div class="avatar"><img width="28" height="28" :src="rating.avatar" /></div>
						<div class="content">
							<h1 class="name">{{ rating.username }}</h1>
							<div class="star-wrapper">
								<Star :score="rating.score" :size="24" />
								<span class="delivery">{{ rating.deliveryTime }}</span>
							</div>
							<p class="text">{{ rating.text }}</p>
							<div class="recommend">
								<span class="iconfont" :class="rating.rateType === 0 ? 'icon-thumb_up' : 'icon-thumb_down'"></span>
								<span class="item" v-for="(item, index) in rating.recommend" :key="index">{{ item }}</span>
							</div>
							<div class="time">{{ dateFormat(rating.rateTime) }}</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</scroll-view>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Star from '../../../components/Star/Star.vue';
import { dateFormat } from '../../../common/js/common.js';
export default {
	components: {
		Star 
	},
	data() {
		return {
			selectType: 0, // 0 满意, 1 不满意, 2: 全部
			onlyShowText: true // 保存只看有内容评价按钮状态
		};
	},
	mounted() {
		// 初始化评价数据
		this.getShopRatings();
	},
	computed: {
		...mapState('shop', ['shopInfo', 'shopRatings']),
		
		// selectType绑定样式
		selectTypeClass() {
			const selectTypeClass = []
			selectTypeClass[this.selectType] = 'active'
			return selectTypeClass
		},

		// 绑定只看有内容评价按钮样式
		onlyShowTextClass() {
			return this.onlyShowText ? 'on' : '';
		},

		// 计算全部数量
		allSize() {
			let size = 0;
			// 预防数组为空
			if (!this.shopRatings.length) {
				return size;
			}
			// 如果开启只看有评价的内容, 计算数量
			if (this.onlyShowText) {
				// 计数(text不为空+1)
				size = this.shopRatings.reduce((total, rating) => {
					const num = rating.text !== '' ? 1 : 0;
					return total + num;
				}, 0);
			} else {
				// 否则全部数量是评价列表的长度
				size = this.shopRatings.length;
			}
			return size;
		},

		// 计算满意数量
		positiveSize() {
			let size = 0;
			if (!this.shopRatings.length) {
				return size;
			}
			// 如果开启只看有评价的内容, 计算数量
			if (this.onlyShowText) {
				// 计数(text不为空+1) && (rateType === 0 满意 +1)
				size = this.shopRatings.reduce((total, rating) => {
					const num = rating.text !== '' && rating.rateType === 0 ? 1 : 0;
					return total + num;
				}, 0);
			} else {
				// 否则(rateType === 0 满意 +1),只计算满意类型
				size = this.shopRatings.reduce((total, rating) => {
					const num = rating.rateType === 0 ? 1 : 0;
					return total + num;
				}, 0);
			}
			return size;
		},

		// 计算不满意数量
		noPositiveSize() {
			let size = 0;
			if (!this.shopRatings.length) {
				return size;
			}
			// 如果开启只看有评价的内容, 计算数量
			if (this.onlyShowText) {
				// 计数(text不为空+1) && (rateType === 1 不满意 +1)
				size = this.shopRatings.reduce((total, rating) => {
					const num = rating.text !== '' && rating.rateType === 1 ? 1 : 0;
					return total + num;
				}, 0);
			} else {
				// 否则(rateType === 1 不满意 +1),只计算不满意类型
				size = this.shopRatings.reduce((total, rating) => {
					const num = rating.rateType === 1 ? 1 : 0;
					return total + num;
				}, 0);
			}
			return size;
		},

		// 计算过滤后的评价列表
		filterRatings() {
			const { shopRatings, onlyShowText, selectType } = this;
			// 过滤数据渲染到页面之后, 刷新滑动对象
			this.$nextTick(() => {
				this.scroll && this.scroll.refresh();
			});
			// 返回过滤后评价列表
			return shopRatings.filter(rating => {
				if (onlyShowText) {
					// 判断评价内容不为空 && (判断评级满意类型和当前选择类型一致 || 当前选择类型为全部)
					return rating.text !== '' && (rating.rateType === selectType || selectType === 2);
				} else {
					// 判断评级满意类型和当前选择类型一致 || 当前选择类型为全部
					return rating.rateType === selectType || selectType === 2;
				}
			});
		}
	},
	methods: {
		...mapActions('shop', ['getShopRatings']),

		// common/js/common.js
		dateFormat,

		// 设置selectType
		setSelectType(type) {
			this.selectType = type;
		},

		// 切换只看有内容评价按钮状态
		toggleOnlyShowText() {
			this.onlyShowText = !this.onlyShowText;
		}
	}
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../../common/stylus/mixins.styl'

.ratings
	position absolute
	top 195px
	bottom 0
	left 0
	width 100%
	overflow hidden
	background #fff
	.overview
		display flex
		padding 18px 0
		.overview-left
			flex 0 0 137px
			padding 6px 0
			width 137px
			border-right 1px solid rgba(7, 17, 27, 0.1)
			text-align center
			@media only screen and (max-width: 320px)
				flex 0 0 120px
				width 120px
			.score
				margin-bottom 6px
				line-height 28px
				font-size 24px
				color rgb(255, 153, 0)
			.title
				margin-bottom 8px
				line-height 12px
				font-size 12px
				color rgb(7, 17, 27)
			.rank
				line-height 10px
				font-size 10px
				color rgb(147, 153, 159)
		.overview-right
			flex 1
			padding 6px 0 6px 24px
			@media only screen and (max-width: 320px)
				padding-left 6px
			.score-wrapper
				margin-bottom 8px
				font-size 0
				.title
					display inline-block
					line-height 18px
					vertical-align top
					font-size 12px
					color rgb(7, 17, 27)
				.star
					display inline-block
					margin 0 12px
					vertical-align top
				.score
					display inline-block
					line-height 18px
					vertical-align top
					font-size 12px
					color rgb(255, 153, 0)
			.delivery-wrapper
				font-size 0
				.title
					line-height 18px
					font-size 12px
					color rgb(7, 17, 27)
				.delivery
					margin-left 12px
					font-size 12px
					color rgb(147, 153, 159)
	.split
		width 100%
		height 16px
		border-top 1px solid rgba(7, 17, 27, 0.1)
		border-bottom 1px solid rgba(7, 17, 27, 0.1)
		background #f3f5f7
	.ratingselect
		.rating-type
			padding 18px 0
			margin 0 18px
			// border-1px(rgba(7, 17, 27, 0.1))
			font-size 0
			.block
				display inline-block
				padding 8px 12px
				margin-right 8px
				line-height 16px
				border-radius 1px
				font-size 12px
				color rgb(77, 85, 93)
				background rgba(77, 85, 93, 0.2)
				&.active
					background $green
					color #fff
				.count
					margin-left 2px
					font-size 8px
		.switch
			padding 12px 18px
			line-height 24px
			border-bottom 1px solid rgba(7, 17, 27, 0.1)
			color rgb(147, 153, 159)
			font-size 0
			&.on
				.icon-check_circle
					color $green
			.icon-check_circle
				display inline-block
				vertical-align top
				margin-right 4px
				font-size 24px
			.text
				display inline-block
				vertical-align top
				font-size 12px
	.rating-wrapper
		padding 0 18px
		.rating-item
			display flex
			padding 18px 0
			bottom-border-1px(rgba(7, 17, 27, 0.1))
			.avatar
				flex 0 0 28px
				width 28px
				margin-right 12px
				img
					border-radius 50%
					width 28px
					height 28px
			.content
				position relative
				flex 1
				.name
					margin-bottom 4px
					line-height 12px
					font-size 10px
					color rgb(7, 17, 27)
				.star-wrapper
					margin-bottom 6px
					font-size 0
					.star
						display inline-block
						margin-right 6px
						vertical-align top
					.delivery
						display inline-block
						vertical-align top
						line-height 12px
						font-size 10px
						color rgb(147, 153, 159)
				.text
					margin-bottom 8px
					line-height 18px
					color rgb(7, 17, 27)
					font-size 12px
				.recommend
					line-height 16px
					font-size 0
					.icon-thumb_up, .icon-thumb_down, .item
						display inline-block
						margin 0 8px 4px 0
						font-size 9px
					.icon-thumb_up
						color $yellow
					.icon-thumb_down
						color rgb(147, 153, 159)
					.item
						padding 0 6px
						border 1px solid rgba(7, 17, 27, 0.1)
						border-radius 1px
						color rgb(147, 153, 159)
						background #fff
				.time
					position absolute
					top 0
					right 0
					line-height 12px
					font-size 10px
					color rgb(147, 153, 159)
</style>
