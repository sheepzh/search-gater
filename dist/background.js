/*! For license information please see background.js.LICENSE.txt */
(()=>{"use strict";var t={136:(t,e,n)=>{var r=n(834);(new(function(){function t(){}return t.prototype.onTabUpdate=function(){chrome.tabs.onUpdated.addListener((function(t,e,n){r.EngineComposite.forEach((function(r){return r.handleTabUpdate(t,n.url,e.status,e,n)}))}))},t}())).onTabUpdate()},3:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(){this.storage=chrome.storage.sync}return t.getInstance=function(){return t.instance||(t.instance=new t),t.instance},t.prototype.getAsync=function(t,e){this.storage.get((function(n){var r=n[t];e&&e(r)}))},t.prototype.setAsync=function(t,e,n){var r={};r[t]=e,this.storage.set(r,(function(){return n&&n(t,e)}))},t}();e.default=n.getInstance()},266:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(){}return t.prototype.keywordChanged=function(t){return t!==this.lastHandledKeyword&&(this.lastHandledKeyword=void 0,!0)},t.prototype.tail=function(t){var e=decodeURI(t);e=this.transferParamToWords(e),this.keywordChanged(e)&&(this.lastHandledKeyword=e,$(this.inputSelector).val(e),document.title=e)},t}();e.default=n},834:(t,e,n)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.EngineComposite=e.UrlChanged=void 0;var r=n(487),o=n(618),i=n(208),a=n(47),u=n(22),c=function(){function t(){this.msgTag="ENGINE_FILTER"}return t.prototype.handleTabUpdate=function(t,e,n){if(o.default.on(this.key)&&this.isEngine(e))if("loading"===n){var a=r.default.allWords();if(!a||!a.length)return;var u=this.changeUrl(e,a),c=u.newUrl,f=u.needRedirect,s=u.originParam;f&&chrome.tabs.query({currentWindow:!0,active:!0},(function(e){!i.default.storeWords(t,s)&&chrome.tabs.update(t,{url:c},(function(){}))}))}else if("complete"===n){var l=i.default.get(t);l&&(i.default.delete(t),chrome.tabs.sendMessage(t,{tag:this.msgTag,data:l},(function(t){return console.log(t)})))}},t.prototype.isEngine=function(t){return t.indexOf("https://"+this.prefix)>-1||t.indexOf("http://"+this.prefix)>-1},t.prototype.handleMessage=function(t,e,n){var r=decodeURI(t);this.tailer.tail(r),n("the engine["+this.key+"] seen")},t.prototype.runAtStart=function(){},t.prototype.runAtEnd=function(){},t.prototype.switch=function(t){o.default.set(this.key,t)},t}();e.default=c;e.UrlChanged=function(){},e.EngineComposite=[u.default,a.default]},487:(t,e,n)=>{Object.defineProperty(e,"__esModule",{value:!0});var r=n(3),o=function(){function t(){var e=this;this.words=[],r.default.getAsync(t.KEY,(function(t){return e.words=t||["csdn"]}))}return t.getInstance=function(){return t.INSTANCE||(t.INSTANCE=new t),t.INSTANCE},t.prototype.allWords=function(){return this.words},t.prototype.remove=function(t){var e=this.words.indexOf(t);-1!==e&&this.words.splice(e,1)},t.prototype.add=function(e){-1===this.words.indexOf(e)&&this.words.push(e),r.default.setAsync(t.KEY,this.words)},t.KEY="__bad_words__",t}();e.default=o.getInstance()},22:(t,e,n)=>{Object.defineProperty(e,"__esModule",{value:!0});var r=n(655),o=n(834),i=n(266),a=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.key="baidu",e.name="百度",e.prefix="www.baidu.com/s?",e.tailer=new u,e.keywordParam="wd",e}return r.__extends(e,t),e.prototype.changeUrl=function(t,e){var n=this,r=!1,o="";return{newUrl:t.split("&").map((function(t){var i=t.split("="),a=i[0],u=i[1];if(a===n.keywordParam){r=!1,o=u;var c=u.split("%20")||[];e.map((function(t){return"-"+t})).map((function(t){return encodeURI(t)})).filter((function(t){return-1===c.indexOf(t)})).forEach((function(t){r=!0,c.push(t)})),u=c.join("%20")}return a+"="+u})).reduce((function(t,e){return t+"&"+e})),needRedirect:r,originParam:o}},e.getInstance=function(){return e.INSTANCE||(e.INSTANCE=new e),e.INSTANCE},e}(o.default),u=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r.__extends(e,t),e.prototype.transferParamToWords=function(t){return t},e}(i.default);e.default=a.getInstance()},47:(t,e,n)=>{Object.defineProperty(e,"__esModule",{value:!0});var r=n(655),o=n(834),i=n(266),a=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.key="google",e.name="Google",e.prefix="www.google.com/search?",e.tailer=new u,e.keywordParam="q",e}return r.__extends(e,t),e.prototype.changeUrl=function(t,e){var n=this,r=!1,o="";return{newUrl:t.split("&").map((function(t){var i=t.split("="),a=i[0],u=i[1];if(a===n.keywordParam){r=!1,o=u;var c=u.split("+")||[];e.map((function(t){return"-"+t})).map((function(t){return encodeURI(t)})).filter((function(t){return-1===c.indexOf(t)})).forEach((function(t){r=!0,c.push(t)})),u=c.join("+")}return a+"="+u})).reduce((function(t,e){return t+"&"+e})),needRedirect:r,originParam:o}},e.getInstance=function(){return e.INSTANCE||(e.INSTANCE=new e),e.INSTANCE},e}(o.default),u=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r.__extends(e,t),e.prototype.transferParamToWords=function(t){return t.replace("+"," ")},e}(i.default);e.default=a.getInstance()},618:(t,e,n)=>{Object.defineProperty(e,"__esModule",{value:!0});var r=n(3),o=function(){function t(){var e=this;r.default.getAsync(t.KEY,(function(t){return e.switchDict=t}))}return t.getInstance=function(){return t.instance||(t.instance=new t),t.instance},t.prototype.set=function(t,e){this.switchDict[t]=e,this.save()},t.prototype.on=function(t){return this.switchDict[t]},t.prototype.save=function(){r.default.setAsync(t.KEY,this.switchDict)},t.KEY="__engine_switch__",t}();e.default=o.getInstance()},208:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(){this.dict={},this.dict={}}return t.getInstance=function(){return t.INSTANCE||(t.INSTANCE=new t),t.INSTANCE},t.prototype.storeWords=function(t,e){return this.dict[t]===e||(this.dict[t]=e,!1)},t.prototype.get=function(t){return this.dict[t]},t.prototype.delete=function(t){delete this.dict[t]},t}();e.default=n.getInstance()},655:(t,e,n)=>{n.r(e),n.d(e,{__extends:()=>o,__assign:()=>i,__rest:()=>a,__decorate:()=>u,__param:()=>c,__metadata:()=>f,__awaiter:()=>s,__generator:()=>l,__createBinding:()=>d,__exportStar:()=>p,__values:()=>y,__read:()=>h,__spread:()=>v,__spreadArrays:()=>_,__await:()=>w,__asyncGenerator:()=>g,__asyncDelegator:()=>b,__asyncValues:()=>m,__makeTemplateObject:()=>O,__importStar:()=>P,__importDefault:()=>S,__classPrivateFieldGet:()=>I,__classPrivateFieldSet:()=>E});var r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)};function o(t,e){function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}var i=function(){return(i=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t}).apply(this,arguments)};function a(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(t);o<r.length;o++)e.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(t,r[o])&&(n[r[o]]=t[r[o]])}return n}function u(t,e,n,r){var o,i=arguments.length,a=i<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,n,r);else for(var u=t.length-1;u>=0;u--)(o=t[u])&&(a=(i<3?o(a):i>3?o(e,n,a):o(e,n))||a);return i>3&&a&&Object.defineProperty(e,n,a),a}function c(t,e){return function(n,r){e(n,r,t)}}function f(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)}function s(t,e,n,r){return new(n||(n=Promise))((function(o,i){function a(t){try{c(r.next(t))}catch(t){i(t)}}function u(t){try{c(r.throw(t))}catch(t){i(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(a,u)}c((r=r.apply(t,e||[])).next())}))}function l(t,e){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function u(i){return function(u){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!((o=(o=a.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=e.call(t,a)}catch(t){i=[6,t],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,u])}}}function d(t,e,n,r){void 0===r&&(r=n),t[r]=e[n]}function p(t,e){for(var n in t)"default"===n||e.hasOwnProperty(n)||(e[n]=t[n])}function y(t){var e="function"==typeof Symbol&&Symbol.iterator,n=e&&t[e],r=0;if(n)return n.call(t);if(t&&"number"==typeof t.length)return{next:function(){return t&&r>=t.length&&(t=void 0),{value:t&&t[r++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function h(t,e){var n="function"==typeof Symbol&&t[Symbol.iterator];if(!n)return t;var r,o,i=n.call(t),a=[];try{for(;(void 0===e||e-- >0)&&!(r=i.next()).done;)a.push(r.value)}catch(t){o={error:t}}finally{try{r&&!r.done&&(n=i.return)&&n.call(i)}finally{if(o)throw o.error}}return a}function v(){for(var t=[],e=0;e<arguments.length;e++)t=t.concat(h(arguments[e]));return t}function _(){for(var t=0,e=0,n=arguments.length;e<n;e++)t+=arguments[e].length;var r=Array(t),o=0;for(e=0;e<n;e++)for(var i=arguments[e],a=0,u=i.length;a<u;a++,o++)r[o]=i[a];return r}function w(t){return this instanceof w?(this.v=t,this):new w(t)}function g(t,e,n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var r,o=n.apply(t,e||[]),i=[];return r={},a("next"),a("throw"),a("return"),r[Symbol.asyncIterator]=function(){return this},r;function a(t){o[t]&&(r[t]=function(e){return new Promise((function(n,r){i.push([t,e,n,r])>1||u(t,e)}))})}function u(t,e){try{(n=o[t](e)).value instanceof w?Promise.resolve(n.value.v).then(c,f):s(i[0][2],n)}catch(t){s(i[0][3],t)}var n}function c(t){u("next",t)}function f(t){u("throw",t)}function s(t,e){t(e),i.shift(),i.length&&u(i[0][0],i[0][1])}}function b(t){var e,n;return e={},r("next"),r("throw",(function(t){throw t})),r("return"),e[Symbol.iterator]=function(){return this},e;function r(r,o){e[r]=t[r]?function(e){return(n=!n)?{value:w(t[r](e)),done:"return"===r}:o?o(e):e}:o}}function m(t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var e,n=t[Symbol.asyncIterator];return n?n.call(t):(t=y(t),e={},r("next"),r("throw"),r("return"),e[Symbol.asyncIterator]=function(){return this},e);function r(n){e[n]=t[n]&&function(e){return new Promise((function(r,o){!function(t,e,n,r){Promise.resolve(r).then((function(e){t({value:e,done:n})}),e)}(r,o,(e=t[n](e)).done,e.value)}))}}}function O(t,e){return Object.defineProperty?Object.defineProperty(t,"raw",{value:e}):t.raw=e,t}function P(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}function S(t){return t&&t.__esModule?t:{default:t}}function I(t,e){if(!e.has(t))throw new TypeError("attempted to get private field on non-instance");return e.get(t)}function E(t,e,n){if(!e.has(t))throw new TypeError("attempted to set private field on non-instance");return e.set(t,n),n}}},e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={exports:{}};return t[r](o,o.exports,n),o.exports}n.d=(t,e)=>{for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),n.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n(136)})();