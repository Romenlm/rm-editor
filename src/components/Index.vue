<template>
  <div class="rm-editor" v-if="editorObj">
    <div class="rm-editor-container">
      <Toolbar @showAnchor="showAnchor" :editor="editorObj" @set-link="setLinkDialog"/>
      <div class="rm-editor-content">
        <div class="rm-editor-wrapper">
          <div
              v-if="showFloatDialog && !isDragStatus"
              class="rm-editor-text-float-dialog"
              :style="{ top: (floatDialog.top-48)+'px', left: (floatDialog.left-50)+'px' }">
            <SetLinkFloatDialog
                :link="linkUrl"
                :editor="editorObj"
                @setLink="setLinkDialog"
                @del="showFloatDialog=false"/>
          </div>
        <!-- 左侧点击出现的菜单 -->
          <div
              class="left-menu-add"
              v-if="leftMenu"
              :style="{top:leftStyle.top}">
            <LeftMenu :editor="editorObj" :target-end-pos="targetEndPos"/>
          </div>
          <table-toolbar :editor="editorObj" :is-drag="isDragStatus"/>
          <editor-content class="rm-editor-content-box" :editor="editorObj" />
        </div>
        <div>
          <!-- 表格合并单元格，取消单元格，代码块都不显示 -->
          <bubble-menu
              v-show="editorObj && !editorObj.isActive('codeBlock') && !editorObj.can().mergeCells()&&!editorObj.can().splitCell()"
              :editor="editorObj"
              :tippy-options="{
                duration: 100,
                interactive: true,
                maxWidth:'1000px'
              }">
            <BubbleMenuContent :editor="editorObj" :type="selectNodeType"/>
          </bubble-menu>
        </div>
      </div>
    </div>
    <div class="rm-anchor-list" :style="{width:anchorWidth+'px'}"></div>
  </div>
  <template v-if="editorObj">
    <RmDialog v-model="linkDialog">
      <SetLink :editor="editorObj" :default-link="linkUrl" @ok="linkDialog=false"/>
    </RmDialog>
  </template>
</template>

<script setup lang="ts">
import {onBeforeUnmount, ref, reactive, onMounted, defineProps, defineEmits} from 'vue'
import {useEditor, EditorContent, BubbleMenu } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import {extensions} from './extensions'
import 'floating-vue/dist/style.css'
import '../assets/style/rm-editor.less'
import '../assets/style/icon.less'
import '../assets/style/editor-tool.less'

import Draghandle from "./extensions/draghandle.ts";

import Toolbar from "./common/Toolbar.vue";
import BubbleMenuContent from "./common/BubbleMenuContent.vue";
import RmDialog from "./common/component/RmDialog.vue";
import SetLink from "./common/component/SetLink.vue";
import SetLinkFloatDialog from "./common/component/SetLinkFloatDialog.vue";
import TableToolbar from "./common/component/TableToolbar.vue";
import LeftMenu from "./common/component/LeftMenu.vue";
const emit = defineEmits(['update:modelValue'])
let {modelValue} = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
})
let isShowAnchor = ref(false)
let anchorWidth = ref(0)
let showFloatDialog = ref(false)
let floatDialog = reactive({
  top:0,
  left:0
})
let linkUrl = ref('')
const isDragStatus = ref(false) // 是否拖拽状态
const linkDialog = ref(false) // 链接
let leftMenu = ref(false) // 左侧菜单
let leftStyle = reactive({
  left:'0px',
  top:'0px'
})
let targetEndPos = ref(0)
let nodeType = ref('')
let selectNodeType = ref('')

const editorObj = useEditor({
  content: modelValue,
  extensions: [
      StarterKit,
      Draghandle?.configure({
        onAddClick: ({ originalEvent,y }) => {
          let domParent = originalEvent.target.parentNode
          leftMenu.value = !leftMenu.value
          leftStyle.left = '0px'
          leftStyle.top = `${domParent.offsetTop+30}px`
          let h = window.innerHeight
          if(h-y<370){
            leftStyle.top = `${domParent.offsetTop-370}px`
          }
        },
        onMousemoveEvent: ({type})=>{
          nodeType.value = type
        },
        dragStart:()=>{
          isDragStatus.value = true
        },
        dragEnd:()=>{
          isDragStatus.value = false
        }
      }),
      ...extensions,
  ],
  onSelectionUpdate:({editor})=>{
    const pos = editor.state.selection.$from.pos
    showFloatDialog.value = false
    // 获取光标的坐标
    if(editor.isActive('link')){
      const coords = editor.view.coordsAtPos(pos)
      floatDialog.top = coords.top
      floatDialog.left = coords.left
      linkUrl.value = editor.getAttributes('link').href
      showFloatDialog.value = true
    }

    const { from, to } = editor.state.selection
    // 获取范围内的节点
    const nodes:any[] = []
    editor.state.doc.nodesBetween(from, to, (node) => {
      nodes.push(node)
    })
    if (nodes.length) {
      let targetNode  = nodes[0]
      let type = targetNode.type.name==='heading'?`heading${targetNode.attrs.level}`:targetNode.type.name
      selectNodeType.value = type
      let tagEndPos = -1;
      editor.state.doc.descendants((node, pos) => {
        if (node === targetNode ) {
          tagEndPos = pos + node.nodeSize; // 结束位置
          return false; // 停止遍历
        }
      });
      targetEndPos.value = tagEndPos
      // 当标题没有id时，需要添加ID
      if(targetNode.type.name === 'heading' && !targetNode.attrs.id){
        let date = new Date().getTime()
        editor.commands.setHeadingId(`h${targetNode.attrs.level}-${date}`)
      }
    }
  },
  onUpdate:({editor})=>{
    emit('update:modelValue', editor.getHTML())
  },
})
onMounted(()=>{
  document.addEventListener('click', (e) => {
    let el:any = e.target
    leftMenu.value = el.className.indexOf('global-drag-handle-add') !== -1;
  })
})

const showAnchor = () => {
  isShowAnchor.value = !isShowAnchor.value
  anchorWidth.value = isShowAnchor.value?200:0
}

/**
 * 设置链接弹框
 */
const setLinkDialog = ()=>{
  if(editorObj?.value){
    linkDialog.value = true
    linkUrl.value = editorObj.value.getAttributes('link').href
  }
}

onBeforeUnmount(() => {
  if(editorObj?.value){
    editorObj.value.destroy()
  }
})
</script>


<style scoped lang="less">
@import "../assets/style/var.less";
.rm-editor {
  width: 100%;
  background-color: #fff;
  border-radius: @border-radius;
  box-shadow: @box-shadow;
  display: flex;
  :deep(.tiptap){
    padding: 10px 5px;
    outline: none;
  }
  .rm-anchor-list{
    border-left: 1px solid @border-color;
    transition: width 0.2s ease-in-out;
  }
  .rm-editor-container {
    width: 0;
    flex-grow: 1;
    .rm-editor-content{
      .rm-editor-wrapper{
        position: relative;
        padding: 0 50px;
        .rm-editor-text-float-dialog{
          min-width: 100px;
          height: 36px;
          position: fixed;
          display: flex;
          border: 1px solid @border-color;
          background-color: #fff;
          border-radius: @border-radius;
          z-index: 1;
        }
        .left-menu-add{
          position: absolute;
          left:2px;
          height: 360px;
          width:160px;
          background-color: #fff;
          border-radius: 4px;
          border: 1px solid @border-color;
          box-shadow: @box-shadow;
          z-index:1;
          padding-bottom: 5px;
        }
        .format-brush{
          cursor: url('../assets/images/formatBrushCursor.png'),auto ;
        }
      }
    }
  }
}
</style>