<template>

   <div>
        <el-row>
            <el-col :span="24" >
                <el-button-group style="margin-bottom:20px">
                    <el-button type="primary" size="medium"  @click="doAdd()">新增</el-button>
                </el-button-group>
                 <el-table :data="tableData" style="width: 100%;margin-bottom:20px" border>
                    <el-table-column prop="numtext" label="应用名称"></el-table-column>
                    <el-table-column prop="key" label="应用代码"></el-table-column>
                    <el-table-column prop="url" label="URL地址"></el-table-column>
                    <el-table-column prop="numtype" label="标记说明"></el-table-column>
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
                <el-dialog title= "新增应用" :visible.sync = "dialogVisible" width= "50%" :before-close='closeDialog'>
                    <el-form :model= "form" :rules= "rules" ref= "ruleForm" class= "demo-ruleForm" label-position = "right" label-width= "80px" style= "width:90%; margin:0 0 0 20px;">
                        <el-form-item label="应用名称" prop="tfather" :label-width="formLabelWidth" >
                            <el-input v-model="form.tfather"  clearable autosize></el-input>
                        </el-form-item>
                        <el-form-item label="应用代码" prop="tcode" :label-width="formLabelWidth" >
                            <el-input v-model="form.tcode" autocomplete="off"  style="width:80%"></el-input>
                        </el-form-item>
                        <el-form-item label="显示排序" prop="tsort" :label-width="formLabelWidth">
                            <el-input v-model="form.tsort" autocomplete="off" autosize clearable></el-input>
                        </el-form-item>
                         <el-form-item label="是否启用" prop="twoker" :label-width="formLabelWidth">
                            <el-radio-group v-model="form.twoker">
                              <el-radio class="radio"  label="yes">是</el-radio>
  						                <el-radio class="radio"  label="no">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="应用URL" prop="turl" :label-width="formLabelWidth">
                            <el-input v-model="form.turl" autocomplete="off" autosize clearable></el-input>
                        </el-form-item>
                        <el-form-item label="标记说明" prop="tnumtext" :label-width="formLabelWidth">
                            <el-input v-model="form.tnumtext" autocomplete="off" autosize clearable></el-input>
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
import {getAppliInf,getDeleteAppliInf,submitAppliFormInf,getChangeAppliInf} from '@/api/getData'
export default {
    data() {
        return {
          total      : 0,
          currentPage: 1,
          pageSize   : 10,
          // resetshow    : true,
          loading: false,
          // dialogVisible: false,
          tableData: [],
          form     : {},
          rules    : {
          tfather: [
            { required: true, message: '请输入应用名称', trigger: 'blur' }
          ],
          tcode: [
            { required: true, message: '请输入应用代码', trigger: 'blur' }
          ],
          tsort:[
              {required: true, message: '请输入排序号码', trigger: 'change'}
              ],
          twoker: [
            { required: true, message: '请选择是否启用', trigger: 'change' }
          ],
          turl: [
            {  required: true, message: '请输入应用URL', trigger: 'change' }
          ]
        },
        formLabelWidth: '120px'
        }
    },
    computed: mapState([
      "dialogVisible",
      "resetshow"
    ]),
    components:{
      Paging
    },
    created() {
      this.getAppli();
    },
    methods: {
      ...mapActions([
            'isdialogVisible',
            'indialogVisible',
            'isresetshow',
            'inresetshow',
        ]),
        doAdd() {
            this.isresetshow()
            this.isdialogVisible()
        },
        async getAppli(){
          try{
              const countData      = await getAppliInf({pageNum: this.currentPage,pageSize:this.pageSize});
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
            this.getAppli();
        },
        handleCurrent(val) {
            this.currentPage = val;
            this.getAppli();
        },
        submitForm(formName) { //新增及修改表单确定按钮提交
          this.$refs[formName].validate(async(valid) => {
            if (valid) {
              const params = {
                ...this.form
              }
              try{
                const result = await submitAppliFormInf(params);
                if (result.status == 1) {
                  this.$message({
                          type   : 'success',
                          message: '机构添加成功'
                  });
                  this.indialogVisible()
                  this.$refs[formName].resetFields();
                  this.getAppli();
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
      resetForm(formName) {
        this.$refs[formName].resetFields();
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
            const res = await getDeleteAppliInf({rowid:row.id});
            if (res.status == 1) {
                this.$message({
                    type   : 'success',
                    message: '删除成功！'
                });
                this.tableData.splice(index, 1);
                this.getAppli();
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
      handleChange(index,row){ //修改表格
        this.inresetshow()
        this.isdialogVisible()
        this.getChange(index, row);
      },
      async getChange(index, row) {
        try{
          const res = await getChangeAppliInf(row.id);
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

