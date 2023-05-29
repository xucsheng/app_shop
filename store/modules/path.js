export default {
	state: {
		list:[]
	},
	getters: {
       defaultPath(state){
		     return   state.list.filter(f=>f.isDefault)
		}
	},
	mutations: {
		createPath(state, obj) {
			state.list.unshift(obj);
		},
		updatePath(state, {index,item}) {
			for (let key in item) {
				state.list[index][key] = item[key];
			}
		},
		// 选择默认修改未选中
		removePath(state){
			state.list.forEach(v=>{
				if(v.isDefault){
					v.isDefault = 0;
				}
			})
		},
		// 持久化保存数据
		_initAddressList(state,list){
			state.list = list;
		}
	},

	actions: {
		creatrePathFn({commit}, obj) {
			
			if(obj.isDefault){
				commit('removePath');
			}
			commit('createPath', obj);
		},
		updatePathFn({commit},obj){
			const {index,item} = obj;
			if(item.isDefault){
				commit('removePath');
			}
			commit('updatePath', obj);
		}
	}

}