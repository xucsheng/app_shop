<template>
	<view>
		<!--自定义导航栏-->
		<uniNavBar title="确认支付" left-text="关闭" fixed="true" status-bar="true" @clickLeft="goBack"></uniNavBar>

		<view class="pay-main">
			<radio-group>
				<label for="">
					<view class="pay-item">
						<image class="pay-img" src="../../static/image/zfb.png" mode=""></image>
						<view class="">
							<view class="">支付宝支付</view>
							<view class="pay-txt">推荐支付宝用户使用</view>
						</view>
						<label class="radio">
							<radio value="" color="#FF3333" /><text></text>
						</label>
					</view>
				</label>
				<label for="">
					<view class="pay-item">
						<image class="pay-img" src="../../static/image/wxf.png" mode=""></image>
						<view class="">
							<view class="">微信支付</view>
							<view class="pay-txt">推荐微信用户使用</view>
						</view>
						<label class="radio">
							<radio value="" color="#FF3333" /><text></text>
						</label>
					</view>
				</label>
			</radio-group>
			
		</view>
		<!-- 去底部支付 -->
		<view class="pay-foot">
			<view class="total">
				<text class="f-color">合计</text><text class="total-price">￥{{details.price}}</text>
			</view>
			<view class="go-pay" @tap="goPayment">去支付</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni/uni-nav-bar/uni-nav-bar.vue";
	export default {
		data() {
			return {
               details:{
				   price:0
			   }
			}
		},
		methods: {
			// 点击关闭返回上一页
			goBack() {
				uni.navigateBack({
					delta: 1
				})

			},
			goPayment(){
				console("去支付");
				uni.requestPayment({
				    "provider": "wxpay", 
				    "orderInfo": {
				        "appid": "wx499********7c70e",  // 微信开放平台 - 应用 - AppId，注意和微信小程序、公众号 AppId 可能不一致
				        "noncestr": "c5sEwbaNPiXAF3iv", // 随机字符串
				        "package": "Sign=WXPay",        // 固定值
				        "partnerid": "148*****52",      // 微信支付商户号
				        "prepayid": "wx202254********************fbe90000", // 统一下单订单号 
				        "timestamp": 1597935292,        // 时间戳（单位：秒）
				        "sign": "A842B45937F6EFF60DEC7A2EAA52D5A0" // 签名，这里用的 MD5/RSA 签名
				    },
				    success(res) {},
				    fail(e) {}
				})

				// uni.navigateTo({
				// 	url:'/pages/paymentSuccess/paymentSuccess'
				// })
			}
			
		},
		components: {
			uniNavBar
		},
		onLoad(e) {
			this.details = JSON.parse(e.details);
		}
	}
</script>

<style scoped>
	.pay-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx;
		border-bottom: 2rpx solid #CCCCCC;

	}

	.pay-img {
		width: 100rpx;
		height: 100rpx;
	}

	.pay-txt {
		color: #cccccc;
	}
	.pay-foot{
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 0;
		height: 100rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.total{
		padding-left: 100rpx;
		flex: 1;
		background-color: #000000;
		line-height: 100rpx;
	}
	.go-pay{
		color: #FFFFFF;
		background-color: #49bdfb;
		line-height: 100rpx;
		text-align: center;
		width: 220rpx;
	}
	.total-price{
		color: #FFFFFF;
	}
</style>