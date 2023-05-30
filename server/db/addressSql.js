var Addrsss ={
	
	selectByUserId(userId){
		return "select  id, name, tel, province, city, district, address, is_default as isDefault, user_id as userId from address where user_id="+userId+" order by is_default desc";
	},
	insert(params){
		return "INSERT INTO address(name, tel, province, city, district, address, is_default, user_id) VALUES ('"+params.name+"', '"+params.tel+"', '"+params.province+"', '"+params.city+"', '"+params.district+"', '"+params.address+"', '"+params.isDefault+"', "+params.userId+")";
	},
	setIsDefault(userId){
		return "UPDATE address SET is_default = 0 WHERE is_default =1 and  user_id="+userId;
	},
	updateAddress(params){
		return "UPDATE address SET name='"+params.name+"',tel='"+params.tel+"',province='"+params.province+"',city='"+params.city+"',district='"+params.district+"',address='"+params.address+"',is_default='"+params.isDefault+"' where id="+params.id;
	}
}

exports = module.exports = Addrsss;