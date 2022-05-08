<template>
  <div :class="sizeClass">
    <span
      :class="star.sClass"
      v-for="(star, index) in stars"
      :key="index"
    ></span>
  </div>
</template>

<script>
export default {
  props: {
    size: Number,
    score: Number
  },
  computed: {
    sizeClass() {
      // 处理星星显示尺寸class
      let sizeClass = `star star-${this.size}`;
      return sizeClass;
    },
    stars() {
      // 处理星星显示分数class
      let stars = [
        { sClass: "star-item off" },
        { sClass: "star-item off" },
        { sClass: "star-item off" },
        { sClass: "star-item off" },
        { sClass: "star-item off" }
      ];
      // 评分整数部分
      let intScore = parseInt(this.score);
      // 评分小数部分
      let floatScore = this.score.toString().split(".")[1];
      // 根据评分前面的整数判断亮星星，根据评分后面小数判断是否亮半颗星
      stars.forEach((star, index) => {
        if (intScore > index) {
          star.sClass = "star-item on";
        } else if (floatScore >= 5 && intScore === index) {
          star.sClass = "star-item half";
        }
      });
      return stars;
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl'
.star // 2x图 3x图
	float left
	font-size 0
	.star-item
		display inline-block
		background-repeat no-repeat
	&.star-48
		.star-item
			width 20px
			height 20px
			margin-right 22px
			background-size 20px 20px
			&:last-child
				margin-right 0
			&.on
				bg-image('@/static/images/stars/star48_on')
			&.half
				bg-image('@/static/images/stars/star48_half')
			&.off
				bg-image('@/static/images/stars/star48_off')
	&.star-36
		.star-item
			width 15px
			height 15px
			margin-right 6px
			background-size 15px 15px
			&:last-child
				margin-right 0
			&.on
				bg-image('@/static/images/stars/star36_on')
			&.half
				bg-image('@/static/images/stars/star36_half')
			&.off
				bg-image('@/static/images/stars/star36_off')
	&.star-24
		.star-item
			width 10px
			height 10px
			margin-right 3px
			background-size 10px 10px
			&:last-child
				margin-right 0
			&.on
				bg-image('@/static/images/stars/star24_on')
			&.half
				bg-image('@/static/images/stars/star24_half')
			&.off
				bg-image('@/static/images/stars/star24_off')
</style>
