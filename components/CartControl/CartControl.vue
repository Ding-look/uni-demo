<template>
	<div class="cartcontrol">
		<transition name="move"><div class="iconfont icon-remove_circle_outline" :class="removeClass" v-if="food.count" @click.stop="reduceCount"></div></transition>
		<div class="cart-count" v-if="food.count">{{ food.count }}</div>
		<div class="iconfont icon-add_circle" @click.stop="additionCount"></div>
	</div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
	props: {
		food: Object,
		shopGoodsIndex: Number,
		foodsIndex: Number
	},
	data() {
		return {
			removeClass: '' // 减号按钮动画样式
		};
	},
	methods: {
		...mapActions('cart', ['updateFoodCountAction']),

		// 减少food数量
		reduceCount() {
			// 如果食物数量>1就只修改数量
			if (this.food.count > 1) {
				// 修改数量
				this.updateFoodCount(false);
			} else {
				// 添加动画样式
				this.removeClass = 'move-enter';
				setTimeout(() => {
					this.removeClass = '';
					// 修改数量
					this.updateFoodCount(false);
				}, 300);
			}
		},

		// 增加food数量
		additionCount() {
			// 修改数量
			this.updateFoodCount(true);
		},

		// 修改food数量
		updateFoodCount(isAdd) {
			const { food, shopGoodsIndex, foodsIndex } = this;
			this.updateFoodCountAction({ isAdd, food, shopGoodsIndex, foodsIndex });
		}
	}
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl'

.cartcontrol
	font-size 0
	.cart-decrease
		display inline-block
		padding 6px
		line-height 24px
		font-size 24px
		color rgb(0, 160, 220)
	.icon-remove_circle_outline
		display inline-block
		padding 6px
		line-height 24px
		font-size 24px
		color $green
		transition all 0.3s
		&.move-enter-active, &.move-leave-active
			transition all 0.3s
		&.move-enter, &.move-leave-to
			opacity 0
			transform translateX(15px) rotate(180deg)
	.cart-count
		display inline-block
		vertical-align top
		width 12px
		padding-top 6px
		line-height 24px
		text-align center
		font-size 10px
		color rgb(147, 153, 159)
	.icon-add_circle
		display inline-block
		padding 6px
		line-height 24px
		font-size 24px
		color $green
</style>
