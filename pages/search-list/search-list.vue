<template>
	<view>
		<ShopList :keyword="keyword"></ShopList>
	</view>
</template>

<script>
	import ShopList from "@/components/common/ShopList.vue"
	export default {
		name: "shopList",

		data() {
			return {
				keyword: '',
			}
		},
		methods: {

		},
		components: {
			ShopList
		},
		onLoad(e) {
			this.keyword = e.keyword;
			// #ifdef APP-PLUS
			const currentWebview = this.$scope.$getAppWebview(); 
			currentWebview.setTitleNViewSearchInputText(e.keyword);
			// #endif

		}
	}
</script>

<style>

</style>