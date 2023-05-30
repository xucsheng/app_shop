var Cart={
	selectByUserId(userId){
		return "SELECT id,	u_id as uId,goods_id as goodsId,name,img_url as imgUrl,p_price as pPrice, color ,num FROM goods_cart where u_id="+userId;
	}
}

exports = module.exports = Cart;