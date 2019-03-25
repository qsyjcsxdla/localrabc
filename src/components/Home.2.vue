<template>
    <div>
        <el-row>
            <el-col :span="10">
                <div class="grid-content ">
                    <div class="content-title">个人简介</div>
                    <el-form ref="form" :model="form" label-width="120px" class="contain-box" :inline="true"  >
                        <el-form-item label="员工号：" >
                            <span class="input-width">{{form.pnumber}}</span>
                        </el-form-item>
                        <el-form-item label="姓名：" >
                            <span class="input-width">{{form.pname}}</span>
                        </el-form-item>
                        <el-form-item label="出生年月：" >
                            <span class="input-width">{{form.pbir}}</span>
                        </el-form-item>
                        <el-form-item label="联系电话：" >
                            <span class="input-width">{{form.pphone}}</span>
                        </el-form-item>
                        <el-form-item label="工作职位：" >
                            <span class="input-width">{{form.pwoker}}</span>
                        </el-form-item>
                        <el-form-item label="入职时间：" >
                            <span class="input-width">{{form.ptime}}</span>
                        </el-form-item>
                        <el-form-item label="所属机构：" >
                            <span class="input-width">{{form.porgan}}</span>
                        </el-form-item>
                        <el-form-item label="电子邮箱：" >
                            <span class="input-width">{{form.pemail}}</span>
                        </el-form-item>
                        <el-form-item label="职位等级：" >
                            <span class="input-width2"><el-rate v-model="form.prank"></el-rate></span>
                        </el-form-item>
                        <el-form-item label="联系地址：" >
                            <span class="input-width2">{{form.paddress}}</span>
                        </el-form-item>
                        <el-form-item label="所属角色：">
                            <span class="input-width2"  >
                                <el-tag type="success" style="margin-right:10px" v-for="items in form.prole" :key="items.id">{{items}}</el-tag>
                            </span>
                        </el-form-item>
                        <el-form-item label="最近登陆时间：" >
                            <span class="input-width2">{{form.pltime}}</span>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
            <el-col :span="14">
                <div class="content-title">最近操作</div>
                <div class="grid-content " style="margin:0 40px;">
                    <el-table stripe ref= "filterTable" :data= "tableData" width = "100%" border>
                        <el-table-column  prop  = "date" label = "日期" ></el-table-column>
                        <el-table-column prop  = "datetime" label = "时间"></el-table-column>
                        <el-table-column prop  = "type" label = "登陆方式"></el-table-column>
                        <el-table-column prop  = "ip"  label = "登陆IP"></el-table-column>
                    </el-table>
                    <el-pagination
                        style           = "margin-top:20px"
                        @size-change    = "handleSizeChange"
                        @current-change = "handleCurrentChange"
                      :current-page     = "currentPage"
                      :page-sizes       = "[10, 20, 30, 40, 50, 100]"
                      :page-size        = "pageSize"
                        layout          = "total, sizes, prev, pager, next, jumper"
                      :total            = "total">
                    </el-pagination>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import {getLastDo, getPerInf} from '@/api/getData'
  export default {
    data() {
      return {
        total      : 0,
        currentPage: 1,
        pageSize   : 10,
        tableData  : [],
        count      : '',
        form       : {},
      }
    },
    created(){
      this.getLastTime();
      this.getPerInf();
    },
    methods: {
      async getLastTime(){ //最近登录

        try{
            const countData      = await getLastDo({pageNum: this.currentPage,pageSize:this.pageSize});
                  this.tableData = []
            if (countData.status == 1) {
              this.total     = countData.total
              this.tableData = countData.count;
            }else{
                throw new Error('获取数据失败');
            }
        }catch(err){
            console.log('获取数据失败', err);
        }
      },
      async getPerInf(){  //个人信息
        try{
          const countData = await getPerInf();
          if (countData.status == 1) {
              this.form = countData.form
            }else{
                throw new Error('获取数据失败');
            }
        }catch(err){
          console.log('获取数据失败', err);
        }
      },
      handleSizeChange(val) { //分页  每页几条
            // console.log('size change:%s', val);
            this.pageSize = val;
            this.getLastTime();
      },
      handleCurrentChange(val) {  //分页  第几页
        this.currentPage = val;
        this.getLastTime();
      }
    }
  }
</script>
<style scoped>
  .el-col {
    border-radius: 4px;
  }
   .grid-content {
    border-radius: 4px;
    min-height   : 36px;

  }
  .contain-box{
      padding: 0 60px;
  }
  .contain-p{
      padding-right: 120px;
  }
  .el-form-item{
      margin-bottom: 10px;
  }
  .content-title{
      padding  : 20px 40px;
      width    : 120px;
      font-size: 18px;
  }
  .input-width{
      display: inline-block;
      width  : 100px;
  }
  .input-width2{
      display: inline-block;
      width  : 380px;
  }
    .el-table__header tr,
    .el-table__header th {
        padding: 0;
        height : 40px;
    }
    .el-table__body tr,
    .el-table__body td {
        padding: 0;
        height : 20px;
    }

</style>
