<template>
	<view class="commodity-list">
		<Commodity :dataList="dataList" ></Commodity>
	</view>
</template>

<script>
	import Commodity from "@/components/common/Commodity.vue"
	export default {
		name:"commodityList",
		props:{
			dataList:Array
		},
		components:{
			Commodity
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style>

</style>