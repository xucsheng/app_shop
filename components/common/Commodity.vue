<template>
 <view class="commodity" :style="'flex-wrap:'+wrap+';'">
	 
	 <!--单个商品组件-->
	<view class='commodity-item' v-for="(item,index) in dataList" :key="index" :style="{width:itemW}" @tap="goDetail(item.id)">
				<image class='commodity-img' :src="item.imageUrl" mode="" :style="{height:bigH}"></image>
				<view class='commodity-content'>
					<text class='commodity-name' :style="{'font-size':nameSize}">大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008</text>
					<view>
						<text class='pprice'>¥{{item.pprice}}</text>
						<text class='oprice'>¥{{item.oprice}}</text>
					</view>
					<text class='discount'>{{item.discount}}折</text>
				</view>
    	</view>
		
	</view>
</template>

<script>
	export default {
		name: "commodity",
		props:{
			dataList:Array,
			itemW:{
				type:String,
			    default:'375rpx'
			},
			bigH:{
				type:String,
				default:'375rpx'
			},
			wrap:{
				type:String,
				default:'wrap'
			},
			nameSize:{
				type:String,
				default:'26rpx'
			}
		},
		data() {
			return {
                
			};
		},
		methods:{
			goDetail(id){
				uni.navigateTo({
					url:"../../pages/deatil/deatil?id="+id
				})
			}
		}
	}
</script>

<style scoped>
   .commodity{
	   display: flex;
  }
.commodity-item{
	width: 375rpx;
	padding-bottom:20rpx;
}
.commodity-img{
	width:100%;
}
.commodity-content{
	text-align: center;
}
.commodity-name{
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
    -webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	color: #333333;
	word-break: break-all;
	padding: 6rpx 20rpx;
}
.oprice{
	text-decoration: line-through;
	font-size: 24rpx;
	color: #999999;
}
.discount{
	border-radius: 4rpx;
	border:1px solid #FF3333;
	padding: 3rpx 10rpx;
	font-size: 20rpx;
	color: #FF3333;
}

</style>