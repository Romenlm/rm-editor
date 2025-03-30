

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
        <SetFontColor v-if="item.type==='fontColor'" :editor="editor"/>
        <SetHighlight v-if="item.type==='highlight'" :editor="editor"/>
        <TextAlign v-if="item.type==='align'" :editor="editor" :name="item.name"/>
        <InstallTable v-if="item.type==='table'" :editor="editor" :name="item.name"/>
        <InstallImage v-if="item.type==='image'" :editor="editor" :name="item.name"/>
        <InstallLink v-if="item.type==='link'" :editor="editor" :name="item.name"/>
        <span v-if="item.type==='line'" class="rm-liner"/>
      </template>

    </div>
    <div class="toolbar-right">
      <RmButton @click="showAnchor" :name="'目录'">
        <i class="icon-anchor"/>
      </RmButton>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineEmits,reactive,defineProps } from "vue";
import {toolbar} from "../../assets/common/config.ts";
import RmButton from "./component/RmButton.vue";
import SetFontColor from "./component/SetFontColor.vue";
import SetHighlight from "./component/SetHighlight.vue";
import TextAlign from "./component/TextAlign.vue";
import InstallTable from "./component/InstallTable.vue";
import InstallImage from "./component/InstallImage.vue";
import InstallLink from "./component/InstallLink.vue";
let emit = defineEmits<{
  (e: 'showAnchor'): void,
  (e: 'setLink',key:string): void,
}>()

const {editor} = defineProps({
  editor: {
    type: Object,
    required: true
  }
})

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
  }else {
    let params = item.fun === 'setTextAlign' ? item.key : ''
    editor.chain().focus()[item.fun](params).run()
  }
}
const showAnchor = () => {
  console.log('showAnchor')
  emit('showAnchor')
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
  }
  .rm-liner{
    width: 1px;
    height: 22px;
    background: @border-color;
    margin: 0 5px;
  }
}
</style>