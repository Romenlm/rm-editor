<template>
  <RmButton :name="title">
    <MenuButton
        :icon="''"
        :options="list.value"
        :width="60"
        :active="active"
        :show-value="true"
        @change="selectItem"
    />
  </RmButton>
</template>

<script setup lang="ts">
import RmButton from "./RmButton.vue";
import MenuButton from "./MenuButton.vue";
import {reactive, ref, defineProps, computed, watch} from "vue";
let {editor,title} = defineProps({
  editor: {
    type: Object,
    required: true
  },
  title: {
    type: String,
    default: ''
  }
})

const fontSize = computed(()=>{
  return editor.getAttributes('textStyle').fontSize || 16
})
let active = ref<string>('16')
watch(()=>fontSize.value,(value)=>{
  active.value = String(value)
},{immediate:true})

const fontSizeValue = ref(16)
let list:any = reactive({
  value: [
    {
      name: '12',
      value: '12'
    },
    {
      name: '14',
      value: '14'
    },
    {
      name: '16',
      value: '16'
    },
    {
      name: '18',
      value: '18'
    },
    {
      name: '20',
      value: '20'
    },
    {
      name: '22',
      value: '22'
    },
    {
      name: '24',
      value: '24'
    },
    {
      name: '26',
      value: '26'
    },
    {
      name: '28',
      value: '28'
    },
    {
      name: '30',
      value: '30'
    },
    {
      name: '32',
      value: '32'
    },
    {
      name: '34',
      value: '34'
    }
  ]
})
/**
 * 选择字体大小
 * @param item 选中的字体大小
 */
const selectItem = (item:any)=>{
  fontSizeValue.value = item.value
  editor.chain().focus().setFontSize(Number(fontSizeValue.value)).run();
}
</script>
