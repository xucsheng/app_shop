<template>
	<view class="shop-cart">
		<!--自定义导航栏-->
		<uniNavBar title="购物车" :right-text="isNavBar ? '完成':'编辑'" fixed="true" status-bar="true"
			@clickRight="isNavBar = !isNavBar"></uniNavBar>
		<!--商品内容-->
		<view class="shop-list">
			<view class="shop-item" v-for="(item,index) in list" :key="index">
				<label class="radio">
					<radio value="" color="#FF3333"></radio><text></text>
				</label>
				<image class="shop-img" :src="item.imgUrl" mode=""></image>
				<view class="shop-tex">
					<view class="shop-name">{{item.name}}</view>
					<view class="shop-color f-color">{{item.color}}</view>
					<view class="shop-price">
						<view>￥{{item.pprice}}</view>
						<view>*{{item.num}}</view>
					</view>
				</view>
			</view>
		</view>
		<!--底部-->
		<view class="shop-foot">
			<label class="radio">
				<radio value="" color="#FF3333" /><text></text>
			</label>
			<view class="foot-total">
				<view class="foot-count">合计:￥<text class="f-active-color">0</text></view>
				<view class="foot-num">结算（0）</view>
			</view>
		</view>

	</view>
</template>

<script>
	import uniNavBar from "@/components/uni/uni-nav-bar/uni-nav-bar.vue";
	import {mapState} from "vuex";
	export default {
		data() {
			return {
				isNavBar: false,
			}
		},
		methods: {

		},
		components: {
			uniNavBar
		},
		computed:{
			...mapState({
				list:state => state.cart.list,
			})
		}
	}
</script>

<style scoped>
	.shop-list{
		padding-bottom: 100rpx;
	}
	.shop-item {
		display: flex;
		align-items: center;
		background-color: #F7F7F7;
		margin-bottom: 10rpx;
	}

	.shop-img {
		width: 200rpx;
		height: 200rpx;

	}

	.shop-tex {
		flex: 1;
		padding-left: 20rpx;
	}

	.shop-color {
		font-size: 24rpx;

	}

	.shop-price {
		display: flex;
		justify-content: space-between;
	}

	.shop-foot {
		background-color: #FFFFFF;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.foot-total {
		display: flex;

	}

	.foot-count {
		line-height: 100rpx;
		padding:0 20rpx;
		font-size: 32rpx;
	}

	.foot-num {
		background-color: #49bdfb;
		color: #FFFFFF;
		padding: 0 60rpx;
		line-height: 100rpx;
	}
</style>