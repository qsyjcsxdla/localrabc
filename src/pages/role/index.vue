<template>
    <div>
        <el-row>
            <el-col :span="7">
              <treeBar father-component="organ" v-on:menunum="showmenunum"></treeBar>
            </el-col>
            <el-col :span="17">
                <el-button-group style="margin-bottom:20px">
                    <el-button type="primary" size="medium" icon="el-icon-plus" @click="doAdd()">新增</el-button>
                </el-button-group>
                <el-table :data="tableData" style="width: 100%;margin-bottom:20px" border >
                    <el-table-column prop="username" label="用户名"></el-table-column>
                    <el-table-column prop="realname" label="真实姓名"></el-table-column>
                    <el-table-column prop="sex" label="性别"></el-table-column>
                    <el-table-column prop="phone" label="联系方式"></el-table-column>
                    <el-table-column prop="orgCode" label="机构代码"></el-table-column>
                    <el-table-column prop="grade" label="是否启用"></el-table-column>
                    <el-table-column prop="createTime" label="创建时间"></el-table-column>
                    <el-table-column prop="createUserName" label="创建者"></el-table-column>
                    <el-table-column  label="操作">
                         <template slot-scope="scope">
                                <el-button type="text" @click="handleDelete(scope.$index, scope.row)"  size="small">删除</el-button>
                                <el-button type="text" @click="handleChange(scope.$index, scope.row)" size="small">修改</el-button>
                                <el-button type="text" @click="handleClick(scope.$index, scope.row)"  size="small">授权</el-button>
                            </template>
                    </el-table-column>
                </el-table>
                <Paging :total="total" v-on:handleSize="handleSize" v-on:handleCurrent="handleCurrent" ></Paging>
                 <el-dialog title= "新增/修改角色" :visible.sync = "dialogVisible" width= "30%" :before-close='closeDialog'>
                    <el-form :model= "form" :rules= "rules" ref= "ruleForm" class= "demo-ruleForm" label-position = "right" label-width= "80px" style= "width:90%; margin:0 0 0 20px;">
                        <el-form-item label="角色名称" prop="tpname"  >
                            <el-input v-model="form.tpname"  clearable autosize></el-input>
                        </el-form-item>
                        <el-form-item label="所属机构" prop="tfather"  >
                            <el-input v-model="form.tfather" autocomplete="off"  style="width:80%"></el-input>
                            <el-button @click="getinnerVisible()"><i class="el-icon-plus" type="success"></i></el-button>
                            <el-dialog
                                      width       = "50%"
                                      title       = "机构选择器"
                                    :visible.sync = "innerVisible"
                                    :before-close = 'closeInnerDialog'
                                append-to-body>
                                <treeBar father-component="navorgan" v-on:fatherorgan="showchildorgan"></treeBar>
                            </el-dialog>
                        </el-form-item>
                        <el-form-item label="备注" prop="tbusscope" >
                            <el-input type="textarea" v-model="form.tbusscope"   ></el-input>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="cancelForm('ruleForm')">取 消</el-button>
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
 import treeBar from "@/components/treeBar";
 import Paging from "@/components/paging";
 import {getRoleInf,getDeleteRoleInf,getChangeRoleInf,submitRoleFormInf} from '@/api/getData'
  export default {
    data() {
        return {
          menunum    : 0,
          total      : 0,
          currentPage: 1,
          pageSize   : 10,
          tableData  : [],
          form       : {},
          rules      : {
            tpname: [
              { required: true, message: '请输入角色名称', trigger: 'blur' },
              { min: 2, message: '长度至少为两个字符', trigger: 'blur' }
            ],
            tfather: [
              {  required: true, message: '请选择所属机构', trigger: 'change' }
            ],
        },
      }
    },
     computed: mapState([
        "dialogVisible",
        "innerVisible",
        "resetshow"
    ]),
     components: {
        treeBar,
        Paging
    },
    created() {
       this.getRole();
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
      showmenunum(data){  //机构管理页面菜单获取子组件节点id渲染对应页面
          this.menunum = data;
          this.getRole();
      },
      async getRole(){  //角色管理对应信息渲染
            try{
                const countData      = await getRoleInf({pageNum: this.currentPage,pageSize:this.pageSize,menunum:this.menunum});
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
      showchildorgan(data){ //对话框里的页面菜单，获取子页面的label跟是否渲染内嵌页面的Boolean值
          this.form.tfather = data
          this.ininnerVisible()
      },
      doAdd() {
          this.isresetshow()
          this.isdialogVisible()
      },
       getinnerVisible(){
          this.isinnerVisible()
      },
       closeInnerDialog(){
        this.ininnerVisible()
      },
      handleDelete(index,row){ //  删除表格信息
          this.$confirm('此操作将删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText : '取消',
          type             : 'warning'
          }).then(() => {
              this.getDelete(index, row);
              this.getRole();
          }).catch(() => {
            this.$message({
                type   : 'warning',
                message: '取消删除！'
            });
          });
      },
      async getDelete(index, row) {   //删除信息
          try{
              const res = await getDeleteRoleInf({rowid:row.id});
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
              const res = await getChangeRoleInf({rowid:row.id});
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
      submitForm(formName) { //新增及修改表单确定按钮提交
        this.$refs[formName].validate(async(valid) => {
          if (valid) {
            const params = {
              ...this.form,
              organ_id: this.menunum,
            }
            try{
              const result = await submitRoleFormInf(params);
              if (result.status == 1) {
                this.$message({
                        type   : 'success',
                        message: '角色添加成功'
                });
                this.indialogVisible()
                this.$refs[formName].resetFields();
                this.getRole();
              }else{
                  this.$message.error('角色添加失败');
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
      handleSize(data){
        this.pageSize = data
        this.getRole()
      },
      handleCurrent(data){
        this.currentPage = data
        this.getRole()
      },
      handleClick(index, row){
        console.log(index)
        console.log(row)
        this.$message.error('不知里面内容故没有授权');
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
  .content-title{
      padding  : 20px 80px;
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
