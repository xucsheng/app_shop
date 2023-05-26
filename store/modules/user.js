export default{
	state:{
		// 登录状态
		loginStatus:false,
		// token
		token:null,
		// 用户信息（昵称/头像）
		userInfo:{}
		
	},
	getters:{
		
	},
	mutations:{
		// 一旦进入 app，就需要执行这个方法，把用户信息读出来
		initUser(state){
			let userInfo = JSON.parse(uni.getStorageSync('userInfo')||'{}')
			if(userInfo && userInfo.userInfo){
				state.userInfo = userInfo;
			    state.loginStatus = true;
			    state.token = userInfo.token;
			}
		},
		// 登录后保存用户信息
		login(state,userInfo){
			state.userInfo = userInfo;
			state.loginStatus = true;
			state.token = userInfo.token;
			// 持久化存储
			uni.setStorageSync('userInfo',JSON.stringify(state.userInfo));
		},
		// 退出登录
		loginOut(state){
				state.loginStatus = false;
				state.userInfo = {};
				state.token = null;
				// 删除本地存储
				uni.removeStorageSync('userInfo');
		}
	},
	actions:{
		
		
	}
	
}