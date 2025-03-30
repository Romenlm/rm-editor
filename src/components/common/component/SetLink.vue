

<template>
    <div class="set-link">
      <div class="set-link-item" >
        <span>链接地址</span>
        <input v-model="link">
      </div>
      <div class="set-link-item" >
        <span>打开方式</span>
        <select v-model="target">
          <option value="_blank">新窗口打开</option>
          <option value="_self">当前窗口打开</option>
        </select>
      </div>
      <div class="set-link-footer" >
        <button type="button" @click="setLink">确定</button>
      </div>
    </div>
</template>
<script setup lang="ts">
import { ref, defineEmits } from 'vue'
const emit = defineEmits(['ok'])
const {editor,defaultLink} = defineProps({
  editor: {
    type: Object,
    required: true
  },
  defaultLink: {
    type: String,
    default: ''
  }
})
const link = ref(defaultLink)
const target = ref('_blank')
const setLink = ()=>{
  const url = link.value
  // cancelled
  if (url === null) {
    return
  }
  // empty
  if (url === '') {
    editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .unsetLink()
        .run()
    return
  }
  // update link
  editor
      .chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: url,target:target.value })
      .run()
  emit('ok')
}
</script>

<style scoped lang="less">
.set-link{
  padding: 20px 20px;
  .set-link-item{
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    span{
      margin-right: 10px;
    }
    input{
      height: 32px;
      flex-grow: 1;
      width: 0;
      outline: none;
      border: 0;
      box-shadow: 0 0 0 1px rgba(23, 23, 23, 0.2);
      padding: 0 10px;
      border-radius: 4px;
    }
    select{
      height: 32px;
      flex-grow: 1;
      width: 0;
      outline: none;
      border: 0;
      box-shadow: 0 0 0 1px rgba(23, 23, 23, 0.2);
      padding: 0 10px;
      border-radius: 4px;
    }
  }
  .set-link-footer{
    display: flex;
    justify-content: flex-end;
    button{
      height: 40px;
      width: 80px;
      outline: none;
      background-color: rgba(23, 23, 23, 0.2);
      border: none;
      margin-left: 10px;
      border-radius: 4px;
      cursor: pointer;
      &:hover{
        background-color: rgba(23, 23, 23, 0.3);
      }
    }
  }
}
</style>