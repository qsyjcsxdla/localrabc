<template>
   <div>
        <el-row>
            <el-col :span="24" >
                <el-button-group style="margin-bottom:20px">
                    <el-button type="primary" size="medium"  @click="doAdd()">新增</el-button>
                </el-button-group>
                 <el-table :data="tableData" style="width: 100%;margin-bottom:20px" border >
                    <el-table-column prop="btn" label="按钮名称"></el-table-column>
                    <el-table-column prop="username" label="函数名称"></el-table-column>
                    <el-table-column prop="icon" label="ICON图标"><i class="el-icon-edit"></i></el-table-column>
                    <el-table-column prop="createUserOrg" label="显示排序"></el-table-column>
                    <el-table-column prop="createTime" label="创建时间"></el-table-column>
                    <el-table-column prop="createUserName" label="创建者"></el-table-column>
                    <el-table-column  label="操作">
                         <template slot-scope="scope">
                                <el-button type="danger" @click="handleDelete(scope.$index, scope.row)"  size="small">删除</el-button>
                                <el-button type="warning" size="small" @click="handleChange(scope.$index, scope.row)">修改</el-button>
                            </template>
                    </el-table-column>

                </el-table>
                <Paging :total="total" v-on:handleSize="handleSize" v-on:handleCurrent="handleCurrent" ></Paging>

                   <!-- 新增对话框 -->
                <el-dialog title= "新增按钮" :visible.sync = "dialogVisible" width= "50%" :before-close='closeDialog'>
                    <el-form :model= "form" :rules= "rules" ref= "ruleForm" class= "demo-ruleForm" label-position = "right" label-width= "80px" style= "width:90%; margin:0 0 0 20px;">

                        <el-form-item label="按钮名称" prop="tbtn" :label-width="formLabelWidth" >
                            <el-input v-model="form.tbtn"  clearable autosize></el-input>
                        </el-form-item>
                        <el-form-item label="函数名称" prop="tuname" :label-width="formLabelWidth" >
                            <el-input v-model="form.tuname" autocomplete="off"  style="width:80%"></el-input>

                        </el-form-item>
                        <el-form-item label="显示排序" prop="tsort" :label-width="formLabelWidth">
                            <el-input v-model="form.tsort" autocomplete="off" autosize clearable></el-input>
                        </el-form-item>
                        <el-form-item label="ICON图标" prop="ticon" :label-width="formLabelWidth" >
                            <el-input v-model="form.ticon" autocomplete="off"  style="width:80%"></el-input>
                            <el-button @click="getIconNum()"><i class="el-icon-plus" type="success"></i></el-button>
                            <el-dialog
                                        width       = "40%"
                                        title       = "机构选择器"
                                      :visible.sync = "innerVisible"
                                      :before-close = 'closeInnerDialog'
                                append-to-body>
                                <div
                                style = "width:80%; margin:0 auto;min-width:50%;"
                               >
                               <el-button v-for="icon in icons" :key="icon.id" @click="getNum($event)" type="primary" :icon="icon" ref="icon" style="margin:10px;font-size: 30px;" ></el-button>

                                <!-- <i :class="icon"  v-for="icon in icons" :key="icon.id" style="margin:10px;font-size: 30px;" @click="getNum"></i> -->
                                </div>


                            </el-dialog>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button  @click="cancelForm('ruleForm')">取 消</el-button>
                        <el-button type="primary"  @click="submitForm('ruleForm')">确 定</el-button>
                        <el-button type="primary"  @click="resetForm('ruleForm')" v-if = "resetshow">重 置</el-button>
                    </span>
                </el-dialog>
            </el-col>
        </el-row>
    </div>


</template>
<script>
import { mapState, mapActions } from 'vuex'
import Paging from "@/components/paging";
import {getBtnInf,getDeleteBtnInf,submitBtnFormInf,getChangeBtnInf,getIconInf} from '@/api/getData'
export default {
    data() {
        return {
          total      : 0,
          currentPage: 1,
          pageSize   : 10,
          loading    : false,
          // dialogVisible: false,
          // innerVisible : false,
          // resetshow    : true,
          tableData: [],
          icons    : [],
          form     : {},
          rules    : {
          tbtn: [
            { required: true, message: '请输入按钮名称', trigger: 'blur' }
          ],
          tuname: [
            { required: true, message: '请输入函数名称', trigger: 'blur' }
          ],
          tsort: [
            { required: true, message: '请输入显示排序', trigger: 'change' }
          ],
          ticon: [
            {  required: true, message: '请选择ICON图标', trigger: 'change' }
          ]
        },
        formLabelWidth: '120px'
        }
    },
     computed: mapState([
      "dialogVisible",
      "innerVisible",
      "resetshow"
    ]),
    components:{
      Paging
    },
    created() {
      this.getBtn();
    },
    methods: {
      ...mapActions([
            'isdialogVisible',
            'indialogVisible',
            'isinnerVisible',
            'ininnerVisible',
            'isresetshow',
            'inresetshow',
        ]),
        getNum(e){
          this.ininnerVisible()
          this.form.ticon = e.currentTarget.childNodes[1].className;
        },
        doAdd() {
            this.isresetshow()
            this.isdialogVisible()
        },
        async getIcon(){
            try{
              const countData  = await getIconInf();
                    this.icons = []
              if (countData.status == 1) {
              this.icons = countData.icon;
              console.log(this.icons)
            }else{
              throw new Error('获取数据失败');
            }
            }catch(err){
            console.log('获取数据失败', err);
            }
        },
        async getBtn(){  //数据字典对应信息渲染
          try{
              const countData      = await getBtnInf({pageNum: this.currentPage,pageSize:this.pageSize});
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
            this.getBtn();
        },
        handleCurrent(val) {
            this.currentPage = val;
            this.getBtn();
        },
        getIconNum(){
          this.isinnerVisible()
           this.getIcon();
        },
        closeInnerDialog(){
        this.ininnerVisible()
      },
        submitForm(formName) { //新增及修改表单确定按钮提交
          this.$refs[formName].validate(async(valid) => {
            if (valid) {
              const params = {
                ...this.form
              }
              try{
                const result = await submitBtnFormInf(params);
                if (result.status == 1) {
                  this.$message({
                          type   : 'success',
                          message: '机构添加成功'
                  });
                  this.indialogVisible()
                  this.$refs[formName].resetFields();
                  this.getBtn();
                }else{
                    this.$message.error('机构添加失败');
                    this.$refs[formName].resetFields();
                }
              }catch(err){
                console.log(err)
              }
            } else {
              this.$notify.error({
              title  : '错误',
              message: '请检查输入是否正确',
              offset : 100
            });
            return false;
            }
          });
        },
        cancelForm(formName){//取消按钮
        this.indialogVisible()
        this.$refs[formName].resetFields();
        },
        resetForm(formName) { // 重置按钮
          this.$refs[formName].resetFields();
        },
        closeDialog(){ // 对话框关闭按钮事件
          this.indialogVisible()
        　this.$refs["ruleForm"].resetFields();  // 为什么没用重置的this.$refs[formName].resetFields()方法：dom渲染问题
        },
        handleDelete(index,row){ //  删除表格信息
          this.$confirm('此操作将删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText : '取消',
          type             : 'warning'
          }).then(() => {
              this.getDelete(index, row);
              this.getBtn();
          }).catch(() => {
            this.$message({
                type   : 'warning',
                message: '取消删除！'
            });
          });
        },
      async getDelete(index, row) {   //删除信息
          try{
              const res = await getDeleteBtnInf({rowid:row.id});
              if (res.status == 1) {
                  this.$message({
                      type   : 'success',
                      message: '删除成功！'
                  });
                  this.tableData.splice(index, 1);
              }else{
                  throw new Error(res.message)
              }
          }catch(err){
              this.$message({
                  type   : 'error',
                  message: err.message
              });
              console.log('删除失败！')
          }
       },
      handleChange(index,row){ //修改表格
          this.inresetshow()
          this.isdialogVisible()
          this.getChange(index, row);
      },
      async getChange(index, row) {   //修改表格单个信息获取信息
        try{
            const res = await getChangeBtnInf(row.id);
            if (res.status == 1) {
                this.form = res.form;
            }else{
                this.$message.error('无法修改信息');
                return false;
            }
        }catch(err){
            console.log(err)
        }
      },
    }
}
</script>
