<script setup lang="ts">
import RmEditor from './components/Index.vue'
import {ref,reactive} from "vue";
let ss = ``
let str = ref(ss)
const config = reactive({
    uploadImage:(files:any[],cb:any)=>{
      let url:string[] = []
      files.forEach((file:any)=>{
        console.log(file)
        url.push('https://cdn-vip.kingdee.com/statics/webfront/homePage/new_card_14.png')
      })
      cb(url)
    }
  })
  let lang = ref('zh-CN')

// watch(()=>str.value,(newValue:any)=>{
//   console.log('------------')
//   console.log(newValue)
// })
</script>

<template>
  <h2 class="header-title">rm-editor</h2>
  <div class="content">
    <RmEditor v-model="str"  :lang="lang" :config="config"/>
  </div>

</template>

<style>
body{
  background-color: rgba(0,0,0,0.02);
}
.header-title{
  height: 60px;
  text-align: center;
}
.content{
  width: 900px;
  margin: 0 auto;
}
</style>
