<template>
	<view class="my-path-list">
		<view class="path-list">
			<view class="path-item">
				<view class="item-main">
					<view class="item-name">张三</view>
					<view class="">18012350148</view>
				</view>
				<view class="item-main">
					<view class="active">默认</view>
					<view class="">江苏省无锡市经济开发区</view>
				</view>
			</view>
		</view>
		<view class="add-path">
			<view class="add-path-btn" @tap="goAddPath()">新增地址</view>
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
            goAddPath(){
				uni.navigateTo({
					url:'/pages/myAddPath/myAddPath'
				})
			}
		}
	}
</script>

<style scoped>
	.add-path-btn{
		border: 2rpx solid #49bdfb;
		color: #49bdfb;
		border-radius: 30rpx;
		padding: 6rpx 60rpx;
	}
	.path-list{
		padding-left:20rpx ;
	}
	.path-item{
		padding: 10rpx;
		border-bottom: 2rpx solid #CCCCCC;
	}
	.item-main{
		display: flex;
		align-items:center;
	}
	.active{
		padding-right: 10rpx;
		background-color: #49bdfb;
		color: white;
		border-radius: 26rpx ;
		font-size: 24rpx;
		text-align: center;
	}
	.item-name{
		padding-right: 10rpx;
	}
	.add-path {
		padding: 20rpx 0;
		width: 100%;
		display: flex;
		justify-content: center;
		
		
	}
</style>