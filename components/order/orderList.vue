<template>
	<view class="goods-contain bg-active-color" :key="index">
		<image class="goods-image" :src="item.imgUrl" mode=""></image>
		<view class="goods-text">
			<view class="goods-name">{{item.name}}
			</view>
			<view class="goods-size f-color">顔色分类：{{item.attrs}}</view>
			<view class="f-active-color" style="font-size: 24rpx;">7天无理由</view>
		</view>
		<view class="">
			<view class="">￥{{item.pprice}}</view>
			<view class="f-active-color">*{{item.num}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "orderList",
		props: {
			item: Object,
			index: Number
		},
		data() {
			return {

			}
		}
	}
</script>

<style scoped>
	.goods-contain {
		padding: 10rpx 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.goods-image {
		width: 160rpx;
		height: 160rpx;
	}

	.goods-name {
		font-size: 24rpx;
	}

	.goods-size {
		font-size: 24rpx;
	}
</style>