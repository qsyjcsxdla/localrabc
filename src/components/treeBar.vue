<template>
    <div>
      <span v-if = "showN">
        <el-input
        placeholder = "输入关键字进行过滤"
        v-model     = "filterText"
        label-width = "80%"
        style       = "width:40%"
        size        = "small">
        </el-input>
        <el-button type="primary" size="mini" @click="clearFilter" style="margin-left:20px">清空</el-button>
        <el-button type="primary" size="mini" @click="setCheckedOpen" v-if = "showP" style="margin-left:20px">展开</el-button>
        <el-button type="primary" size="mini" @click="setCheckedClose" v-if = "showP"  style="margin-left:20px">折叠</el-button>
        </span>
            <div style="height:680px;overflow:auto; margin:20px 20px 0 0">
                <el-tree
                                class               = "filter-tree"
                              :data                 = "data"
                              :props                = "defaultProps"
                              :filter-node-method   = "filterNode"
                                ref                 = "tree2"
                                icon-class          = "el-icon-sold-out"
                              :default-expand-all   = "defaultExpand"
                              :default-checked-keys = "[41]"
                              :highlight-current    = "true"
                                @node-click         = "getCurrentNode"
                                node-key            = "id"
                >
                </el-tree>
            </div>
    </div>
</template>
<style>
</style>

<script>
import treeBar from '@/config/treebar.js'
import treeMenu from '@/config/treemenu.js'
 export default {
     data() {
      return {
        data         : [],
        showN        : '',
        showP        : '',
        filterText   : '',
        defaultExpand: true,
        defaultProps : {
          children: 'children',
          label   : 'label',
          id      : 'id'
        }
      }
    },
    props: ['fatherComponent'],
    created(){
      if(this.fatherComponent == 'organ'){
        this.showN = true;
        this.showP = true;
        this.data  = treeBar
      }else if(this.fatherComponent == 'menu'){
        this.showN = true;
        this.showP = false;
        this.data  = treeMenu
        }else if(this.fatherComponent == 'navorgan'){
          this.showN = false;
          this.data  = treeBar
        }
      },
    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val);
      }
    },
    methods: {
      getCurrentNode() {
        this.$emit('menunum',this.$refs.tree2.getCurrentNode().id)
        this.$emit('fatherorgan',this.$refs.tree2.getCurrentNode().label)
         },
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        clearFilter(){
            this.filterText = '';
        },
        setCheckedClose() {　　
　　　　　　this.defaultExpand = false;
　　　　　　for(var i=0;i<this.$refs.tree2.store._getAllNodes().length;i++){
　　　　　　　　this.$refs.tree2.store._getAllNodes()[i].expanded = this.defaultExpand;
　　　　　　}
　　　　},
        setCheckedOpen() {
　　　　　　this.defaultExpand = true;
　　　　　　for(var i=0;i<this.$refs.tree2.store._getAllNodes().length;i++){
　　　　　　　　this.$refs.tree2.store._getAllNodes()[i].expanded = this.defaultExpand;
　　　　　　}
        }
    },
  };
</script>
