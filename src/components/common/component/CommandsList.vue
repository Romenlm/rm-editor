<template>
  <div class="rm-dropdown-menu">
    <template v-if="items.length">
      <ol>
        <li  :class="{ 'is-selected': index === selectedIndex }"
             v-for="(item, index) in items"
             :key="index"
             @click="selectItem(index)">
          <i :class="item?.icon"></i>
          <span>{{ item?.title }}</span>
        </li>
      </ol>
      <input
          class="rm-select-image"
          ref="uploadImage"
          type="file"
          accept=".svg,.jpg,.jpeg,.png"
          :multiple="true"
          @change="selectFile"
      />
    </template>
    <div class="item" v-else>
      No result
    </div>
  </div>
</template>

<script setup lang="ts">

import {defineProps, ref,watch,defineExpose} from 'vue'

const {items,command,editor,range} = defineProps<{items:any,command:any,editor:any,range:any}>()
let selectedIndex = ref(0)
watch(() => items, () => {
  selectedIndex.value = 0
})

/**
 * 回车或者键盘上下件
 * @param event
 */
const onKeyDown = ({ event }:{event:any})=> {
  if (event.key === 'ArrowUp') {
    upHandler()
    return true
  }

  if (event.key === 'ArrowDown') {
    downHandler()
    return true
  }

  if (event.key === 'Enter') {
    enterHandler()
    return true
  }

  return false
}

const upHandler = ()=> {
  selectedIndex.value = ((selectedIndex.value + items.length) - 1) % items.length
}

const downHandler = ()=> {
  selectedIndex.value = (selectedIndex.value + 1) % items.length
}

const enterHandler = ()=> {
  selectItem(selectedIndex.value)
}

let uploadImage = ref<HTMLElement|null>(null)
let itemObj:any = null
const selectItem = (index:any)=> {
  const item = items[index]
  if (item) {
    if(item.type==='image'){
      itemObj = item
      uploadImage.value?.click()
    }else {
      command(item)
    }
  }
}
const selectFile = (event:any)=> {
  const files = event.target.files;
  let list:any[] = []
  let val:any
  for(val of files){
    list.push(val)
  }
  if (!list) return;
  itemObj?.command(editor,range, list)
}

/**
 * 暴露方法
 */
defineExpose({
  onKeyDown
})
</script>

<style lang="less">
@import "../../../assets/style/var.less";
/* Dropdown menu */
.rm-dropdown-menu {
  background: #fff;
  border: 1px solid @border-color;
  border-radius: @border-radius;
  box-shadow: @box-shadow;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  overflow: auto;
  position: relative;
  width: 180px;
  ol{
    padding: 4px 0;
    margin: 0;
    li {
      background-color: transparent;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      width: 100%;
      outline: none;
      border-width: 0;
      height: 32px;
      padding: 0 10px;
      cursor: pointer;
      span{
        margin-left: 5px;
      }

      &:hover,
      &:hover.is-selected {
        background-color: @background-color;
      }
      &.is-selected {
        background-color: @background-color;
      }
    }
  }
  .rm-select-image{
    display: none;
  }
}
</style>
