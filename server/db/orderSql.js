var Order ={
	addOrder(params){
		return "INSERT INTO store_order( u_id, order_id, goods_name, goods_price, goods_num, order_status) VALUES ("+params.uId+", '"+params.orderId+"', '"+params.goodsName+"', "+params.goodsPrice+","+params.goodsNum+", "+params.orderStatus+")"
	},
	selectByOrderId(orderId){
		return "SELECT id, u_id as uId ,order_id as orderId,goods_name as goodsName,goods_price as goodsPrice,goods_num as goodsNum,order_status as orderStatus FROM store_order where order_id ='"+orderId+"'";
	},
	updateOrderStatus(id,orderStatus){
		return "Update  store_order set order_status="+orderStatus+" where id ="+id;
	}
	
};
exports = module.exports = Order;