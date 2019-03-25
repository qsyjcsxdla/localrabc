<template>
<div>
    <el-row>
        <el-col :span="12" >
            <div class="head-wrap" style="text-align:left;padding-left:20px;">
              <i class="el-icon-location-outline"></i>
              {{city}}
              <span style="font-size:12px;">
                {{year}}
                {{timer}}
                {{week}}
                {{weatherInfo.weather}}
                {{weatherInfo.windDirection}}风{{weatherInfo.windPower}}
                {{weatherInfo.temperature}}℃
              </span>
              </div>
        </el-col>
        <el-col :span="12" style="text-align:right;padding-right:20px;">
            <el-dropdown>
                <span class="el-dropdown-link">
                    Lion <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人设置</el-dropdown-item>
                    <el-dropdown-item>锁定账号</el-dropdown-item>
                    <el-dropdown-item>修改密码</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <el-button type="text" style="margin-left:10px;" @click="doLogout()">安全退出</el-button>
        </el-col>
    </el-row>
</div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  data(){
    return{
      year : '',
      timer: '',
      week : ''
    }
  },
  computed: mapState([
        "city",
        "weatherInfo",
    ]),
  created(){
    window.setInterval(this.times, 1000);
    this.getWeather()
    this.times()
    this.Adate()
  },
  methods: {
    ...mapActions([
            'upcity',
            'upweatherInfo',
        ]),
     getWeather () {
     this.upweatherInfo()
    },
     addzero(num){
        if(num>=10){
            return ""+num;
        }else{
            return "0"+num;
        }
    },
    times(){
        var date       = new Date();
        var str        = this.addzero(date.getHours())+":"+ this.addzero(date.getMinutes())+":"+ this.addzero(date.getSeconds());
            this.timer = str
    },
    Adate(){
        var date      = new Date();
        var weekList  = ["周日","周一","周二","周三","周四","周五","周六"];
        var str       = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate();
            this.year = str
        var westr     = weekList[date.getDay()];
            this.week = westr
    }
  }
}
</script>

