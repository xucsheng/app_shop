<template>
	<view>
		<MyLine></MyLine>
		<view class="login-tel">
			<view class="tel-main">
				<view class="login-from">
					<view class="login-user">
						<text class="user-text">验证码</text>
						<input type="text" focus="true"  value="" placeholder="请输入验证码" v-model="userCode"/>
						<button   plain="true" size="mini" :disabled="disabled" @tap="sendCode">{{codeMsg}}</button>
					</view>
					<view class="tel" @tap="goNextIndex">下一步</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import MyLine from "@/components/common/MyLine.vue";
	import $http from '@/common/api/request.js';
	export default {
		data() {
			return {
				codeNum:60,
				// 显示文本
				codeMsg:"",
				// 按钮是否禁用
				disabled:false,
				// 用户输入的验证码
			    userCode:'',
				// 手机号
				phone:'',
				//验证码
				code:''
			}
		},
		onReady() {
			this.codeMsg="重新发送（"+this.codeNum+"）";
			this.sendCode();
		},
		methods: {
	
			// 点击验证码发送
			sendCode(){
				// 请求接口发送验证码
				$http.request({
					url: "/code",
					method:'POST',
					data:{
						userName:this.phone
					}
				}).then((res) => {
					if(res.success){
						this.code = res.code;
					}
				}).catch(() => {
					uni.showToast({
						title: "请求失败！",
						icon: "none"
					})
				});
				
				
				this.disabled = true;
				let timer = setInterval(()=>{
					this.codeNum--;
					this.codeMsg="重新发送（"+this.codeNum+"）";
				},1000);
				setTimeout(()=>{
					clearInterval(timer);
					this.codeNum =10;
					this.disabled = false;
					this.codeMsg ='重新发送';
				},60000);
			},
			goNextIndex(){
		
				if(this.code == this.userCode){
					// 请求接口注册账号
					// 请求接口发送验证码
					$http.request({
						url: "/addUser",
						method:'POST',
						data:{
							userName:this.phone,
							code:this.userCode
						}
					}).then((res) => {
				
						// 注册成功
						if(res.success){
							uni.showToast({
								title:res.msg,
								icon:"none"
							})
							uni.redirectTo({
								url:'/pages/index/index'
							})
						}else{
							uni.showToast({
								title:res.msg,
								icon:"none"
							})
						}
					}).catch(() => {
						uni.showToast({
							title: "请求失败！",
							icon: "none"
						})
					});
				
				}else{
					
					uni.showToast({
						title: "验证码错误",
						icon: "none"
					})
				}
				
				
			}
			
		},
		components: {
			MyLine
		},
		onLoad(e) {
			this.phone =  e.phone;
		}
	}
</script>

<style scoped>
	.login-tel {
		width: 100vw;
		height: 100vh;
	}

	.tel-main {
		padding: 0 20rpx;
	}

	.login-from {
		padding-to: 30rpx 0;
	}

	.login-user {
		font-size: 32rpx;
		padding: 10rpx 0;
		display: flex;
		align-items: center;
		border-bottom: 2rpx solid #f7f7f7;
	}

	.user-text {
		padding-right: 20rpx;
	}

	.tel {
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		color: #FFFFFF;
		background-color: #49bdfb;
		border-radius: 40rpx;
	}
</style>