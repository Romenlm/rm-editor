

<template>
  <Dropdown>
    <div class="menu-button">
      <div class="color-left">
        <i v-if="icon" :class="[icon]"/>
        <span v-if="showValue">{{activeValue}}</span>
      </div>
      <div class="color-arrow">
        <img src="../../../assets/images/arrow.png" alt="下拉">
      </div>
    </div>
    <template #popper>
      <ol class="menu-options-list" :style="{width:width+'px'}">
        <template  v-for="(item,index) of options" :key="'menu_option_'+item?.value+index">
          <p v-if="item?.value==='title'" :key="'menu_option_'+item?.value+index" class="list-title">
            {{ item.name }}
          </p>
          <li v-else :class="{'is-active':active===item?.value}" @click="selectItem(item)" v-close-popper>
            <i v-if="item?.icon" :class="[item?.icon]"/>
            <span>{{ item?.name }}</span>
          </li>
        </template>

      </ol>
    </template>
  </Dropdown>
</template>
<script setup lang="ts">
import { Dropdown,vClosePopper } from 'floating-vue'
import {defineProps, defineEmits, ref,watch} from 'vue'
const emit = defineEmits(['change'],)
interface MenuOption {
  value: string;
  name: string;
  icon?: string;
  showValue?: boolean;
}
const { icon, options, width, active,showValue } = defineProps<{
  icon: string;
  options: MenuOption[];
  width: number;
  active: string;
  showValue?: boolean;
}>();
let activeValue = ref(active)
watch(()=>active,(value)=>{
  activeValue.value = value
})
const selectItem = (item:MenuOption)=>{
  activeValue.value = item.value
  emit('change',item)
}
</script>

<style scoped lang="less">
.menu-button{
  width: 36px;
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
    img{
      display: inline-block;
      height: 16px;
      width: 16px;

    }
  }
  .color-arrow{
    width: 14px;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    img{
      height: 10px;
      width: 10px;
    }
  }
}
.menu-options-list{
  padding: 0;

  li{
    list-style: none;
    height: 30px;
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0 10px;
    color: #3D4757;
    span{
      margin-left: 10px;
    }
    &:hover{
      background-color: #F1F1F3;
      cursor: pointer;
    }
    &.is-active{
      background-color: #F1F1F3;
    }
  }
  .list-title{
    padding: 0 10px 4px;
    margin: 10px 0 4px;
    border-bottom: 1px solid #ccc;
  }
}
</style>