export default {
	state: {
		list:[],
		selectedList: []
	},
	getters: {
		// 判断是否全选
		checkedAll(state) {
			return state.list.length === state.selectedList.length;
		},
		// 合计+结算数量
		totalCount(state) {
			let total = {
				pPrice: 0,
				num: 0
			}
			state.list.forEach(v=>{
				// 是否选中
				if(state.selectedList.indexOf(v.id) > -1){
					// 合计
					total.pPrice += v.pPrice*v.num;
					// 结算数量
					total.num = state.selectedList.length;
				}
			})
			
			return total;
		}
	},
	mutations: {
		// 全选
		checkAll(state) {
			state.selectedList = state.list.map(v => {
				v.checked = true;
				return v.id;
			})
		},
		// 全不选
		unCheckAll(state) {
			state.list.forEach(v => {
				v.checked = false;
			});
			state.selectedList = [];
		},
		// 全选某个按钮单选
		selectedItem(state, index) {
			let id = state.list[index].id;
			let i = state.selectedList.indexOf(id);
			// 如果selectedList已经存在就代表之前全中状态，checked=false，并且删除
			if (i > -1) {
				state.list[index].checked = false;
				return state.selectedList.splice(i, 1);
			} else {
				// 如果selectedList 没有选中状态，checked=true，并且加入
				state.list[index].checked = true;
				state.selectedList.push(id);
			}
			
		},
		delGoods(state){
			state.list = state.list.filter(v=>{
				return state.selectedList.indexOf(v.id) === -1;
			});
		},
		// 加入购物车
		addShopCart(state,goods){
			state.list.push(goods);
		},
		// 请求数据赋值
		initGetData(state,list){
			state.list = list;
		},
		// 清除购物车缓存
		clearShopCart(state){
			state.list = [];
			state.selectedList = [];
		}
		
		
	},
	actions: {
		checkAllFn({commit,getters}) {
			getters.checkedAll ? commit("unCheckAll") : commit("checkAll");
		},
		delGoodsFn({commit}){
			commit('delGoods');
			commit('unCheckAll')
			uni.showToast({
				title:'删除成功',
				icon:"none"
			});
		}
	}
}



