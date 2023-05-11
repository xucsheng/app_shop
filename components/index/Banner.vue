<template>
	<view class="banner">
		<image class="banner-img" :src="dataList" mode=""></image>
	</view>
</template>

<script>
	export default {
		name: "banner",
		props: {
			dataList: String
		},
		data() {
			return {

			};
		}
	}
</script>

<style scoped>
	.banner {
		width: 100%;
		height: 150rpx;
	}

	.banner-img {
		width: 100%;
		height: 150rpx;
	}
</style>