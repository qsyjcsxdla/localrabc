
<template>

   <div>
        <el-row>
            <el-col :span="24" >
                <el-button-group style="margin-bottom:20px">
                    <el-button type="primary" size="medium"  @click="doAdd()">新增</el-button>
                </el-button-group>
                 <el-table :data="tableData" style="width: 100%;margin-bottom:20px" border>
                    <el-table-column prop="username" label="数据类别"></el-table-column>
                    <el-table-column prop="key" label="数据文本"></el-table-column>
                    <el-table-column prop="orgCode" label="数据值"></el-table-column>
                    <el-table-column prop="name" label="所属机构"></el-table-column>
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
                <el-dialog title= "新增数据授权" :visible.sync = "dialogVisible" width= "50%" :before-close='closeDialog'>
                    <el-form :model= "form" :rules= "rules" ref= "ruleForm" class= "demo-ruleForm" label-position = "right" label-width= "80px" style= "width:90%; margin:0 0 0 20px;">
                        <el-form-item label="数据类别" prop="tuname" :label-width="formLabelWidth" >
                            <el-input v-model="form.tuname"  clearable autosize></el-input>
                        </el-form-item>
                        <el-form-item label="所属机构" prop="tfather" :label-width="formLabelWidth" >
                            <el-input v-model="form.tfather" autocomplete="off"  style="width:80%"></el-input>
                            <el-button @click="getinnerVisible()"><i class="el-icon-plus" type="success"></i></el-button>
                            <el-dialog
                                          width       = "30%"
                                          title       = "机构选择器"
                                        :visible.sync = "innerVisible"
                                        :before-close = 'closeInnerDialog'
                                append-to-body>
                                <treeBar father-component="navorgan" v-on:fatherorgan="showchildorgan"></treeBar>
                            </el-dialog>
                        </el-form-item>
                        <el-form-item label="数据文本" prop="tcode" :label-width="formLabelWidth">
                            <el-input v-model="form.tcode" autocomplete="off" autosize clearable></el-input>
                        </el-form-item>
                        <el-form-item label="数据值" prop="tregistercode" :label-width="formLabelWidth">
                            <el-input v-model="form.tregistercode" autocomplete="off" autosize clearable></el-input>
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
import treeBar from "@/components/treeBar";
import Paging from "@/components/paging";
import {getDicInf,getDeleteDicInf,submitDicFormInf,getChangeDicInf} from '@/api/getData'
export default {
    data() {
        return {
          total      : 0,
          currentPage: 1,
          pageSize   : 10,
          loading    : false,
          // dialogVisible: false,
          // innerVisible : false,
          // resetshow    : false,
          tableData: [],
          form     : {},
          rules    : {
          tuname: [
            { required: true, message: '请输入数据类别', trigger: 'blur' }
          ],
          tfather: [
            { required: true, message: '请选择所属机构', trigger: 'blur' }
          ],
          tcode: [
            { required: true, message: '请输入数据文本', trigger: 'change' }
          ],
          tregistercode: [
            {  required: true, message: '请输入数据值', trigger: 'change' }
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
    components: {
        treeBar,
        Paging
    },
    created() {
        this.getDic()
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
      async getDic(){  //数据字典对应信息渲染
        try{
            const countData      = await getDicInf({pageNum: this.currentPage,pageSize:this.pageSize});
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

    getinnerVisible(){
          this.isinnerVisible()
    },
    showchildorgan(data){ //对话框里的页面菜单，获取子对话框里的值
      this.form.tfather = data
      this.ininnerVisible()
    },
    closeInnerDialog(){
      this.ininnerVisible()
    },
    handleChange(index,row){ //修改表格
      this.inresetshow()
      this.isdialogVisible()
      this.getChange(index, row);
    },
    async getChange(index, row) {   //修改表格单个信息获取信息
        try{
          const res = await getChangeDicInf(row.id);
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
      doAdd() {
          this.isresetshow()
          this.isdialogVisible()
      },
      handleSize(val) {
          this.pageSize = val;
          this.getDic();
      },
      handleCurrent(val) {
          this.currentPage = val;
          this.getDic();
      },
      submitForm(formName) { //新增及修改表单确定按钮提交
        this.$refs[formName].validate(async(valid) => {
          if (valid) {
            const params = {
              ...this.form
            }
            try{
              const result = await submitDicFormInf(params);
              if (result.status == 1) {
                this.$message({
                        type   : 'success',
                        message: '机构添加成功'
                });
                this.indialogVisible()
                this.$refs[formName].resetFields();
                this.getDic();
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
      　this.$refs["ruleForm"].resetFields();
      },
      handleDelete(index,row){ //  删除表格信息
        this.$confirm('此操作将删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText : '取消',
        type             : 'warning'
        }).then(() => {
            this.getDelete(index, row);
        }).catch(() => {
          this.$message({
              type   : 'warning',
              message: '取消删除！'
          });
        });
      },
      async getDelete(index, row) {   //删除信息
        try{
            const res = await getDeleteDicInf({rowid:row.id});
            if (res.status == 1) {
                this.$message({
                    type   : 'success',
                    message: '删除成功！'
                });
                this.tableData.splice(index, 1);
                this.getDic();
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
    }
  }
</script>

