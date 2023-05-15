import Vue  from "vue";
import Vuex from "vuex";


Vue.use(Vuex);

// 购物车状态管理
import cart from './modules/cart.js';



export default new Vuex.Store({
	modules:{
		cart
	}
})

