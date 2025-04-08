<template>
  <div
    class="table-toolbar"
    :class="[flexDirection==='col'?'flex-col':'flex-row']"
    v-if="editor.isActive('table') && !isMove "
    :style="{
      height:style.height,
      width:style.width,
      left:style.left,
      top:style.top,
      right:style.right
    }"
  >
      <template v-for="item of list" :key="'table_toolbar'+item.key">
        <RmButton
            :name="item.name"
            :active="item.showActive && editor.isActive(item.key)"
            :disabled="setDisabled(item.key)"
            @click="editor.chain().focus()[item.fun]().run()"
            :placement="placementValue">
          <i :class="[item.icon]"/>
        </RmButton>
      </template>
  </div>
</template>
<script setup lang="ts">
import {defineProps,reactive,ref,onMounted,watch} from 'vue'
import {throttle} from "../../../assets/common/utils.ts";
import RmButton from "./RmButton.vue";
const {editor,isDrag,t} = defineProps({
  editor: {
    type: Object,
    required: true
  },
  isDrag: {
    type: Boolean,
    default: false
  },
  t: {
    type: Function,
    required: true
  }
})

const list = reactive([
  {
    name: t('table.deleteTable'),
    key: 'deleteTable',
    fun: 'deleteTable',
    icon: 'icon-delete-table',
    type: 'button',
    showActive: false
  },
  {
    name: t('table.addColumnBefore'),
    key: 'columnBefore',
    fun: 'addColumnBefore',
    icon: 'icon-add-col-before',
    type: 'button',
    showActive: false
  },
  {
    name: t('table.addColumnAfter'),
    key: 'columnAfter',
    fun: 'addColumnAfter',
    icon: 'icon-add-col-after',
    type: 'button',
    showActive: false
  },
  {
    name: t('table.deleteColumn'),
    key: 'deleteColumn',
    fun: 'deleteColumn',
    icon: 'icon-delete-col',
    type: 'button',
    showActive: false
  },
  {
    name: t('table.addRowBefore'),
    key: 'addRowBefore',
    fun: 'addRowBefore',
    icon: 'icon-add-row-before',
    type: 'button',
    showActive: false
  },
  {
    name: t('table.addRowAfter'),
    key: 'addRowAfter',
    fun: 'addRowAfter',
    icon: 'icon-add-row-after',
    type: 'button',
    showActive: false
  },
  {
    name: t('table.deleteRow'),
    key: 'deleteRow',
    fun: 'deleteRow',
    icon: 'icon-delete-row',
    type: 'button',
    showActive: false
  },
  {
    name: t('table.mergeCells'),
    key: 'mergeCells',
    fun: 'mergeCells',
    icon: 'icon-merge-cells',
    type: 'button',
    showActive: false
  },
  {
    name: t('table.splitCells'),
    key: 'splitCell',
    fun: 'splitCell',
    icon: 'icon-split-cells',
    type: 'button',
    showActive: false
  },
  {
    name: t('table.headerColumn'),
    key: 'headerColumn',
    fun: 'toggleHeaderColumn',
    icon: 'icon-header-column',
    type: 'button',
    showActive: false
  },
  {
    name: t('table.headerRow'),
    key: 'toggleHeaderRow',
    fun: 'toggleHeaderRow',
    icon: 'icon-header-row',
    type: 'button',
    showActive: false
  }
])
interface Style {
  height:string,
  width:string,
  flexDirection:string,
  left:string,
  top:string,
  right:string
}
const style = reactive<Style>({
  height:'',
  width:'',
  flexDirection:'',
  left:'',
  top:'',
  right:''
})
let toolsHeight = ref(330)
let placementValue = ref('top')
let isMove = ref(false)
watch(()=>isDrag,()=>{
  if(isDrag){
    isMove.value = true
  }
})
onMounted(()=>{
  editor.on('selectionUpdate', () => {
    if(editor.isActive('table')){
      setPosition()
    }
  })
})
let flexDirection = ref('row')
const setPosition = throttle(()=>{
  let el = document.querySelector('.ProseMirror-selectednode')
  if(!el){
    isMove.value = false
  }
  const { $from } = editor.state.selection;
  // 向上查找表格节点
  let tableNode = null;
  let tablePos = null;
  let trNode = null;
  let trPos = null;
  for (let depth = $from.depth; depth >= 0; depth--) {
    const node = $from.node(depth);
    if (node.type.name === 'table') { // 检查是否是表格节点
      tableNode = node;
      tablePos = $from.before(depth); // 获取表格节点的起始位置
    }
    if (node.type.name === 'tableHeader' || node.type.name === 'tableCell') { // 检查是否是表格节点
      trNode = node;
      trPos = $from.before(depth); // 获取表格节点的起始位置
    }
    if(tableNode && trNode){
      break;
    }
  }
  if (tableNode) {
    const tableElement = editor.view.nodeDOM(tablePos)
    const trElement = editor.view.nodeDOM(trPos)
    if(tableElement.offsetHeight >=360){
      placementValue.value = 'right'
      let tableBottom = tableElement.offsetTop+tableElement.offsetHeight
      let trTop = trElement.offsetTop
      style.height = ''
      style.width='40px'
      flexDirection.value = 'column'
      style.left = (tableElement.children[0].clientWidth)+58+'px'
      if(tableBottom-trTop<toolsHeight.value){
        style.top = (tableBottom-toolsHeight.value)+'px'
      }else{
        style.top = trTop+'px'
      }
    }else{
      placementValue.value = 'top'
      style.right = ''
      style.width = ''
      style.height='40px'
      style.left = '55px'
      style.top = (tableElement.offsetTop-42)+'px'
      flexDirection.value = 'row'
    }
  }
},1000,true)

const setDisabled = (key:string)=> {
  if (key === 'mergeCells' && !editor.can().mergeCells()) {
    return true
  }
  if (key === 'splitCell' && !editor.can().splitCell()) {
    return true
  }
}
</script>

<style scoped lang="less">
@import "../../../assets/style/var.less";
.table-toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  position: absolute;
  box-shadow: 0 0 0 1px @border-color;
  background-color: #fff;
  border-radius: 4px;
  z-index: 1;
  &.flex-col{
    flex-direction: column;
  }
  &.flex-row{
    flex-direction: row;
  }
}
</style>