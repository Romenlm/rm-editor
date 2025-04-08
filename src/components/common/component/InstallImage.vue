<template>
<RmButton @click="setImage" :active="editor.isActive('image')" :name="name">
  <i class="icon-image"></i>
</RmButton>
</template>
<script setup lang="ts">
import {defineProps} from 'vue'
import RmButton from "./RmButton.vue";
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
const setImage = () => {
  let url = 'https://cdn-vip.kingdee.com/statics/webfront/homePage/new_card_14.png'
  editor.chain().focus().setImage({ src: url }).run()
}
</script>