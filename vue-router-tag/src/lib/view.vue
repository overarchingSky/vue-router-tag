<template>
  <div class="vue-router-tags">
    <el-tag class="tag" v-for="tag in tags" :key="tag.path">
      
    </el-tag>
    <el-tabs v-model="activeTag"  type="card" closable @tab-remove="removeTab(tag)">
      <el-tab-pane
        :key="item.name"
        v-for="(item, index) in editableTabs"
        :label="item.title"
        :name="item.name"
      >
        {{item.content}}
      </el-tab-pane>
    </el-tabs>
  </div>
  
</template>
<script lang="ts">
import { tagVM, tag } from './index'
export default {
  name: "home",
  components: {},
  data(){
    return {
      activeTag:tagVM.active
    }
  },
  computed:{
    tags: () => tagVM.items
  },
  methods:{
    removeTab(tag:tag){
      tagVM.close(tag.path);
    }
  }
};
</script>
