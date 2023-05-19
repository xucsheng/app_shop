export default {
	state: {
		list:JSON.parse(uni.getStorageSync('pathList') || '[]')
	},
	getters: {

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
					v.isDefault = false;
				}
			})
		},
		// 持久化保存数据
		persistencePathData(state){
			uni.setStorageSync('pathList',JSON.stringify(state.list));
		}
	},

	actions: {
		creatrePathFn({commit}, obj) {
			
			if(obj.isDefault){
				commit('removePath');
			}
			commit('createPath', obj);
			
			// 持久化
			commit('persistencePathData');
		},
		updatePathFn({commit},obj){
			const {index,item} = obj;
			if(item.isDefault){
				commit('removePath');
			}
			commit('updatePath', obj);
			
			// 持久化
			commit('persistencePathData');
		}
	}

}