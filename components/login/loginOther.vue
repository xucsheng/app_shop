<template>
	<view class="login-other">
		<view class="other-text">
			<view class="other-text-title">或用以下方式登录</view>
		</view>
		<view class="other">
			<view class="other-item" @tap="loginOther('weixin')">
				<image src="../../static/image/wx.png" mode=""></image>
				<view class="微信登录"></view>
			</view>
			<view class="other-item" @tap="loginOther('sinaweibo')">
				<image src="../../static/image/wb.png" mode=""></image>
				<view class="微博登录"></view>
			</view>
			<view class="other-item" @tap="loginOther('qq')">
				<image src="../../static/image/qq.png" mode=""></image>
				<view class="QQ登录"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import $http from '@/common/api/request.js';
	import {mapMutations} from 'vuex'
	export default {
		data() {
			return {
	
			}
		},
		methods: {
			...mapMutations(['login']),
	      loginOther(mode){
			  uni.login({
				  provider:mode,
				  success: (res) => {
					uni.getUserInfo({
						 // 最主要的就是openid
						provider:mode,
						success: (res) => {
							let provide = mode;
							let openid = res.userInfo.openId||res.userInfo.openid;
							let  nickName =res.userInfo.nickName;
							let avatarUrl = res.userInfo.avatarUrl;
							$http.request({
								url: "/loginOther",
								method:'POST',
								data:{
									openid,
									provide,
									nickName,
									avatarUrl
								}
							}).then((res) => {
								// 登录
								this.login(res.data);
								// 返回上一页
								uni.navigateBack({
									delta:1
								})
							}).catch(() => {
								uni.showToast({
									title: "请求失败！",
									icon: "none"
								})
							});
						}
					})
				  }
			  });
		  }
		}
	}
</script>

<style scoped>
	/* 其它登录方法 begin*/
	.login-other {
		padding: 100rpx 0;
	}

	.other-text {
		display: flex;
		padding: 50rpx 0;
	}

	.other-text-title {
		line-height: 0rpx;
		padding: 0 10rpx;
	}

	.other-text::after {
		flex: 1;
		height: 2rpx;
		background-color: #CCCCCC;
		content: '';
	}

	.other-text::before {
		flex: 1;
		height: 2rpx;
		background-color: #CCCCCC;
		content: '';
	}

	.other {
		display: flex;
		justify-content: space-around;
	}

	.other-item {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}

	.other-item image {
		width: 80rpx;
		height: 80rpx;
	}

	/* 其它登录方法 end*/
</style>