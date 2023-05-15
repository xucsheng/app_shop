const {
	json
} = require('express');
var express = require('express');
var router = express.Router();
var connection = require('../db/sql.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'Express'
	});
});



router.get('/api/goods', function(req, res, next) {
	let id = req.query.id;
	console.log(id);
	// 查询数据
	connection.query("SELECT * FROM goods_search  where id ="+ id, (
		err, result, fileIds) => {
		if (err) throw err;
		res.send({
			code: 0,
			data: result
		})
	});
	
});

router.get('/api/goods/list', function(req, res, next) {
	res.json({
		code:0,
		data:[
			{
				id:1,
				name:'家具家访',
				data:[
					{
						name:'家访',
						list:[
							{
								id:1,
								name:'毛巾/浴巾',
								imgUrl:'../../static/image/list1.jpg'
							},
							{
								id:2,
								name:'枕头',
								imgUrl:'../../static/image/list1.jpg'
							}
					
						]
					},
					{
						name:'生活用品',
						list:[
							{
								id:1,
								name:'浴室用品',
								imgUrl:'../../static/image/list1.jpg'
							},
							{
								id:2,
								name:'洗晒',
								imgUrl:'../../static/image/list1.jpg'
							}
					
						]
					},
				]
			},
			{
				id:2,
				name:'女装',
				data:[
					{
						name:'裙装',
						list:[
							{
								id:1,
								name:'连衣裙',
								imgUrl:'../../static/image/list1.jpg'
							},
							{
								id:2,
								name:'半身裙',
								imgUrl:'../../static/image/list1.jpg'
							}
					
						]
					},
					{
						name:'上衣',
						list:[
							{
								id:1,
								name:'T恤',
								imgUrl:'../../static/image/list1.jpg'
							},
							{
								id:2,
								name:'衬衫',
								imgUrl:'../../static/image/list1.jpg'
							}
					
						]
					},
				]
			}
			
		]
	})
});



router.get("/api/goods/search", function(req, res, next) {
	// desc 降序 asc 升序

	// 解构获取对象的key
	let [goodsName, orderName] = Object.keys(req.query);
	// name 参数的值
	let name = req.query[goodsName];
	//orderName的key的值
	let order = req.query[orderName];
	// 查询数据  
	connection.query("SELECT * FROM goods_search  where name like '%" + name + "%' order by +"+ orderName +" "+ order, (
		err, result, fileIds) => {
		if (err) throw err;
		res.send({
			code: 0,
			data: result
		})
	});

});

// 首页推荐的数据
router.get("/api/index_list/data", function(req, res, next) {

	res.send({
		"code": 0,
		"data": {
			topBar: [{
					id: 1,
					name: '推荐'
				},
				{
					id: 2,
					name: '运动户外'
				},
				{
					id: 3,
					name: '服饰内衣'
				},
				{
					id: 4,
					name: '鞋子箱包'
				},
				{
					id: 5,
					name: '美妆个护'
				},
				{
					id: 6,
					name: '家具数码'
				},
				{
					id: 7,
					name: '食品母婴'
				}
			],
			data: [{
					type: 'swiperList',
					data: [{
							imgUrl: "../../static/image/swiper1.jpg"
						},
						{
							imgUrl: "../../static/image/swiper2.jpg"
						},
						{
							imgUrl: "../../static/image/swiper3.jpg"
						},
					]
				},
				{
					type: 'recommendList',
					data: [{
							bigUrl: "../../static/image/Children.jpg",
							data: [{
									imgUrl: "../../static/image/Children1.jpg"
								},
								{
									imgUrl: "../../static/image/Children2.jpg"
								},
								{
									imgUrl: "../../static/image/Children3.jpg"
								}
							]
						},
						{
							bigUrl: "../../static/image/Furnishing.jpg",
							data: [{
									imgUrl: "../../static/image/Furnishing1.jpg"
								},
								{
									imgUrl: "../../static/image/Furnishing2.jpg"
								},
								{
									imgUrl: "../../static/image/Furnishing3.jpg"
								}
							]
						},
					]
				},
				{
					type: "commodityList",
					data: [{
							id: 1,
							imageUrl: '../../static/image/commodity1.jpg',
							name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
							pprice: "299",
							oprice: "659",
							discount: "5.2"
						},
						{
							id: 2,
							imageUrl: '../../static/image/commodity2.jpg',
							name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
							pprice: "299",
							oprice: "659",
							discount: "5.2"
						},
						{
							id: 3,
							imageUrl: '../../static/image/commodity3.jpg',
							name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
							pprice: "299",
							oprice: "659",
							discount: "5.2"
						},
						{
							id: 4,
							imageUrl: '../../static/image/commodity4.jpg',
							name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
							pprice: "299",
							oprice: "659",
							discount: "5.2"
						}
					]
				}

			]
		}
	})

});
// 服饰内衣第一次加载数据
router.get("/api/index_list/2/data/1", function(req, res, next) {
	res.json({
		code: "0",
		data: [{
				type: "bannerList",
				imgUrl: "../../static/image/banner1.jpg"
			},
			{
				type: "iconsList",
				data: [{
						imgUrl: "../../static/image/icons1.png",
						name: "运动户外"
					},
					{
						imgUrl: "../../static/image/icons2.png",
						name: "运动户外"
					},
					{
						imgUrl: "../../static/image/icons3.png",
						name: "运动户外"
					},
					{
						imgUrl: "../../static/image/icons4.png",
						name: "运动户外"
					},
					{
						imgUrl: "../../static/image/icons5.png",
						name: "运动户外"
					},
					{
						imgUrl: "../../static/image/icons6.png",
						name: "运动户外"
					},
					{
						imgUrl: "../../static/image/icons7.png",
						name: "运动户外"
					},
					{
						imgUrl: "../../static/image/icons8.png",
						name: "运动户外"
					}
				]
			},
			{
				type: "hotList",
				data: [{
						id: 1,
						imageUrl: '../../static/image/hot1.jpg',
						name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: 2,
						imageUrl: '../../static/image/hot2.jpg',
						name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: 3,
						imageUrl: '../../static/image/hot3.jpg',
						name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: 4,
						imageUrl: '../../static/image/hot1.jpg',
						name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: 5,
						imageUrl: '../../static/image/hot2.jpg',
						name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: 6,
						imageUrl: '../../static/image/hot3.jpg',
						name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					}
				]
			},
			{
				type: "shopList",
				data: [{
						bigUrl: "../../static/image/shop.jpg",
						data: [{
								id: 1,
								imageUrl: '../../static/image/shop1.jpg',
								name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 2,
								imageUrl: '../../static/image/shop2.jpg',
								name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 3,
								imageUrl: '../../static/image/shop3.jpg',
								name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 4,
								imageUrl: '../../static/image/shop4.jpg',
								name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 1,
								imageUrl: '../../static/image/shop1.jpg',
								name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 2,
								imageUrl: '../../static/image/shop2.jpg',
								name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 3,
								imageUrl: '../../static/image/shop3.jpg',
								name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 4,
								imageUrl: '../../static/image/shop4.jpg',
								name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							}
						]
					},
					{
						bigUrl: "../../static/image/shop.jpg",
						data: [{
								id: 1,
								imageUrl: '../../static/image/shop1.jpg',
								name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 2,
								imageUrl: '../../static/image/shop2.jpg',
								name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 3,
								imageUrl: '../../static/image/shop3.jpg',
								name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 4,
								imageUrl: '../../static/image/shop4.jpg',
								name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 1,
								imageUrl: '../../static/image/shop1.jpg',
								name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 2,
								imageUrl: '../../static/image/shop2.jpg',
								name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 3,
								imageUrl: '../../static/image/shop3.jpg',
								name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 4,
								imageUrl: '../../static/image/shop4.jpg',
								name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							}
						]
					}

				]
			},
			{
				type: "commodityList",
				data: [{
						id: 1,
						imageUrl: '../../static/image/commodity1.jpg',
						name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: 2,
						imageUrl: '../../static/image/commodity2.jpg',
						name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: 3,
						imageUrl: '../../static/image/commodity3.jpg',
						name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: 4,
						imageUrl: '../../static/image/commodity4.jpg',
						name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					}
				]
			}
		]
	});
});

// 运动户外第一次加载数据
router.get("/api/index_list/3/data/1", function(req, res, next) {
	res.json({
		code: "0",
		data: [{
				type: "bannerList",
				imgUrl: "../../static/image/banner1.jpg"
			},
			{
				type: "iconsList",
				data: [{
						imgUrl: "../../static/image/icons1.png",
						name: "服饰内衣"
					},
					{
						imgUrl: "../../static/image/icons2.png",
						name: "服饰内衣"
					},
					{
						imgUrl: "../../static/image/icons3.png",
						name: "服饰内衣"
					},
					{
						imgUrl: "../../static/image/icons4.png",
						name: "服饰内衣"
					},
					{
						imgUrl: "../../static/image/icons5.png",
						name: "服饰内衣"
					},
					{
						imgUrl: "../../static/image/icons6.png",
						name: "服饰内衣"
					},
					{
						imgUrl: "../../static/image/icons7.png",
						name: "服饰内衣"
					},
					{
						imgUrl: "../../static/image/icons8.png",
						name: "服饰内衣"
					}
				]
			},
			{
				type: "hotList",
				data: [{
						id: 1,
						imageUrl: '../../static/image/hot1.jpg',
						name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: 2,
						imageUrl: '../../static/image/hot2.jpg',
						name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: 3,
						imageUrl: '../../static/image/hot3.jpg',
						name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: 4,
						imageUrl: '../../static/image/hot1.jpg',
						name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: 5,
						imageUrl: '../../static/image/hot2.jpg',
						name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: 6,
						imageUrl: '../../static/image/hot3.jpg',
						name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					}
				]
			},
			{
				type: "shopList",
				data: [{
						bigUrl: "../../static/image/shop.jpg",
						data: [{
								id: 1,
								imageUrl: '../../static/image/shop1.jpg',
								name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 2,
								imageUrl: '../../static/image/shop2.jpg',
								name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 3,
								imageUrl: '../../static/image/shop3.jpg',
								name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 4,
								imageUrl: '../../static/image/shop4.jpg',
								name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 1,
								imageUrl: '../../static/image/shop1.jpg',
								name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 2,
								imageUrl: '../../static/image/shop2.jpg',
								name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 3,
								imageUrl: '../../static/image/shop3.jpg',
								name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 4,
								imageUrl: '../../static/image/shop4.jpg',
								name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							}
						]
					},
					{
						bigUrl: "../../static/image/shop.jpg",
						data: [{
								id: 1,
								imageUrl: '../../static/image/shop1.jpg',
								name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 2,
								imageUrl: '../../static/image/shop2.jpg',
								name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 3,
								imageUrl: '../../static/image/shop3.jpg',
								name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 4,
								imageUrl: '../../static/image/shop4.jpg',
								name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 1,
								imageUrl: '../../static/image/shop1.jpg',
								name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 2,
								imageUrl: '../../static/image/shop2.jpg',
								name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 3,
								imageUrl: '../../static/image/shop3.jpg',
								name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							},
							{
								id: 4,
								imageUrl: '../../static/image/shop4.jpg',
								name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
								pprice: "299",
								oprice: "659",
								discount: "5.2"
							}
						]
					}

				]
			},
			{
				type: "commodityList",
				data: [{
						id: 1,
						imageUrl: '../../static/image/commodity1.jpg',
						name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: 2,
						imageUrl: '../../static/image/commodity2.jpg',
						name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: 3,
						imageUrl: '../../static/image/commodity3.jpg',
						name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: 4,
						imageUrl: '../../static/image/commodity4.jpg',
						name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					}
				]
			}
		]
	});
});

// 首页第一次触底的数据
router.get("/api/index_list/1/data/2", function(req, res, next) {
	res.json({
		code: "0",
		data: [{
				type: "commodityList",
				data: [{
						id: 1,
						imageUrl: '../../static/image/commodity1.jpg',
						name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: 2,
						imageUrl: '../../static/image/commodity2.jpg',
						name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: 3,
						imageUrl: '../../static/image/commodity3.jpg',
						name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: 4,
						imageUrl: '../../static/image/commodity4.jpg',
						name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					}
				]
			}

		]
	})


});

// 运动户外第一次触底的数据
router.get("/api/index_list/2/data/2", function(req, res, next) {
	res.json({
		code: "0",
		data: [{
				type: "commodityList",
				data: [{
						id: 1,
						imageUrl: '../../static/image/commodity1.jpg',
						name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: 2,
						imageUrl: '../../static/image/commodity2.jpg',
						name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: 3,
						imageUrl: '../../static/image/commodity3.jpg',
						name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: 4,
						imageUrl: '../../static/image/commodity4.jpg',
						name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					}
				]
			}

		]
	})
});


// 运动户外第二次触底的数据
router.get("/api/index_list/2/data/3", function(req, res, next) {
	res.json({
		code: "0",
		data: [{
				type: "commodityList",
				data: [{
						id: 1,
						imageUrl: '../../static/image/commodity1.jpg',
						name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: 2,
						imageUrl: '../../static/image/commodity2.jpg',
						name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: 3,
						imageUrl: '../../static/image/commodity3.jpg',
						name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: 4,
						imageUrl: '../../static/image/commodity4.jpg',
						name: '大姨绒毛大款2020年必须买，不买你就不行了，爆款GN008',
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					}
				]
			}

		]
	})
});


module.exports = router;