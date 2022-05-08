<script>
	import {mapActions} from "vuex"
	export default {
		onLaunch: function() {
			// 请求位置信息
			this.getAddress()
			// 请求用户信息
			this.getUserInfoByLocal()
		},
		onShow: function() {
			
		},
		onHide: function() {
			
		},
		methods: {
			...mapActions('user', ['getAddress', 'getUserInfoByLocal'])
		}
	}
</script>

<style>
	/* 重置默认样式 */
	@import url("common/css/reset.css");
	/* 引入全局样式 */
	@import url("common/css/common.css");
	/* 引入iconfont */
	@import url("common/css/iconfont.css");
	/* 引入colorui第三方样式库 */
	@import "colorui/main.css";
	@import "colorui/icon.css";
</style>
