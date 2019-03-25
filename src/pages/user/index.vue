<template>

   <div>
        <el-row>
            <el-col :span="7">
               <treeBar father-component="organ" v-on:menunum="showmenunum"></treeBar>
            </el-col>
            <el-col :span="17" >
                  <el-button-group style="margin-bottom:20px">
                  <el-button type="primary" size="medium" icon="el-icon-plus" @click="doAdd()">新增</el-button>
                  </el-button-group>
                  <el-table :data="tableData" style="width: 100%;margin-bottom:20px" border  >
                    <el-table-column prop="username" label="用户名"></el-table-column>
                    <el-table-column prop="realname" label="姓名"></el-table-column>
                    <el-table-column prop="orgCode" label="机构代码"></el-table-column>
                    <el-table-column prop="createTime" label="创建时间"></el-table-column>
                    <el-table-column prop="createUserName" label="创建人"></el-table-column>
                    <el-table-column  label="操作">
                      <template slot-scope="scope">
                        <el-button type="text" @click="handleDelete(scope.$index, scope.row)"  size="small">删除</el-button>
                        <el-button type="text" @click="handleChange(scope.$index, scope.row)" size="small">修改</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                <Paging :total="total" v-on:handleSize="handleSize" v-on:handleCurrent="handleCurrent" ></Paging>
                 <!-- 新增对话框 -->
                <el-dialog title= "新增/修改人员" :visible.sync = "dialogVisible" width= "50%" :before-close='closeDialog'>
                    <el-form :model= "form" :rules= "rules" ref= "ruleForm" class= "demo-ruleForm" label-position = "right" label-width= "80px" style= "width:90%; margin:0 0 0 20px;">
                        <div style="padding:20px; font-size:16px; color:#409eff; ">基本信息</div>
                        <el-form-item label="真实姓名" prop="tpname"  >
                            <el-input v-model="form.tpname"  clearable autosize></el-input>
                        </el-form-item>
                         <el-form-item label="用户名" prop="tuname" >
                            <el-input v-model="form.tuname" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="性别" prop="tsex">
                            <el-radio-group v-model="form.tsex">
                                 <el-radio class="radio" label="男">男</el-radio>
                              <el-radio class="radio" label="女">女</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="登录密码" prop="tpassword" >
                            <el-input v-model="form.tpassword" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="证件号码" prop="tpno">
                            <el-input v-model="form.tpno" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="出生日期" prop="tbir">
                            <el-input v-model="form.tbir" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="电子邮箱" prop="temail"  >
                            <el-input v-model="form.temail" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="联系电话" prop="tphone" >
                            <el-input v-model="form.tphone" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="所属机构" prop="tfather"  >
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
                        <el-form-item label="是否启用" prop="tenable" >
                            <el-radio-group v-model="form.tenable">
                              <el-radio class="radio" label="yes">是</el-radio>
                              <el-radio class="radio" label="no">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="入职时间" prop="twokertime" >
                            <el-input v-model="form.twokertime" autocomplete="off"></el-input>
                        </el-form-item>
                         <el-form-item label="工作职位" prop="twoker" >
                            <el-radio-group v-model="form.twoker">
                              <el-radio class="radio" label="yes">有</el-radio>
                              <el-radio class="radio" label="no">无</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="联系地址" prop="taddress">
                            <el-input v-model="form.taddress" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="备注" prop="tbusscope" >
                            <el-input type="textarea" v-model="form.tbusscope"></el-input>
                        </el-form-item>

                        <div style="padding:20px; font-size:16px; color:#409eff; ">上传头像</div>
                        <el-form-item label="单位类型" prop="timg">
                            <el-upload
    class         = "avatar-uploader"
  :action         = "baseUrl + '/apis/upload'"
  :show-file-list = "false"
  :on-success     = "handleServiceAvatarScucess"
  :before-upload  = "beforeAvatarUpload">
                              <img v-if="form.timg" :src="form.timg" class="avatar">
                              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
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
import {getUserInf,getDeleteUserInf,getChangeUserInf,submitUserFormInf} from '@/api/getData'
import { baseUrl } from '@/config/env.js'
  export default {
    data() {
        return {
          autoUpload : false,
          baseUrl    : '',
          menunum    : 0,
          total      : 0,
          currentPage: 1,
          pageSize   : 10,
          tableData  : [],
          // resetshow        : true,
          // dialogVisible    : false,
          // innerVisible     : false,
          imageUrl        : '',
          dialogImageUrl  : '',
          dialogImgVisible: false,
          form            : {},
          rules           : {
            tpname: [
              { required: true, message: '请输入角色名称', trigger: 'blur' },
              { min: 2, message: '长度至少为两个字符', trigger: 'blur' }
            ],
            tpno:[
              { required: true, message: '请输入证件号码', trigger: 'blur' },
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
        this.getUser();
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
        async getUser(){  //人员管理信息渲染
          try{
              const countData      = await getUserInf({pageNum: this.currentPage,pageSize:this.pageSize,menunum:this.menunum});
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
        showmenunum(data){  //机构管理页面菜单获取子组件节点id渲染对应页面
           this.menunum = data;
           this.getUser();
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
        doAdd() {
            this.isresetshow()
            this.isdialogVisible()
        },
        handleDelete(index,row){ //  删除表格信息
            this.$confirm('此操作将删除该信息, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText : '取消',
            type             : 'warning'
            }).then(() => {
              console.log('1')
                this.getDelete(index, row);
                this.getUser();
            }).catch(() => {
              this.$message({
                  type   : 'warning',
                  message: '取消删除！'
              });
            });
        },
        async getDelete(index, row) {   //删除信息
            try{
                const res = await getDeleteUserInf({rowid:row.id});
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
                  const res = await getChangeUserInf({rowid:row.id});
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
                  const result = await submitUserFormInf(params);
                  if (result.status == 1) {
                    this.$message({
                            type   : 'success',
                            message: '角色添加成功'
                    });
                    this.indialogVisible()
                    this.$refs[formName].resetFields();
                    this.getUser();
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
            this.getUser()
          },
          handleCurrent(data){
            this.currentPage = data
            this.getUser()
          },
          handleServiceAvatarScucess(res, file) {
            if (res.status == 1) {
              this.form.timg = res.data.img;
            }else{
              this.$message.error('上传图片失败！');
              // this.form.timg = res.data.img;
              // console.log(res.data.img);
            }
          },
          beforeAvatarUpload(file) {
              const isRightType = (file.type === 'image/jpeg') || (file.type === 'image/png');
              const isLt2M      = file.size / 1024 / 1024 < 2;
              if (!isRightType) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
              }
              if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
              }
              return isRightType && isLt2M;
            },
      }
  }

</script>
<style>
.avatar-uploader .el-upload {
    border       : 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor       : pointer;
    position     : relative;
    overflow     : hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size  : 28px;
    color      : #8c939d;
    width      : 178px;
    height     : 178px;
    line-height: 178px;
    text-align : center;
  }
  .avatar {
    width  : 178px;
    height : 178px;
    display: block;
  }
</style>


