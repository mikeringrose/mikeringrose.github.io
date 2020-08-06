var __extends=this&&this.__extends||function(){var e=function(t,r){e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)if(t.hasOwnProperty(r))e[r]=t[r]};return e(t,r)};return function(t,r){e(t,r);function n(){this.constructor=t}t.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}();System.register([],(function(){"use strict";return{execute:function(){var e=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];var t=["January","February","March","April","May","June","July","August","September","October","November","December"];function r(e){return"0".concat(e).slice(-2)}function n(a,i){var o=a.getDay();var u=a.getDate();var s=a.getMonth();var c=a.getFullYear();var l=a.getHours();var h=a.getMinutes();var f=a.getSeconds();return i.replace(/%([%aAbBcdeHIlmMpPSwyYZz])/g,(function(i){var m;var d=i[1];switch(d){case"%":return"%";case"a":return e[o].slice(0,3);case"A":return e[o];case"b":return t[s].slice(0,3);case"B":return t[s];case"c":return a.toString();case"d":return r(u);case"e":return String(u);case"H":return r(l);case"I":return r(n(a,"%l"));case"l":if(l===0||l===12){return String(12)}else{return String((l+12)%12)}case"m":return r(s+1);case"M":return r(h);case"p":if(l>11){return"PM"}else{return"AM"}case"P":if(l>11){return"pm"}else{return"am"}case"S":return r(f);case"w":return String(o);case"y":return r(c%100);case"Y":return String(c);case"Z":m=a.toString().match(/\((\w+)\)$/);return m?m[1]:"";case"z":m=a.toString().match(/\w([+-]\d\d\d\d) /);return m?m[1]:""}return""}))}function a(e){var t;return function(){if(t)return t;if("Intl"in window){try{t=new Intl.DateTimeFormat(undefined,e);return t}catch(r){if(!(r instanceof RangeError)){throw r}}}}}var i=null;var o=a({day:"numeric",month:"short"});function u(){if(i!==null){return i}var e=o();if(e){var t=e.format(new Date(0));i=!!t.match(/^\d/);return i}else{return false}}var s=null;var c=a({day:"numeric",month:"short",year:"numeric"});function l(){if(s!==null){return s}var e=c();if(e){var t=e.format(new Date(0));s=!!t.match(/\d,/);return s}else{return true}}function h(e){var t=new Date;return t.getUTCFullYear()===e.getUTCFullYear()}function f(e,t){if("Intl"in window&&"RelativeTimeFormat"in window.Intl){try{return new Intl.RelativeTimeFormat(e,t)}catch(r){if(!(r instanceof RangeError)){throw r}}}}function m(e){var t=e.closest("[lang]");if(t instanceof HTMLElement&&t.lang){return t.lang}return"default"}var d=new WeakMap;var v=function(e){__extends(t,e);function t(){return e!==null&&e.apply(this,arguments)||this}Object.defineProperty(t,"observedAttributes",{get:function(){return["datetime","day","format","lang","hour","minute","month","second","title","weekday","year"]},enumerable:true,configurable:true});t.prototype.connectedCallback=function(){var e=this.getFormattedTitle();if(e&&!this.hasAttribute("title")){this.setAttribute("title",e)}var t=this.getFormattedDate();if(t){this.textContent=t}};t.prototype.attributeChangedCallback=function(e,t,r){if(e==="datetime"){var n=Date.parse(r);if(isNaN(n)){d.delete(this)}else{d.set(this,new Date(n))}}var a=this.getFormattedTitle();if(a&&!this.hasAttribute("title")){this.setAttribute("title",a)}var i=this.getFormattedDate();if(i){this.textContent=i}};Object.defineProperty(t.prototype,"date",{get:function(){return d.get(this)},enumerable:true,configurable:true});t.prototype.getFormattedTitle=function(){var e=this.date;if(!e)return;var t=g();if(t){return t.format(e)}else{try{return e.toLocaleString()}catch(r){if(r instanceof RangeError){return e.toString()}else{throw r}}}};t.prototype.getFormattedDate=function(){};return t}(HTMLElement);var g=a({day:"numeric",month:"short",year:"numeric",hour:"numeric",minute:"2-digit",timeZoneName:"short"});var y=new WeakMap;var p=function(e){__extends(t,e);function t(){return e!==null&&e.apply(this,arguments)||this}t.prototype.attributeChangedCallback=function(t,r,n){if(t==="hour"||t==="minute"||t==="second"||t==="time-zone-name"){y.delete(this)}e.prototype.attributeChangedCallback.call(this,t,r,n)};t.prototype.getFormattedDate=function(){var e=this.date;if(!e)return;var t=w(this,e)||"";var r=M(this,e)||"";return"".concat(t," ").concat(r).trim()};return t}(v);function w(e,t){var r={weekday:{short:"%a",long:"%A"},day:{numeric:"%e","2-digit":"%d"},month:{short:"%b",long:"%B"},year:{numeric:"%Y","2-digit":"%y"}};var a=u()?"weekday day month year":"weekday month day, year";for(var i in r){var o=r[i][e.getAttribute(i)];a=a.replace(i,o||"")}a=a.replace(/(\s,)|(,\s$)/,"");return n(t,a).replace(/\s+/," ").trim()}function M(e,t){var r={};var i=e.getAttribute("hour");if(i==="numeric"||i==="2-digit")r.hour=i;var o=e.getAttribute("minute");if(o==="numeric"||o==="2-digit")r.minute=o;var u=e.getAttribute("second");if(u==="numeric"||u==="2-digit")r.second=u;var s=e.getAttribute("time-zone-name");if(s==="short"||s==="long")r.timeZoneName=s;if(Object.keys(r).length===0){return}var c=y.get(e);if(!c){c=a(r);y.set(e,c)}var l=c();if(l){return l.format(t)}else{var h=r.second?"%H:%M:%S":"%H:%M";return n(t,h)}}if(!window.customElements.get("local-time")){window.LocalTimeElement=p;window.customElements.define("local-time",p)}var b=function(){function e(e,t){this.date=e;this.locale=t}e.prototype.toString=function(){var e=this.timeElapsed();if(e){return e}else{var t=this.timeAhead();if(t){return t}else{return"on ".concat(this.formatDate())}}};e.prototype.timeElapsed=function(){var e=(new Date).getTime()-this.date.getTime();var t=Math.round(e/1e3);var r=Math.round(t/60);var n=Math.round(r/60);var a=Math.round(n/24);if(e>=0&&a<30){return this.timeAgoFromMs(e)}else{return null}};e.prototype.timeAhead=function(){var e=this.date.getTime()-(new Date).getTime();var t=Math.round(e/1e3);var r=Math.round(t/60);var n=Math.round(r/60);var a=Math.round(n/24);if(e>=0&&a<30){return this.timeUntil()}else{return null}};e.prototype.timeAgo=function(){var e=(new Date).getTime()-this.date.getTime();return this.timeAgoFromMs(e)};e.prototype.timeAgoFromMs=function(e){var t=Math.round(e/1e3);var r=Math.round(t/60);var n=Math.round(r/60);var a=Math.round(n/24);var i=Math.round(a/30);var o=Math.round(i/12);if(e<0){return T(this.locale,0,"second")}else if(t<10){return T(this.locale,0,"second")}else if(t<45){return T(this.locale,-t,"second")}else if(t<90){return T(this.locale,-r,"minute")}else if(r<45){return T(this.locale,-r,"minute")}else if(r<90){return T(this.locale,-n,"hour")}else if(n<24){return T(this.locale,-n,"hour")}else if(n<36){return T(this.locale,-a,"day")}else if(a<30){return T(this.locale,-a,"day")}else if(i<12){return T(this.locale,-i,"month")}else if(i<18){return T(this.locale,-o,"year")}else{return T(this.locale,-o,"year")}};e.prototype.microTimeAgo=function(){var e=(new Date).getTime()-this.date.getTime();var t=Math.round(e/1e3);var r=Math.round(t/60);var n=Math.round(r/60);var a=Math.round(n/24);var i=Math.round(a/30);var o=Math.round(i/12);if(r<1){return"1m"}else if(r<60){return"".concat(r,"m")}else if(n<24){return"".concat(n,"h")}else if(a<365){return"".concat(a,"d")}else{return"".concat(o,"y")}};e.prototype.timeUntil=function(){var e=this.date.getTime()-(new Date).getTime();return this.timeUntilFromMs(e)};e.prototype.timeUntilFromMs=function(e){var t=Math.round(e/1e3);var r=Math.round(t/60);var n=Math.round(r/60);var a=Math.round(n/24);var i=Math.round(a/30);var o=Math.round(i/12);if(i>=18){return T(this.locale,o,"year")}else if(i>=12){return T(this.locale,o,"year")}else if(a>=45){return T(this.locale,i,"month")}else if(a>=30){return T(this.locale,i,"month")}else if(n>=36){return T(this.locale,a,"day")}else if(n>=24){return T(this.locale,a,"day")}else if(r>=90){return T(this.locale,n,"hour")}else if(r>=45){return T(this.locale,n,"hour")}else if(t>=90){return T(this.locale,r,"minute")}else if(t>=45){return T(this.locale,r,"minute")}else if(t>=10){return T(this.locale,t,"second")}else{return T(this.locale,0,"second")}};e.prototype.microTimeUntil=function(){var e=this.date.getTime()-(new Date).getTime();var t=Math.round(e/1e3);var r=Math.round(t/60);var n=Math.round(r/60);var a=Math.round(n/24);var i=Math.round(a/30);var o=Math.round(i/12);if(a>=365){return"".concat(o,"y")}else if(n>=24){return"".concat(a,"d")}else if(r>=60){return"".concat(n,"h")}else if(r>1){return"".concat(r,"m")}else{return"1m"}};e.prototype.formatDate=function(){var e=u()?"%e %b":"%b %e";if(!h(this.date)){e+=l()?", %Y":" %Y"}return n(this.date,e)};e.prototype.formatTime=function(){var e=D();if(e){return e.format(this.date)}else{return n(this.date,"%l:%M%P")}};return e}();function T(e,t,r){var n=f(e,{numeric:"auto"});if(n){return n.format(t,r)}else{return A(t,r)}}function A(e,t){if(e===0){switch(t){case"year":case"quarter":case"month":case"week":return"this ".concat(t);case"day":return"today";case"hour":case"minute":return"in 0 ".concat(t,"s");case"second":return"now"}}else if(e===1){switch(t){case"year":case"quarter":case"month":case"week":return"next ".concat(t);case"day":return"tomorrow";case"hour":case"minute":case"second":return"in 1 ".concat(t)}}else if(e===-1){switch(t){case"year":case"quarter":case"month":case"week":return"last ".concat(t);case"day":return"yesterday";case"hour":case"minute":case"second":return"1 ".concat(t," ago")}}else if(e>1){switch(t){case"year":case"quarter":case"month":case"week":case"day":case"hour":case"minute":case"second":return"in ".concat(e," ").concat(t,"s")}}else if(e<-1){switch(t){case"year":case"quarter":case"month":case"week":case"day":case"hour":case"minute":case"second":return"".concat(-e," ").concat(t,"s ago")}}throw new RangeError("Invalid unit argument for format() '".concat(t,"'"))}var D=a({hour:"numeric",minute:"2-digit"});var F=function(e){__extends(t,e);function t(){return e!==null&&e.apply(this,arguments)||this}t.prototype.getFormattedDate=function(){var e=this.date;if(e){return new b(e,m(this)).toString()}};t.prototype.connectedCallback=function(){_.push(this);if(!E){S();E=setInterval(S,60*1e3)}e.prototype.connectedCallback.call(this)};t.prototype.disconnectedCallback=function(){var e=_.indexOf(this);if(e!==-1){_.splice(e,1)}if(!_.length){if(E){clearInterval(E);E=null}}};return t}(v);var _=[];var E;function S(){var e,t,r;for(t=0,r=_.length;t<r;t++){e=_[t];e.textContent=e.getFormattedDate()||""}}if(!window.customElements.get("relative-time")){window.RelativeTimeElement=F;window.customElements.define("relative-time",F)}var k=function(e){__extends(t,e);function t(){return e!==null&&e.apply(this,arguments)||this}t.prototype.getFormattedDate=function(){var e=this.getAttribute("format");var t=this.date;if(!t)return;if(e==="micro"){return new b(t,m(this)).microTimeAgo()}else{return new b(t,m(this)).timeAgo()}};return t}(F);if(!window.customElements.get("time-ago")){window.TimeAgoElement=k;window.customElements.define("time-ago",k)}var C=function(e){__extends(t,e);function t(){return e!==null&&e.apply(this,arguments)||this}t.prototype.getFormattedDate=function(){var e=this.getAttribute("format");var t=this.date;if(!t)return;if(e==="micro"){return new b(t,m(this)).microTimeUntil()}else{return new b(t,m(this)).timeUntil()}};return t}(F);if(!window.customElements.get("time-until")){window.TimeUntilElement=C;window.customElements.define("time-until",C)}}}}));