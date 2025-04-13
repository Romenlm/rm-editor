<template>
  <button
      :class="['rm-button',{'is-disabled':disabled},{'is-active':active}]"
      type="button"
      v-tooltip="{
        content: name,
        placement: placement
      }"
  >
    <slot></slot>
  </button>
</template>
<script setup lang="ts">
import { vTooltip } from 'floating-vue'

const { name,disabled=false,active=false,placement='top' } = defineProps<{ name?: string, disabled?: boolean, active?: boolean,placement?:string }>()
</script>

<style scoped lang="less">
@import "../../../assets/style/var.less";
.rm-button{
  min-width: 26px;
  height: 26px;
  outline: none;
  border-width: 0;
  margin: 0 2px;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: @border-radius;
  &:hover {
    cursor: pointer;
    background-color: @background-color;
  }

  &.is-active {
    background-color: @background-color;
  }

  &.is-disabled {
    position: relative;
    &:after {
      content: '';
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      position: absolute;
      background-color: rgba(255, 255, 255, 0.6);
      cursor: not-allowed;
      z-index: 100;
    }
  }
}
</style>