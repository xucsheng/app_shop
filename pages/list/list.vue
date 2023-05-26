<template>
	<view>
		<MyLine></MyLine>
		<view class="list">
			<!--左侧滑动-->
			<scroll-view scroll-y="true" class="list-left" :style="{height:clentHeight}">
				<view v-for="(item,index) in leftData " class="left-item" @tap="changeLeftTab(index,item.id)">
					<view class="left-name" :class="activeIndex===index?'left-name-active':'left-item'">{{item.name}}
					</view>
				</view>
			</scroll-view>
			<!--右侧滑动-->
			<scroll-view scroll-y="true" class="list-right" :style="{height:clentHeight}">
				<view class="right-list" v-for="(item,index) in rightData" :key="index">
					<block v-for="(k,i) in item" :key="i">
						<view class="list-title">{{k.name}}</view>
						<view class="right-content">
							<view class="right-item" v-for="(j,idx) in k.list" :key="idx">
								<image class="right-img" :src="j.imgUrl"></image>
								<view class="right-name">{{j.name}}</view>
							</view>
						</view>
					</block>
				</view>

			</scroll-view>
		</view>
		 <Tabbar currentPage='list' ></Tabbar>
	</view>
</template>

<script>
	import $http from '@/common/api/request.js';
	import MyLine from "@/components/common/MyLine.vue";
	import Tabbar from "@/components/common/Tabbar.vue";
	export default {
		data() {
			return {
				// 内容块的高度值
				clentHeight: '0px',
				activeIndex: 1,
				// 左侧数据
				leftData: [],
				// 右侧数据
				rightData: [],
			}
		},
		components: {
			MyLine,
			Tabbar
		},
		methods: {
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
			// 左侧点击事件
			changeLeftTab(index, id) {
				this.getData(id);
				this.activeIndex = index;
			},
			// 获取数据
			getData(id) {
				if (id === (this.activeIndex + 1)) {
					return;
				}
				$http.request({
					url: `/goods/list`,
				}).then((res) => {
					let leftData = [];
					let rightData = [];
					res.forEach((v) => {
						leftData.push({
							id: v.id,
							name: v.name

						})
						// 如果点击Id相同
						if (v.id === (this.activeIndex + 1)) {
							rightData.push(v.data);
						}
					});
					this.leftData = leftData;
					this.rightData = rightData;
				}).catch(() => {
					uni.showToast({
						title: "请求失败！",
						icon: "none"
					})
				})
			}

		},
		// input输入框点击事件
		onNavigationBarSearchInputClicked() {
			uni.navigateTo({
				url: '../search/search'
			})
		},
		onReady() {
			// 获取可视高度
			uni.getSystemInfo({
				success: (res) => {
					this.clentHeight = (res.windowHeight - this.getClientHeight()) + 'px';
				}
			})
		},
		onLoad() {
			this.getData();
		}


	}
</script>

<style scoped>
	.list {
		display: flex;
	}

	.list-left {
		width: 200rpx;
	}

	.left-item {
		border-bottom: 2rpx solid #FFFFFF;
		font-size: 28rpx;
		font-weight: bold;
		background-color: #F7F7F7;
	}

	.left-name-active {
		border-left: 8rpx solid #49BDFB;
		background-color: #FFFFFF;
	}

	.left-name {
		padding: 30rpx 6rpx;
		text-align: center;

	}

	.list-right {
		flex: 1;
		padding-left: 30rpx;
	}

	.list-title {
		font-weight: bold;
		font-size: 30rpx 0;

	}

	.right-content {
		display: flex;
		flex-wrap: wrap;
	}

	.right-item {
		width: 150rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 10rpx;
	}

	.right-img {
		width: 150rpx;
		height: 150rpx;
	}

	.right-name {
		padding: 16rpx 0;

	}
</style>