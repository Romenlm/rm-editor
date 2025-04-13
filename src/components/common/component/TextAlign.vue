

<template>
<RmButton
    :name="name"
>
  <MenuButton
      :icon="activeIcon"
      :options="list.value"
      :width="120"
      :active="selectAlign"
      @change="selectItem"
  />
</RmButton>
</template>

<script setup lang="ts">
import RmButton from "./RmButton.vue";
import MenuButton from "./MenuButton.vue";
import {reactive, ref,onMounted} from "vue";
let {editor,name,t} = defineProps({
  editor: {
    type: Object,
    required: true
  },
  name: {
    type: String,
    default: ''
  },
  t: {
    type: Function,
    required: true
  }
})

let activeIcon = ref<string>('icon-align-left')
let selectAlign = ref<string>('')
let list:any = reactive({
  value: [
    {
      name: t('tools.leftAlign'),
      value: 'left',
      fun: 'setTextAlign',
      icon: 'icon-align-left',
    },
    {
      name: t('tools.centerAlign'),
      value: 'center',
      fun: 'setTextAlign',
      icon: 'icon-align-center'
    },
    {
      name: t('tools.rightAlign'),
      value: 'right',
      fun: 'setTextAlign',
      icon: 'icon-align-right'
    },
    {
      name: t('tools.justifyAlign'),
      value: 'justify',
      fun: 'setTextAlign',
      icon: 'icon-align-justify'
    }
  ]
})

onMounted(()=>{
  editor.on('selectionUpdate', () => {
    activeIcon.value = 'icon-align-left'
    selectAlign.value = 'left'
    if(editor.isActive({ textAlign: 'left' })){
      activeIcon.value = 'icon-align-left'
      selectAlign.value = 'left'
    }
    if(editor.isActive({ textAlign: 'center' })){
      activeIcon.value = 'icon-align-center'
      selectAlign.value = 'center'
    }
    if(editor.isActive({ textAlign: 'right' })){
      activeIcon.value = 'icon-align-right'
      selectAlign.value = 'right'
    }
    if(editor.isActive({ textAlign: 'justify' })){
      activeIcon.value = 'icon-align-justify'
      selectAlign.value = 'justify'
    }
  })
})

const selectItem = (item:any)=>{
  activeIcon.value = item.icon
  editor.chain().focus().setTextAlign(item.value).run()
}
</script>

<style scoped lang="less">

</style>