<template>
  <div class="footer-guide">
    <!-- 全局tabbar -->
    <router-link
      href="javascript:;"
      class="guide-item"
      v-for="(guide, index) in guideList"
      :key="index"
      :to="guide.iLink"
    >
      <span class="item-icon">
        <i :class="guide.iClass"></i>
      </span>
      <span>{{ guide.iName }}</span>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      guideList: [
        { iClass: "iconfont icon-icon-test", iName: "外卖", iLink: "/msite" },
        { iClass: "iconfont icon-search", iName: "搜索", iLink: "/search" },
        { iClass: "iconfont icon-order", iName: "订单", iLink: "/order" },
        { iClass: "iconfont icon-wode", iName: "我的", iLink: "/profile" }
      ]
    };
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixins.styl"
.footer-guide
	top-border-1px(#e4e4e4)
	position fixed
	z-index 100
	left 0
	right 0
	bottom 0
	background-color #fff
	width 100%
	height 50px
	display flex
	.guide-item
		display flex
		flex 1
		text-align center
		flex-direction column
		align-items center
		margin 5px
		color #999999
		&.router-link-active
			color #02a774
		span
			font-size 12px
			margin-top 2px
			margin-bottom 2px
			.iconfont
				font-size 22px
</style>
