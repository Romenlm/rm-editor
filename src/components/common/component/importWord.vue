

<template>
  <div class="import-word">
    <input ref="inputButton" type="file" @change="setWord" accept=".docx"/>
    <button class="add" @click="selectFile">+</button>
    <p v-if="fileName" class="file-name">{{fileName}} <RmButton @click="delFile"><i class="icon-delete"></i></RmButton></p>

    <div class="footer">
      <button @click="emit('close')" style="width:80px">{{ t('base.cancel') }}</button>
      <button :class="{dis:!fileName}" class="ok" @click="installWord" style="width:80px">{{ t('base.ok') }}</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import {defineEmits, defineProps, ref} from 'vue'
import mammoth from "mammoth";
import RmButton from "./RmButton.vue";
import {setHeadingId} from "../../../assets/common/utils.ts";

const emit = defineEmits(['close','ok'])
const {editor,t} = defineProps({
  editor:{
    type:Object,
    required:true
  },
  t:{
    type:Function,
    required:true
  }
})
let inputButton = ref<HTMLElement|null>(null)
const selectFile = ()=>{
  if(inputButton){
    inputButton.value?.click()
  }
}
let fileName = ref<string>('')
/**
 * 选择文件
 * @param event 选择到文件
 */
const setWord = (event:any)=>{
  const file = event.target.files[0];
  fileName.value = file.name
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    const arrayBuffer = e?.target?.result;
    processWordFile(arrayBuffer);
  };
  reader.readAsArrayBuffer(file);
}
/**
 * 删除文件
 */
const delFile = ()=>{
  fileName.value = ''
  wordContent.value = ''
}
let wordContent = ref<string>('')
/**
 * 导入内容
 * @param arrayBuffer
 */
const processWordFile =(arrayBuffer:any)=> {
  mammoth.convertToHtml({ arrayBuffer: arrayBuffer })
      .then((result:any) => {
        wordContent.value =setHeadingId(result.value); // 将转换后的 HTML 内容赋值
      })
      .catch((error:any) => {
        console.error('Error processing Word file:', error);
      });
}
/**
 * 将数据插入到编辑器中
 */
const installWord = ()=>{
  if(!fileName.value) return
  editor.commands.insertContent(wordContent.value)
  emit('ok')
}
</script>

<style scoped lang="less">
@import "../../../assets/style/var.less";
.import-word{
  input{
    display: none;
  }
  .add{
    display: block;
    height: 60px;
    width: 60px;
    font-size: 30px;
    text-align: center;
    line-height: 60px;
    background-color: #fff;
    border: 1px dashed @border-color;
    margin: 20px auto;
  }
  .file-name{
    height: 20px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .footer{
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid @border-color;
    button{
      height: 40px;
      cursor: pointer;
      margin: 0 10px;
      border: 1px solid @border-color;
      border-radius: @border-radius;
      &:hover{
        background-color: @primary-color-hover;
      }
      &.ok{
        background-color: @primary-color;
      }
      &.dis{
        cursor: not-allowed;
        position: relative;
        &:before{
          content:'';
          position: absolute;
          display: block;
          height: 100%;
          width: 100%;
          z-index: 1;
          top: 0;
          left: 0;
          background-color: rgba(255,255,255,.3);
        }
      }
    }
  }
}
</style>