<template>
	<view>
		<MyLine></MyLine>
		<view class="login-tel">
			<view class="tel-main">
				<view class="login-from">
					<view class="login-user">
						<text class="user-text">手机号</text>
						<input type="number" focus="true" v-model="userTel" value="" placeholder="请输入11位手机号称" />
					</view>
					<view class="tel" @tap="goNextCode">下一步</view>
				</view>
			</view>
		</view>
		<MyLine></MyLine>
	</view>
</template>

<script>
	import MyLine from "@/components/common/MyLine.vue"
	export default {
		data() {
			return {
				userTel: '',
				// 验证规则
				rules: {
					userTel: {
						rule: /^1[3456789]\d{9}$/,
						msg: "请输入11位手机号"
					},
					
				},
			}
		},
		methods: {
			goNextCode(){
				if(!this.validate('userTel')) return;
				uni.navigateTo({
					url:"/pages/loginCode/loginCode"
				})
			},
			
           // 判断验证是否符合要求
           validate(key){
           	let bool = true;
           	if(!this.rules[key].rule.test(this[key])){
           		uni.showToast({
           			title:this.rules[key].msg,
           			icon:"none"
           		})
           		bool = false;
           	}
           	return bool;
           },
		},
		components: {
			MyLine
		}
	}
</script>

<style scoped>
	.login-tel {
		width: 100vw;
		height: 100vh;
	}

	.tel-main {
		padding: 0 20rpx;
	}

	.login-from {
		padding-to: 30rpx 0;
	}

	.login-user {
		font-size: 32rpx;
		padding: 10rpx 0;
		display: flex;
		align-items: center;
		border-bottom: 2rpx solid #f7f7f7;
	}

	.user-text {
		padding-right: 20rpx;
	}

	.tel {
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		color: #FFFFFF;
		background-color: #49bdfb;
		border-radius: 40rpx;
	}
</style>