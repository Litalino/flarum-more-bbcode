(()=>{var t={n:i=>{var e=i&&i.__esModule?()=>i.default:()=>i;return t.d(e,{a:e}),e},d:(i,e)=>{for(var o in e)t.o(e,o)&&!t.o(i,o)&&Object.defineProperty(i,o,{enumerable:!0,get:e[o]})},o:(t,i)=>Object.prototype.hasOwnProperty.call(t,i),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},i={};(()=>{"use strict";t.r(i);const e=flarum.core.compat["common/app"];var o=t.n(e);const r=flarum.core.compat.extend,n=flarum.core.compat["components/TextEditor"];var s=t.n(n);function a(t,i){return a=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,i){return t.__proto__=i,t},a(t,i)}function c(t,i){t.prototype=Object.create(i.prototype),t.prototype.constructor=t,a(t,i)}const l=flarum.core.compat["common/extend"],f=(flarum.core.compat["common/components/Button"],flarum.core.compat["common/Component"]);var d=t.n(f);const u=flarum.core.compat["common/components/Dropdown"];var p=t.n(u);const h=flarum.core.compat["common/utils/ItemList"];var b=t.n(h);const x=flarum.core.compat["common/helpers/icon"];var g=t.n(x);const _=flarum.core.compat["forum/components/CommentPost"];var k=t.n(_);const v=flarum.core.compat["forum/components/DiscussionPage"];var w=t.n(v);const y=flarum.core.compat["forum/utils/DiscussionControls"];var F=t.n(y);const z=flarum.core.compat["forum/components/LogInModal"];var C=t.n(z);const N=flarum.core.compat["forum/components/PostStream"];var T=t.n(N);const B=flarum.core.compat["forum/components/ComposerPostPreview"];var M=t.n(B);const A=flarum.core.compat["common/utils/BasicEditorDriver"];var E=t.n(A);const L=flarum.core.compat["common/utils/styleSelectedText"];var j=t.n(L);const P=flarum.core.compat["common/components/Tooltip"];var D=t.n(P),H=function(t){function i(){return t.apply(this,arguments)||this}c(i,t);var e=i.prototype;return e.oncreate=function(i){t.prototype.oncreate.call(this,i)},e.view=function(){var t=m("button",{className:"Button Button--icon Button--link",type:"button","data-hotkey":this.attrs.hotkey,onkeydown:this.keydown.bind(this),onclick:this.attrs.onclick},g()(this.attrs.icon));return this.attrs.title?m(D(),{text:this.attrs.title},t):t},e.keydown=function(t){" "!==t.key&&"Enter"!==t.key||(t.preventDefault(),this.element.click())},i}(d()),I=function(t){function i(){return t.apply(this,arguments)||this}c(i,t);var e=i.prototype;return e.view=function(){return p().component({className:"More-bbcode-buttonsDropdown",buttonClassName:"Button Button--flat",label:g()("fas fa-th-large")},this.markdownToolbarItems().toArray())},e.markdownToolbarItems=function(t){var i=this,e=navigator.userAgent.match(/Macintosh/)?"⌘":"ctrl",r={header:{prefix:"### "},bold:{prefix:"**",suffix:"**",trimFirst:!0},italic:{prefix:"_",suffix:"_",trimFirst:!0},strikethrough:{prefix:"~~",suffix:"~~",trimFirst:!0},quote:{prefix:"> ",multiline:!0,surroundWithNewlines:!0},code:{prefix:"`",suffix:"`",blockPrefix:"```",blockSuffix:"```"},link:{prefix:"[",suffix:"](https://)",replaceNext:"https://",scanFor:"https?://"},image:{prefix:"![",suffix:"](https://)",replaceNext:"https://",scanFor:"https?://"},unordered_list:{prefix:"- ",multiline:!0,surroundWithNewlines:!0},ordered_list:{prefix:"1. ",multiline:!0,orderedList:!0},spoiler:{prefix:">!",suffix:"!<",blockPrefix:">! ",multiline:!0,trimFirst:!0},left:{prefix:"[left] ",suffix:" [/left]",trimFirst:!0},center:{prefix:"[center] ",suffix:" [/center]",trimFirst:!0},right:{prefix:"[right] ",suffix:" [/right]",trimFirst:!0},justify:{prefix:"[justify] ",suffix:" [/justify]",trimFirst:!0},dropcap:{prefix:"[dropcap] ",suffix:" [/dropcap]",trimFirst:!0},ileft:{prefix:"[ileft] ",suffix:" [/ileft]",trimFirst:!0},iright:{prefix:"[iright] ",suffix:" [/iright]",trimFirst:!0},pleft:{prefix:"[pleft] ",suffix:" [/pleft]",trimFirst:!0},pright:{prefix:"[pright] ",suffix:" [/pright]",trimFirst:!0},details:{prefix:"[details=TITLE] CONTENT ",suffix:"[/details]",blockPrefix:"[/details]",trimFirst:!0},like:{prefix:"[like] ",suffix:" [/like]",trimFirst:!0},reply:{prefix:"[reply] ",suffix:" [/reply]",trimFirst:!0},login:{prefix:"[login] ",suffix:" [/login]",trimFirst:!0},cloud:{prefix:"[cloud type=other title=title url=link] Password ",suffix:"[/cloud]",trimFirst:!0},down:{prefix:'[down link="URL" size=2kB name=file.zip]',trimFirst:!0},audio:{prefix:'[audio mp3="URL"]',trimFirst:!0},clip:{prefix:'[clip mp4="URL"]',trimFirst:!0},table:{prefix:"\n| Column | Column | Column | Column |\n\n|---|---|---|---|\n\n| row  |  row | row | row  |\n",trimFirst:!0},word:{prefix:"[gdoc] ",suffix:" [/gdoc]",trimFirst:!0},size:{prefix:"[size=16] ",suffix:" [/size]",trimFirst:!0},color:{prefix:"[color=red] ",suffix:" [/color]",trimFirst:!0},tab:{prefix:'\n[tabs]\n\n[tab="hi"]Hi[/tab]\n\n[tab="hello"]Hello[/tab]\n\n[/tabs]\n',trimFirst:!0},bar:{prefix:"[pbar]Title,ProgressText,BorderColor,ProgressColor,LittleColor,BorderSize,Progress%,BorderRadius,BottomMargin",suffix:" [/pbar]",trimFirst:!0}};(0,l.extend)(E().prototype,"keyHandlers",(function(t){t.add("left",a("left","l",this)),t.add("center",a("center","c",this)),t.add("right",a("right","r",this)),t.add("justify",a("justify","j",this)),t.add("strikethrough",a("strikethrough","n",this)),t.add("quote",a("quote","q",this)),t.add("spoiler",a("spoiler","s",this)),t.add("code",a("code","m",this)),t.add("link",a("link","d",this)),t.add("image",a("image","h",this)),t.add("unordered_list",a("unordered_list","u",this)),t.add("ordered_list",a("ordered_list","o",this))}));var n=function(t,i){j()(i.el,r[t])},s="function"==typeof t?t():new(b());function a(t,i,o){return function(r){r.key===i&&(r.metaKey&&"⌘"===e||r.ctrlKey&&"ctrl"===e)&&(r.preventDefault(),n(t,o))}}function c(t,i){return o().translator.trans("imeepo-more-bbcode.forum."+t)+(i?" <"+e+"-"+i+">":"")}var f=function(t){return function(){return n(t,i.attrs.textEditor)}};return s.add("heading",p().component({className:"More-BBcode-Dropdown item-heading",label:g()("fas fa-h")},this.heading().toArray()),2e4),s.add("bold",m(H,{title:c("lib.bold_tooltip","b"),icon:"fas fa-bold",onclick:f("bold")}),19e3),s.add("italic",m(H,{title:c("lib.italic_tooltip","i"),icon:"fas fa-italic",onclick:f("italic")}),18e3),s.add("strikethrough",m(H,{title:c("lib.strikethrough_tooltip","n"),icon:"fas fa-strikethrough",onclick:f("strikethrough")}),17e3),s.add("quote",m(H,{title:c("lib.quote_tooltip","q"),icon:"fas fa-quote-left",onclick:f("quote")}),16e3),s.add("spoiler",m(H,{title:c("lib.spoiler_tooltip","s"),icon:"fas fa-exclamation-triangle",onclick:f("spoiler")}),15e3),s.add("code",m(H,{title:c("lib.code_tooltip","m"),icon:"fas fa-code",onclick:f("code")}),14e3),s.add("link",m(H,{title:c("lib.link_tooltip","d"),icon:"fas fa-link",onclick:f("link")}),13e3),s.add("image",m(H,{title:c("lib.image_tooltip","h"),icon:"fas fa-image",onclick:f("image")}),12e3),s.add("unordered_list",m(H,{title:c("lib.unordered_list_tooltip","u"),icon:"fas fa-list-ul",onclick:f("unordered_list")}),11e3),s.add("ordered_list",m(H,{title:c("lib.ordered_list_tooltip","o"),icon:"fas fa-list-ol",onclick:f("ordered_list")}),1e4),s.add("left",m(H,{title:c("button_tooltip_left","l"),icon:"fas fa-align-left",onclick:f("left")}),9500),s.add("center",m(H,{title:c("button_tooltip_center","c"),icon:"fas fa-align-center",onclick:f("center")}),9e3),s.add("right",m(H,{title:c("button_tooltip_right","r"),icon:"fas fa-align-right",onclick:f("right")}),8500),s.add("justify",m(H,{title:c("button_tooltip_justify","j"),icon:"fas fa-align-justify",onclick:f("justify")}),8e3),s.add("dropcap",m(H,{title:c("button_tooltip_dropcap"),icon:"fas fa-list-alt",onclick:f("dropcap")}),7500),s.add("ileft",m(H,{title:c("button_tooltip_img_left"),icon:"fas fa-fast-backward",onclick:f("ileft")}),7e3),s.add("iright",m(H,{title:c("button_tooltip_img_right"),icon:"fas fa-fast-forward",onclick:f("iright")}),6500),s.add("pleft",m(H,{title:c("button_tooltip_p_left"),icon:"fas fa-outdent",onclick:f("pleft")}),6e3),s.add("pright",m(H,{title:c("button_tooltip_p_right"),icon:"fas fa-indent",onclick:f("pright")}),5500),s.add("details",m(H,{title:c("button_tooltip_details"),icon:"fas fa-eye-slash",onclick:f("details")}),5e3),s.add("like",m(H,{title:c("button_tooltip_like"),icon:"fas fa-thumbs-up",onclick:f("like")}),4500),s.add("reply",m(H,{title:c("button_tooltip_reply"),icon:"fas fa-reply-all",onclick:f("reply")}),4e3),s.add("login",m(H,{title:c("button_tooltip_login"),icon:"fas fa-sign-in-alt",onclick:f("login")}),3500),s.add("cloud",m(H,{title:c("button_tooltip_cloud"),icon:"fas fa-cloud",onclick:f("cloud")}),3e3),s.add("down",m(H,{title:c("button_tooltip_down"),icon:"fas fa-download",onclick:f("down")}),2500),s.add("audio",m(H,{title:c("button_tooltip_audio"),icon:"fas fa-file-audio",onclick:f("audio")}),2e3),s.add("clip",m(H,{title:c("button_tooltip_clip"),icon:"fas fa-file-video",onclick:f("clip")}),1500),s.add("table",m(H,{title:c("button_tooltip_table"),icon:"fas fa-table",onclick:f("table")}),1e3),s.add("word",m(H,{title:c("button_tooltip_word"),icon:"fas fa-file-word",onclick:f("word")}),950),s.add("color",p().component({className:"More-BBcode-Dropdown item-color",label:g()("fas fa-palette")},this.color().toArray()),900),s.add("size",p().component({className:"More-BBcode-Dropdown item-size",label:g()("fas fa-text-height")},this.size().toArray()),850),s.add("alert",p().component({className:"More-BBcode-Dropdown item-alert",label:g()("fas fa-bell")},this.alert().toArray()),800),s.add("bar",p().component({className:"More-BBcode-Dropdown item-bar",label:g()("fas fa-server")},this.bar().toArray()),100),s.add("tab",m(H,{title:c("button_tooltip_tab"),icon:"fas fa-tasks",onclick:f("tab")}),0),s},e.size=function(t){var i=this,e="function"==typeof t?t():new(b()),o=(navigator.userAgent.match(/Macintosh/),{size_18:{prefix:"[size=18] Change text",suffix:" [/size]",trimFirst:!0},size_20:{prefix:"[size=20] Change text",suffix:" [/size]",trimFirst:!0},size_22:{prefix:"[size=22] Change text",suffix:" [/size]",trimFirst:!0},size_24:{prefix:"[size=24] Change text",suffix:" [/size]",trimFirst:!0},size_26:{prefix:"[size=26] Change text",suffix:" [/size]",trimFirst:!0},size_28:{prefix:"[size=28] Change text",suffix:" [/size]",trimFirst:!0},size_30:{prefix:"[size=30] Change text",suffix:" [/size]",trimFirst:!0},size_32:{prefix:"[size=32] Change text",suffix:" [/size]",trimFirst:!0},size_34:{prefix:"[size=34] Change text",suffix:" [/size]",trimFirst:!0},size_36:{prefix:"[size=36] Change text",suffix:" [/size]",trimFirst:!0},size_38:{prefix:"[size=38] Change text",suffix:" [/size]",trimFirst:!0},size_40:{prefix:"[size=40] Change text",suffix:" [/size]",trimFirst:!0}}),r=function(t){return function(){return function(t,i){j()(i.el,o[t])}(t,i.attrs.textEditor)}};return e.add("size_18",m(H,{title:void 0,icon:"fas fa-font",onclick:r("size_18")}),2e3),e.add("size_20",m(H,{title:void 0,icon:"fas fa-font",onclick:r("size_20")}),1900),e.add("size_22",m(H,{title:void 0,icon:"fas fa-font",onclick:r("size_22")}),1800),e.add("size_24",m(H,{title:void 0,icon:"fas fa-font",onclick:r("size_24")}),1700),e.add("size_26",m(H,{title:void 0,icon:"fas fa-font",onclick:r("size_26")}),1600),e.add("size_28",m(H,{title:void 0,icon:"fas fa-font",onclick:r("size_28")}),1500),e.add("size_30",m(H,{title:void 0,icon:"fas fa-font",onclick:r("size_30")}),1400),e.add("size_32",m(H,{title:void 0,icon:"fas fa-font",onclick:r("size_32")}),1300),e.add("size_34",m(H,{title:void 0,icon:"fas fa-font",onclick:r("size_34")}),1200),e.add("size_36",m(H,{title:void 0,icon:"fas fa-font",onclick:r("size_36")}),1100),e.add("size_38",m(H,{title:void 0,icon:"fas fa-font",onclick:r("size_38")}),1e3),e.add("size_40",m(H,{title:void 0,icon:"fas fa-font",onclick:r("size_40")}),900),e},e.color=function(t){var i=this,e="function"==typeof t?t():new(b()),r=navigator.userAgent.match(/Macintosh/)?"⌘":"ctrl",n={color_grey:{prefix:"[color=grey] Change text",suffix:" [/color]",trimFirst:!0},color_green:{prefix:"[color=green] Change text",suffix:" [/color]",trimFirst:!0},color_blue:{prefix:"[color=blue] Change text",suffix:" [/color]",trimFirst:!0},color_purple:{prefix:"[color=purple] Change text",suffix:" [/color]",trimFirst:!0},color_yellow:{prefix:"[color=yellow] Change text",suffix:" [/color]",trimFirst:!0},color_orange:{prefix:"[color=orange] Change text",suffix:" [/color]",trimFirst:!0},color_red:{prefix:"[color=red] Change text",suffix:" [/color]",trimFirst:!0},color_silver:{prefix:"[color=silver] Change text",suffix:" [/color]",trimFirst:!0},color_pink:{prefix:"[color=pink] Change text",suffix:" [/color]",trimFirst:!0},color_brown:{prefix:"[color=brown] Change text",suffix:" [/color]",trimFirst:!0},color_white:{prefix:"[color=white] Change text",suffix:" [/color]",trimFirst:!0},color_black:{prefix:"[color=black] Change text",suffix:" [/color]",trimFirst:!0}};function s(t,i){return o().translator.trans("imeepo-more-bbcode.forum."+t)+(i?" <"+r+"-"+i+">":"")}var a=function(t){return function(){return function(t,i){j()(i.el,n[t])}(t,i.attrs.textEditor)}};return e.add("color_grey",m(H,{title:s("color_grey"),icon:"fas fa-color-grey",onclick:a("color_grey")}),1e3),e.add("color_green",m(H,{title:s("color_green"),icon:"fas fa-color-green",onclick:a("color_green")}),1e3),e.add("color_blue",m(H,{title:s("color_blue"),icon:"fas fa-color-blue",onclick:a("color_blue")}),1e3),e.add("color_purple",m(H,{title:s("color_purple"),icon:"fas fa-color-purple",onclick:a("color_purple")}),1e3),e.add("color_yellow",m(H,{title:s("color_yellow"),icon:"fas fa-color-yellow",onclick:a("color_yellow")}),1e3),e.add("color_orange",m(H,{title:s("color_orange"),icon:"fas fa-color-orange",onclick:a("color_orange")}),1e3),e.add("color_red",m(H,{title:s("color_red"),icon:"fas fa-color-red",onclick:a("color_red")}),1e3),e.add("color_silver",m(H,{title:s("color_silver"),icon:"fas fa-color-silver",onclick:a("color_silver")}),1e3),e.add("color_pink",m(H,{title:s("color_pink"),icon:"fas fa-color-pink",onclick:a("color_pink")}),1e3),e.add("color_brown",m(H,{title:s("color_brown"),icon:"fas fa-color-brown",onclick:a("color_brown")}),1e3),e.add("color_white ",m(H,{title:s("color_white"),icon:"fas fa-color-white",onclick:a("color_white")}),1e3),e.add("color_black",m(H,{title:s("color_black"),icon:"fas fa-color-black",onclick:a("color_black")}),1e3),e},e.heading=function(t){var i=this,e="function"==typeof t?t():new(b()),r=navigator.userAgent.match(/Macintosh/)?"⌘":"ctrl",n={h2:{prefix:"## ",suffix:" ##",trimFirst:!0},h3:{prefix:"### ",suffix:" ###",trimFirst:!0},h4:{prefix:"#### ",suffix:" ####",trimFirst:!0},h5:{prefix:"##### ",suffix:" #####",trimFirst:!0},h6:{prefix:"###### ",suffix:" ######",trimFirst:!0}};(0,l.extend)(E().prototype,"keyHandlers",(function(t){t.add("h2",a("h2","2",this)),t.add("h3",a("h3","3",this)),t.add("h4",a("h4","4",this))}));var s=function(t,i){j()(i.el,n[t])};function a(t,i,e){return function(o){o.key===i&&(o.metaKey&&"⌘"===r||o.ctrlKey&&"ctrl"===r)&&(o.preventDefault(),s(t,e))}}function c(t,i){return o().translator.trans("imeepo-more-bbcode.forum."+t)+(i?" <"+r+"-"+i+">":"")}var f=function(t){return function(){return s(t,i.attrs.textEditor)}};return e.add("h2",m(H,{title:c("h2","2"),icon:"fas fa-h2",onclick:f("h2")}),500),e.add("h3",m(H,{title:c("h3","3"),icon:"fas fa-h3",onclick:f("h3")}),400),e.add("h4",m(H,{title:c("h4","4"),icon:"fas fa-h4",onclick:f("h4")}),300),e.add("h5",m(H,{title:c("h5","5"),icon:"fas fa-h5",onclick:f("h5")}),200),e.add("h6",m(H,{title:c("h6","6"),icon:"fas fa-h6",onclick:f("h6")}),100),e},e.alert=function(t){var i=this,e="function"==typeof t?t():new(b()),o=(navigator.userAgent.match(/Macintosh/),{warning:{prefix:"[awarning] this is an awarning message.",suffix:" [/awarning]",trimFirst:!0},asuccess:{prefix:"[asuccess] this is an asuccess message.",suffix:" [/asuccess]",trimFirst:!0},ainfo:{prefix:"[ainfo] this is an ainfo message.",suffix:" [/ainfo]",trimFirst:!0},abasic:{prefix:"[abasic] this is an abasic message.",suffix:" [/abasic]",trimFirst:!0},acustom:{prefix:"[acustom]red,black,green,this is an acustom message.",suffix:" [/acustom]",trimFirst:!0},bcustom:{prefix:"[bcustom]title=this is a bcustom title font=red bg=black border=green",suffix:"[/bcustom]",trimFirst:!0},bwarning:{prefix:"[bwarning] this is n bwarning message.",suffix:" [/bwarning]",trimFirst:!0},bsuccess:{prefix:"[bsuccess] this is an bsuccess message.",suffix:" [/bsuccess]",trimFirst:!0},berror:{prefix:"[berror] this is a berror message.",suffix:" [/berror]",trimFirst:!0},bnotice:{prefix:"[bnotice] this is an bnotice message.",suffix:" [/bnotice]",trimFirst:!0},cwarning:{prefix:"[cwarning]darkorange,white,darkorange,THIS IS A CWARNING TITLE,This is a CWARNING message.",suffix:" [/cwarning]",trimFirst:!0},cnotice:{prefix:"[cnotice]teal,white,teal,this is a cnotice title,this is a cnotice message.",suffix:" [/cnotice]",trimFirst:!0},cerror:{prefix:"[cerror]red,white,red,this is a cerror title,this is a cerror message.",suffix:" [/cerror]",trimFirst:!0},csuccess:{prefix:"[csuccess]green,white,green,this is a cerror title,this is a csuccess message.",suffix:" [/csuccess]",trimFirst:!0},dnotice:{prefix:'[dnotice title="this is a dnotice title" font="teal" bg="white" border="teal"] this is a dnotice message.',suffix:" [/dnotice]",trimFirst:!0},derror:{prefix:'[derror title="this is a derror title" font="red" bg="white" border="red"]this is a derror message.',suffix:" [/derror]",trimFirst:!0},dwarning:{prefix:'[dwarning title="this is a dwarning title" font="darkorange" bg="white" border="darkorange"]this is a dwarning message.',suffix:" [/dwarning]",trimFirst:!0},dsuccess:{prefix:'[dsuccess title="this is a dsuccess title" font="green" bg="white" border="green"]this is a dsuccess message.',suffix:" [/dsuccess]",trimFirst:!0}}),r=function(t){return function(){return function(t,i){j()(i.el,o[t])}(t,i.attrs.textEditor)}};return e.add("warning",m(H,{title:void 0,icon:"fas fa-warning",onclick:r("warning")}),2e3),e.add("asuccess",m(H,{title:void 0,icon:"fas fa-asuccess",onclick:r("asuccess")}),1900),e.add("ainfo",m(H,{title:void 0,icon:"fas fa-ainfo",onclick:r("ainfo")}),1800),e.add("abasic",m(H,{title:void 0,icon:"fas fa-abasic",onclick:r("abasic")}),1700),e.add("acustom",m(H,{title:void 0,icon:"fas fa-acustom",onclick:r("acustom")}),1600),e.add("bcustom",m(H,{title:void 0,icon:"fas fa-bcustom",onclick:r("bcustom")}),800),e.add("bwarning",m(H,{title:void 0,icon:"fas fa-bwarning",onclick:r("bwarning")}),1500),e.add("bsuccess",m(H,{title:void 0,icon:"fas fa-bsuccess",onclick:r("bsuccess")}),1400),e.add("berror",m(H,{title:void 0,icon:"fas fa-berror",onclick:r("berror")}),1300),e.add("bnotice",m(H,{title:void 0,icon:"fas fa-bnotice",onclick:r("bnotice")}),1100),e.add("cwarning",m(H,{title:void 0,icon:"fas fa-cwarning",onclick:r("cwarning")}),1200),e.add("cnotice",m(H,{title:void 0,icon:"fas fa-cnotice",onclick:r("cnotice")}),1100),e.add("cerror",m(H,{title:void 0,icon:"fas fa-cerror",onclick:r("cerror")}),1e3),e.add("csuccess",m(H,{title:void 0,icon:"fas fa-csuccess",onclick:r("csuccess")}),900),e.add("dnotice",m(H,{title:void 0,icon:"fas fa-dnotice",onclick:r("dnotice")}),700),e.add("derror",m(H,{title:void 0,icon:"fas fa-derror",onclick:r("derror")}),600),e.add("dwarning",m(H,{title:void 0,icon:"fas fa-dwarning",onclick:r("dwarning")}),500),e.add("dsuccess",m(H,{title:void 0,icon:"fas fa-dsuccess",onclick:r("dsuccess")}),400),e},e.bar=function(t){var i=this,e="function"==typeof t?t():new(b()),r=navigator.userAgent.match(/Macintosh/)?"⌘":"ctrl",n={black:{prefix:"[pbar]Back-end,40% Complete,black,black,gray,1,40,20,0",suffix:"[/pbar]",trimFirst:!0},blue:{prefix:"[pbar]Front-end,30% Complete,black,blue,teal,1,30,10,80",suffix:"[/pbar]",trimFirst:!0},red:{prefix:"[pbar]Total,70% Complete,black,red,pink,1,70,5,40",suffix:"[/pbar]",trimFirst:!0}};function s(t,i){return o().translator.trans("imeepo-more-bbcode.forum."+t)+(i?" <"+r+"-"+i+">":"")}var a=function(t){return function(){return function(t,i){j()(i.el,n[t])}(t,i.attrs.textEditor)}};return e.add("black",m(H,{title:s("button_tooltip_bar_black"),icon:"fas fa-bar black",onclick:a("black")})),e.add("blue",m(H,{title:s("button_tooltip_bar_blue"),icon:"fas fa-bar blue",onclick:a("blue")})),e.add("red",m(H,{title:s("button_tooltip_bar_red"),icon:"fas fa-bar red",onclick:a("red")})),e},i}(d());o().initializers.add("litalino/more-bbcode",(function(){(0,l.extend)(k().prototype,"content",(function(){o().session.user&&o().current.matches(w())?($(".reply2see_reply").off("click").on("click",(function(){return F().replyAction.call(o().current.get("discussion"),!0,!1)})),$(".like2see_like").off("click").on("click",(function(){return F().likesAction.call(o().current.get("discussion"),!0,!1)}))):($(".reply2see_reply").off("click").on("click",(function(){return o().modal.show(C())})),$(".login2see_login").off("click").on("click",(function(){return o().modal.show(C())})),$(".like2see_like").off("click").on("click",(function(){return o().modal.show(C())})))})),(0,l.extend)(T().prototype,"oncreate",(function(){!function(){var t=document.getElementsByClassName("Post-body");if(0!=t.length)for(var i=0;i<t.length;i++)for(var e=t[i].getElementsByClassName("bbextend-gdoc"),o=0;o<e.length;o++){var r=e[o],n=r.getElementsByTagName("a")[0].getAttribute("href");if(r.classList.remove("bbextend-gdoc"),n.startsWith("https://docs.google.com/document/d/")){r.innerHTML='<i class="fas fa-ellipsis fa-fade"></i> Loading Google Doc...',n=n.substring(0,n.lastIndexOf("/"));var s=new XMLHttpRequest;s.open("GET",n+"/pub",!0),s.responseType="document",s.onload=function(){if(200==this.status){var t=this.responseXML.getElementsByTagName("body")[0].innerHTML;r.innerHTML=t;for(var i=r.childNodes[1];r.firstChild;)r.removeChild(r.firstChild);r.appendChild(i);var e=r.childNodes[0].childNodes[0].innerHTML,o=r.childNodes[0].childNodes[1],s={};e.split("}").forEach((function(t){var i=t.split("{"),e=i[0],o=i[1];o&&(s[e]=o+";")})),r.childNodes[0].removeChild(r.childNodes[0].childNodes[0]),function t(i){if(i.childNodes.length>0)for(var e=0;e<i.childNodes.length;e++)t(i.childNodes[e]);if(i.className){var o=i.className.split(" "),r="";o.forEach((function(t){r+=s["."+t]})),i.setAttribute("style",r+O),i.removeAttribute("class")}}(o);var a=o.getAttribute("style").split(";");a.forEach((function(t,i){t.includes("max-width")&&(a[i]="max-width: 100%")})),o.setAttribute("style","color: #000;"+a.join(";"));var c=document.createElement("a");c.setAttribute("href",n),c.setAttribute("target","_blank"),c.innerHTML='<i class="fas fa-file-word"></i> View Google Doc',r.appendChild(c)}},s.onerror=function(){r.innerHTML='<i class="fas fa-triangle-exclamation"></i> Failed to load Google Doc'},s.send()}else r.innerHTML='<i class="fas fa-triangle-exclamation"></i> Invalid Google Doc URL'}}()}));var t=0,i=function(){this.$(".tabs").each((function(i,e){var o=$(e);if(!o.find('input[type="radio"][name]').length){var r=o.find('> .tab > input[type="radio"]');if(r.length){var n=o.find(".tab"),s=t++;r.attr("name","tab-group-"+s),r.is("[checked]")||r[0].setAttribute("checked","checked"),n.each((function(t,i){var e=$(i),o="tab-"+s+"-"+ ++t;e.find('input[type="radio"]').attr("id",o),e.find("label").attr("for",o)}))}}}))};(0,l.extend)(k().prototype,["oncreate","onupdate"],i),(0,l.extend)(M().prototype,"oncreate",(function(){var t=this;(0,l.extend)(this.attrs,"surround",(function(){return i.call(t)}))}))}));var O="margin-bottom: 0;";o().initializers.add("litalino-more-bbcode",(function(){(0,r.extend)(s().prototype,"toolbarItems",(function(t){t.add("litalino-more-bbcode",m(I,{textEditor:this.attrs.composer.editor}))}))}),-500)})(),module.exports=i})();
//# sourceMappingURL=forum.js.map