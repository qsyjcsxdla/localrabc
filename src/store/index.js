import Vue from 'vue'
import Vuex from 'vuex'
import { AP } from '@/config/mUtils'
Vue.use(Vuex)

const state = {
  dialogVisible: false,
  innerVisible : false,
  resetshow    : false,
  city         : '正在定位',
  weatherInfo  : {}
}
const mutations = {
  isdialogVisible(state) {
    state.dialogVisible = true
  },
  indialogVisible(state) {
    state.dialogVisible = false
  },
  isinnerVisible(state) {
    state.innerVisible = true
  },
  ininnerVisible(state) {
    state.innerVisible = false
  },
  isresetshow(state) {
    state.resetshow = true
  },
  inresetshow(state) {
    state.resetshow = false
  },
  upcity(state,city){
    state.city = city
  },
  upweatherInfo(state,weatherInfo){
    state.weatherInfo = weatherInfo
  }
}

const actions = {
  isdialogVisible: ({ commit }) => commit('isdialogVisible'),
  indialogVisible: ({ commit }) => commit('indialogVisible'),
  isinnerVisible : ({ commit }) => commit('isinnerVisible'),
  ininnerVisible : ({ commit }) => commit('ininnerVisible'),
  isresetshow    : ({ commit }) => commit('isresetshow'),
  inresetshow    : ({ commit }) => commit('inresetshow'),
  upcity         : ({commit})=>{
    return new Promise(function (resolve, reject) {
      AP().then(AMap => {
        var citysearch = new AMap.CitySearch()
        //自动获取用户IP，返回当前城市
        citysearch.getLocalCity(function(status, result) {
          if (status === 'complete' && result.info === 'OK') {
            if (result && result.city && result.bounds) {
              resolve(result.city)
              commit('upcity',result.city)
            }
          } else {
            console.log('定位失败')
            console.log(result)
            reject(result.info)
          }
        })
      })
    })
  },
    upweatherInfo: async ({commit,dispatch})=>{
    let $self      = this
    let countyInfo = await dispatch('upcity')  // 获取定位的城市
    //  console.log(countyInfo)
    AMap.plugin('AMap.Weather', function() {
      var weather = new AMap.Weather()
      // 查询实时天气信息, 查询的城市到行政级别的城市，如朝阳区、杭州市
      weather.getLive(countyInfo, function(err, data) {
        if (!err) {
          // console.log(data)
          // $self.weatherInfo = data
          commit('upweatherInfo',data)
          // console.log($self.weatherInfo)
        }
      });
    })
  }

}


export default new Vuex.Store({
  // strict : process.env.NODE_ENV != "production",   //严格模式，方式修改state，但是实在开发坏境中，生产环境中开启会跑不动
  state,
  mutations,
  actions
})
