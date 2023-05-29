<template>
	<view class="my-path-list">
		<view class="path-list">
			<view class=""  v-for="(item,index) in list" :key="index" @tap="toAddPath(index)">
				<view class="path-item" >
					<view class="item-main" @tap="goConfirmOrder(item)">
						<view class="item-name">{{item.name}}</view>
						<view class="">{{item.tel}}</view>
					</view>
					<view class="item-main">
						<view class="active" v-if="item.isDefault ==1">默认</view>
						<view class="">{{item.province}}{{item.city}} {{item.district}}{{item.addrsss}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="add-path">
			<view class="add-path-btn" @tap="goAddPath()">新增地址</view>
		</view>
	</view>
</template>

<script>
	import $http from '@/common/api/request.js';
	import {mapState,mapMutations} from "vuex";
	export default {
		data() {
			return {
                isSelectPath:false,
			}
		},
		computed:{
			...mapState({
				list: state => state.path.list
			})
		},
		
		methods: {
			...mapMutations(['_initAddressList']),
			_initAddress(){
				// 初始化（请求收货地址接口
				$http.request({
					url: "/selectAddress",
					method:'POST',
					header:{
						token:true
					}
				}).then((res) => {
					this._initAddressList(res.data);
				}).catch(() => {
					uni.showToast({
						title: "请求失败！",
						icon: "none"
					})
				});
				
			},
            goAddPath(){
				uni.navigateTo({
					url:'/pages/myAddPath/myAddPath'
				})
			},
			// 修改
			toAddPath(index){
				let pahtObj = JSON.stringify({
					index:index,
					item:this.list[index]
				});
				uni.navigateTo({
					url:'/pages/myAddPath/myAddPath?data='+pahtObj,
				})
			},
			// 返回确认订单页面
			goConfirmOrder(item){
				// 如果是从确认订单过来的执行以下代码
				if(this.isSelectPath){
					uni.$emit("selectPathItem",item);
					// 返回上一页
					uni.navigateBack({
						delta:1
					})
					
				}
				
			}
		},
		onLoad(e) {
			if(e.type ==='selectPath'){
				this.isSelectPath = true;
			}
			// 初始化，拿到收货地址
			this._initAddress();
		}
	}
</script>

<style scoped>
	.add-path-btn{
		border: 2rpx solid #49bdfb;
		color: #49bdfb;
		border-radius: 30rpx;
		padding: 6rpx 60rpx;
	}
	.path-list{
		padding-left:20rpx ;
	}
	.path-item{
		padding: 10rpx;
		border-bottom: 2rpx solid #CCCCCC;
	}
	.item-main{
		display: flex;
		align-items:center;
	}
	.active{
		padding-right: 10rpx;
		background-color: #49bdfb;
		color: white;
		border-radius: 26rpx ;
		font-size: 24rpx;
		text-align: center;
	}
	.item-name{
		padding-right: 10rpx;
	}
	.add-path {
		padding: 20rpx 0;
		width: 100%;
		display: flex;
		justify-content: center;
		
		
	}
</style>