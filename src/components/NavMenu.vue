<template>
    <div>
        <div style="padding:20px 0; text-align:center">权限管理系统</div>
        <el-menu
            :default-active = "$route.path"
              class         = ""
            unique-opened
            router
            @open             = "handleOpen"
            @close            = "handleClose"
            background-color  = "#545c64"
            text-color        = "#fff"
            active-text-color = "#ffd04b"
            style             = "border:none"
        >
            <el-menu-item index="/">
                <i class="el-icon-menu"></i>
                <span slot="title">首&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;页</span>
            </el-menu-item>
            <el-submenu v-for="item in menu" :index="item.id" :key="item.id">
                <template slot="title">
                    <i :class="item.icon"></i>
                    <span v-text="item.name"></span>
                </template>
                <el-menu-item-group v-for="sub in item.sub" :key="sub.path">
                    <el-menu-item :index="sub.path" ><i :class="sub.icon"></i>{{sub.name}}</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>
<style>
</style>

<script>

import Menu from '@/config/menu.js'
export default {
    data() {
        return {
          menu: Menu,
        }
    },
     methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
};
</script>
