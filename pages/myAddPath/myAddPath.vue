<template>
	<view class="my-add-path">
		<view class="path-item">
			<view class="">收件人</view>
			<input type="text" value="" placeholder="收件人姓名" />
		</view>
		<view class="path-item">
			<view class="">手机号</view>
			<input type="text" value="" placeholder="11位手机号" />
		</view>
		<view class="path-item">
			<view class="">所在地区</view>
			<input type="text" :value="cityName" placeholder="请选择" @tap="showPicker()" />
			<mpvue-city-picker ref="mpvueCityPicker" :pickerValueDefault="pickerValueDefault" @onConfirm="onConfirm">
			</mpvue-city-picker>
		</view>
		<view class="path-item">
			<view class="">详细地址</view>
			<input type="text" value="" placeholder="5到60字符" />
		</view>
		<view class="path-item">
			<view class="">设为默认地址</view>
			<label class="radio">
				<radio value="" class="#FF3333" /><text></text>
			</label>
		</view>

	</view>
</template>

<script>
	import mpvueCityPicker from "../../components/uni/mpvue-citypicker/mpvueCityPicker.vue"
	export default {
		data() {
			return {
				cityName:'请选择',
				pickerValueDefault: [0, 0, 1]
			}
		},
		components: {
			mpvueCityPicker
		},
		methods: {
			showPicker() {
				this.$refs.mpvueCityPicker.show();
			},
			onConfirm(e) {
				this.cityName = e.label;
			}
		}
	}
</script>

<style scoped>
	.my-add-path {
		padding-left: 20rpx;
	}

	.path-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 16rpx 0;
		width: 100%;
		border-bottom: 2rpx solid #CCCCCC;
	}

	..path-item input {
		flex: 1;
		text-align: left;
		padding-left: 10rpx;
	}
</style>