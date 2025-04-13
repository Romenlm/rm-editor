<template>
  <node-view-wrapper class="code-block">
    <select contenteditable="false" v-model="selectedLanguage">
      <option :value="null">
        auto
      </option>
      <option disabled>
        —
      </option>
      <option v-for="(language, index) in languages" :value="language" :key="index">
        {{ language }}
      </option>
    </select>
    <pre><code><node-view-content /></code></pre>
  </node-view-wrapper>
</template>

<script setup lang="ts">
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import { ref, computed } from 'vue'

// 定义 props
const props = defineProps(nodeViewProps)

// 定义响应式数据
const languages = ref(props.extension.options.lowlight.listLanguages())

// 定义计算属性
const selectedLanguage = computed({
  get() {
    return props.node.attrs.language
  },
  set(language) {
    props.updateAttributes({ language })
  },
})
</script>

<style scoped lang="less">
.tiptap {
  .code-block {
    position: relative;

    select {
      outline: none;
      position: absolute;
      background-color: #fff;
      right: 0.5rem;
      top: 0.5rem;
      border-radius: 4px;
    }

    select::-webkit-scrollbar {
      width: 8px;
      /* 滚动条宽度 */
    }

    select::-webkit-scrollbar-track {
      background: #f1f1f1;
      /* 滚动条轨道背景 */
      border-radius: 4px;
    }

    select::-webkit-scrollbar-thumb {
      background: #ccc;
      /* 滚动条滑块颜色 */
      border-radius: 4px;
    }

    select::-webkit-scrollbar-thumb:hover {
      background: #ccc;
      /* 滚动条滑块悬停颜色 */
    }
  }
}</style>
