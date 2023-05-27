import {request} from "https";
import store from '@/store/index.js';
export default {
	common: {
		baseUrl: "http://192.168.30.106:3000/api",
		data: {},
		header: {
			"Content-Type": "application/json",
			"Content-Type": "application/x-www-form-urlencoded"
		},
		method: "GET",
		dataType: "json"
	},
	request(options = {}) {
		uni.showLoading({
			title:"加载中"
		});
		// #ifdef H5
		options.url = "http://localhost:8080/dpc/api" + options.url;
		// #endif
		// #ifndef H5
		options.url = this.common.baseUrl + options.url;
		// #endif
		options.data = options.data || this.common.data;
		options.header = options.header || this.common.header;
		options.method = options.method || this.common.method;
		options.dataType = options.dataType || this.common.dataType;
		// 是否进行验证token,传入token进行用户登录的验证
		if(options.header.token){
			options.header.token = store.state.user.token;
			if(!options.header.token){
				uni.showToast({
					title:'请先登录',
					icon:"none"
				})
				return uni.navigateTo({
					url:"/pages/login/login"
				})
			}
		}
		return new Promise((res, rej) => {
			uni.request({
				...options,
				success: (result) => {
					if (result.statusCode != 200) {
						return rej();
					}
					let data = result.data.data;
					setTimeout(function(){
						uni.hideLoading()
					},500);
					res(data);
					
				}
			})
		});
	}
}