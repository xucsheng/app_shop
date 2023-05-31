var User ={
	// 查询用户功能
	queryUserName(param){
		if(param.userName){
			return "select id, user_name as userName,user_pwd as userPwd,phone,img_url as imgUrl,nick_name as nickName,token,open_id as openId,provide   from user  where user_name = '"+param.userName+"' or phone = '"+param.userName+"'";
		}else{
			return "select id, user_name as userName,user_pwd as userPwd,phone,img_url as imgUrl,nick_name as nickName,token,open_id as openId,provide   from user  where open_id = '"+param.openid+"' and provide = '"+param.provide+"'";
		}
      },
	// 验证用户名和密码
	queryUserPwd(param){
		return "select id, user_name as userName,user_pwd as userPwd,phone,img_url as imgUrl,nick_name as nickName,token from user  where (user_name = '"+param.userName+"' or phone = '"+param.userName+"') and user_pwd ='"+param.userPwd+"'";
	},
	// 增加一条用户
	insertUser(param){
		let userName = param.userName ||param.openid.slice(0,11);
		const jwt = require('jsonwebtoken');
		// 用户id+时间戳+口令
		let payload ={name:userName};//用户名
		let secret ='xiaoluxian';//口令
		let token = jwt.sign(payload,secret);
		let nickName = param.nickName||'默认昵称';
		let imgUrl = param.avatarUrl||'../../static/image/logo.jpg';
		let  provide =  param.provide||'';
		let openid =param.openid||'';
		return "insert into User(user_name,user_pwd,phone,img_url,nick_name,token,provide,open_id) values('','1234567','"+userName+"','"+imgUrl+"','"+nickName+"','"+token+"','"+provide+"','"+openid+"' )";
	},
	selectByPhone(phone){
		return "select id, user_name as userName,user_pwd as userPwd,phone,img_url as imgUrl,nick_name as nickName,token,open_id as openId,provide   from user  where phone ='" +phone.name + "'";
	}
	
	
}
exports = module.exports = User;
