<template>
	<view class="detail">

		<!--商品图-->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<view class="swiper-item">
					<image :src="item.imgUrl" mode="" class="swiper-image"></image>
				</view>
			</swiper-item>

		</swiper>
		<!--价格和名称-->
		<view class="detail-goods">
			<view class="goods-pprice">￥399.00</view>
			<view class="goods-price">￥599</view>
			<view class="goods-name">大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008</view>
		</view>
		<!--商品详情-->
		<view>
			<view>
				<image class="detail-image" src="../../static/image/detail1.jpg" mode=""></image>
				<image class="detail-image" src="../../static/image/detail2.jpg" mode=""></image>
				<image class="detail-image" src="../../static/image/detail3.jpg" mode=""></image>
				<image class="detail-image" src="../../static/image/detail4.jpg" mode=""></image>
				<image class="detail-image" src="../../static/image/detail5.jpg" mode=""></image>
			</view>
		</view>
		<!--商品列表-->
		<Card cardTitle='看了又看'></Card>
		<CommodityList :dataList="dataList"></CommodityList>
		<!--底部-->
		<view class="detail-foot">
			<view class="iconfont icon-xiaoxi"></view>
			<view class="iconfont icon-gouwuche"></view>
			<view class="add-shopcart" @tap="showPop()">加入购物车</view>
			<view class="purchase"   @tap="showPop()">立即购买</view>
		</view>
		<!---底部弹出层-->
		<view class="pop" v-show='isshow'>
			<!---底部蒙层-->
			<view class="pop-mask"></view>
			<!---内容块-->
			<view class="pop-box"></view>
		</view>
	</view>
</template>

<script>
	import Card from "@/components/index/Card.vue"
	import CommodityList from "@/components/common/CommodityList.vue"
	export default {
		data() {
			return {
				swiperList: [{
						imgUrl: "../../static/image/details1.jpeg"
					},
					{
						imgUrl: "../../static/image/details2.jpeg"
					},
					{
						imgUrl: "../../static/image/details3.jpeg"
					}
				],
				dataList: [{
						id: 1,
						imageUrl: '../../static/image/commodity1.jpg',
						name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: 2,
						imageUrl: '../../static/image/commodity2.jpg',
						name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: 3,
						imageUrl: '../../static/image/commodity3.jpg',
						name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: 4,
						imageUrl: '../../static/image/commodity4.jpg',
						name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					}
				],
				isshow:false,
			}
		},
		components: {
			Card,
			CommodityList
		},
		methods: {
            showPop(){
				this.isshow = true;
			}
		}
	}
</script>

<style scoped>
	.detail{
		padding-bottom: 30rpx;
	}
	swiper {
		width: 100%;
		height: 700rpx;
	}

	.swiper-image {
		width: 100%;
		height: 700rpx;
	}

	.detail-goods {
		text-align: center;
		font-weight: bold;
		font-size: 36rpx;
		padding: 10rpx 0;
	}
	.goods-price{
		text-decoration: line-through;
		font-size: 24rpx;
		color: #999999;
	}

	.detail-image {
		width: 100%;
	}

	.detail-foot {
		display: flex;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 90rpx;
		align-items: center;
		justify-content: center;
		background-color: #FFFFFF;
	}

	.detail-foot .iconfont {
		width: 50rpx;
		height: 50rpx;
		border-radius: 100%;
		background-color: black;
		color: white;
		text-align: center;
		margin: 0 10rpx;
	}

	.add-shopcart {
		margin: 0 40rpx;
		padding: 6rpx 30rpx;
		background-color: black;
		color: #FFFFFF;
		border-radius: 40rpx;
	}

	.purchase {
		padding: 6rpx 30rpx;
		background-color: #49BDFB;
		color: #FFFFFF;
		border-radius: 40rpx;
	}
	.pop{
		position: fixed;
		left: 0;
		top:0;
		width: 100%;
		height: 100%;
		z-index: 9999;
	}
	.pop-mask{
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0,0.3);
	}
	.pop-box{
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 400px;
		background-color: #E80080;
	}
</style>