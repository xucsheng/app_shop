const {
	json
} = require('express');
var express = require('express');
var router = express.Router();
var connection = require('../db/sql.js');
var user = require('../db/UserSql.js');

var address = require('../db/addressSql.js');

var cart = require('../db/cartSql.js');

const jwt = require('jsonwebtoken');
// 验证码
let code = "";


/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'Express'
	});
});



router.get('/api/goods', function(req, res, next) {
	let id = req.query.id;
	// 查询数据
	connection.query("SELECT * FROM goods_search  where id =" + id, (err, result, fileIds) => {
		if (err) throw err;
		res.send({
			code: 0,
			data: result
		})
	});

});

router.get('/api/goods/list', function(req, res, next) {
	res.json({
		code: 0,
		data: [{
				id: 1,
				name: '家具家访',
				data: [{
						name: '家访',
						list: [{
								id: 1,
								name: '毛巾/浴巾',
								imgUrl: '../../static/image/list1.jpg'
							},
							{
								id: 2,
								name: '枕头',
								imgUrl: '../../static/image/list1.jpg'
							}

						]
					},
					{
						name: '生活用品',
						list: [{
								id: 1,
								name: '浴室用品',
								imgUrl: '../../static/image/list1.jpg'
							},
							{
								id: 2,
								name: '洗晒',
								imgUrl: '../../static/image/list1.jpg'
							}

						]
					},
				]
			},
			{
				id: 2,
				name: '女装',
				data: [{
						name: '裙装',
						list: [{
								id: 1,
								name: '连衣裙',
								imgUrl: '../../static/image/list1.jpg'
							},
							{
								id: 2,
								name: '半身裙',
								imgUrl: '../../static/image/list1.jpg'
							}

						]
					},
					{
						name: '上衣',
						list: [{
								id: 1,
								name: 'T恤',
								imgUrl: '../../static/image/list1.jpg'
							},
							{
								id: 2,
								name: '衬衫',
								imgUrl: '../../static/image/list1.jpg'
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
	connection.query("SELECT * FROM goods_search  where name like '%" + name + "%' order by +" + orderName +
		" " + order, (
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


// 登录
router.post("/api/login", function(req, res, next) {
	let parms = {
		userName: req.body.userName,
		userPwd: req.body.userPwd
	}
	// 查询数据
	connection.query(user.queryUserName(parms), (error, results, fileIds) => {
		if (error) throw error;
		if (results.length > 0) {
			connection.query(user.queryUserPwd(parms), (err, result, fileId) => {
				if (err) throw error;
				if (result.length > 0) {
					res.send({
						data: {
							succes: true,
							msg: '登录成功',
							data: result[0]
						}
					})
				} else {
					res.send({
						data: {
							succes: false,
							msg: '密码错误'
						}
					})
				}
			})
		} else {
			res.send({
				data: {
					succes: false,
					msg: '用户名不存在或者密码错误'
				}
			})
		}

	});
});

// 注册手机号验证
router.post("/api/registered", function(req, res, next) {
	let parms = {
		userName: req.body.phone,
	}
	// 查询数据
	connection.query(user.queryUserName(parms), (error, results, fileIds) => {
		if (error) throw error;
		if (results.length > 0) {
			res.send({
				data: {
					success: false,
					msg: '手机号已经存在'

				}
			})
		} else {
			res.send({
				data: {
					success: true
				}
			})
		}
	})
});
// 发送短信验证码 code
router.post("/api/code", function(req, res, next) {
	let parms = {
		userName: req.body.userName,
	}
	// 接入短信sdk
	//生成验证码  4位  包含数字和字母   
	let str = "0123456789";
	let s = '';
	for (let i = 0; i < 4; i++) {
		s += str[Math.floor(Math.random() * str.length)];
	}
	code = s;
	console.log("短信验证码：" + code);
	res.send({
		data: {
			success: true,
			code: code
		}
	})
})
// 注册手机号  code
router.post("/api/addUser", function(req, res, next) {

	let parms = {
		userName: req.body.userName,
		userCode: req.body.code
	}
	if (code == parms.userCode) {
		// 查询数据
		connection.query(user.insertUser(parms), (error, results, fileIds) => {
			if (error) throw error;
			connection.query(user.queryUserName(parms), (err, result, fileId) => {
				if (error) throw error;
				res.send({
					data: {
						success: true,
						msg: '注册成功',
						data: result[0]
					}
				})
			})
		})

	} else {
		res.send({
			data: {
				success: false,
				msg: '验证码错误'
			}
		})
	}

});
// 第三方授权登录
router.post("/api/loginOther", function(req, res, next) {

	let parms = {
		openid: req.body.openid,
		provide: req.body.provide,
		nickName: req.body.nickName,
		avatarUrl: req.body.avatarUrl
	}

	// 查询数据
	connection.query(user.queryUserName(parms), (error, results, fileIds) => {
		if (error) throw error;
		if (results.length > 0) {
			// 存在
			res.send({
				data: {
					success: true,
					msg: '登录成功',
					data: results[0]
				}
			})
		} else {
			// 不存在存储
			// 查询数据
			connection.query(user.insertUser(parms), (err, result, fileId) => {
				if (error) throw error;
				connection.query(user.queryUserName(parms), (error, results, fileIds) => {
					if (error) throw error;
					res.send({
						data: {
							success: true,
							msg: '注册成功',
							data: results[0]
						}
					})
				})
			})

		}

	})

});
// 查询收货地址
router.post("/api/selectAddress", function(req, res, next) {
	let token = req.headers.token;

	let phone = jwt.decode(token);
	connection.query(user.selectByPhone(phone), (error, results, fileIds) => {
		if (error) throw error;
		let id = results[0].id;
		connection.query(
			address.selectByUserId(id), (er, re, fi) => {
				if (error) throw error;
				res.send({
					data: {
						success: true,
						msg: '查询地址成功',
						data: re
					}
				})

			})

	})
});
// 新增收货地址
router.post("/api/insertAddress", function(req, res, next) {
	let token = req.headers.token;

	let phone = jwt.decode(token);

	connection.query(user.selectByPhone(phone), (erUser, reUser) => {
		if (erUser) throw erUser;
		// 用户id
		let id = reUser[0].id;
		let parms = {
			name: req.body.name,
			tel: req.body.tel,
			province: req.body.province,
			city: req.body.city,
			district: req.body.district,
			address: req.body.address,
			isDefault: req.body.isDefault,
			userId: id
		}
		// 设置默认地址，其它地址设置非默认
		if (parms.isDefault === 1) {
			connection.query(address.setIsDefault(id), (errorSetAddress, results) => {
				if (errorSetAddress) throw errorSetAddress;
			})
		};
		connection.query(address.insert(parms), (errorAddress, results) => {
			if (errorAddress) throw errorAddress;
			connection.query(
				address.selectByUserId(id), (er, re, fi) => {
					if (er) throw er;
					res.send({
						data: {
							success: true,
							msg: '查询地址成功',
							data: re
						}
					})
				})
		});

	});

});
//  修改收货地址
router.post("/api/updateAddress", function(req, res, next) {
	let parms = {
		name: req.body.name,
		tel: req.body.tel,
		province: req.body.province,
		city: req.body.city,
		district: req.body.district,
		address: req.body.address,
		isDefault: req.body.isDefault,
		id: req.body.id,
		userId: req.body.userId
	}
	// 设置默认地址，其它地址设置非默认
	if (parms.isDefault === 1) {
		connection.query(address.setIsDefault(parms.userId), (errorSetAddress, results) => {
			if (errorSetAddress) throw errorSetAddress;
		})
	};
	connection.query(address.updateAddress(parms), (errorAddress, results) => {
		if (errorAddress) throw errorAddress;
		res.send({
			data: {
				success: true,
				msg: '更新成功'
			}
		})
	});
})
// 获取当前用户购物车信息
router.post("/api/selectCart", function(req, res, next) {
	let token = req.headers.token;
	let phone = jwt.decode(token);
	connection.query(user.selectByPhone(phone), (erUser, reUser) => {
		if (erUser) throw erUser;
		// 用户id
		let id = reUser[0].id;
		connection.query(cart.selectByUserId(id), (error, results) => {
			if (error) throw error;
			res.send({
				data: {
					success: true,
					msg: '查询成功',
					data: results
				}
			})

		})
	})
});
// 更新购物车数量
router.post("/api/updateCart", function(req, res, next) {
	let params = {
		id: req.body.id,
		num: req.body.num
	}
	connection.query(cart.updateNumById(params), (error, results) => {
		if (error) throw error;
		res.send({
			data: {
				success: true,
				msg: '更新成功'
			}
		})

	})
});
// 删除购物车
router.post("/api/deleteCart", function(req, res, next) {
	const selectedList = req.body.selectedList;
	let ids = "";
	selectedList.forEach((item) => {
		ids += item + ",";
	})
	ids = ids.substring(0, ids.lastIndexOf(','));
	connection.query(cart.deleteByIds(ids), (error, results) => {
		if (error) throw error;
		res.send({
			data: {
				success: true,
				msg: '删除成功'
			}
		})
	})
});
// 加入购物车 addCart
router.post("/api/addCart", function(req, res, next) {
	let token = req.headers.token;
	let phone = jwt.decode(token);
	connection.query(user.selectByPhone(phone), (erUser, reUser) => {
		if (erUser) throw erUser;
		// 用户id
		let id = reUser[0].id;
		let params = {
			uId: id,
			goodsId: req.body.goodsId,
			name: req.body.name,
			imgUrl: req.body.imageUrl,
			pPrice: req.body.pprice,
			num: req.body.num
		}
		// 查询购物车中是否存在
		connection.query(cart.selectByUserIdAndGoodsId(params), (e, r) => {
			if (e) throw e;
			if (r &&  r.length === 1) {
				let obj = r[0];
				// 修改购物车中商品数量
				obj.num = obj.num+params.num;
				connection.query(cart.updateNumById(obj), (error, results) => {
					if (error) throw error;
					res.send({
						data: {
							success: true,
							msg: '添加成功'
						}
					})
				});
			} else {
				// 新增购物车
				connection.query(cart.addCart(params), (error, results) => {
					if (error) throw erUser;
					res.send({
						data: {
							success: true,
							msg: '添加成功'
						}
					});

				})
			}
		})

	});

});

module.exports = router;