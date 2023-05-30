<template>
	<view class="my-add-path">
		<view class="path-item">
			<view class="">收件人</view>
			<input type="text" value="" placeholder="收件人姓名" v-model="pathObj.name" />
		</view>
		<view class="path-item">
			<view class="">手机号</view>
			<input type="text" value="" placeholder="11位手机号" v-model="pathObj.tel" />
		</view>
		<view class="path-item">
			<view class="">所在地区</view>
			<input type="text" :value="pathCity" placeholder="请选择" @tap="showPicker()" />
			<mpvue-city-picker ref="mpvueCityPicker" :pickerValueDefault="pickerValueDefault" @onConfirm="onConfirm">
			</mpvue-city-picker>
		</view>
		<view class="path-item">
			<view class="">详细地址</view>
			<input type="text" value="" placeholder="5到60字符" v-model="pathObj.address" />
		</view>
		<view class="path-item">
			<view class="">设为默认地址</view>
			<radio-group name="" @change="onchecked()">
				<label class="radio">
					<radio value="" class="#FF3333" :checked="pathObj.isDefault == 1" />
				</label>
			</radio-group>

		</view>
		<!--#ifndef APP-VUE-->
		<view class="add-path">
			<view class="add-path-btn f-active-color" @tap="savePath()">保存</view>
		</view>
		<!--#endif-->

	</view>
</template>

<script>
	import mpvueCityPicker from "../../components/uni/mpvue-citypicker/mpvueCityPicker.vue"
	import {mapActions,mapMutations} from 'vuex';
	import $http from '@/common/api/request.js'
	export default {
		data() {
			return {
				pickerValueDefault: [0, 0, 1],
				pathObj: {
					name: '',
					tel: '',
					province: '',
					city: '',
					district: '',
					address: '',
					isDefault: 0,
					id:-1,
					userId:-1
				},
				i: -1,
				// 是否修改
				isStatus: 0,

			}
		},
		components: {
			mpvueCityPicker
		},
		computed: {
			pathCity() {
				if (this.pathObj.province) {
					return `${this.pathObj.province}-${this.pathObj.city}-${this.pathObj.district}`;
				} else {
					return '请选择';
				}
			}
		},
		methods: {
			...mapActions(['creatrePathFn', 'updatePathFn']),
			...mapMutations(['_initAddressList']),
			showPicker() {
				this.$refs.mpvueCityPicker.show();
			},
			onConfirm(e) {
				let arr = e.label.split('-');
				this.pathObj.province = arr[0];
				this.pathObj.city = arr[1];
				this.pathObj.district = arr[2];
			},
			onchecked() {
				this.pathObj.isDefault =  this.pathObj.isDefault === 1 ? 0 : 1;
			},
			savePath() {
				if (this.isStatus) {
					$http.request({
						url: "/updateAddress",
						method:'POST',
						header:{
							token:true
						},
						data:{
							...this.pathObj
						}
					
					}).then((res) => {
						this.updatePathFn({
							index: this.i,
							item: this.pathObj
						})
						// 修改成功
						uni,uni.showToast({
							title: '修改成功',
							icon:"none"
						});
						
					}).catch(() => {
						uni.showToast({
							title: "请求失败！",
							icon: "none"
						})
					})
					
				} else {
					$http.request({
						url: "/insertAddress",
						method:'POST',
						header:{
							token:true
						},
						data: this.pathObj

					}).then((res) => {
						this._initAddressList(res.data);
					}).catch(() => {
						uni.showToast({
							title: "请求失败！",
							icon: "none"
						})
					})

					// 新增
					//this.creatrePathFn(this.pathObj);
				}

				// 返回上一页
				uni.navigateBack({
					delta: 1
				})
			}

		},
		// 页面生命周期
		onNavigationBarButtonTap() {
			this.savePath();

		},
		onLoad(e) {
			if (e.data) {
				uni.setNavigationBarTitle({
					title: '修改地址'
				});
				let result = JSON.parse(e.data);
				this.pathObj = result.item;
				this.i = result.index;
				this.isStatus = true;
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

	.add-path {
		padding: 20rpx 0;
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.add-path-btn {
		border: 2rpx solid #49bdfb;
		color: #49bdfb;
		border-radius: 30rpx;
		padding: 6rpx 60rpx;
	}
</style>