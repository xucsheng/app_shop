<template>
	<view class="hot">
		<Commodity :dataList="hotList"  itemW='250rpx' bigH='220rpx'></Commodity>
	</view>
</template>

<script>
	import Commodity from "@/components/common/Commodity.vue";
	export default {
		data() {
			return {
				hotList:[
					{
					 id:1,
					 imageUrl:'../../static/image/hot1.jpg',
					 name:'大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
					 pprice:"299",
					 oprice:"659",
					 discount:"5.2"
					},
					{
						id:2,
						imageUrl:'../../static/image/hot2.jpg',
						name:'大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
						pprice:"299",
						oprice:"659",
						discount:"5.2"
					},
					{
						id:3,
						imageUrl:'../../static/image/hot3.jpg',
						name:'大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
						pprice:"299",
						oprice:"659",
						discount:"5.2"
					},
					{
					 id:4,
					 imageUrl:'../../static/image/hot1.jpg',
					 name:'大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
					 pprice:"299",
					 oprice:"659",
					 discount:"5.2"
					},
					{
						id:5,
						imageUrl:'../../static/image/hot2.jpg',
						name:'大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
						pprice:"299",
						oprice:"659",
						discount:"5.2"
					},
					{
						id:6,
						imageUrl:'../../static/image/hot3.jpg',
						name:'大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
						pprice:"299",
						oprice:"659",
						discount:"5.2"
					}
				]
					
			}
		},
		methods: {
			
		},
		components:{
			Commodity
		}
	}
</script>

<style>

</style>
