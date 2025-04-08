<template>
  <div class="left-menu" ref="leftElement">
    <div class="menu-text-heading">
      <RmButton
          v-for="item of textheadings"
          :key="'text_heading'+item.key"
          :active="item.showActive && editor.isActive(item.key,item.params||'')"
          @click="selectItem(item)"
          style="margin-bottom: 4px"
      >
        <i :class="item.icon"></i>
      </RmButton>
    </div>
    <ol class="menu-options-list">
      <li v-for="(item, index) of list" :key="'menu_option_' + index"
          :class="{'is-active':item.showActive && editor.isActive(item.key,item?.params)}"
          :style="item.style||{}"
          @click="selectItem(item)">
        <i v-if="item.icon" :class="[item.icon]"/><span>{{ item.name }}</span>
      </li>
    </ol>
  </div>
</template>
<script setup lang="ts">
import RmButton from "./RmButton.vue";
import {defineProps, reactive, ref} from 'vue'

const {editor,targetEndPos,t} = defineProps({
  editor: {
    type: Object,
    required: true
  },
  targetEndPos:{
    type: Number,
    default: -1
  },
  t:{
    type: Function,
    required: true
  }
})
let leftElement = ref(null)
let textheadings = reactive([
  {
    name: t('tools.heading1'),
    key: 'heading',
    params: {level: 1},
    fun: 'toggleHeading',
    icon: 'icon-h1',
    type: 'button',
    showActive: true
  },
  {
    name: t('tools.heading2'),
    key: 'heading',
    params: {level: 2},
    fun: 'toggleHeading',
    icon: 'icon-h2',
    type: 'button',
    showActive: true
  },
  {
    name: t('tools.heading3'),
    key: 'heading',
    params: {level: 3},
    fun: 'toggleHeading',
    icon: 'icon-h3',
    type: 'button',
    showActive: true
  },
  {
    name: t('tools.heading4'),
    key: 'heading',
    params: {level: 4},
    fun: 'toggleHeading',
    icon: 'icon-h4',
    type: 'button',
    showActive: true
  },
  {
    name: t('tools.heading5'),
    key: 'heading',
    params: {level: 5},
    fun: 'toggleHeading',
    icon: 'icon-h5',
    type: 'button',
    showActive: true
  },
  {
    name: t('tools.heading6'),
    key: 'heading',
    params: {level: 6},
    fun: 'toggleHeading',
    icon: 'icon-h4',
    type: 'button',
    showActive: true
  },
  {
    name: t('tools.paragraph'),
    key: 'paragraph',
    params: '',
    fun: 'setParagraph',
    icon: 'icon-text',
    type: 'button',
    showActive: true
  },
])
const list = reactive([

  {
    name: t('tools.bulletList'),
    key: 'bulletList',
    fun: 'toggleBulletList',
    params: '',
    icon: 'icon-bullet-list',
    type: 'button',
    showActive: true
  },
  {
    name: t('tools.orderedList'),
    key: 'orderedList',
    fun: 'toggleOrderedList',
    params: '',
    icon: 'icon-ordered-list',
    type: 'button',
    showActive: true
  },
  {
    name: t('tools.taskList'),
    key: 'taskList',
    params: '',
    fun: 'toggleTaskList',
    icon: 'icon-task-list',
    type: 'button',
    showActive: true
  },
  {
    name: t('tools.codeBlock'),
    key: 'codeBlock',
    params: '',
    fun: 'toggleCodeBlock',
    icon: 'icon-code-block',
    type: 'button',
    showActive: true
  },
  {
    name: t('tools.blockquote'),
    key: 'blockquote',
    params: '',
    fun: 'toggleBlockquote',
    icon: 'icon-blockquote',
    type: 'button',
    showActive: true
  },
  {
    name: t('tools.horizontalRule'),
    key: 'horizontalRule',
    params: '',
    fun: 'setHorizontalRule',
    icon: 'icon-horizontal-rule',
    type: 'button',
    showActive: false
  },
  {
    name: t('tools.table'),
    key: 'table',
    params: '',
    type: 'table',
    icon: 'icon-table',
    showActive: true
  },
  {
    name: t('tools.image'),
    key: 'image',
    params: '',
    type: 'image',
    icon: 'icon-image',
    showActive: true
  },
  {
    name: t('base.delete'),
    key: 'del',
    params: '',
    fun: 'del',
    style: {color: '#da2c15'},
    icon: 'icon-delete',
    showActive: false,
  }
])

const selectItem = (item:any)=> {
  if (item.key === 'table') {
    editor.commands.setTextSelection(targetEndPos);
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
  }else if(item.key === 'image'){
    editor.commands.setTextSelection(targetEndPos);
    let url = 'https://cdn-vip.kingdee.com/statics/webfront/homePage/new_card_14.png'
    editor.chain().focus().setImage({ src: url }).run()
  } else if(['horizontalRule'].includes(item.key)){
    editor.commands.setTextSelection(targetEndPos);
    editor.chain().focus()[item.fun](item.params||'').run()
  } else if(item.key==='heading'){
    editor.chain().focus()[item.fun](item.params||'').run()
    let date = new Date().getTime()
    editor.commands.setHeadingId(`h${item.params.level}-${date}`)
  }else if(item.key==='del'){
    delFun()
  } else{
    editor.chain().focus()[item.fun](item.params||'').run()
  }

}
const delFun = ()=> {
  let el = document.querySelector(`.ProseMirror`)
  let self:any = document.querySelector(`.ProseMirror-selectednode`)
  el?.removeChild(self)
}
</script>


<style scoped lang="less">
@import "../../../assets/style/var.less";
.left-menu {
  height: 100%;
  width: 100%;
  overflow: auto;
  .menu-text-heading{
    display: flex;
    flex-wrap: wrap;
    padding: 4px 0;
    border-bottom: 1px solid @border-color;
  }
  .menu-options-list {
    padding: 5px 0;
    margin: 0;

    li {
      list-style: none;
      height: 30px;
      display: flex;
      align-items: center;
      margin: 0;
      padding: 0 10px;
      color: #3D4757;

      span {
        margin-left: 10px;
      }

      &:hover {
        background-color: #F5F5F5;
        cursor: pointer;
      }

      &.is-active {
        background-color: #F5F5F5;
      }
    }
  }
}
</style>