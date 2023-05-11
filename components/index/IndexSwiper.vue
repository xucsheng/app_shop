<template>
	<view>
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item,i) in dataList" :key="i">
				<view class="swiper-item">
					<image  class="swiper-image" :src="item.imgUrl" mode=""></image>
				</view>
			</swiper-item>
			
		</swiper>
	</view>
</template>

<script>
	export default {
		name:"indexSwiper",
		props:{
			dataList:Array
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style scoped>
	swiper{
		width: 100%;
		height: 400rpx;
	}
.swiper-image{
	width: 100%;
	height: 400rpx;
}
</style>