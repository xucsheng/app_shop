export default {
	state: {
		list: [{
				name: '张三',
				tel: '18311111111',
				city: '北京是海定区',
				detail: '2号楼',
				isDefault: false

			},
			{
				name: '李四',
				tel: '18311111111',
				city: '北京是海定区',
				detail: '2号楼',
				isDefault: true

			}
		]
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