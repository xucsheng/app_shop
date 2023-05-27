<template>
	<view class="detail">

		<!--商品图-->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item>
				<view class="swiper-item">
					<image :src="goodsContent.imageUrl" mode="" class="swiper-image"></image>
				</view>
			</swiper-item>

		</swiper>
		<!--价格和名称-->
		<view class="detail-goods">
			<view class="goods-pprice">￥{{goodsContent.pprice}}</view>
			<view class="goods-price">￥{{goodsContent.oprice}}</view>
			<view class="goods-name">{{goodsContent.name}}</view>
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
			<view class="iconfont icon-gouwuche" @tap="goShopCart()"></view>
			<view class="add-shopcart" @tap="showPop()">加入购物车</view>
			<view class="purchase" @tap="showPop()">立即购买</view>
		</view>
		<!---底部弹出层-->
		<view class="pop" v-show='isshow' @touchmove.stop.prevent=''>
			<!---底部蒙层-->
			<view class="pop-mask" @tap="hidePop()"></view>
			<!---内容块-->
			<view class="pop-box" :animation="animationData">
				<view>
					<image class="pop-img"   :src="goodsContent.imageUrl" mode=""></image>
				</view>
				<view class="pop-num">
					<view>购买数量</view>
					<uni-number-box :min="1" :value="num" @change="changeNumber"></uni-number-box>
				</view>
				<view class="pop-sub" @tap="addCart">
					确定
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import $http from '@/common/api/request.js';
	import Card from "@/components/index/Card.vue";
	import CommodityList from "@/components/common/CommodityList.vue";
	import UniNumberBox from "@/components/uni/uni-number-box/uni-number-box.vue";
	import {mapMutations} from 'vuex'
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
				isshow: false,
				animationData: {

				},
				goodsContent:{
					
				},
				num:1
			}
		},
		components: {
			Card,
			CommodityList,
			UniNumberBox
		},
		// 点击分享
		onNavigationBarButtonTap(e) {
			if(e.type==='share'){
				uni.share({
					provider:"weixin",
					type:0,
					"scene":"WXSceneSession",
					title:this.goodsContent.name,
					"href":"http://192.168.30.106:8080/#/pages/deatil/deatil?id"+this.goodsContent.id,
					imageUrl:this.goodsContent.imageUrl,
					success: function (res) {
							uni.showTabBar({
								title:'分享成功'
							})
						},
						fail: function (err) {
							console.log("fail:" + JSON.stringify(err));
						}
					
				})
			}
			
		},
		methods: {
			...mapMutations(['addShopCart']),
			showPop() {
				var animation = uni.createAnimation({
					duration: 200
				})
				animation.translateY(600).step();
				this.animationData=animation.export();
				this.isshow = true;
				
				setTimeout(()=>{
					animation.translateY(0).step();
					this.animationData=animation.export();
				},200);

			},
			hidePop() {
				var animation = uni.createAnimation({
					duration: 200
				})
				animation.translateY(600).step();
				this.animationData=animation.export();
				this.isshow = true;
				
				setTimeout(()=>{
					animation.translateY(0).step();
					this.animationData=animation.export();
				},200);
				this.isshow = false;
			},
			// 请求商品
			getData(id){
				$http.request({
					url: "/goods",
					data:{
						id:id
					}
				}).then((res) => {
					this.goodsContent = res[0];
				}).catch(() => {
					uni.showToast({
						title: "请求失败！",
						icon: "none"
					})
				});
			},
			// 改变商品数量
			changeNumber(value){
				this.num = value;
			},
			// 跳转到购物车页面
			goShopCart(){
				uni.navigateTo({
					url:'../shopCart/shopCart'
				})
			},
			// 加入购物车
			addCart(){
				let goods = this.goodsContent;
				this.goodsContent['checked'] = false;
				this.goodsContent['num'] = this.num;
				// 添加到购物车
				this.addShopCart( this.goodsContent);
				// 隐藏弹出框
				this.hidePop();
				// 提示信息
				uni.showToast({
					title:'成功加入购物车',
					icon:'none'
				})
			}

		},
		// 生命周期  修改返回默认行为
		onBackPress() {
		  if(this.isshow){
			  this.hidePop();
			  return true;
		  }
		},
		onLoad(e) {
			this.getData(e.id);
		},
		
		
		
		
	}
</script>

<style scoped>
	.detail {
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

	.goods-price {
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

	.pop {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 9999;
	}

	.pop-mask {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.3);
	}

	.pop-box {
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		background-color: #FFFFFF;
	}
	.pop-img{
		width: 260rpx;
		height: 260rpx;
	}
	.pop-num{
		padding: 20rpx;
		display: flex;
		justify-content: space-between;
	}
	.pop-sub{
		line-height: 80rpx;
		background-color: #49BDFB;
		color: #FFFFFF;
		text-align: center;
	}
</style>