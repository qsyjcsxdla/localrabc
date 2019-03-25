<template>
  <div>
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
</template>

<script>
export default {
  data() {
    return {
        currentPage: 1,
        pageSize   : 10,
    }
  },
  props  : ["total"],
  methods: {
    handleSizeChange(val) { //分页  每页几条
      this.pageSize = val;
      this.$emit('handleSize',this.pageSize)
    },
    handleCurrentChange(val) {  //分页  第几页
      this.currentPage = val;
      this.$emit('handleCurrent',this.currentPage)
    }
  }
}
</script>


