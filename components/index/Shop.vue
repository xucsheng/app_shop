<template>
	<view class="shop">
		<view class="shop-item">
			<view class="shop-big">
				<view class="shop-big">
					<image class="shop-big" src="../../static/image/shop.jpg" mode=""></image>
				</view>
				<scroll-view scroll-x="true" class="scroll-content">
					<view class='scroll-item'>
						<Commodity :dataList='shopList' wrap="nowrap" itemW='150rpx' bigH='100rpx' nameSize='5rpx'>
						</Commodity>
					</view>
				</scroll-view>
			</view>
		</view>

	</view>
</template>

<script>
	import Commodity from "@/components/common/Commodity.vue"
	export default {
		data() {
			return {
				shopList: [{
						id: 1,
						imageUrl: '../../static/image/shop1.jpg',
						name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: 2,
						imageUrl: '../../static/image/shop2.jpg',
						name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: 3,
						imageUrl: '../../static/image/shop3.jpg',
						name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: 4,
						imageUrl: '../../static/image/shop4.jpg',
						name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: 1,
						imageUrl: '../../static/image/shop1.jpg',
						name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: 2,
						imageUrl: '../../static/image/shop2.jpg',
						name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: 3,
						imageUrl: '../../static/image/shop3.jpg',
						name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: 4,
						imageUrl: '../../static/image/shop4.jpg',
						name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					}

				]
			}
		},
		components: {
			Commodity
		},
		methods: {

		}
	}
</script>

<style scoped>
	.shop-big {
		width: 100%;
		height: 350rpx;
	}

	.scroll-content {
		width: 100%;
		white-space: nowrap;
	}

	.scroll-item {
		display: inline-block;
		width: 300rpx;
		height: 300rpx;
	}
</style>