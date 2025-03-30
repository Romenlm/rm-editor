<template>
  <div class="rm-dialog" v-if="modelValue">
    <div class="rm-dialog-content" :style="{width: width+'px'}">
      <div class="rm-dialog-header" :style="{width: width+'px'}">
        <span class="rm-dialog-title">{{title}}</span>
        <span class="rm-dialog-close" @click="close">
          x
        </span>
      </div>
      <div>
        <slot/>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps,defineEmits } from 'vue'
const emit = defineEmits(['update:modelValue'])
const {modelValue,width,title  } = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  width: {
    type: Number,
    default: 500
  }
})

const close = ()=>{
  emit('update:modelValue',false)
}

</script>

<style scoped lang="less">
@import "../../../assets/style/var.less";
.rm-dialog{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.2);
  z-index: 9999;
  .rm-dialog-content{
    min-height: 100px;
    background-color: #fff;
    margin: 200px auto;
    border-radius: 4px;
    overflow: hidden;

    .rm-dialog-header{
      height: 50px;
      border-bottom: 1px solid @border-color;
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
      box-sizing: border-box;
      .rm-dialog-title{
        font-size: 18px;
        font-weight: bold;
        width: 0;
        flex-grow: 1;
      }
      .rm-dialog-close{
        display: flex;
        height: 24px;
        width: 24px;
        justify-content: center;
        align-items: center;
        font-size: 22px;
        color: #999;
        &:hover{
          cursor: pointer;
          background-color: rgba(0,0,0,0.04);
        }
      }
    }
  }
}
</style>