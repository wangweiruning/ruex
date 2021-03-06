import {createStore} from '../../../src'
import counter from './counter'
import user from './user'
import page3 from './page3'

const state = {
	total_num:1111,
}

const mutations = {
	add(state,payload){
		state.total_num += payload
	},
	double(state,payload){
		state.total_num = state.total_num*payload
	},
}

const actions = {
	addAsync({state,commit,rootState,dispatch},payload){
		setTimeout(()=>{
			commit('add',payload)
		},1000)
	},
	addPromise({state,commit,rootState,dispatch},payload){
		return fetch('https://api.github.com/search/users?q=haha').then(res=>res.json())
		.then(res=>{
			commit('add',1)
			dispatch('addAsync',1)
		})
	},
	doubleAsync({state,commit,rootState,dispatch},payload){
		setTimeout(()=>{
			commit('double',2)
		},1000)
	},
	doublePromise({state,commit,rootState,dispatch},payload){
		return fetch('https://api.github.com/search/users?q=haha').then(res=>res.json())
		.then(res=>{
			commit('double',2)
			dispatch('doubleAsync',2)
		})
	},
}


// middleware
const logger = (store) => (next) => (mutation,payload) =>{
    console.group('触发mutation前',store.getState())
    let result = next(mutation,payload)
    console.log('触发mutation后', store.getState())
	console.groupEnd()
    // return result
}


const store = createStore({
    state,
	mutations,
	actions,
    modules:{
        user,
        counter,
		page3,
    }
},[logger])

export default store
