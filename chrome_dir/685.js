(self.webpackChunkmake_zero=self.webpackChunkmake_zero||[]).push([[685],{6685:(t,e,n)=>{"use strict";n.r(e),n.d(e,{default:()=>u});var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"guide-container"},[n("h2",[t._v(t._s(t.$t("guide.autoEncryption.title")))]),t._v(" "),n("el-alert",{attrs:{type:t.on?"success":"warning"}},[t._v("\n    "+t._s(t.$t("guide.autoDecryption."+(t.on?"alertIfOn":"alertIfOff")))+"\n  ")]),t._v(" "),n("p",t._b({staticStyle:{"text-indent":"2em"}},"p",t._d({},[t.ciphertextAttrName,!0])),[t._v("\n    "+t._s(t.foo)+"\n  ")])],1)};o._withStripped=!0;var i=n(5589),r=n(5215),s=n(1529);const a={name:"Auto-decryption",data:()=>({on:!1,foo:""}),computed:{ciphertextAttrName(){return this.on?r.PLAIN_ATTR_NAME:r.CIPHER_ATTR_NAME}},created(){this.foo=this.$t("guide.welcome"),s.default.getAutoDecrypt((t=>{this.on=t,this.on||(this.foo=i.default.encrypt(this.foo))}))}};var c=(0,n(1900).Z)(a,o,[],!1,null,null,null);c.options.__file="src/view/guide/components/AutoDecryption.vue";const u=c.exports}}]);