<template>
	<view class="index">
		<scroll-view scroll-x="true" class="scroll-content" :scroll-into-view="scrollIntoIndex">
			<view :id="'top'+index" class="scroll-item" v-for="(item,index) in topBar" :key="index"
				@tap="changeTab(index)">
				<text :class="topBarIndex == index ?'f-active-color':'f-color'">{{item.name}}</text>
			</view>
		</scroll-view>

		<!-- :style="{height:'3000rpx'} -->
		<swiper @change="onChangeTab" :current="topBarIndex" :style="{height:clentHeight}">
			<swiper-item v-for="(item,index) in newTopBar" :key="index">


				<scroll-view scroll-y="true" :style="{height:clentHeight}" @scrolltolower="loadMore(index)">
					<block v-if="item.data.length >0">

						<block v-for="(k,i) in item.data " :key="i">




							<!--推荐-->

							<IndexSwiper v-if="k.type=='swiperList'" :dataList='k.data'></IndexSwiper>
							<template v-if="k.type=='recommendList'">
								<Recommend :dataList='k.data'></Recommend>
								<card cardTitle='猜你喜欢'></card>
							</template>
							<!--运动户外。。。-->
							<Banner v-if="k.type==='bannerList'" :dataList="k.imgUrl"></Banner>

							<template v-if="k.type==='iconsList'">
								<Icoms :dataList='k.data'></Icoms>
								<card cardTitle='热销爆品'></card>
							</template>
							<template v-if="k.type==='hotList'">
								<Hot :dataList='k.data'></Hot>
								<card cardTitle=''></card>
							</template>

							<template v-if="k.type==='shopList'">
								<Shop :dataList='k.data'></Shop>
								<card cardTitle='为您推荐'></card>
							</template>



							<CommodityList v-if="k.type=='commodityList'" :dataList='k.data'></CommodityList>



						</block>
					</block>
					<view v-else>
						暂无数据。。。。

					</view>
					<view class="load-text f-color">
						{{item.loadText}}
					</view>

				</scroll-view>


			</swiper-item>

		</swiper>


		<!--   <IndexSwiper></IndexSwiper>
				 <Recommend></Recommend>
				 <card cardTitle='猜你喜欢'></card>
				 <CommodityList></CommodityList> -->
		<!-- 
	  <Banner></Banner>
	  <Icoms></Icoms>
	  <card cardTitle='热销爆品'></card>
	  <Hot></Hot>
	  <card cardTitle=''></card>
	  <card cardTitle='推荐店铺'></card>
	  <Shop></Shop>
	  <card cardTitle='为您推荐'></card>
	  <CommodityList></CommodityList>
	 
    -->


	</view>
</template>

<script>
	import $http from '@/common/api/request.js'
	import Recommend from "@/components/index/Recommend.vue";
	import IndexSwiper from "@/components/index/IndexSwiper.vue";
	import Commodity from "@/components/common/Commodity.vue";
	import Card from "@/components/index/Card.vue";
	import CommodityList from "@/components/common/CommodityList.vue";
	import Banner from "@/components/index/Banner.vue";
	import Icoms from "@/components/index/Icons.vue";
	import Hot from "@/components/index/Hot.vue";
	import Shop from "@/components/index/Shop.vue"
	export default {
		data() {
			return {
				// 选中索引
				topBarIndex: 0,
				// 跟随的索引id值
				scrollIntoIndex: 'top0',
				// 内容块的高度值
				clentHeight: '0px',
				topBar: [
					// {
					// 	name: '推荐'
					// },
					// {
					// 	name: '运动户外'
					// },
					// {
					// 	name: '服饰内衣'
					// },
					// {
					// 	name: '鞋子箱包'
					// },
					// {
					// 	name: '美妆个护'
					// },
					// {
					// 	name: '家具数码'
					// },
					// {
					// 	name: '食品母婴'
					// }
				],
				// 承载数据
				newTopBar: [],



			}
		},
		onLoad() {
			this.__init();

		},
		onReady() {
			this.getClientHeight();
			uni.getSystemInfo({
				success: (res) => {
					this.clentHeight = (res.windowHeight - uni.upx2px(80) - this.getClientHeight()) + 'px';
				}
			})

		},
		components: {
			Recommend,
			IndexSwiper,
			Commodity,
			Card,
			CommodityList,
			Banner,
			Icoms,
			Hot,
			Shop
		},
		// 标题栏按钮点击
		onNavigationBarButtonTap(e) {
			console.log(e);
			if(e.float=='left'){
				uni.navigateTo({
					url:'/pages/search/search'
				})
			}			
		},
		
		
		methods: {

			// 请求首页数据
			__init() {
				$http.request({
					url: "/index_list/data"
				}).then((res) => {
					this.topBar = res.topBar;
					this.newTopBar = this.initData(res);
				}).catch(() => {
					uni.showToast({
						title: "请求失败！",
						icon: "none"
					})
				});
			},
			// 点击顶栏
			changeTab(index) {
				if (this.topBarIndex === index) {
					return;
				}
				this.topBarIndex = index;

				this.scrollIntoIndex = 'top' + index;
				// 判断是否首次进行滑动
				if (this.newTopBar[this.topBarIndex].load === 'first') {
					this.addData();
				}

			},
			// 对应滑动
			onChangeTab(e) {
				this.changeTab(e.detail.current);

			},
			// 添加数据
			initData(res) {
				const arr = [];
				for (let i = 0; i < this.topBar.length; i++) {
					let obj = {
						data: [],
						load: 'first',
						loadText: '上拉加载更多...'
					}
					// 获取首次数据
					if (i == 0) {
						obj.data = res.data;
					}
					arr.push(obj)

				}
				return arr;
			},
			// 获取可视区域高度【兼容]
			getClientHeight() {
				const res = uni.getSystemInfoSync();
				const system = res.platform;
				if (system === 'ios') {
					return 44 + res.statusBarHeight;
				} else if (system === 'android') {
					return 48 + res.statusBarHeight;
				} else {
					return 0;
				}
			},
			// 对应显示不同数据
			addData(callback) {
				// 拿到索引
				let index = this.topBarIndex;
				// 拿到Id
				let id = this.topBar[index].id;
				// 请求不同的数据
				let page = Math.ceil(this.newTopBar[index].data.length / 5) + 1;

				$http.request({
					url: `/index_list/${id}/data/${page}`,
				}).then((res) => {
					this.newTopBar[index].data = [...this.newTopBar[index].data, ...res];
				}).catch(() => {
					uni.showToast({
						title: "请求失败！",
						icon: "none"
					})
				})
				// 滑动初始值改变后进行赋值
				this.newTopBar[index].load = 'last';
				if (typeof callback === 'function') {
					callback();
				}
			},
			// 上拉加载更多
			loadMore(index) {
				this.newTopBar[index].loadText = '加载中...'

				// 请求完数据
				this.addData(() => {
					this.newTopBar[index].loadText = '加载更多...'
				})
			}


		}
	}
</script>

<style scoped>
	.scroll-content {
		width: 100%;
		height: 80rpx;
		white-space: nowrap;
	}

	.scroll-item {
		display: inline-block;
		padding: 10rpx 30rpx;
		font-size: 32rpx;
	}

	.f-active-color {
		padding: 10rpx 0;
		border-bottom: 6rpx solid #49bdfb;
	}

	.load-text {
		border-top: 2rpx solid #636263;
		line-height: 60rpx;
		text-align: center;
	}
</style>