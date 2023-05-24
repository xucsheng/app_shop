<template>
	<view class="login-other">
		<view class="other-text">
			<view class="other-text-title">或用以下方式登录</view>
		</view>
		<view class="other">
			<view class="other-item">
				<image src="../../static/image/wx.png" mode=""></image>
				<view class="微信登录"></view>
			</view>
			<view class="other-item">
				<image src="../../static/image/wb.png" mode=""></image>
				<view class="微博登录"></view>
			</view>
			<view class="other-item">
				<image src="../../static/image/qq.png" mode=""></image>
				<view class="QQ登录"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
	
			}
		},
		methods: {
	
		}
	}
</script>

<style scoped>
	/* 其它登录方法 begin*/
	.login-other {
		padding: 100rpx 0;
	}

	.other-text {
		display: flex;
		padding: 50rpx 0;
	}

	.other-text-title {
		line-height: 0rpx;
		padding: 0 10rpx;
	}

	.other-text::after {
		flex: 1;
		height: 2rpx;
		background-color: #CCCCCC;
		content: '';
	}

	.other-text::before {
		flex: 1;
		height: 2rpx;
		background-color: #CCCCCC;
		content: '';
	}

	.other {
		display: flex;
		justify-content: space-around;
	}

	.other-item {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}

	.other-item image {
		width: 80rpx;
		height: 80rpx;
	}

	/* 其它登录方法 end*/
</style>