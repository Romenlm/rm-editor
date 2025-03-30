<template>
  <div class="set-link-float-dialog">
    <a :href="link" target="_blank"  v-tooltip="link">{{link}}</a>
    <span class="liner"></span>
    <RmButton @click="setLink">
      <i class="icon-edit"></i>
    </RmButton>
    <RmButton @click="deleteLink">
      <i class="icon-delete"></i>
    </RmButton>
  </div>
</template>
<script setup lang="ts">
import { defineProps,defineEmits } from 'vue'
import RmButton from "./RmButton.vue";
const emit = defineEmits(['del','setLink'])

const { link,editor} = defineProps({
  editor: {
    type: Object,
    required: true
  },
  link: {
    type: String,
    default: ''
  }
})
const deleteLink = () => {
  editor.chain().focus().unsetLink().run()
  emit('del')
}
const setLink = () => {
  emit('setLink')
}
</script>

<style scoped lang="less">
.set-link-float-dialog{
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
  a{
    display: inline-block;
    max-width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .liner{
    display: inline-block;
    width: 1px;
    height: 16px;
    background: #e6e6e6;
    margin: 0 10px;
  }
}
</style>