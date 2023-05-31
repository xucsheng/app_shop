<template>
	<view class="shop-cart">
		<template v-if="list.length > 0">
			<!--自定义导航栏-->
			<uniNavBar title="购物车" :right-text="isNavBar ? '完成':'编辑'" fixed="true" status-bar="true"
				@clickRight="isNavBar = !isNavBar"></uniNavBar>
			<!--商品内容-->
			<view class="shop-list">
				<view class="shop-item" v-for="(item,index) in list" :key="index">
					<label class="radio" @tap="selectedItem(index)">
						<radio value="" color="#FF3333" :checked="item.checked" ></radio><text></text>
					</label>
					<image class="shop-img" :src="item.imgUrl" mode=""></image>
					<view class="shop-tex">
						<view class="shop-name">{{item.name}}</view>
						<view class="shop-color f-color">{{item.color}}</view>
						<view class="shop-price">
							<view>￥{{item.pPrice}}</view>
							<template v-if="! isNavBar">
								<view>*{{item.num}}</view>
							</template>
							<template v-else>
								<uniNumberBox :value="item.num" mim='1' @change="changeNumber($event,index,item)"></uniNumberBox>
							</template>
						</view>
					</view>
				</view>
			</view>
			<!--底部-->
			<view class="shop-foot">
				<label class="radio foot-radio" @tap="checkAllFn">
					<radio value="" color="#FF3333" :checked="checkedAll"/><text></text>
				</label>
				<template v-if="!isNavBar">
					<view class="foot-total">
						<view class="foot-count">合计:￥<text class="f-active-color">{{totalCount.pPrice}}</text></view>
						<view class="foot-num" @tap="goConfirmorder">结算（{{totalCount.num}}）</view>
					</view>
				</template>
				<template v-else>
					<view class="foot-total">
						<view class="foot-num" style="background-color: black;">移除收藏夹</view>
						<view class="foot-num" @tap="delGoods">删除</view>
					</view>
				</template>
				
			</view>
		</template>
		<template v-else>
			<uniNavBar title="购物车" status-bar="true" fixed="true"></uniNavBar>
			<view class="shop-else-list">
				<text>囧~购物车还是空的~</text>
			</view>
		</template>
		<Tabbar currentPage='shopCart' ></Tabbar>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni/uni-nav-bar/uni-nav-bar.vue";
	import uniNumberBox from"@/components/uni/uni-number-box/uni-number-box.vue"
	import {mapState,mapActions,mapGetters,mapMutations} from "vuex";
	import Tabbar from "@/components/common/Tabbar.vue";
	import $http from '@/common/api/request.js';
	
	export default {
		data() {
			return {
				isNavBar: false,
			}
		},
		onShow() {
			this.getData();
		},
		methods: {
			...mapActions(['checkAllFn','delGoodsFn']),
			...mapMutations(['selectedItem','initGetData']),
			getData(){
				$http.request({
					url: "/selectCart",
					method:'POST',
					header:{
						token:true
					}
				}).then((res) => {
					// 存储vux
					this.initGetData(res.data);
				}).catch(() => {
					uni.showToast({
						title: "请求失败！",
						icon: "none"
					})
				});
			},
			changeNumber(value,index,item){
				$http.request({
					url: "/updateCart",
					method:'POST',
					header:{
						token:true
					},
					data:{
						id:item.id,
						num:value
					}
				}).then((res) => {
					// 存储
					this.list[index].num = value;
				}).catch(() => {
					uni.showToast({
						title: "请求失败！",
						icon: "none"
					})
				});
				
			},
			goConfirmorder(){
				if(this.getSelectedList && this.getSelectedList.length === 0){
					return uni.showToast({
						title:'至少选择一个商品',
						icon:"none"
					});
				}else{
					uni.navigateTo({
						url:`/pages/confirmOrder/confirmOrder?detail=${JSON.stringify(this.getSelectedList)}`
					})
				}
				
			},
			// 购物车删除
			delGoods(){
				$http.request({
					url: "/deleteCart",
					method:'POST',
					header:{
						token:true
					},
					data:{
						selectedList:this.getSelectedList
					}
					
				}).then((res) => {
					// 删除购物车
				    this.delGoodsFn();
				}).catch(() => {
					uni.showToast({
						title: "请求失败！",
						icon: "none"
					})
				});
			},
			
		},
		components: {
			uniNavBar,
			uniNumberBox,
			Tabbar
		},
		computed: {
			...mapState({
				list: state => state.cart.list
			}),
			...mapGetters(['checkedAll','totalCount','getSelectedList'])
		}
	}
</script>

<style scoped>
	.shop-list {
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
		bottom: 120rpx;
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
		padding: 0 20rpx;
		font-size: 32rpx;
	}

	.foot-num {
		background-color: #49bdfb;
		color: #FFFFFF;
		padding: 0 60rpx;
		line-height: 100rpx;
	}
	.shop-else-list{
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		background-color: #F7F7F7;
		display: flex;
		align-items: center;
		justify-content: center;
		
	}
</style>