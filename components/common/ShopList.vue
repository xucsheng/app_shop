<template>
	<view class="shop-list">
		<view class="shop-title f-color">
			<view class="shop-item" v-for="(item,index) in shopList.data" :key="index" @tap="changeTab(index)">
				<view :class="shopList.currentIndex == index? 'f-active-color':''"> {{item.name}} </view>
				<view class="shop-icon">
					<view class="iconfont icon-shangjiantou up" :class="item.status === 1? 'f-active-color':''"></view>
					<view class="iconfont icon-xiajiantou down" :class="item.status === 2? 'f-active-color':''"></view>
				</view>
			</view>

		</view>
		<MyLine></MyLine>
		<CommodityList :dataList="dataList"></CommodityList>
	</view>
</template>

<script>
	import $http from '@/common/api/request.js'
	import MyLine from "@/components/common/MyLine.vue"
	import CommodityList from "@/components/common/CommodityList.vue"
	export default {
		props:{
		  keyword:String	
		},
		data() {
			return {
				shopList: {
					currentIndex: 0,
					data: [{
							name: "价格",
							status: 1,
							key:"pprice"
						},
						{
							name: "折扣",
							status: 0,
							key:"discount"
						},
						{
							name: "品牌",
							status: 0,
							key:"pprice"
						
						}
					]
				},
				dataList: []
			}
		},
		methods: {
			changeTab(index) {
				// 点击排序
				this.getData();
				
				
				// 索引值
				let idx = this.shopList.currentIndex;
				// 获取哪个对象
				let item = this.shopList.data[idx];
				if (idx === index) {
					return item.status = item.status === 1 ? 2 : 1
				}
				// 新的值
				let newItem = this.shopList.data[index];
				item.status = 0;
				this.shopList.currentIndex = index;
				newItem.status = 1;

			},
			// 请求数据
			getData(){
				$http.request({
					url: "/goods/search",
					data:{
						name:this.keyword,
						...this.orderBy
					}
				}).then((res) => {
					this.dataList = res
				}).catch(() => {
					uni.showToast({
						title: "请求失败！",
						icon: "none"
					})
				});
			}
			
		},
		components: {
			MyLine,
			CommodityList
		},
		mounted() {
			this.getData();
		},
		computed:{
			orderBy(){
				// 拿到当前对象
				let obj =  this.shopList.data[this.shopList.currentIndex];
				let val = obj.status === 1 ? "desc":"asc";
				return {
					[obj.key]:val
				}
			}
		}
		
	}
</script>

<style scoped>
	.shop-title {
		display: flex;

	}

	.shop-item {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 80rpx;
	}

	.shop-icon {
		position: relative;
		margin-left: 10rpx;

	}

	.iconfont {
		width: 16rpx;
		height: 8rpx;
		position: absolute;
		left: 0;
	}

	.up {
		top: -34rpx;

	}

	.down {
		top: -20rpx;
	}
</style>