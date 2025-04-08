<template>
<!--  :active="editor.getAttributes('highlight').color"-->
  <RmButton :name="title">
    <SelectColor
        icon="icon-bg-color"
        :defaultColor="defaultColor"
        @change="setColor"
    />
  </RmButton>
</template>
<script setup lang="ts">
import {defineProps} from 'vue'
import RmButton from "./RmButton.vue";
import SelectColor from "./SelectColor.vue";
const {editor,title} = defineProps({
  editor: {
    type: Object,
    default: ()=>{}
  },
  title:{
    type:String,
    default:''
  }
})
let defaultColor = editor.getAttributes('highlight').color
const setColor = (value:string)=>{
  editor.chain().focus().toggleHighlight({ color: value }).run()
}
</script>