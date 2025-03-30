<script setup lang="ts">
import RmEditor from './components/Index.vue'
import {ref} from "vue";
let ss = `<p><strong>地方都是</strong>对方的<em>地方地方</em></p><p><span style="text-decoration: underline;">发射点犯得上</span></p><h2 label="一级标题" class="first-title" style=""><span style="">房贷首付</span></h2><h3 label="二级标题" class="second-title" style=""><span style="">fdsds<br/></span></h3><h4 label="三级标题" class="third-title" style="">fhhhjhfgjgfdg<br/></h4><h5 label="四级标题" class="fourth-title">gdfhhfdhgdfg<br/></h5><h6 label="五级标题" class="fifth-title">fdshgdfhdfhf<br/></h6><p><img src="https://cdn-vip.kingdee.com/statics/emotion/define/1.gif" width="20" height="20" class="emoji" title="微笑" alt="微笑"/></p><ol class=" list-paddingleft-2" style="list-style-type: decimal;"><li><p>fsdfsdfshgdfgfd</p></li><li><p>ffsdgdsfdsdf</p></li><li><p>hgfdhfd</p></li></ol><ul class=" list-paddingleft-2" style="list-style-type: disc;"><li><p>fdsfdfdf</p></li><li><p>gdsgdfg</p></li><li><p>gdfgfdg</p></li><li><p>gfdgfdghgfh</p></li></ul><p>fdhjuythgfjrtgfdhd<span style="background-color: rgb(84, 141, 212);">fged刚</span>好今天<span style="color: rgb(149, 55, 52);">于同日</span><br/></p><p style="text-align: center;">房贷首付</p><p style="text-align: right;">发士大夫士大夫</p><p style="text-align: justify;">发射点犯得上</p><a href="http://test.com" target="_blank">发生发射点</a>fdsfsdutry<p><table width="100%"><tbody><tr class="firstRow ueditor-new-first-row"><th class="first-row-th align-center" valign="top" width="113">傅范德萨</th><th class="first-row-th align-center" valign="top" width="113">标题个</th><th class="first-row-th align-center" valign="top" width="113">德国法</th><th class="first-row-th align-center" valign="top" width="113"><br/></th><th class="first-row-th align-center" valign="top" width="113"><br/></th><th class="first-row-th align-center" valign="top" width="113"><br/></th></tr><tr><td valign="top" width="113"><br/></td><td valign="top" width="113"><br/></td><td valign="top" width="113">发士大夫</td><td valign="top" width="113"><br/></td><td valign="top" width="113"><br/></td><td valign="top" width="113"><br/></td></tr><tr><td valign="top" width="113"><br/></td><td valign="top" width="113"><br/></td><td valign="top" width="113"><br/></td><td valign="top" width="113"><br/></td><td valign="top" width="113"><br/></td><td valign="top" width="113"><br/></td></tr></tbody></table></p><br/><p><br/><hr/><a href="http://baidu.comhttp://baidu.com" target="_blank" class="link-special-style"><img src="https://cdn-vip.kingdee.com/statics/webfront/icon/ic_default.svg"/>fdsfh换个房间</a><br/></p><p>发士大夫士大夫</p><p>房贷首付</p><div class=" kingdee-piece-quote kingdee-piece-quote-color-FADBDF"><p>hgfjgfjhjj<br/></p></div><div class="kingdee-piece-quote kingdee-piece-quote-color-F2F2F2"><p>fdsfsdfsffdsfds</p></div><pre class="ueditor-code-area brush:java;toolbar:false" style="">&lt;div&gt;hello&lt;/div&gt;</pre><div id="ag-1741332597880"></div>`
let str = ref(ss)
</script>

<template>
  <h2 class="header-title">rm-editor</h2>
  <div class="content">
    <RmEditor v-model="str"/>
  </div>

</template>

<style>
body{
  background-color: rgba(0,0,0,0.02);
}
.header-title{
  height: 60px;
  text-align: center;
}
.content{
  width: 80%;
  margin: 0 auto;
}
</style>
