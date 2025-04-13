<template>
  <div class="rm-editor" :class="{ 'is-fullscreen': isFullscreen }" v-if="rmEditor">
    <div class="rm-editor-container">
      <Toolbar
          :editor="rmEditor"
          :t="t"
          @setLink="setLinkDialog"
          @showAnchor="showAnchor"
          @word="importWord"
          @setImage="uploadImage"
        @fullscreen="setFullscreen" />
      <div class="rm-editor-content">
        <div class="rm-editor-wrapper">
          <div v-if="showFloatDialog && !isDragStatus" class="rm-editor-text-float-dialog"
            :style="{ top: (floatDialog.top - 48) + 'px', left: (floatDialog.left - 50) + 'px' }">
            <SetLinkFloatDialog :link="linkUrl" :editor="rmEditor" @setLink="setLinkDialog"
              @del="showFloatDialog = false" />
          </div>
          <!-- 左侧点击出现的菜单 -->
          <div class="left-menu-add" v-if="leftMenu" :style="{ top: leftStyle.top }">
            <LeftMenu :editor="rmEditor" :target-end-pos="targetEndPos" :t="t" />
          </div>
          <table-toolbar :editor="rmEditor" :is-drag="isDragStatus" :t="t" />
<!--          <ImageEdit :editor="rmEditor" />-->
          <editor-content class="rm-editor-content-box" :editor="rmEditor" />
        </div>
        <div>
          <!-- 表格合并单元格，取消单元格，代码块都不显示 -->
          <bubble-menu
            v-show="rmEditor && !rmEditor.isActive('codeBlock') && !rmEditor.can().mergeCells() && !rmEditor.can().splitCell()"
            :editor="rmEditor" :tippy-options="{
              duration: 100,
              interactive: true,
              maxWidth: '1000px'
            }">
            <BubbleMenuContent
                :editor="rmEditor"
                :type="selectNodeType"
                :t="t"
                @setLink="setLinkDialog"
            />
          </bubble-menu>
        </div>
      </div>
    </div>
    <div class="rm-anchor-list" :style="{ width: anchorWidth + 'px' }">
      <AnchorList :editor="rmEditor" />
    </div>
  </div>
  <template v-if="rmEditor">
    <RmDialog v-model="linkDialog">
      <SetLink :editor="rmEditor" :default-link="linkUrl" :t="t" @ok="linkDialog = false" />
    </RmDialog>
    <RmDialog v-model="importWordDialog" :title="t('tools.importWord')">
      <ImportWord :editor="rmEditor" :t="t" @close="importWordDialog = false" @ok="importWordDialog = false" />
    </RmDialog>
  </template>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { BubbleMenu, EditorContent, useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { extensions } from './extensions'
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
import ImportWord from "./common/component/importWord.vue";
import ImageEdit from "./common/component/ImageEdit.vue";
import AnchorList from "./common/component/AnchorList.vue";
import { setHeadingId } from "../assets/common/utils.ts";

import { createI18n } from 'vue-i18n'


import { messages } from '../i18n/index.ts'


const emit = defineEmits(['update:modelValue'])
let { modelValue, lang,config } = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  lang: {
    type: String,
    default: 'en-US'
  },
  config: {
    type: Object,
    default: () => {}
  }
})

// 国际化
const componentI18n = createI18n({
  legacy: false,
  locale: 'zh-CN', // 默认语言
  messages
})
const { t, locale } = componentI18n.global
watch(() => lang, (newValue:any) => {
  if(locale){
    locale.value = newValue
  }
}, { immediate: true })

let isShowAnchor = ref(false)
let anchorWidth = ref(0)
let showFloatDialog = ref(false)
let floatDialog = reactive({
  top: 0,
  left: 0
})
let linkUrl = ref('')
const isDragStatus = ref(false) // 是否拖拽状态
const linkDialog = ref(false) // 链接
let leftMenu = ref(false) // 左侧菜单
let leftStyle = reactive({
  left: '0px',
  top: '0px'
})
let targetEndPos = ref(0)
let nodeType = ref('')
let selectNodeType = ref('')
const rmEditor:any = useEditor({
  content: setHeadingId(modelValue),
  extensions: [
    StarterKit,
    Draghandle?.configure({
      onAddClick: ({ originalEvent, y }: { originalEvent: any, y: number }) => {
        let domParent = originalEvent.target.parentNode
        leftMenu.value = !leftMenu.value
        leftStyle.left = '0px'
        leftStyle.top = `${domParent.offsetTop + 30}px`
        let h = window.innerHeight
        if (h - y < 370) {
          leftStyle.top = `${domParent.offsetTop - 370}px`
        }
      },
      onMousemoveEvent: ({ type }: { type: string }) => {
        nodeType.value = type
      },
      dragStart: () => {
        isDragStatus.value = true
      },
      dragEnd: () => {
        isDragStatus.value = false
      }
    }),
    ...extensions(t,config),
  ],
  onSelectionUpdate: ({ editor }: { editor: any }) => {
    const pos = editor.state.selection.$from.pos
    showFloatDialog.value = false
    // 获取光标的坐标
    if (editor.isActive('link')) {
      const coords = editor.view.coordsAtPos(pos)
      floatDialog.top = coords.top
      floatDialog.left = coords.left
      linkUrl.value = editor.getAttributes('link').href
      showFloatDialog.value = true
    }

    const { from, to } = editor.state.selection
    // 获取范围内的节点
    const nodes: any[] = []
    editor.state.doc.nodesBetween(from, to, (node: any) => {
      nodes.push(node)
    })
    if (nodes.length) {
      let targetNode = nodes[0]
      selectNodeType.value = targetNode.type.name === 'heading' ? `heading${targetNode.attrs.level}` : targetNode.type.name
      let tagEndPos = -1;
      editor.state.doc.descendants((node: any, pos: number) => {
        if (node === targetNode) {
          tagEndPos = pos + node.nodeSize; // 结束位置
          return false; // 停止遍历
        }
      });
      targetEndPos.value = tagEndPos
      // 当标题没有id时，需要添加ID
      if (targetNode.type.name === 'heading' && !targetNode.attrs.id) {
        let date = new Date().getTime()
        editor?.commands?.setHeadingId(`h${targetNode.attrs.level}-${date}`)
      }
    }
  },
  onUpdate: ({ editor }: { editor: any }) => {
    emit('update:modelValue', editor.getHTML())
  },
})
onMounted(() => {
  document.addEventListener('click', (e) => {
    let el: any = e.target
    leftMenu.value = el.className.indexOf('global-drag-handle-add') !== -1;
  })
  setTimeout(()=>{
      setupDragAndDrop()
      setupPasteHandler()
    },2000)
})
/**
* 处理图片拖拽
 */
const setupDragAndDrop = () => {
  const editorElement = document.querySelector('.ProseMirror');

  // 阻止默认的拖拽行为
  editorElement?.addEventListener('dragover', (e) => {
    e.preventDefault();
  });

  // 处理图片拖拽
  editorElement?.addEventListener('drop', (e: any) => {
    e.preventDefault();
    const files = e?.dataTransfer?.files||[];
    let fileList:any[] = []
    let val:any
    for(val of files){
      if(val.type.startsWith('image/')){
        fileList.push(val)
      }
    }
    if (fileList && fileList.length) {
      // 获取鼠标释放的位置
      const { clientX, clientY } = e;

      // 将坐标转换为文档位置
      const pos = rmEditor.value.view.posAtCoords({ left: clientX, top: clientY });

      if (pos) {
        if(config?.uploadImage){
         uploadImage(fileList,pos.pos)
        }else {
          // 处理图片上传
          let file:any = fileList[0];
          handleImageUpload(file, pos.pos);
        }
      }
    }
    e.dataTransfer.clearData();
  });
}
/**
 * 当没有配置上传图片事件时，使用base64处理图片，只能处理第一条数据
 * @param file 图片文件
 * @param pos 插入图片位置
 */
const handleImageUpload = (file: any, pos: any) => {
  const reader = new FileReader();
  reader.onload = (e: any) => {
    const base64 = e.target.result;
    // 在指定位置插入图片base64
    rmEditor?.value
      .chain()
      .focus()
      .insertContentAt(pos, {
        type: 'image',
        attrs: {
          src: base64,
        },
      })
      .run();
  };
  reader.readAsDataURL(file);
}

// 处理粘贴图片事件
const setupPasteHandler = () => {
  const editorElement:any = document.querySelector('.ProseMirror')||null
  editorElement?.addEventListener('paste', async (e: ClipboardEvent) => {
    const files = e.clipboardData?.files||[]
    let fileList:any[] = []
    let val:any
    for(val of files){
      if(val.type.startsWith('image/')){
        fileList.push(val)
      }
    }
    if (fileList && fileList.length > 0) {
      e.preventDefault()
      const pos = rmEditor.value.state.selection.$from.pos
      if(config?.uploadImage){
        uploadImage(fileList,pos)
      }else{
        const file = files[0]
        handleImageUpload(file,pos)
      }
    }
  })
}

/**
 * 上传图片
 * @param files 图片文件
 * @param pos 插入位置
 */
const uploadImage = (files:any[],pos:number)=>{
  config?.uploadImage(files, (url: string[]) => {
    if(url.length){
      let str = ''
      url.forEach((image:any) => {
        str += `<p><img src="${image}"></p>`
      });
      rmEditor.value
          .chain()
          .focus()
          .insertContentAt(pos, str)
          .run();
    }

  })
}

const showAnchor = () => {
  isShowAnchor.value = !isShowAnchor.value
  anchorWidth.value = isShowAnchor.value ? 200 : 0
}

/**
 * 设置链接弹框
 */
const setLinkDialog = () => {
  if (rmEditor?.value) {
    linkDialog.value = true
    linkUrl.value = rmEditor.value.getAttributes('link').href
  }
}

/**
 * 导入word
 */
let importWordDialog = ref(false)
const importWord = () => {
  importWordDialog.value = true
}

let isFullscreen = ref(false)
const setFullscreen = (value: boolean) => {
  isFullscreen.value = value
}

onBeforeUnmount(() => {
  if (rmEditor?.value) {
    rmEditor.value.destroy()
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

  &.is-fullscreen {
    position: fixed;
    top: 0;
    left: 0;

    .rm-editor-content {
      height: calc(100vh - 50px);
      overflow-y: auto;
    }

    .rm-anchor-list {
      height: 100vh;
    }
  }

  :deep(.tiptap) {
    padding: 10px 5px;
    outline: none;
  }

  .rm-anchor-list {
    border-left: 1px solid @border-color;
    transition: width 0.2s ease-in-out;
    height: 800px;
    overflow: auto;
  }

  .rm-editor-container {
    width: 0;
    flex-grow: 1;

    .rm-editor-content {
      .rm-editor-wrapper {
        position: relative;
        padding: 0 50px;

        .rm-editor-text-float-dialog {
          min-width: 100px;
          height: 36px;
          position: fixed;
          display: flex;
          border: 1px solid @border-color;
          background-color: #fff;
          border-radius: @border-radius;
          z-index: 1;
        }

        .left-menu-add {
          position: absolute;
          left: 2px;
          height: 360px;
          width: 160px;
          background-color: #fff;
          border-radius: 4px;
          border: 1px solid @border-color;
          box-shadow: @box-shadow;
          z-index: 1;
          padding-bottom: 5px;
        }

        .format-brush {
          cursor: url('../assets/images/formatBrushCursor.png'), auto;
        }
      }
    }
  }
}
</style>