var Cart={
	selectByUserId(userId){
		return "SELECT id,	u_id as uId,goods_id as goodsId,name,img_url as imgUrl,p_price as pPrice, color ,num FROM goods_cart where u_id="+userId;
	},
	updateNumById(params){
		return "Update goods_cart set num ="+params.num+"  where id ="+params.id;
	},
	deleteByIds(ids){
		return " delete from goods_cart where id in ("+ids+")"
	},
	addCart(params){
		return "INSERT INTO goods_cart(u_id, goods_id, name, img_url, p_price, num) VALUES ( "+params.uId+", "+params.goodsId+", '"+params.name+"', '"+params.imgUrl+"', "+params.pPrice+", "+params.num+" )";
	},
	selectByUserIdAndGoodsId(params){
			return "SELECT id,	u_id as uId,goods_id as goodsId,name,img_url as imgUrl,p_price as pPrice, color ,num FROM goods_cart where u_id="+params.uId+" and goods_id ="+params.goodsId;
	}
	
}

exports = module.exports = Cart;