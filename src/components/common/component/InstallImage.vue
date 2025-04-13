<template>
<RmButton @click="setImage" :active="editor.isActive('image')" :name="name">
  <i class="icon-image"></i>
</RmButton>
  <input
      class="rm-install-image"
      ref="installImage"
      type="file"
      accept=".svg,.jpg,.jpeg,.png"
      :multiple="true"
      @change="selectFile"
  />
</template>
<script setup lang="ts">
import {ref} from 'vue'
import RmButton from "./RmButton.vue";
const emit = defineEmits(['setImage'])
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

let installImage = ref<HTMLElement|null>(null)
const setImage = () => {
  installImage.value?.click()
}
const selectFile = (event:any)=> {
  const files = event.target.files;
  let list:any[] = []
  let val:any
  for(val of files){
    list.push(val)
  }
  if (!list) return;
  emit('setImage',list)
}
</script>
<style scoped lang="less">
.rm-install-image {
  display: none;
}
</style>