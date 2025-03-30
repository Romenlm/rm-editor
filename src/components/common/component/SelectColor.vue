<template>
  <div class="color-select">
    <div class="color-left" @click="setFontColor">
      <i :class="[icon]" />
      <span class="color-value" :style="{backgroundColor:color}"/>
    </div>
    <div class="color-arrow" @click="setColor">
        <span>
          <img src="../../../assets/images/arrow.png" alt="下拉">
        </span>
      <input
          ref="colorValue"
          style="height: 0;width: 0;border-width: 0;padding: 0"
          type="color"
          @input="setColorValue"
          :value="color"
      >
    </div>
  </div>
</template>
<script setup lang="ts">
import {ref,defineEmits,defineProps} from 'vue'
const {icon,defaultColor} = defineProps({
  icon: {
    type: String,
    default: ''
  },
  defaultColor: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['change'])
let colorValue = ref(null)
let color = ref(defaultColor)
// 设置颜色
const setColor = ()=>{
  colorValue.value.click()
}
// 设置颜色值
const setColorValue = ($event:any)=>{
  color.value = $event.target.value
  emit('change',color.value )
}
// 设置字体颜色
const setFontColor = ()=>{
  emit('change',color.value)
}
</script>

<style scoped lang="less">
.color-select{
  //width: 36px;
  height: 26px;
  margin: 0 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  .color-left{
    width: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    i{
      display: inline-block;
      height: 12px;
      width: 12px;
    }
    .color-value{
      margin-top: 2px;
      height: 5px;
      width: 16px;
      border: 1px solid #ccc;
      box-sizing: border-box;
    }
  }
  .color-arrow{
    width: 16px;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    span{
      height: 100%;
      display: flex;
      align-items: center;
    }
    input{
      border-width: 0;
      height: 0;
      width: 0;
    }
    img{
      height: 10px;
      width: 10px;
    }
  }
}
</style>