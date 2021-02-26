(self.webpackChunkmake_zero=self.webpackChunkmake_zero||[]).push([[681],{5003:(t,e)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(){this.storage=chrome.storage.sync}return t.getInstance=function(){return t.instance||(t.instance=new t),t.instance},t.prototype.getAsync=function(t,e){this.storage.get((function(r){var n=r[t];e&&e(n)}))},t.prototype.setAsync=function(t,e,r){var n={};n[t]=e,this.storage.set(n,(function(){return r&&r(t,e)}))},t}();e.default=r.getInstance()},1529:(t,e,r)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(5003),o=function(){function t(){this.config={password:"123456",autoFill:!1,autoDecrypt:!1,cipherVersion:1},this.init()}return t.prototype.initialize=function(){this.changePassword("123456")},t.prototype.changePassword=function(t){this.config.password=t,this.update()},t.prototype.getPassword=function(t){return this.init((function(e){return t&&t(e.password)})),this.config.password},t.prototype.changeAutoFill=function(t){this.config.autoFill=t,this.update()},t.prototype.getAutoFill=function(t){return this.init((function(e){return t&&t(!!e.autoFill)})),this.config.autoFill},t.prototype.getConfig=function(t){return this.init((function(e){return t&&t(!!e)})),this.config},t.prototype.changeAutoDecrypt=function(t){this.config.autoDecrypt=t,this.update()},t.prototype.getAutoDecrypt=function(t){return this.init((function(e){return t&&t(!!e.autoDecrypt)})),this.config.autoDecrypt},t.prototype.getCipherVersion=function(t){return this.init((function(e){return t&&t(e.cipherVersion)})),this.config.cipherVersion},t.prototype.changeCipherVersion=function(t){this.config.cipherVersion=t,this.update(),this.updateBadge()},t.prototype.init=function(e){var r=this;n.default.getAsync(t.KEY,(function(t){t&&(r.config=t),e&&e(r.config),r.updateBadge()}))},t.prototype.update=function(){n.default.setAsync(t.KEY,this.config)},t.prototype.updateBadge=function(){var t=this.config.cipherVersion;chrome&&chrome.browserAction&&chrome.browserAction.setBadgeText&&chrome.browserAction.setBadgeText({text:t?t+"":""})},t.getInstance=function(){return null==t.INSTANCE&&(t.INSTANCE=new t),t.INSTANCE},t.KEY="__CryptorConfig__",t}();e.default=o.getInstance()},6004:(t,e)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(){}return t.prototype.version=function(){return 1},t.prototype.encript=function(t,e){return this.ring(t,e)},t.prototype.decrypt=function(t,e){return this.ring(t,e)},t.prototype.ring=function(t,e){var r=this.getPasswordNumber(e);return this.toUnicodeArray(t).map((function(t){return t^r})).map((function(t){return String.fromCharCode(t)})).join("")},t.prototype.getPasswordNumber=function(t){var e=0;return this.toUnicodeArray(t).forEach((function(t){return e^=t})),e},t.prototype.toUnicodeArray=function(t){for(var e=[],r=0;r<t.length;r++)e.push(t.charCodeAt(r));return e},t}();e.default=r},3140:(t,e,r)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(655),o=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return n.__extends(e,t),e.prototype.version=function(){return 2},e.prototype.encript=function(e,r){var n=t.prototype.toUnicodeArray.call(this,e),o=t.prototype.getPasswordNumber.call(this,r),s=new i;s.calcSalt(o),o=s.getNewPn();var u=n.map((function(t){return t^o})).map((function(t){return String.fromCharCode(t)})).join("");return s.getPrefix()+u},e.prototype.decrypt=function(e,r){var n=t.prototype.getPasswordNumber.call(this,r),o=new i;return o.parseSalt(n,e),n=o.getNewPn(),t.prototype.toUnicodeArray.call(this,e.substring(1)).map((function(t){return t^n})).map((function(t){return String.fromCharCode(t)})).join("")},e}(r(6004).default);e.default=o;var i=function(){function t(){}return t.prototype.calcSalt=function(t){for(this.pn=t,this.calcMask();!this.isValid();)this.circle(t)},t.prototype.parseSalt=function(e,r){this.pn=e,this.calcMask(),this.salt=(r.charCodeAt(0)-t.ZERO_BASE)*(this.mask+1)/t.ZH_LENGTH},t.prototype.isValid=function(){return!!this.getNewPn()},t.prototype.circle=function(t){this.salt=(new Date).getTime()&this.mask},t.prototype.calcMask=function(){for(var e,r=0;r<t.MASK_SEGMENT.length;r++)if(e=t.MASK_SEGMENT[r],this.pn<e){this.mask=e;break}this.mask=e},t.prototype.getNewPn=function(){return this.pn+this.salt},t.prototype.getPrefix=function(){return String.fromCharCode(this.salt*t.ZH_LENGTH/(this.mask+1)+t.ZERO_BASE)},t.ZERO_BASE=19968,t.MASK_SEGMENT=[7,15,31,63,127,255],t.ZH_LENGTH=1024,t}()},5589:(t,e,r)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(1529),o=r(6004),i=r(3140),s=function(){function t(){this.cryptorMap=new Map,this.register(new o.default),this.latest=this.register(new i.default)}return t.prototype.register=function(t){return this.cryptorMap.set(t.version(),t),t},t.prototype.version=function(){return this.latest.version()},t.prototype.encrypt=function(t){var e=n.default.getCipherVersion(),r=e&&this.cryptorMap.get(e)||this.latest;return this.prefix(r)+r.encript(t,n.default.getPassword())},t.prototype.decrypt=function(t){var e=this.getCryptor(t);return null===e?t:e.decrypt(t.substring(3),n.default.getPassword())},t.prototype.prefix=function(t){var e=t.version();return e<10?"z0"+e:"z"+e},t.prototype.support=function(t){return null!==this.getCryptor(t)},t.prototype.getCryptor=function(t){if((t=this.preprocess(t)).length<3||!t.startsWith("z"))return null;var e=t.substring(1,3);try{var r=Number.parseInt(e);return this.cryptorMap.get(r)||null}catch(t){return null}},t.prototype.preprocess=function(t){if(void 0===t)return"";for(;t.length&&t.startsWith("\t")||t.startsWith("\n")||t.startsWith("\r")||t.startsWith(" ");)t=t.substring(1);return t},t}();e.default=new s},7702:(t,e)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(){}return t.prototype.mark=function(e){e.setAttribute(t.ATTR_NAME,"1")},t.prototype.hasMarked=function(e){return e.hasAttribute(t.ATTR_NAME)},t.ATTR_NAME="make-zero-db-click",t}();e.default=r},5945:(t,e,r)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(655),o=r(5589),i=r(9164),s=r(9755),u=r(7702),a=r(5215),c=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return n.__extends(e,t),e.prototype.support=function(t){return!0},e.prototype.handle=function(){var t=this;this.floatAlert=new i.default(s("body")),e.ELE_TYPES_2_LISTEN.forEach((function(e){return t.addListener(s(e))})),this.registerObserver()},e.prototype.addListener=function(e){var r=this,n=this;e.filter((function(e,n){var i=n.hasAttribute(a.CIPHER_ATTR_NAME)||o.default.support(n.innerText);return i&&!t.prototype.hasMarked.call(r,n)&&t.prototype.mark.call(r,n),i})).on("mouseover",(function(t){return n.mouseover(t.currentTarget,t.pageX,t.pageY)})).on("mouseout",(function(){return n.floatAlert.hide()}))},e.prototype.registerObserver=function(){var t=this,e=new MutationObserver((function(e,r){e.forEach((function(e){e.addedNodes.forEach((function(e){var r=e.parentElement;if("#text"===e.nodeName&&r&&!r.getAttribute("contenteditable")){var n=e.textContent;o.default.support(n)&&(r.onmouseover=function(e){return t.mouseover(r,e.pageX,e.pageY)},r.onmouseout=function(){return t.floatAlert.hide()})}}))}))})),r=document.body;e.observe(r,{childList:!0,subtree:!0})},e.prototype.mouseover=function(t,e,r){var n=this,i=t.innerText;o.default.support(i)&&(this.floatAlert.show(r,e),t.ondblclick=function(){var e=t.innerText;if(o.default.support(e)){var r=o.default.decrypt(e);t.innerHTML=r,n.floatAlert.hide()}})},e.ELE_TYPES_2_LISTEN=["span","p","pre"],e}(u.default);e.default=c},9164:(t,e,r)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(9755),o="make-zero-float-",i=function(){function t(t){this.parent=t,this.initAlert()}return t.prototype.show=function(t,e){this.target.css({top:t,left:e}),this.target.show()},t.prototype.hide=function(){this.target&&this.target.hide&&this.target.hide()},t.prototype.initAlert=function(){var t=o+"alert-container-"+this.roundId(),e=n('<div id="'+t+'"></div>');this.initIcon(),e.append(this.icon),e.append(this.createAlertText()),e.css({position:"absolute",margin:"5px",borderRadius:"10px",backgroundColor:"#fff",width:"46px",height:"46px",verticalAlign:"middle",boxShadow:"5px 5px 5px #aaa",padding:"10px"}),this.target=e,this.parent.append(this.target),this.target.hide()},t.prototype.createAlertText=function(){var t=n('<p id="'+o+"alert-"+this.roundId()+'">'+chrome.i18n.getMessage("button_dbclick")+"</p>");return t.css({fontFamily:"Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif",margin:"0 auto",lineHeight:"12px",fontSize:"12px",textAlign:"center"}),t},t.prototype.initIcon=function(){var t=o+"icon-container-"+this.roundId(),e=n("<p id="+t+'><svg t="1609157731767" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5299" width="26" height="26"><path d="M455.68 404.032l91.264 529.152c0 0 67.456-69.44 123.136-117.888l122.432 163.904c4.928 6.656 15.68 7.104 23.872 1.088l52.288-38.208c8.256-6.016 10.944-16.32 5.952-22.976l-119.104-159.424c62.208-25.088 164.672-53.632 164.672-53.632L455.68 404.032zM308.352 648.384l-135.872 99.328c-20.544 15.04-24.256 43.968-8 65.408 16.256 21.376 46.272 27.008 66.752 12.032l135.872-99.328c20.992-15.36 24.512-45.504 8.256-66.88C359.168 637.504 329.344 633.024 308.352 648.384zM949.696 238.976c-16.256-21.376-45.632-26.176-67.072-10.496l-134.912 98.688c-21.44 15.68-25.152 44.672-8.896 66.048 16.256 21.376 46.272 27.008 67.712 11.328l134.912-98.688C962.88 290.176 965.952 260.352 949.696 238.976zM319.296 136.832c-15.936-20.928-45.248-25.728-66.752-10.048-20.096 14.72-24.256 43.968-8.32 64.896l105.536 138.816c15.936 20.992 45.696 25.408 65.792 10.688 21.44-15.68 25.216-44.608 9.28-65.6L319.296 136.832zM585.792 301.76c26.176 4.224 50.24-13.376 53.632-39.232l21.184-167.808c3.392-25.792-14.976-49.984-41.536-54.656-26.176-4.224-50.24 13.376-53.632 39.168l-21.248 167.872C540.928 272.96 559.296 297.088 585.792 301.76zM329.728 489.024c2.56-25.92-15.808-50.048-41.536-54.656l-170.048-27.968c-27.072-3.584-50.688 13.696-53.632 39.232-3.904 26.944 14.464 51.072 41.536 54.656l170.048 27.968C301.824 532.736 325.504 515.456 329.728 489.024z" p-id="5300"></path></svg></p>');e.css({padding:"0px",marginBlockStart:0,marginBlockEnd:0,textAlign:"center"}),this.icon=e},t.prototype.roundId=function(){return Math.round(1e5*Math.random()+1)},t}();e.default=i},5215:(t,e,r)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.PLAIN_ATTR_NAME=e.CIPHER_ATTR_NAME=void 0;var n=r(5945),o=r(4911);e.CIPHER_ATTR_NAME="make-zero-ciphertext",e.PLAIN_ATTR_NAME="make-zero-plaintext";var i=function(){function t(){this.composites=[],this.composites.push(new o.default),this.composites.push(new n.default)}return t.prototype.support=function(t,e){return this.host=t,"wx2.qq.com"!==t},t.prototype.handle=function(){for(var t=0,e=this.composites;t<e.length;t++){var r=e[t];if(r.support(this.host))return void r.handle()}},t}();e.default=i},4911:(t,e,r)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(655),o=r(9755),i=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return n.__extends(e,t),e.prototype.support=function(t){return"weibo.com"===t},e.prototype.handle=function(){o(".WB_text").each((function(t,e){for(var r=e.children,n=0;n<r.length;n++){var o=r[n];"A"===o.tagName&&"WB_text_opt"===o.className&&console.log(o.innerHTML)}}))},e}(r(7702).default);e.default=i}}]);