<template>
	<view class="card">
		<view>-</view>
		<slot>
	        	<view class="card-name">{{cardTitle}}</view>
		</slot>
		<view>-</view>
	</view>
</template>

<script>
	export default {
		name:"Card",
		props:{
			cardTitle:String
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style scoped>
.card{
	padding: 20rpx 0;
	display: flex;
	justify-content: center;
	font-weight: bold;
}
.card-name{
	padding: 0 20rpx;
	font-size: 32rpx;
}
</style>