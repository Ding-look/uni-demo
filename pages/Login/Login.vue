<template>
	<div class="loginContainer">
		<div class="loginInner">
			<div class="login_header">
				<div class="login_header_title">
					<view :class="msgClass" @click="switchClass('msg')">短信登录</view>
					<view :class="pwdClass" @click="switchClass('pwd')">密码登录</view>
				</div>
			</div>
			<div class="login_content">
				<form @submit="login">
					<div class="login_content_div" :class="msgClass">
						<div class="login_message">
							<input type="tel" maxlength="11" placeholder="手机号" v-model="phone" />
							<button class="get_verification" :disabled="msgButtonState.disabled" :style="msgButtonState.bStyle" @click.prevent="getCode">
								{{ msgButtonText }}
							</button>
						</div>
						<div class="login_verification"><input type="tel" maxlength="8" placeholder="验证码" v-model="code" /></div>
						<div class="login_hint">
							温馨提示：未注册甲虫外卖帐号的手机号，登录时将自动注册，且代表已同意
							<view>《用户服务协议》</view>
						</div>
					</div>
					<div class="login_content_div" :class="pwdClass">
						<div>
							<div class="login_message"><input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="account" /></div>
							<div class="login_verification">
								<input type="password" maxlength="8" placeholder="密码" v-model="pwd" v-show="!showPwd" />
								<input type="text" maxlength="8" placeholder="密码" v-model="pwd" v-show="showPwd" />
								<div :class="pwdSwitchBtnState.sClass" @click="switchShowPwd">
									<div :class="pwdSwitchBtnState.dClass"></div>
									<span class="switch_text">{{ pwdSwitchBtnState.sText }}</span>
								</div>
							</div>
							<div class="login_message">
								<input type="text" maxlength="11" placeholder="验证码" v-model="captcha" />
								<img class="get_verification captcha" :src="`${publicPath}static/images/captcha.svg`" alt="captcha" />
							</div>
						</div>
					</div>
					<button class="login_submit" form-type="submit">登录</button>
				</form>
				<view class="about_us">关于我们</view>
			</div>
		</div>
		<!-- 提示组件components/AlertTip -->
		<AlertTip :alertText="alertText" @closeTip="closeAlertTip" v-show="showAlertTip" />
	</div>
</template>

<script>
import AlertTip from '../../components/AlertTip/AlertTip.vue';
import { mapActions } from 'vuex';
export default {
	components: {
		AlertTip
	},
	data() {
		return {
			publicPath: process.env.BASE_URL,
			loginWay: 'msg', // msg: 短信登录 , pwd: 密码登录
			computeTime: 0, // 短信验证码倒计时
			showPwd: false, // 是否显示密码
			alertText: '', // 提示框文本内容
			phone: '', // 记录用户输入手机号
			pwd: '', // 记录用户输入密码
			account: '', // 记录用户输入账号
			code: '', // 记录用户输入短信验证码
			captcha: '' // 记录用户输入图片验证码
		};
	},
	mounted() {
		// app兼容代码
		if (process.env.VUE_APP_PLATFORM === 'app-plus') {
			this.publicPath = './'
		}
	},
	computed: {
		msgClass() {
			// 获取短信登录界面显示样式
			return this.loginWay === 'msg' ? 'on' : '';
		},
		pwdClass() {
			// 获取密码登录界面显示样式
			return this.loginWay === 'pwd' ? 'on' : '';
		},
		msgButtonState() {
			// 发送短信验证码按钮状态(启用/禁用)
			if (/^1\d{10}$/.test(this.phone) && this.computeTime === 0) {
				// 手机号码格式正确启用发送短信按钮(样式添加文字黑色)
				return { disabled: false, bStyle: 'color: black' };
			}
			// 默认禁用发送短信按钮(默认样式)
			return { disabled: true, bStyle: '' };
		},
		msgButtonText() {
			// 发送短信验证码按钮显示文本
			return this.computeTime === 0 ? '获取验证码' : this.computeTime;
		},
		pwdSwitchBtnState() {
			// 密码切换按钮样式
			if (this.showPwd) {
				// 当前类型为text更改密码切换按钮样式为显示状态
				return {
					sClass: 'switch_button on',
					dClass: 'switch_circle right',
					sText: 'abc'
				};
			}
			// 默认类型为password密码切换按钮样式为隐藏状态
			return {
				sClass: 'switch_button off',
				dClass: 'switch_circle',
				sText: ''
			};
		},
		showAlertTip() {
			// alertText内容为空关闭提示框/不为空显示提示框
			return this.alertText === '' ? false : true;
		}
	},
	methods: {
		...mapActions('user', ['smsLoginAction', 'pwdLoginAction']),
		
		// 切换登录方式样式
		switchClass(loginName) {
			this.loginWay = loginName;
		},
		// 获取验证码
		getCode() {
			// 启动倒计时
			this.computeTime = 30; //默认倒计时30秒
			const intervalId = setInterval(() => {
				this.computeTime--;
				if (this.computeTime <= 0) {
					clearInterval(intervalId);
				}
			}, 1000);
			// 发送验证码
			// ...
		},
		// 切换密码输入框内容显示
		switchShowPwd() {
			this.showPwd = !this.showPwd
		},
		// 关闭提示框
		closeAlertTip() {
			// 清空alertText会触发showAlertTip计算属性动态显示/隐藏提示框
			this.alertText = '';
		},
		// 登录
		login() {
			// 表单验证
			if (this.loginWay === 'msg') {
				// 手机短信验证码登录
				const { phone, code } = this;
				if (!/^1\d{10}$/.test(phone)) {
					// 手机号不正确(alertText添加内容会触发showAlertTip计算属性动态显示提示框)
					this.alertText = '手机号不正确';
					return;
				} else if (!/^\d{6}$/.test(code)) {
					// 验证码必须是六位数字
					this.alertText = '验证码必须是六位数字';
					return;
				}
				// 短信登录
				const loginResult = this.loginResult
				this.smsLoginAction({phone, code, loginResult})
			} else if (this.loginWay === 'pwd') {
				// 账号密码登录
				const { account, pwd, captcha } = this;
				if (!account) {
					// 账号未输入
					this.alertText = '账号未输入';
					return;
				} else if (!pwd) {
					// 密码未输入
					this.alertText = '密码未输入';
					return;
				} else if (!captcha) {
					// 验证码未输入
					this.alertText = '验证码未输入';
					return;
				}
				// 密码登录
				const loginResult = this.loginResult
				this.pwdLoginAction({account, pwd, captcha, loginResult})
			}
		},
		// 登录结果
		loginResult (code) {
			// 登录成功:返回上一页,失败:提示
			if (code === 0) {
				uni.navigateBack()
			} else {
				this.alertText = '登录失败，网络异常'
			}
		}
	}
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl'

.loginContainer
	width 100%
	height 100vh
	background #fff
	.loginInner
		padding-top 10px
		width 80%
		margin 0 auto
		.login_header
			.login_logo
				font-size 40px
				font-weight bold
				color #02a774
				text-align center
			.login_header_title
				display flex
				justify-content space-around
				text-align center
				>view
					color #333
					font-size 18px
					padding-bottom 4px
					&:first-child
						margin-right 40px
					&.on
						color #02a774
						font-weight 700
						border-bottom 2px solid #02a774
		.login_content
			margin-top 20px
			form
				.login_content_div
					display none
					&.on
						display block
					input
						width 100%
						height 100%
						padding-left 10px
						box-sizing border-box
						border 1px solid #ddd
						border-radius 4px
						outline 0
						font 400 14px Arial
						&:focus
							border 1px solid #02a774
					.login_message
						position relative
						margin-top 16px
						height 48px
						font-size 14px
						background #fff
						.get_verification
							position absolute
							top 50%
							right 10px
							transform translateY(-50%)
							color #ccc
							font-size 14px
							background transparent
							height 48px
							line-height 48px
							padding 0
							z-index 1000
							&::after
								border none
							&.right_phone
								color black
							&.captcha
								width 120px
								right -10px
					.login_verification
						position relative
						margin-top 16px
						height 48px
						font-size 14px
						background #fff
						.switch_button
							font-size 12px
							border 1px solid #ddd
							border-radius 8px
							transition background-color 0.3s, border-color 0.3s
							padding 0 6px
							width 30px
							height 16px
							line-height 16px
							color #fff
							position absolute
							top 50%
							right 10px
							transform translateY(-50%)
							z-index 100
							&.off
								background #fff
								.switch_text
									float right
									color #ddd
							&.on
								background #02a774
							>.switch_circle
								position absolute
								top -1px
								left -1px
								width 16px
								height 16px
								border 1px solid #ddd
								border-radius 50%
								background #fff
								box-shadow 0 2px 4px 0 rgba(0, 0, 0, 0.1)
								transition transform 0.3s
								&.right
									transform translateX(20px)
					.login_hint
						margin-top 12px
						color #999
						font-size 14px
						line-height 20px
						>view
							color #02a774
				.login_submit
					display block
					width 100%
					height 42px
					margin-top 30px
					border-radius 4px
					background #02a774
					color #fff
					text-align center
					font-size 16px
					line-height 42px
					border 0
			.about_us
				display block
				font-size 12px
				margin-top 20px
				text-align center
				color #999
		.go_back
			position absolute
			top 5px
			left 5px
			width 30px
			height 30px
			>.iconfont
				font-size 20px
				color #999
</style>
