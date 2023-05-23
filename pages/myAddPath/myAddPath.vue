<template>
	<view class="my-add-path">
		<view class="path-item">
			<view class="">收件人</view>
			<input type="text" value="" placeholder="收件人姓名"  v-model="pathObj.name"/>
		</view>
		<view class="path-item">
			<view class="">手机号</view>
			<input type="text" value="" placeholder="11位手机号" v-model="pathObj.tel"/>
		</view>
		<view class="path-item">
			<view class="">所在地区</view>
			<input type="text" :value="pathObj.city" placeholder="请选择" @tap="showPicker()" />
			<mpvue-city-picker ref="mpvueCityPicker" :pickerValueDefault="pickerValueDefault" @onConfirm="onConfirm">
			</mpvue-city-picker>
		</view>
		<view class="path-item">
			<view class="">详细地址</view>
			<input type="text" value="" placeholder="5到60字符" v-model="pathObj.detail" />
		</view>
		<view class="path-item">
			<view class="">设为默认地址</view>
			<radio-group name="" @change="onchecked()">
				<label class="radio">
					<radio value="" class="#FF3333"  :checked="pathObj.isDefault"/>
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
	import {mapActions} from 'vuex';
	export default {
		data() {
			return {
				pickerValueDefault: [0, 0, 1],
				pathObj:{
					city:'请选择',
					name:'',
					tel:'',
					detail:'',
					isDefault:false
				},
				i:-1,
				// 是否修改
				isStatus:false,
				
			}
		},
		components: {
			mpvueCityPicker
		},
		methods: {
			...mapActions(['creatrePathFn','updatePathFn']),
			showPicker() {
				this.$refs.mpvueCityPicker.show();
			},
			onConfirm(e) {
				this.pathObj.city = e.label;
			},
			onchecked(){
				this.pathObj.isDefault= !this.pathObj.isDefault;
			},
			savePath(){
				if(this.isStatus){
					// 修改
					this.updatePathFn({
						index:this.i,
						item:this.pathObj
					})
				}else{
					// 新增
					this.creatrePathFn(this.pathObj);
				}
				
				// 返回上一页
				uni.navigateBack({
					delta:1
				})
			}
			
		},
		// 页面生命周期
		onNavigationBarButtonTap() {
			this.savePath();
			
		},
		onLoad(e) {
			if(e.data){
				uni.setNavigationBarTitle({
					title:'修改地址'
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
	.add-path-btn{
		border: 2rpx solid #49bdfb;
		color: #49bdfb;
		border-radius: 30rpx;
		padding: 6rpx 60rpx;
	}
</style>