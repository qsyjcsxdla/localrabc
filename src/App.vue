<template>
  <div style="height:100%">
    <el-container style="background: crimson;min-height:100%;">
      <el-aside style="width:300px; min-height:100%">
        <navmenu></navmenu>
      </el-aside>
    <el-container>
      <el-header>
        <vheader></vheader>
      </el-header>
      <el-main>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
          </div>
          <div class="text item">
            <el-row>
              <el-col :span="24">
                <router-view></router-view>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-main>
      <el-footer style="text-align:center">Copyright © 银货通科技 2018</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import  Header from '@/components/Header';
import NavMenu from "@/components/NavMenu";
export default {
name      : "app",
components: {
        vheader: Header,
        navmenu: NavMenu,
    },
}
</script>

<style >
    html,body{
      width : 100%;
      height: 100%;
    }

  .el-header, .el-footer {
    background-color: #B3C0D1;
    color           : #333;
    line-height     : 60px;
  }

  .el-aside {
    background-color: #545c64;
    color           : #fff;
    text-align      : left;
  }

  .el-main {
    background-color: #E9EEF3;
    color           : #333;
  }

  body > .el-container {
    margin-bottom: 40px;
  }
</style>
