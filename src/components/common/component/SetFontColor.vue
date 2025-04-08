<template>
<!--  :active="editor.getAttributes('textStyle').color"-->
  <RmButton
    :name="title"

  >
    <SelectColor
        icon="icon-font-color"
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
let defaultColor = editor.getAttributes('textStyle').color
const setColor = (value:string)=>{
  editor.chain().focus().setColor(value).run()
}
</script>