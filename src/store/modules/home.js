// import shop from '../../api/shop'
import {getLastDo, getPerInf} from '@/api/getData'
// initial state
// shape: [{ id, quantity }]
const state = {
  total      : 0,
  currentPage: 1,
  pageSize   : 10,
  tableData  : [],
  form       : {},
}

// getters


// const getters = {   //实时监听state值的变化(最新状态)
//   getTotal(state) {
//      return state.total
//   },
//   getCurrentPage(){
//      return state.currentPage
//   },
//   getPageSize(){
//     return state.pageSize
//   },
//   getTableData(){
//     return state.tableData
//   },
//   getCount(){
//     return state.count
//   },
//   getForm(){
//     return state.form
//   }
// };


// actions
const actions = {
  async getLastTime({ commit, state }){ //最近登录
    try{
        const countData = await getLastDo({pageNum: state.currentPage,pageSize:state.pageSize});
              // state.tableData = []
        if (countData.status == 1) {
          commit('updateTotal', countData.total);
          commit('updateTableData', countData.count);
          // state.total     = countData.total
          // state.tableData = countData.count;
        }else{
            throw new Error('获取数据失败');
        }
    }catch(err){
        console.log('获取数据失败', err);
    }
  },
  async getPerInf({ commit }){  //个人信息
    try{
      const countData = await getPerInf();
      if (countData.status == 1) {
        commit('updateForm', countData.form);
        // state.form = countData.form
        }else{
            throw new Error('获取数据失败');
        }
    }catch(err){
      console.log('获取数据失败', err);
    }
  },
  handleSizeChange(val) { //分页  每页几条
    commit('updateCurrentPage',event)
    commit('updatePageSize')
    // console.log('size change:%s', commit('updateCurrentPage'));
    // console.log('size change:%s', commit('updatePageSize'));
        // state.pageSize
        // store.dispatch('getLastTime',state.pageSize)
        return dispatch('getLastTime').then(() => {
          commit('updateTableData')
        })
  },
  handleCurrentChange({commit,event}) {  //分页  第几页
    commit('updateCurrentPage')
    // console.log('Current change:%s', first);
    // state.currentPage = val;
    // store.dispatch('getLastTime',state.currentPage)
    // return dispatch('getLastTime').then(() => {
    //   commit('updateTableData')
    // })
    // commit('updateCurrentPage');
    // console.log(state.currentPage)
  console.log(event)
  }
}

// mutations
const mutations = {
  updateTotal(state,total) {
     state.total = total
 },
 updateCurrentPage(state,currentPage){
    state.currentPage = currentPage
 },
 updatePageSize(state,pageSize){
   state.pageSize = pageSize
 },
 handleSizeChange(){
  state.pageSize = pageSize
 },
 updateForm(state,form){
    state.form = form
 }
}

export default {
  // strict    : debug,
  namespaced: true,
  state,
  // getters,
  actions,
  mutations
}
