<template>
   <div>
        <el-row>
            <el-col :span="24" >
                <el-table :data="tableData" style="width: 100%;margin-bottom:20px" border>
                  <el-table-column prop="name" label="岗位名称"></el-table-column>
                  <el-table-column prop="orgCode" label="岗位代码"></el-table-column>
                  <el-table-column  label="操作">
                      <template slot-scope="scope">
                          <el-button type="success" @click="checkLook(scope.row)"  size="small">查看</el-button>
                          <el-button type="warning" @click="maintain(scope.row)" size="small">维护</el-button>
                      </template>
                  </el-table-column>
                </el-table>
                <Paging :total="total" v-on:handleSize="handleSize" v-on:handleCurrent="handleCurrent" ></Paging>

                <!-- 新增对话框 -->
                <el-dialog
                          title       = "业务审核岗"
                        :visible.sync = "dialogVisible"
                          width       = "30%"
                        :before-close = 'closeDialog'
                >
                    <el-tag
                              style              = "margin-bottom:10px"
                            :key                 = "tag"
                              v-for              = "tag in personInf"
                            :closable            = 'closeshow'
                            :disable-transitions = "false"
                              @close             = "handleClose(tag)">
                      {{tag}}
                    </el-tag>
                    <el-input
                    class               = "input-new-tag"
                    v-if                = "inputVisible"
                    v-model             = "inputValue"
                    ref                 = "saveTagInput"
                    size                = "small"
                    v-show              = "closeshow"
                    @keyup.enter.native = "handleInputConfirm"
                    @blur               = "handleInputConfirm"
                    >
                    </el-input>
                    <el-button v-else class="button-new-tag" size="small" @click="showInput()"  v-show="closeshow">+ New Tag</el-button>
                    <el-dialog
                            width       = "70%"
                            title       = "机构选择器"
                          :visible.sync = "innerVisible"
                          :before-close = 'closeInnerDialog'
                    append-to-body>
                        <el-row>
                            <el-col :span="8" >
                                <treeBar father-component="navorgan"  v-on:menunum="showmenunum" :personInf = "personInf"></treeBar>
                            <!-- <treeBar father-component="navorgan" v-on:fatherorgan="showchildorgan" v-on:menunum="showmenunum"  :personInf = "personInf"></treeBar> -->
                            </el-col>
                            <el-col :span="16">
                              <el-table
                                      ref               = "multipleTable"
                                    :data               = "SonTableData"
                                      tooltip-effect    = "dark"
                                      style             = "width: 100%"
                                      @selection-change = "handleSelectionChange">
                              <el-table-column
                              type  = "selection"
                              width = "55">
                              </el-table-column>
                              <el-table-column
                              prop  = "username"
                              label = "用户名"
                              width = "120">
                              <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
                              </el-table-column>
                              <el-table-column
                              prop  = "realname"
                              label = "真实姓名"
                              width = "120">
                              </el-table-column>
                              <el-table-column
                              prop  = "phone"
                              label = "联系方式"
                              show-overflow-tooltip>
                              </el-table-column>
                              <el-table-column
                              prop  = "orgCode"
                              label = "机构代码"
                              show-overflow-tooltip>
                              </el-table-column>
                              </el-table>
                              <Paging :total="total" v-on:handleSize="sonhandleSize" v-on:handleCurrent="sonhandleCurrent" ></Paging>
                              <div style="margin-top: 20px">
                              <el-button type="primary" size="medium" @click="toggleSelection()">确定</el-button>
                              <!-- <el-button @click="toggleSelection()">取消选择</el-button> -->
                              </div>
                            </el-col>
                        </el-row>
                    </el-dialog>
                    <span slot="footer" class="dialog-footer" v-if="lookVisible">
                    <el-button  @click="cancelForm('ruleForm')">取 消</el-button>
                    <el-button type="primary"  @click="submitForm('ruleForm')">确 定</el-button>
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
import {getExamInf,getDeleteExamInf,getLookExamInf,submitExamFormInf,getChangeExamInf,getSonExamInf} from '@/api/getData'
export default {
    data() {
        return {
          menunum          : 0,
          total            : 0,
          currentPage      : 1,
          pageSize         : 10,
          currentPage1     : 1,
          pageSize1        : 10,
          rowid            : '',
          loading          : false,
          inputVisible     : false,
          closeshow        : false,
          lookVisible      : false,
          inputValue       : '',
          tableData        : [],
          personInf        : [],
          SonTableData     : [],
          num              : [],
          multipleSelection: [],
          haha             : []
        }
    },
    computed: mapState([
      "dialogVisible",
      "innerVisible",
    ]),
    components: {
         treeBar,
         Paging
    },
    created() {
      this.getExam()
    },
    methods: {
      ...mapActions([
            'isdialogVisible',
            'indialogVisible',
            'isinnerVisible',
            'ininnerVisible',
        ]),
      async getExam(){  //审核对应信息渲染
            try{
                const countData      = await getExamInf({pageNum: this.currentPage,pageSize:this.pageSize});
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
      async getExamPer(row){  //查看岗位信息对应信息渲染
            try{
                const countData = await getLookExamInf({rowid:row.id});
                if (countData.status == 1) {
                this.personInf = countData.count;
                // this.rowid     = row.id
                }else{
                    throw new Error('获取数据失败');
                }
            }catch(err){
                console.log('获取数据失败', err);
            }
      },
      async submitForm(formName) { //修改表单确定按钮提交
            const params = {
              haha    : this.personInf,
              organ_id: this.menunum,
            }
            try{
              const result = await submitExamFormInf(params);
              if (result.status == 1) {
                this.$message({
                        type   : 'success',
                        message: '角色修改成功'
                });
                this.indialogVisible();
                this.getExam();
              }else{
                  this.$message.error('角色修改失败');
                  this.indialogVisible();
                  // this.$refs[formName].resetFields();
              }
            }catch(err){
              console.log(err)
            }
      },
      cancelForm(formName){//取消按钮
        this.indialogVisible();
        this.personInf = [];
      },
      closeDialog(){ // 对话框关闭按钮事件
        this.indialogVisible();
        this.personInf = [];
      },
        doAdd() {
            console.log('add...');
        },
        checkLook(row){
          this.lookVisible = false
          this.isdialogVisible();
          this.closeshow = false;
          this.getExamPer(row)
        },
        maintain(row){
           this.lookVisible = true
           this.isdialogVisible();
           this.closeshow = true;
            this.getExamPer(row)
        },

        handleClose(tag) {
        this.personInf.splice(this.personInf.indexOf(tag), 1);
      },
      closeInnerDialog(){
        this.ininnerVisible()
      },
      showInput(index, row) {
          this.isinnerVisible()
          console.log(this.rowid)
          this.getSonExam()
      },
      showmenunum(data){  //机构管理页面菜单获取子组件节点id渲染对应页面
           this.menunum = data;
           this.getSonExam()
      },
      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.tableData.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue   = '';
      },
      handleSize(data){
        this.pageSize = data
        this.getExam()
      },
      handleCurrent(data){
        this.currentPage = data
        this.getExam()
      },
      sonhandleSize(data){
        this.pageSize = data
        this.getSonExam()
      },
      sonhandleCurrent(data){
        this.currentPage = data
        this.getSonExam()
      },
        async getSonExam(){  //维护栏维护对应信息渲染
        try{
            const countData         = await getSonExamInf({pageNum: this.currentPage1,pageSize:this.pageSize1,menunum:this.menunum});
                  this.SonTableData = []
            if (countData.status == 1) {
            this.total        = countData.total
            this.SonTableData = countData.count;
            }else{
                throw new Error('获取数据失败');
            }
        }catch(err){
            console.log('获取数据失败', err);
        }
      },
      toggleSelection() {
          for(var i=0;i<this.multipleSelection.length;i++){
            this.personInf.push(this.multipleSelection[i].realname)
          }
           this.ininnerVisible()
           this.$refs.multipleTable.clearSelection();
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
    }
}
</script>
<style>
.el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left   : 10px;
    height        : 32px;
    line-height   : 30px;
    padding-top   : 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width         : 90px;
    margin-left   : 10px;
    vertical-align: bottom;
  }
</style>


