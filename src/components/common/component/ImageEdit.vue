<template>
  <div
    v-if="editor.isActive('image')"
    class="image-edit"
    :style="{
      top:top+'px',
      left:left+'px',
      width:width+'px',
      height:height+'px',
      maxWidth:maxWidth+'px'
    }"
  >
    <span ref="anchor" class="right" @mousedown="move"></span>
  </div>
</template>
<script setup lang="ts">
import {ref, defineProps, onMounted} from "vue";

const {editor} = defineProps({
  editor: {
    type: Object,
    required: true
  }
})

let top = ref(0)
let left = ref(0)
let width = ref(0)
let height = ref(0)
let maxWidth = ref(0)

onMounted(() => {
  editor.on('selectionUpdate', () => {
    if (editor.isActive('image')) {
      setAttr()
    }
  })
  editor.on('update', () => {
    if (editor.isActive('image')) {
      let el: any = document.querySelector('.ProseMirror-selectednode')
      if(el){
        left.value = el?.offsetLeft + 49
        height.value = el?.offsetHeight
      }
    }
  })
})
/**
 * 设置编辑器的位置宽高
 */
const setAttr = () => {
  let el: any = document.querySelector('.ProseMirror-selectednode')
  let dom: any = document.querySelector('.ProseMirror')
  if (el && dom) {
    maxWidth.value = dom.offsetWidth - 10
    top.value = el.offsetTop - 1
    left.value = el.offsetLeft + 49
    width.value = el.offsetWidth + 2
    height.value = el.offsetHeight
  }
}
let anchor:any = ref(null)

/**
 * 拖动图片宽度
 * @param event 拖动事件
 */
const move = (event: any) => {
  let ev = event || window.event;
  if(anchor.value){
    let disX = ev.clientX - anchor.value.offsetLeft;
    document.onmousemove = (ev) => {
      ev = ev || event;
      if (anchor) {
        width.value = ev.clientX - disX + anchor.value.offsetWidth;
        setImageWidth(width.value)
      }
    }
  }
  document.onmouseup = () => {
    document.onmousemove = document.onmouseup = null;
  }
}
const setImageWidth = (width: number) => {
  editor.chain().focus().setImageWidth(width + 'px').run();
}
</script>

<style scoped lang="less">
@import "../../../assets/style/var.less";
.image-edit {
  position: absolute;
  border: 1px solid @primary-color;
  border-radius: 2px;
  z-index: 9999;

  .right {
    position: absolute;
    display: inline-block;
    box-sizing: border-box;
    width: 5px;
    height: 20px;
    right: -3px;
    bottom: calc(50% - 10px);
    border: 1px solid @primary-color;
    background-color: @primary-color;
    cursor: move;
    resize: vertical;
  }
}
</style>