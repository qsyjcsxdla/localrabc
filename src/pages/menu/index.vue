<template>
    <div>
        <el-row>
            <el-col :span="6">
               <treeBar father-component="menu" v-on:menunum="showmenunum"></treeBar>
            </el-col>
            <el-col :span="18">
                 <el-button-group style="margin-bottom:20px">
                    <el-button type="primary" size="medium" icon="el-icon-plus" @click="doAdd()">新增</el-button>
                </el-button-group>
                <el-table :data="tableData" style="width: 100%;margin-bottom:20px" border >
                    <el-table-column prop="numtext" label="机构名称" ></el-table-column>
                    <el-table-column prop="orgCode" label="机构编码"></el-table-column>
                    <el-table-column prop="grade" label="是否保理机构"></el-table-column>
                    <el-table-column prop="name" label="所属法人机构"></el-table-column>
                    <el-table-column prop="address" label="机构地址"></el-table-column>
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
                <el-dialog title= "新增菜单" :visible.sync = "dialogVisible" width= "50%" :before-close='closeDialog'>
                    <el-form :model= "form" :rules= "rules" ref= "ruleForm" class= "demo-ruleForm" label-position = "right" label-width= "80px" style= "width:90%; margin:0 0 0 20px;">
                        <el-form-item label="菜单名称" prop="tnumtext" :label-width="formLabelWidth" >
                            <el-input v-model="form.tnumtext"  clearable autosize></el-input>
                        </el-form-item>
                        <el-form-item label="系统应用" prop="tcompany" :label-width="formLabelWidth">
                            <el-select v-model="form.tcompany" placeholder="请选择机构类型" autosize >
                                 <el-option
                                v-for = "item in tcompany"
                              :key    = "item.value"
                              :label  = "item.label"
                              :value  = "item.value">
                            </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="父级机构" prop="tfather" :label-width="formLabelWidth" >
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
                        <el-form-item label="显示排序号" prop="tsort" :label-width="formLabelWidth">
                            <el-input v-model="form.tsort" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="ICON图标" prop="ticon" :label-width="formLabelWidth" >
                            <el-input v-model="form.ticon" autocomplete="off"  style="width:80%"></el-input>
                            <el-button @click="getIconNum()"><i class="el-icon-plus" type="success"></i></el-button>
                            <el-dialog
                                      width       = "30%"
                                      title       = "机构选择器"
                                    :visible.sync = "smallinnerVisible"
                                append-to-body>
                                 <div style = "width:80%; margin:0 auto;min-width:50%;">
                               <el-button v-for="icon in icons" :key="icon.id" @click="getNum($event)" type="primary" :icon="icon" ref="icon" style="margin:10px;font-size: 30px;" ></el-button>
                                </div>
                            </el-dialog>
                        </el-form-item>
                        <el-form-item label="请求URL" prop="turl"  :label-width="formLabelWidth">
                            <el-input v-model="form.turl" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="选择按钮" prop="tbtngroup"  :label-width="formLabelWidth">
                            <el-checkbox-group v-model="form.tbtngroup" autocomplete="off">
                                <el-checkbox
                                      v-for = "item in tbtngroup"
                                    :key    = "item.value"
                                    :label  = "item.label"
                                    :value  = "item.value">
                              </el-checkbox>
                            </el-checkbox-group>
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
import {getMenuInf,getDeleteMenuInf,submitMenuFormInf,getChangeMenuInf,getIconInf} from '@/api/getData'
import _default from "@/config/getData.js";
  export default {
    data() {
      return {
          menunum    : 0,
          total      : 0,
          currentPage: 1,
          pageSize   : 10,
          loading    : false,
          tableData  : [],
          // dialogVisible    : false,
          // resetshow        : false,
          icons: [],
          // innerVisible     : false,
          smallinnerVisible: false,
          tcompany         : _default.tcompany,
          tbtngroup        : _default.tbtngroup,
          form             : {},
          rules            : {
            tnumtext: [
              { required: true, message: '请输入菜单名称', trigger: 'blur' }
            ],
            tcompany: [
              { required: true, message: '请选择系统应用', trigger: 'change' }
            ],
            tfather: [
              {  required: true, message: '请选择父级机构', trigger: 'change' }
            ],
            tsort: [
              { required: true, message: '请输入显示排序号', trigger: 'blur' }
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
       this.getMenu();
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
      async getMenu(){  //机构对应信息渲染
        try{
            const countData      = await getMenuInf({pageNum: this.currentPage,pageSize:this.pageSize,menunum:this.menunum});
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
       getIconNum(){
          this.smallinnerVisible = true
           this.getIcon();
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
      getNum(e){
      this.smallinnerVisible = false
      this.form.ticon        = e.currentTarget.childNodes[1].className;
      },
      showmenunum(data){  //机构管理页面菜单获取子组件节点id渲染对应页面
           this.menunum = data;
           this.getMenu()
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
      doAdd() { //新增对应菜单子节点的dom渲染
        this.isresetshow()
        this.isdialogVisible()
      },

      handleDelete(index,row){ //  删除表格信息
          this.$confirm('此操作将删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText : '取消',
          type             : 'warning'
          }).then(() => {
              this.getDelete(index, row);
              this.getMenu();
          }).catch(() => {
            this.$message({
                type   : 'warning',
                message: '取消删除！'
            });
          });
      },
      async getDelete(index, row) {   //删除信息
          try{
              const res = await getDeleteMenuInf({rowid:row.id});
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
              const res = await getChangeMenuInf(row.id);
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
              const result = await submitMenuFormInf(params);
              if (result.status == 1) {
                this.$message({
                        type   : 'success',
                        message: '机构添加成功'
                });
                this.indialogVisible()
                this.$refs[formName].resetFields();
                this.getMenu();
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
      handleSize(val) { //分页每页几个
          console.log('size change:%s', val);
          this.pageSize = val;
          this.getMenu()
      },
      handleCurrent(val) { // 分页第几页
          this.currentPage = val;
          this.getMenu()
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
      width        : 120px;
      font-size    : 18px;
      margin-bottom: 20px;
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
