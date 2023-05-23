<template>
	<view class="payment-success">
		<view class="f-active-color" style="font-size:52rpx ;">恭喜您支持成功</view>
		<view class="return-index f-active-color" @tap="goHome">返回首页再买点</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			goHome(){
				uni.switchTab({
					url:'../index/index'
				})
			}
		}
	}
</script>

<style scoped>
.payment-success{
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	top: 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.return-index{
	padding: 10rpx 60rpx;
	border: 2rpx solid #49bdfb;
	border-radius: 40rpx;
}
</style>
