

<template>
  <div class="toolbar">
    <div class="toolbar-left">
      <template v-for="item of list" :key="'toolbar_'+item.key">
        <RmButton
            v-if="item.type === 'button'"
            :name="item.name"
            :active="item.showActive && editor.isActive(item.key)"
            :disabled="setDisabled(item.key)"
            @click="setSelect(item)"
        >
          <i :class="item.icon"/>
        </RmButton>
        <SetFontColor v-if="item.type==='fontColor'" :editor="editor" :title="item.name"/>
        <SetHighlight v-if="item.type==='highlight'" :editor="editor" :title="item.name"/>
        <TextAlign v-if="item.type==='align'" :editor="editor" :name="item.name" :t="t"/>
        <InstallTable v-if="item.type==='table'" :editor="editor" :title="item.name" :t="t" />
        <InstallImage v-if="item.type==='image'" :editor="editor" :name="item.name" @setImage="setImage"/>
<!--        <InstallLink v-if="item.type==='link'" :editor="editor" :name="item.name" :t="t"/>-->
        <span v-if="item.type==='line'" class="rm-liner"/>
      </template>

    </div>
    <div class="toolbar-right">
      <RmButton @click="setFullscreen" :name="`${isFullscreen?t('tools.unFullScreen'):t('tools.fullScreen')}`">
        <i :class="[isFullscreen?'icon-fullscreen-exit':'icon-fullscreen']"/>
      </RmButton>
      <RmButton @click="showAnchor" :name="t('tools.catalogue')">
        <i class="icon-anchor"/>
      </RmButton>
    </div>
  </div>
</template>
<script setup lang="ts">
import {defineEmits, reactive, defineProps, ref} from "vue";
import {getToolbar} from "../../assets/common/config.ts";
import RmButton from "./component/RmButton.vue";
import SetFontColor from "./component/SetFontColor.vue";
import SetHighlight from "./component/SetHighlight.vue";
import TextAlign from "./component/TextAlign.vue";
import InstallTable from "./component/InstallTable.vue";
import InstallImage from "./component/InstallImage.vue";
let emit = defineEmits<{
  (e: 'showAnchor'): void,
  (e: 'setLink',key:string): void,
  (e: 'setImage',list:any[],pos:number): void,
  (e: 'word'): void,
  (e: 'fullscreen', value: boolean): void
}>()

const {editor,t} = defineProps({
  editor: {
    type: Object,
    required: true
  },
  t:{
    type: Function,
    required: true
  }
})

let toolbar = getToolbar(t)
const list = reactive(toolbar)
const setDisabled = (key: string) => {
  if (key === 'undo' && !editor.can().undo()) {
    return true
  }
  if (key === 'redo' && !editor.can().redo()) {
    return true
  }
  if (key === 'table' && editor.isActive('table')) {
    return true
  }
}
const setSelect = (item:any) => {
  if(item.key==='link'){
    emit('setLink',item.key)
  } else if(item.key==='importWord'){
    emit('word')
  }else {
    let params = item.fun === 'setTextAlign' ? item.key : ''
    editor.chain().focus()[item.fun](params).run()
  }
}
const setImage = (list:any[])=>{
  let pos = editor.state.selection.$from.pos
  emit('setImage',list,pos)
}
const showAnchor = () => {
  emit('showAnchor')
}
// 设置全屏
let isFullscreen = ref(false)
const setFullscreen = () => {
  isFullscreen.value = !isFullscreen.value
  emit('fullscreen', isFullscreen.value)
}
</script>

<style scoped lang="less">
@import "../../assets/style/var.less";
.toolbar{
  display: flex;
  justify-content: space-between;
  padding: 5px;
  border-bottom: 1px solid @border-color;
  .toolbar-left{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  .toolbar-right{
    display: flex;
  }
  .rm-liner{
    width: 1px;
    height: 22px;
    background: @border-color;
    margin: 0 5px;
  }
}
</style>