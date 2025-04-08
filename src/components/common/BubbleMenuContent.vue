<template>
  <div class="bubble-menu-content">
    <template v-for="item of list" :key="'toolbar_'+item.key">
      <RmButton
          v-if="item.type === 'button' && !item?.noShowNode?.includes(nodeType)"
          :name="item.name"
          :active="item.showActive && editor.isActive(item.key)"
          :disabled="setDisabled(item.key)"
          @click="setSelect(item)"
      >
        <i :class="item.icon"/>
      </RmButton>
      <RmButton
          v-if="item.type === 'format' && !item?.noShowNode?.includes(nodeType)"
          :name="item.name"
          @click="format"
      >
        <i :class="item.icon"/>
      </RmButton>
      <SetFontColor 
      v-if="item.type==='fontColor'&& !item?.noShowNode?.includes(nodeType)" 
      :editor="editor" :title="item.name"/>
      <SetHighlight 
      v-if="item.type==='highlight'&& !item?.noShowNode?.includes(nodeType)" 
      :editor="editor" :title="item.name"/>
      <TextAlign 
      v-if="item.type==='align'&& !item?.noShowNode?.includes(nodeType)" 
      :editor="editor"
      :t="t"
      :name="item.name"/>
      <InstallTable 
        v-if="item.type==='table'&& !item?.noShowNode?.includes(nodeType)"
        :editor="editor"
        :t="t"
        :title="item.name"/>
      <InstallImage v-if="item.type==='image'&& !item?.noShowNode?.includes(nodeType)"
        :editor="editor"
        :name="item.name"/>
<!--      <InstallLink v-if="item.type==='link'&& !item?.noShowNode?.includes(nodeType)" :editor="editor" :name="item.name" :t="t"/>-->
      <SetHeading 
      v-if="item.type==='setMenu'&& !item?.noShowNode?.includes(nodeType)" 
      :editor="editor" :type="type"
      :t="t"
      :title="item.name"/>
      <SetFontSize v-if="item.type==='fontSize'&& !item?.noShowNode?.includes(nodeType)" :editor="editor" :title="item.name"/>
      <span v-if="item.type==='line'&& !item?.noShowNode?.includes(nodeType)" class="rm-liner"/>
    </template>
  </div>
</template>
<script setup lang="ts">
import {defineEmits, reactive, defineProps, computed, onMounted} from "vue";
import {getBubbleList} from "../../assets/common/config.ts";
import RmButton from "./component/RmButton.vue";
import SetFontColor from "./component/SetFontColor.vue";
import SetHighlight from "./component/SetHighlight.vue";
import TextAlign from "./component/TextAlign.vue";
import InstallTable from "./component/InstallTable.vue";
import InstallImage from "./component/InstallImage.vue";
import SetHeading from "./component/SetHeading.vue";
import SetFontSize from "./component/SetFontSize.vue";
let emit = defineEmits<{
  (e: 'setLink',key:string): void,
}>()

const {editor,type,t} = defineProps({
  editor: {
    type: Object,
    required: true
  },
  type:{
    type: String,
    default: ''
  },
  t:{
    type: Function,
    required: true
  }
})
// TODO 后续移动到index.vue文件中

let nodeType = computed<string>(()=>{
  if(editor.isActive('heading')){
    return 'heading'
  }
  if(editor.isActive('image')){
    return 'image'
  }
  if(editor.isActive('bulletList')){
    return 'bulletList'
  }
  if(editor.isActive('orderedList')){
    return 'orderedList'
  }
  if(editor.isActive('taskList')){
    return 'taskList'
  }
  if(editor.isActive('paragraph')){
    return 'paragraph'
  }
  if(editor.isActive('table')){
    return 'table'
  }
  if(editor.isActive('codeBlock')){
    return 'codeBlock'
  }
  if(editor.isActive('blockquote')){
    return 'blockquote'
  }else {
    return ''
  }
})

let bubbleList = getBubbleList(t)
const list = reactive(bubbleList)
const setDisabled = (key: string) => {
  if (key === 'undo' && !editor.can().undo()) {
    return true
  }
  if (key === 'redo' && !editor.can().redo()) {
    return true
  }
  if (key === 'table' && editor.isActive('table')) {
    return true
  }
}
const setSelect = (item:any) => {
  if(item.key==='link'){
    emit('setLink',item.key)
  } else if(item.key==='clear'){
    editor.commands.unsetAllMarks()
  }else {
    let params = item.fun === 'setTextAlign' ? item.key : ''
    editor.chain().focus()[item.fun](params).run()
  }
}


let editorEl:any = null
let isFormat:boolean = false
onMounted(()=>{
  editorEl = document.querySelector(".rm-editor-content-box")
  editorEl.addEventListener("mouseup", applyFormat);
})
const format = ()=>{
  editorEl.className = editorEl.className + ' format-brush'
  editor.chain().focus().copyFormat().run();
  isFormat = true
}
// 实现格式刷
const applyFormat = ()=>{
  if(isFormat){
    editorEl.className = editorEl.className.replace('format-brush','')
    editor.chain().focus().applyFormat().run()
    isFormat = false
  }
}
</script>

<style scoped lang="less">
@import "../../assets/style/var.less";
.bubble-menu-content{
  display: flex;
  padding: 5px;
  border: 1px solid @border-color;
  border-radius: @border-radius;
  background-color: #fff;
  align-items: center;
  .rm-liner{
    width: 1px;
    height: 22px;
    background: @border-color;
    margin: 0 5px;
  }
}
</style>