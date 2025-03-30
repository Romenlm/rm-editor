<template>
  <RmButton :name="name" @click="vis = true">
    <i class="icon-link"></i>
  </RmButton>
  <RmDialog v-model="vis">
    <SetLink :editor="editor" :link="link" @ok="setLink"></SetLink>
  </RmDialog>

</template>
<script setup lang="ts">
import RmButton from "./RmButton.vue";
import SetLink from "./SetLink.vue";
import RmDialog from "./RmDialog.vue";
import {defineProps,ref} from 'vue'
const {editor,name} = defineProps({
  editor: {
    type: Object,
    required: true
  },
  name: {
    type: String,
    default: ''
  }
})

let vis = ref(false)
let link = ref('')
const setLink = () => {
  console.log('设置连接')
  vis.value = false
}

</script>

<style scoped lang="less">

</style>