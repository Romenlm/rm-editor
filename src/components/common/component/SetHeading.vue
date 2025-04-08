<template>
  <RmButton
      :name="title"
      :is-active="isActive"
  >
    <MenuButton
        :icon="activeIcon"
        :options="list.value"
        :width="140"
        :active="select"
        @change="selectItem"
    />
  </RmButton>
</template>

<script setup lang="ts">
import MenuButton from './MenuButton.vue'
import RmButton from "./RmButton.vue"
import {defineProps, reactive, ref,watch} from 'vue'
let { editor,type,title,t } = defineProps({
  editor: {
    type: Object,
    default: () => null
  },
  type:{
    type: String,
    default: 'highlight'
  },
  title:{
    type:String,
    default:''
  },
  t:{
    type: Function,
    required: true
  }
})

let list = reactive({value:[
  {
    name: t('tools.text'),
    value: "title",
  },
  {
    name: t('tools.paragraph'),
    value: 'paragraph',
    fun: 'setParagraph',
    icon: 'icon-text'
  },
  {
    name: t('tools.heading1'),
    value: 'heading1',
    fun: 'toggleHeading',
    params: { level: 1 },
    icon: 'icon-h1',
  },
  {
    name: t('tools.heading2'),
    value: 'heading2',
    fun: 'toggleHeading',
    params: { level: 2 },
    icon: 'icon-h2'
  },
  {
    name: t('tools.heading3'),
    value: 'heading3',
    fun: 'toggleHeading',
    params: { level: 3 },
    icon: 'icon-h3'
  },
  {
    name: t('tools.heading4'),
    value: 'heading4',
    fun: 'toggleHeading',
    params: { level: 4 },
    icon: 'icon-h4'
  },
  {
    name: t('tools.heading5'),
    value: 'heading5',
    fun: 'toggleHeading',
    params: { level: 5 },
    icon: 'icon-h5'
  },
  {
    name: t('tools.heading6'),
    value: 'heading6',
    fun: 'toggleHeading',
    params: { level: 6 },
    icon: 'icon-h6'
  },
  {
    name: t('tools.list'),
    value: "title",
  },
  {
    name: t('tools.bulletList'),
    value: 'bulletList',
    fun: 'toggleBulletList',
    icon: 'icon-bullet-list',
  },
  {
    name: t('tools.orderedList'),
    value: 'orderedList',
    fun: 'toggleOrderedList',
    icon: 'icon-ordered-list'
  },
  {
    name: t('tools.taskList'),
    value: 'taskList',
    fun: 'toggleTaskList',
    icon: 'icon-task-list'
  }
]})

let activeIcon = ref('icon-text')
let select = ref('paragraph')
let isActive = ref(false)

const updateActiveState = (level: number, value: string) => {
  activeIcon.value = `icon-h${level}`;
  select.value = value;
  isActive.value = true;
};
watch(()=>type,(value)=>{
  activeIcon.value = 'icon-text'
  select.value = 'paragraph'
  isActive.value = false
  if(value.indexOf('heading')>-1){
    let num = Number(value.replace('heading',''))
    updateActiveState(num, value);
    return
  }
  if(value === 'bulletList'){
    activeIcon.value = 'icon-bullet-list'
    select.value = 'bulletList'
    isActive.value = true
  }
  if(value === 'orderedList'){
    activeIcon.value = 'icon-ordered-list'
    select.value = 'orderedList'
    isActive.value = true
  }
  if(value === 'taskList'){
    activeIcon.value = 'icon-task-list'
    select.value = 'taskList'
    isActive.value = true
  }
})
const selectItem = (item:any)=>{
  activeIcon.value = item.icon
  editor.chain().focus()[item.fun](item.params||'').run()
  if(item.value === 'heading'){
    let date = new Date().getTime()
    editor.commands.setHeadingId(`h${item.params.level}-${date}`)
  }
}
</script>


