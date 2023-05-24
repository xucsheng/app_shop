<template>
	<view class="my">
		<!--头部信息-->
		<view class="my-header">
			<view class="header-main">
				<view class="header-config" @tap="goConfig">
					<image class="config-img" src="../../static/image/config.png" mode=""></image>
				</view>
			</view>
			<view class="header-logo" @tap="goLogin">
				<image class="logo-img" src="../../static/image/Children.jpg" mode=""></image>
				<view class="logo-name">用户昵称</view>
			</view>
		</view>
		<!--我的订单-->
		<view class="order">
			<view class="order-title">
				<view class="" @tap="goOrder()">我的订单</view>
				<view class="">全部订单></view>
			</view>
			<view class="order-list">
				<view class="order-item">
					<image  class="order-img"  src="../../static/image/order1.png" mode=""></image>
					<view class="">待付款</view>
				</view>
				<view class="order-item">
					<image class="order-img"   src="../../static/image/order2.png" mode=""></image>
					<view class="">代付款</view>
				</view>
				<view class="order-item">
					<image class="order-img"  src="../../static/image/order3.png" mode=""></image>
					<view class="">代付款</view>
				</view>
				<view class="order-item">
					<image class="order-img"  src="../../static/image/order4.png" mode=""></image>
					<view class="">代付款</view>
				</view>
				<view class="order-item">
					<image class="order-img"  src="../../static/image/order5.png" mode=""></image>
					<view class="">代付款</view>
				</view>
			</view>
		</view>
	<!-- 	内容列表 -->
	<view class="my-content">
		<view class="my-content-item">
			<view class="">我的收藏</view>
			<view class="">></view>
		</view>
		<view class="my-content-item">
			<view class="">我的收藏</view>
			<view class="">></view>
		</view>
		<view class="my-content-item">
			<view class="">我的收藏</view>
			<view class="">></view>
		</view>
		<view class="my-content-item">
			<view class="">我的收藏</view>
			<view class="">></view>
		</view>
		<view class="my-content-item">
			<view class="">我的收藏</view>
			<view class="">></view>
		</view>
		<view class="my-content-item">
			<view class="">我的收藏</view>
			<view class="">></view>
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
			goConfig(){
				uni.navigateTo({
					url:"/pages/myConfig/myConfig"
				})
			},
			// 跳转到我的订单
			goOrder(){
				uni.navigateTo({
					url:'/pages/myOrder/myOrder'
				})
			},
			// 登录
			goLogin(){
				uni.navigateTo({
					url:'/pages/login/login'
				})
			}
			
			
		}
	}
</script>

<style scoped>
.my-header{
	background:url(../../static/image/mybg.png) no-repeat;
	width: 100%;
	height: 400rpx;
}
.header-main{
	position: relative;
	top:40rpx;
}
.header-config{
	position: absolute;
	left: 20rpx;
}
.header-logo{
	position: absolute;
	left:50%;
	margin-left: -60rpx;
	width: 120rpx;
}
.config-img{
	width: 40rpx;
	height: 40rpx;
}
.logo-img{
	width: 120rpx;
	height: 120rpx;
	border: 2rpx solid #CCCCCC;
	border-radius: 50%;
	background-color: #FFFFFF;
}
.logo-name{
	font-weight: bold;
	color: #FFFFFF;
}
.order-title{
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20rpx;
}
.order-img{
	width: 66rpx;
	height: 66rpx;
}
.order-list{
	padding: 20rpx;
	display: flex;
}
.order-item{
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.my-content-item{
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20rpx 0;
	border-bottom: 2prx solid #CCCCCC;
}
.my-content{
	margin:20rpx 0 ;
	padding: 0 20rpx;
}
</style>
