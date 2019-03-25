

<template>
<!-- 省市区三级联动 -->
<div class="base-main">
<!--
    <el-button type="permary" @click="showcity">查看联动信息</el-button> -->
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="所在地区">
        <el-select
          v-model     = "provinceCode"
          placeholder = "请选择省"
        :disabled     = "disabled"
          @change     = "getProvince()"
        >
          <el-option
            v-for = "item in provinceList"
          :key    = "item.provinceCode"
          :label  = "item.areaName"
          :value  = "item.provinceCode"
          ></el-option>
        </el-select>

        <el-select v-model="cityCode" placeholder="请选择市" :disabled="disabled" @change="getCity">
          <el-option
  v-for   = "item in cityList"
:key      = "item.cityCode"
:label    = "item.cityName"
:value    = "item.cityCode"
  @change = "getCity()"
          ></el-option>
        </el-select>
        <el-select
  v-model     = "countryCode"
  placeholder = "请选择县/区"
:disabled     = "disabled"
  @change     = "getArea"
        >
          <el-option
  v-for = "item in countryList"
:key    = "item.countryCode"
:label  = "item.countryName"
:value  = "item.countryCode"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>

</template>
<script>
import { AP } from '@/config/mUtils'
import { getWeatherInf } from '@/api/getData'
import city from "@/config/city.js";
export default {
  data(){
    return{
      city: '正在定位',
      form: {},
       //记录省市县
      provinceList    : [],
      dataprovinceList: [],
      provinceCode    : "",

      cityList    : [],
      datacityList: [],
      cityCode    : "",

      countryList    : [],
      datacountryList: [],
      countryCode    : "",

      //是否可以编辑
      disabled: false,
    }
  },
 mounted(){
   this.getMap ()
    this.showcity()
  },
  methods: {
    getMap () {
      let $self = this
      return new Promise(function (resolve, reject) {
        AP().then(AMap => {
          var citysearch = new AMap.CitySearch()
          //自动获取用户IP，返回当前城市
          citysearch.getLocalCity(function(status, result) {
            if (status === 'complete' && result.info === 'OK') {
              if (result && result.city && result.bounds) {
                resolve(result.city)
                 $self.city = result.city
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
    showcity() {
      let _this       = this;
      var provinceArr = [];
      var cityArr     = [];
      var countryArr  = [];
      for (let i = 0; city.length > i; i++) {
        //循环获取省级单位
        for (var key in city[i]) {
          let provinceCode = city[i].areaId;
          let areaName     = city[i].areaName;
          var cities       = city[i].cities;
          var pro          = { provinceCode, areaName };
        }
        //循环获取市级单位
        for (var j = 0; cities.length > j; j++) {
          let cityName  = cities[j].areaName;
          let cityCode  = cities[j].areaId;
          var counties  = cities[j].counties;
          var citiesres = { cityName, cityCode };
          cityArr.push(citiesres);
          //循环获取县级单位
          for (var n = 0; counties.length > n; n++) {
            let countryName = counties[n].areaName;
            let countryCode = counties[n].areaId;
            var countiesres = { countryName, countryCode };
            countryArr.push(countiesres);
          }
          //console.log(countiesres);
        }

        provinceArr.push(pro);
      }
      this.provinceList     = provinceArr;
      this.cityList         = cityArr;
      this.countryList      = countryArr;
      this.dataprovinceList = provinceArr;
      this.datacityList     = cityArr;
      this.datacountryList  = countryArr;
    },
    //省和市的联动,根据市/100的整数商进行遍历
    getProvince() {
      let _this = this;
      //console.log(this.provinceCode)
      this.cityList = this.datacityList;
      if (this.provinceCode != 0) {
        let cArray  = this.cityList;
        let cArrres = [];
        // console.log(cArray);
        for (var i = 0; cArray.length > i; i++) {
          if (parseInt(cArray[i].cityCode / 100) == this.provinceCode) {
            cArrres.push(cArray[i]);
          } else {
          };
        }
        this.cityList = cArrres;
        this.cityCode = this.cityList[0].cityCode;
        //回调自动获取当前选择的县区
        this.getCity();
      }
      console.log("省："+this.provinceCode+"市："+this.cityCode+"县："+this.countryCode)
    },
    //市县联动
    getCity() {
      let _this            = this;
          this.countryList = this.datacountryList;
      if (this.cityCode != 0) {
        let cArray  = this.countryList;
        let cArrres = [];
        console.log(cArray);
        for (var i = 0; cArray.length > i; i++) {
          if (parseInt(cArray[i].countryCode / 100) == this.cityCode) {
            cArrres.push(cArray[i]);
          } else {
          };
        }
        this.countryList = cArrres;
        this.countryCode = this.countryList[0].countryCode;
      }
    },
    getArea() {
      console.log(this.countryCode)
    },
    //获取学校基本信息
    getSchoolInfo() {
      let _this            = this;
      let schoolCode       = "";
      let schoolCodeParams = { schoolCode };
      //console.log(schoolCodeParams);
      queryInformation(schoolCodeParams).then(data => {
        let { msg, code, result } = data;
        let getcode               = parseInt(code);
        if (getcode == 0) {
          //console.log(result);
          this.form         = result;
          this.provinceCode = result.schoolProvince;
          this.cityCode     = result.schoolCity;
          this.countryCode  = result.schoolArea;
          //console.log(this.form);
          this.getSchoolInfo();
        } else {
          this.$message({
            message: msg,
            code   : getcode,
            type   : "error"
          });
        }
      });
    }
 }
}
</script>

