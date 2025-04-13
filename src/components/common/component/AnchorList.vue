

<template>
  <ol class="rm-anchor-list">
    <li
        v-for="(item,index) in list.value"
        :key="index"
        :class="{active:item.id===active}"
        :style="{'padding-left': (item.level * 10) + 'px'}"
        @click="selectItem(item)"
    >
      {{item.text}}
    </li>
  </ol>
</template>
<script setup lang="ts">
import {onMounted, reactive,ref} from 'vue'
import {throttle} from "../../../assets/common/utils.ts";

const {editor} = defineProps({
  editor: {
    type: Object,
    required: true
  }
})

onMounted(()=>{
  getAllHeadings()
  editor.on('update', () => {
    // TODO 需要优化，导入文本是，不会收集目录
    if(editor.isActive('heading')){
      getAllHeadings()
    }
  })
})

let list = reactive<any>({value:[]})
const getAllHeadings = throttle( ()=> {
  const headings:any[] = []
  editor.state.doc.descendants((node:any, pos:any) => {
    if (node.type.name === 'heading') {
      headings.push({
        id: node.attrs.id,
        level: node.attrs.level, // 标题级别（1, 2, 3）
        text: node.textContent, // 标题文本
        pos: pos, // 标题在文档中的位置
      })
    }
  })
  list.value = headings
},5000,true)

let active = ref('')
const selectItem = (item:any)=>{
  active.value = item.id
  let el = document.getElementById(item.id)
  if(el){
    el.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    })
  }
}
</script>

<style scoped lang="less">
@import "../../../assets/style/var.less";
.rm-anchor-list{
  width: 100%;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  li{
    max-width: 100%;
    overflow: hidden;
    padding: 4px 10px;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
    &:hover{
      background-color: @primary-color-hover;
    }
  }
}
</style>