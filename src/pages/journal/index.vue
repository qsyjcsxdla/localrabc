<template>
   <div>
        <el-row>
            <el-col :span="24" >
                 <el-table :data="tableData" style="width: 100%;margin-bottom:20px" border>
                    <el-table-column prop="username" label="操作用户"></el-table-column>
                    <el-table-column prop="realname" label="用户姓名"></el-table-column>
                    <el-table-column prop="code" label="操作类别"></el-table-column>
                    <el-table-column prop="name" label="操作机构"></el-table-column>
                    <el-table-column prop="numtext" label="操作内容"></el-table-column>
                    <el-table-column prop="createTime" label="操作时间"></el-table-column>
                    <el-table-column prop="getip" label="操作IP"></el-table-column>
                    <el-table-column prop="numtype" label="来源应用"></el-table-column>
                </el-table>
                <Paging :total="total" v-on:handleSize="handleSize" v-on:handleCurrent="handleCurrent" ></Paging>
            </el-col>
        </el-row>
    </div>

</template>
<script>
import Paging from "@/components/paging";
import {getJouInf} from '@/api/getData'
export default {
    data() {
        return {
          total      : 0,
          currentPage: 1,
          pageSize   : 10,
          loading    : false,
          tableData  : []
        }
    },
    components:{
      Paging
    },
    created() {
     this.getJou()
    },
    methods: {
      async getJou(){  //数据字典对应信息渲染
        try{
            const countData      = await getJouInf({pageNum: this.currentPage,pageSize:this.pageSize});
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
      handleSize(val) {
          this.pageSize = val;
          this.getJou()
      },
      handleCurrent(val) {
          this.currentPage = val;
          this.getJou()
      }
    }
  }
</script>

