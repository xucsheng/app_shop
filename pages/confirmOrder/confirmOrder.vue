<template>
	<view class="confirm-order bg-active-color">
		<my-line></my-line>

		<!-- 地址 -->
		<view class="order-map" @tap="gotoPathList">
			<template v-if="path">
				<view class="map-title">
					<view class="map-name">收件人：{{path.name}}</view>
					<view class="">{{path.tel}}</view>
				</view>
				<view class="map-city">收货地址：{{path.city}}{{path.detail}}</view>
			</template>
			<template v-else >
				<view class="map-name">请选择地址</view>
			</template>
		</view>
		<!-- 商品 -->
		<view class="goods-list">
			<view class="goods-contain bg-active-color">
				<image class="goods-image" src="../../static/image/Children1.jpg" mode=""></image>
				<view class="goods-text">
					<view class="goods-name">商品名称
					</view>
					<view class="goods-size f-color">顔色分类：黑色</view>
					<view class="f-active-color" style="font-size: 24rpx;">7天无理由</view>
				</view>
				<view class="">
					<view class="">￥299</view>
					<view class="f-active-color">*1</view>
				</view>
			</view>
			<view class="goods-contain bg-active-color">
				<image class="goods-image" src="../../static/image/Children1.jpg" mode=""></image>
				<view class="goods-text">
					<view class="goods-name">商品名称
					</view>
					<view class="goods-size f-color">顔色分类：黑色</view>
					<view class="f-active-color" style="font-size: 24rpx;">7天无理由</view>
				</view>
				<view class="">
					<view class="">￥299</view>
					<view class="f-active-color">*1</view>
				</view>
			</view>

		</view>
		<!-- 底部：提交订单 -->
		<view class="order-foot">
			<view class="total-price " >合计：<text class="f-active-color">￥3999.00</text></view>
			<view class="confirm-submit" @tap="goPayment">提交订单</view>
		</view>
	</view>

	</view>



	</view>
</template>

<script>
	import MyLine from '@/components/common/MyLine.vue';
	import {mapGetters} from 'vuex';
	
	export default {
		data() {
			return {
               path:false,
			}
		},
		computed:{
			...mapGetters(['defaultPath'])
		},
		components: {
			MyLine
		},
		methods: {
             gotoPathList(){
				 uni.navigateTo({
				 	url:'/pages/myPathList/myPathList?type=selectPath'
				 })
			 },
			 // 确认支付
			 goPayment(){
				 uni.navigateTo({
				 	url:"/pages/payment/payment"
				 })
			 }
		},
		onLoad() {
			// 如果有默认地址的赋值
			if(this.defaultPath.length){
				 this.path = this.defaultPath[0];
			}
			// 如果触发自定义数据，on去接收数据
			uni.$on('selectPathItem',(res)=>{
				 this.path  = res;
			})
		},
		onUnload() {
			uni.$off("selectPathItem",()=>{
				console.log('移除了selectPathItem');
			})
		}
	}
</script>

<style scoped>
	.confirm-order {
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 100%;

	}

	.order-map {
		padding: 20rpx 20rpx;
		background-color: white;
		line-height: 40rpx;
	}

	.map-title {
		display: flex;
		justify-content: space-between;
		padding: 20rpx 0;
	}

	.map-name {
		font-weight: bold;
	}

	.goods-list {
		margin-top: 20rpx;
		background-color: white;
		margin: 20rpx;
	}

	.goods-contain {
		margin-top: 20rpx;
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

	.order-foot {
		height: 80rpx;
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
		background-color: #FFFFFF;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
	.total-price{
		padding: 0 20rpx;
	}
	.confirm-submit {
		color: #FFFFFF;
		background-color: #49BDFB;
		padding: 10rpx 30rpx;
	}
</style>