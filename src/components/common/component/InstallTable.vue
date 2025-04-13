<template>
  <Dropdown :disabled="editor.isActive('table')">
    <RmButton :active="editor.isActive('table')" :disabled="editor.isActive('table')" :name="title">
      <i class="icon-table"></i>
    </RmButton>
    <template  #popper>
      <div class="title-text">
        <span>{{ t('table.insertTable') }}</span>
        <span v-if="activeRow>-1">{{ activeRow }} x {{ activeColumn }} </span>
      </div>
      <ol class="install-table-options-list" @mouseleave="mouseoutBox">
        <li v-for="row of rows" :key="'table_column_key_'+row" >
          <span
              v-for="column of columns"
              :key="'table_row_key'+row+'_'+column" @mouseover="mouseleaveHandler(row,column)"
              :class="{'active':column<=activeColumn && row<=activeRow}"
              @click="selectItem(row,column)" v-close-popper="true"></span>
        </li>
      </ol>
    </template>
  </Dropdown>
</template>
<script setup lang="ts">
  import { Dropdown, vClosePopper } from 'floating-vue'
  import RmButton from "./RmButton.vue";
  import {ref} from "vue";

  const {editor,title,t} = defineProps({
    editor: {
      type: Object,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    t: {
      type: Function,
      required: true
    }
  })
  let rows = ref(10)
  let columns = ref(10)
  let activeRow = ref(-1)
  let activeColumn = ref(-1)
  const mouseleaveHandler = (row:number,column:number)=>{
    activeRow.value = row
    activeColumn.value = column
  }
  const mouseoutBox = ()=>{
    activeRow.value = -1
    activeColumn.value = -1
  }
  const selectItem = (row:number,column:number) => {
    activeRow.value = -1
    activeColumn.value = -1
    editor.chain().focus().insertTable({ rows: row, cols: column, withHeaderRow: true }).run()
  }
</script>



<style scoped lang="less">
.table-install-img{
  width: 36px;
  height: 26px;
  margin: 0 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  img{
    display: inline-block;
    height: 16px;
    width: 16px;
  }
}
.title-text{
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
.install-table-options-list{
  padding: 0 10px;
  margin: 4px 0;
  li{
    list-style: none;
    display: flex;
    align-items: center;
    margin: 0;
    color: #3D4757;
    span{
      cursor: pointer;
      display: inline-block;
      height: 20px;
      width: 20px;
      border: 1px solid #ccc;
      margin: 2px;
      &.active{
        background-color: #ccc;
      }
    }
  }
}
</style>