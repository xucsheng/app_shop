var User ={
	// 查询用户功能
	queryUserName(param){
		return "select id, user_name as userName,user_pwd as userPwd,phone,img_url as imgUrl,nick_name as nickName,token from user  where user_name = '"+param.userName+"' or phone = '"+param.userName+"'";
	},
	// 验证用户名和密码
	queryUserPwd(param){
		return "select id, user_name as userName,user_pwd as userPwd,phone,img_url as imgUrl,nick_name as nickName,token from user  where (user_name = '"+param.userName+"' or phone = '"+param.userName+"') and user_pwd ='"+param.userPwd+"'";
	},
	// 增加一条用户
	insertUser(param){
		return "insert into User(user_name,user_pwd,phone,img_url,nick_name,token) values('','','"+param.userName+"','../../static/image/logo.jpg','默认昵称','' )";
	},
}
exports = module.exports = User;
