<template>
    <div>
        <el-row>
            <el-col :span="7" >
                <treeBar father-component="organ" v-on:menunum="showmenunum"></treeBar>
            </el-col>
            <el-col :span="17">
                <el-button-group style="margin-bottom:20px">
                    <el-button type="primary" size="medium" icon="el-icon-plus" @click="doAdd()">新增</el-button>
                </el-button-group>
                <el-table :data="tableData" style="width: 100%;margin-bottom:20px" border >
                    <el-table-column prop="name" label="机构名称" ></el-table-column>
                    <el-table-column prop="orgCode" label="机构编码"></el-table-column>
                    <el-table-column prop="grade" label="是否法人机构"></el-table-column>
                    <el-table-column prop="createTime" label="所属法人机构"></el-table-column>
                    <el-table-column prop="remark" label="机构地址"></el-table-column>
                    <el-table-column prop="phone" label="联系电话"></el-table-column>
                    <el-table-column prop="createTime" label="创建时间"></el-table-column>
                    <el-table-column prop="createUserName" label="创建者"></el-table-column>
                    <el-table-column  label="操作">
                         <template slot-scope="scope">
                                <el-button type="text" @click="handleDelete(scope.$index, scope.row)"  size="small">删除</el-button>
                                <el-button type="text" @click="handleChange(scope.$index, scope.row)" size="small">修改</el-button>
                            </template>
                    </el-table-column>
                </el-table>
                <Paging :total="total" v-on:handleSize="handleSize" v-on:handleCurrent="handleCurrent" ></Paging>

                <!-- 新增对话框 -->
                <el-dialog title= "新增/修改机构" :visible.sync = "dialogVisible" width= "50%" :before-close='closeDialog'>
                    <el-form :model= "form" :rules= "rules" ref= "ruleForm" class= "demo-ruleForm" label-position = "right" label-width= "80px" style= "width:90%; margin:0 0 0 20px;">
                        <div style="padding:20px; font-size:16px; color:#409eff; ">基本信息</div>
                        <el-form-item label="机构名称" prop="tname" :label-width="formLabelWidth" >
                            <el-input v-model="form.tname"  clearable autosize></el-input>
                        </el-form-item>
                        <el-form-item label="机构编码" prop="tnumber" :label-width="formLabelWidth">
                            <el-input v-model="form.tnumber" autocomplete="off" autosize clearable></el-input>
                        </el-form-item>
                        <el-form-item label="机构类型" prop="ttype" :label-width="formLabelWidth">
                          <el-select v-model="form.ttype"  placeholder="请选择机构类型" autosize>
                            <el-option
                                                    v-for = "item in ttype"
                                                  :key    = "item.value"
                                                  :label  = "item.label"
                                                  :value  = "item.value">
                            </el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="是否法人机构" prop="tlegal" :label-width="formLabelWidth">
                            <el-radio-group v-model="form.tlegal">
                              <el-radio class="radio"  label="yes">是</el-radio>
  						                <el-radio class="radio"  label="no">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="父级机构" prop="tfather"  :label-width="formLabelWidth">
                            <el-input v-model="form.tfather" autocomplete="off"  style="width:80%" ref="input" disabled></el-input>
                            <el-button @click="getinnerVisible()"><i class="el-icon-plus" type="success"></i></el-button>
                            <el-dialog
                                              width       = "40%"
                                              title       = "机构选择器"
                                            :visible.sync = "innerVisible"
                                            :before-close = 'closeInnerDialog'

                                append-to-body>
                                <treeBar father-component="navorgan" v-on:fatherorgan="showchildorgan"></treeBar>
                            </el-dialog>
                        </el-form-item>
                        <el-form-item label="是否保理机构" prop="tfactor" :label-width="formLabelWidth">
                            <el-radio-group v-model="form.tfactor">
                                <el-radio class="radio" label="yes">是</el-radio>
                                <el-radio class="radio" label="no">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="联系电话" prop="tphone" :label-width="formLabelWidth">
                            <el-input v-model="form.tphone" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="传真号" prop="tfax" :label-width="formLabelWidth">
                            <el-input v-model="form.tfax" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="联系地址" prop="taddress" :label-width="formLabelWidth">
                            <el-input v-model="form.taddress" autocomplete="off"></el-input>
                            <span>当前城市：{{city}}</span>
                        </el-form-item>
                        <el-form-item label="显示排序号" prop="tsort" :label-width="formLabelWidth">
                            <el-input v-model="form.tsort" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="是否启用" prop="tenable" :label-width="formLabelWidth">
                            <el-radio-group v-model="form.tenable">
                              <el-radio class="radio" label="yes">是</el-radio>
                              <el-radio class="radio" label="no">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <div style="padding:20px; font-size:16px; color:#409eff; ">扩展信息</div>
                        <el-form-item label="单位类型" prop="tcompany" :label-width="formLabelWidth">
                            <el-select v-model="form.tcompany" placeholder="请选择单位类型">
                                <el-option
                                                  v-for = "item in tcompany"
                                                :key    = "item.value"
                                                :label  = "item.label"
                                                :value  = "item.value">
                            </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="注册类型" prop="tregister" :label-width="formLabelWidth">
                            <el-select v-model="form.tregister" placeholder="注册类型">
                              <el-option
                                        v-for = "item in tregister"
                                      :key    = "item.value"
                                      :label  = "item.label"
                                      :value  = "item.value">
                            </el-option>

                            </el-select>
                        </el-form-item>
                        <el-form-item label="工商注册号" prop="tregisterNo" :label-width="formLabelWidth">
                            <el-input v-model="form.tregisterNo" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="注册资本(万元)" prop="tregistermoney"  :label-width="formLabelWidth">
                            <el-input v-model="form.tregistermoney" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="注册代码" prop="tregistercode" :label-width="formLabelWidth">
                            <el-input v-model="form.tregistercode" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="代理人归属地" prop="tagentaddress" :label-width="formLabelWidth">
                            <el-select v-model="form.tagentaddress" placeholder="请选择代理人归属地">
                              <el-option
                                                                                                                                                          v-for = "item in tagentaddress"
                                                                                                                                                        :key    = "item.value"
                                                                                                                                                        :label  = "item.label"
                                                                                                                                                        :value  = "item.value">
                            </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="代理人姓名" prop="tpname" :label-width="formLabelWidth">
                            <el-input v-model="form.tpname" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="代理人证件号" prop="tpno" :label-width="formLabelWidth">
                            <el-input v-model="form.tpno" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="法人代表归属地" prop="tcoperaddress" :label-width="formLabelWidth">
                            <el-select v-model="form.tcoperaddress" placeholder="请选择法人代表归属地">
                                <el-option
                                            v-for = "item in tcoperaddress"
                                          :key    = "item.value"
                                          :label  = "item.label"
                                          :value  = "item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="经营范围" prop="tbusscope" :label-width="formLabelWidth">
                            <el-input type="textarea" v-model="form.tbusscope"></el-input>
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
import VueEvent from '@/config/busEvevt'
import { mapState, mapActions } from 'vuex'
import treeBar from "@/components/treeBar";
import {regular, validateOrder} from '@/config/validate.js'
import Paging from "@/components/paging";
import { AP } from '@/config/mUtils'
import {getOrangeInf,getDeleteOrganInf,submitOrganFormInf,getChangeOrganInf} from '@/api/getData'
import _default from "@/config/getData.js";

  export default {
    data() {
        return {
          menunum      : 0,
          total        : 0,
          currentPage  : 1,
          pageSize     : 10,
          tableData    : [],
          tableDataId  : '',
          ttype        : _default.ttype,
          tcompany     : _default.tcompany,
          tregister    : _default.tregister,
          tagentaddress: _default.tagentaddress,
          tcoperaddress: _default.tcoperaddress,
          form         : {},
          rules        : {
            tname: [
              { required: true, message: '请输入机构名称', trigger: 'blur' },
              { min: 2, message: '长度至少为两个字符', trigger: 'blur' }
            ],
            tnumber: [
              { required: true, message: '请输入机构编码', trigger: 'change' }
            ],
            ttype: [
              { required: true, message: '请选择机构类型', trigger: 'change' }
            ],
            tlegal: [
              {  required: true, message: '请选择是否法人机构', trigger: 'change' }
            ],
            tfather: [
              {  required: true, message: '请选择父级机构', trigger: 'change' }
            ],
            tfactor: [
              { required: true, message: '请选择是否保理机构', trigger: 'change' }
            ],
            tsort: [
              { required: true, message: '请输入显示排序号', trigger: 'change' }
            ],
            tenable: [
              { required: true, message: '请选择是否启用', trigger: 'change' }
            ],
            tfax:[
              {pattern: regular.fax, message: regular.fax, trigger: 'blur'}
              ]
          },
          formLabelWidth: '120px'
      }
    },
    computed: mapState([
        "dialogVisible",
        "innerVisible",
        "resetshow",
        "city",
    ]),
     components: {
        treeBar,
        Paging,
    },
    created () {
        this.getOrange()
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
        async getOrange(){  //机构管理表格信息渲染
            try{
                const countData      = await getOrangeInf({pageNum: this.currentPage,pageSize:this.pageSize,menunum:this.menunum});
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
      showmenunum(data){  //机构管理页面菜单获取子组件节点id
           this.menunum = data;
           this.getOrange()
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
      doAdd() { //新增事件
        this.isresetshow()
        this.isdialogVisible()
          console.log('add...');
      },

      handleDelete(index,row){ //  删除表格信息
          this.$confirm('此操作将删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText : '取消',
          type             : 'warning'
          }).then(() => {
              this.getDelete(index, row);
              this.getOrange();
          }).catch(() => {
            this.$message({
                type   : 'warning',
                message: '取消删除！'
            });
          });
      },
      async getDelete(index, row) {   //删除信息（接口）
          try{
              const res = await getDeleteOrganInf({rowid:row.id});
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
      async getChange(index, row) {   //修改表格单个信息获取信息（接口）
          try{
              const res = await getChangeOrganInf(row.id);
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
      submitForm(formName) { //表单确定按钮提交
        this.$refs[formName].validate(async(valid) => {
          if (valid) {
            const params = {
              ...this.form,
              organ_id: this.menunum,
            }
            try{
              const result = await submitOrganFormInf(params);
              if (result.status == 1) {
                this.$message({
                        type   : 'success',
                        message: '机构添加成功'
                });
                this.indialogVisible()
                this.$refs[formName].resetFields();
                this.getOrange();
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
      cancelForm(formName){//表单取消按钮
        this.indialogVisible()
        this.$refs[formName].resetFields();
      },
      resetForm(formName) { // 表单重置按钮
        this.$refs[formName].resetFields();
      },
      closeDialog(){ // 表单关闭按钮关闭前调用事件
        this.indialogVisible()
      　this.$refs["ruleForm"].resetFields();  // 为什么没用重置的this.$refs[formName].resetFields()的传参方法：dom渲染问题
      },
       handleSize(data){
        this.pageSize = data
        this.getOrange()
      },
      handleCurrent(data){
        this.currentPage = data
        this.getOrange()
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
