/*
 * This file is part of MathRen.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { extend } from "flarum/common/extend";
import app from "flarum/common/app";

import Button from "flarum/common/components/Button";
import Component from "flarum/common/Component";
import Dropdown from "flarum/common/components/Dropdown";
//import Separator from "flarum/common/components/Separator";
import ItemList from "flarum/common/utils/ItemList";
import icon from "flarum/common/helpers/icon";

import CommentPost from "flarum/forum/components/CommentPost";
import DiscussionPage from "flarum/forum/components/DiscussionPage";
import DiscussionControls from "flarum/forum/utils/DiscussionControls";
import LogInModal from "flarum/forum/components/LogInModal";

import PostStream from "flarum/forum/components/PostStream";
//import Separator from "flarum/components/Separator";

import ComposerPostPreview from "flarum/forum/components/ComposerPostPreview";

///////////////////
import BasicEditorDriver from 'flarum/common/utils/BasicEditorDriver';

import styleSelectedText from "flarum/common/utils/styleSelectedText";

import MarkdownButton from "./MarkdownButton";

///////////////////

export default class TextEditorButton extends Component {
  view() {
    return Dropdown.component(
      {
        className: "More-bbcode-buttonsDropdown",
        buttonClassName: "Button Button--flat",
        label: icon("fas fa-th-large"),
      },
      this.markdownToolbarItems().toArray()
    );
  }
  /**
   * Build an item list for the contents of the dropdown menu.
   * 
   */
  markdownToolbarItems(oldFunc) {
    
    const modifierKey = navigator.userAgent.match(/Macintosh/) ? '⌘' : 'ctrl';

    const styles = {
      header: { prefix: '### ' },
      bold: { prefix: '**', suffix: '**', trimFirst: true },
      italic: { prefix: '_', suffix: '_', trimFirst: true },
      strikethrough: { prefix: '~~', suffix: '~~', trimFirst: true },
      quote: { prefix: '> ', multiline: true, surroundWithNewlines: true },
      code: { prefix: '`', suffix: '`', blockPrefix: '```', blockSuffix: '```' },
      link: { prefix: '[', suffix: '](https://)', replaceNext: 'https://', scanFor: 'https?://' },
      image: { prefix: '![', suffix: '](https://)', replaceNext: 'https://', scanFor: 'https?://' },
      unordered_list: { prefix: '- ', multiline: true, surroundWithNewlines: true },
      ordered_list: { prefix: '1. ', multiline: true, orderedList: true },
      spoiler: { prefix: '>!', suffix: '!<', blockPrefix: '>! ', multiline: true, trimFirst: true },

      left: { prefix: '[left] ', suffix: ' [/left]', trimFirst: true },
      center: { prefix: '[center] ', suffix: ' [/center]', trimFirst: true },
      right: { prefix: '[right] ', suffix: ' [/right]', trimFirst: true },
      justify: { prefix: '[justify] ', suffix: ' [/justify]', trimFirst: true },
      dropcap: { prefix: '[dropcap] ', suffix: ' [/dropcap]', trimFirst: true },
      ileft: { prefix: '[ileft] ', suffix: ' [/ileft]', trimFirst: true },
      iright: { prefix: '[iright] ', suffix: ' [/iright]', trimFirst: true },
      pleft: { prefix: '[pleft] ', suffix: ' [/pleft]', trimFirst: true },
      pright: { prefix: '[pright] ', suffix: ' [/pright]', trimFirst: true },
      details: { prefix: '[details=TITLE] CONTENT ', suffix: '[/details]', blockPrefix: '[/details]', trimFirst: true },
      like: { prefix: '[like] ', suffix: ' [/like]', trimFirst: true },
      reply: { prefix: '[reply] ', suffix: ' [/reply]', trimFirst: true },
      login: { prefix: '[login] ', suffix: ' [/login]', trimFirst: true },
      cloud: { prefix: '[cloud type=other title=title url=link] Password ', suffix: '[/cloud]', trimFirst: true },
      down: { prefix: '[down link="URL" size=2kB name=file.zip]', trimFirst: true },
      audio: { prefix: '[audio mp3="URL"]', trimFirst: true },
      clip: { prefix: '[clip mp4="URL"]', trimFirst: true },
      table: { prefix: '\n| Column | Column | Column | Column |\n\n|---|---|---|---|\n\n| row  |  row | row | row  |\n', trimFirst: true },
      word: { prefix: '[gdoc] ', suffix: ' [/gdoc]', trimFirst: true },
      size: { prefix: '[size=16] ', suffix: ' [/size]', trimFirst: true },
      color: { prefix: '[color=red] ', suffix: ' [/color]', trimFirst: true },
      tab: { prefix: '\n[tabs]\n\n[tab="hi"]Hi[/tab]\n\n[tab="hello"]Hello[/tab]\n\n[/tabs]\n', trimFirst: true },
      bar: { prefix: '[pbar]Title,ProgressText,BorderColor,ProgressColor,LittleColor,BorderSize,Progress%,BorderRadius,BottomMargin', suffix: ' [/pbar]', trimFirst: true },
    };

    extend(BasicEditorDriver.prototype, 'keyHandlers', function (items) {
      items.add('left', makeShortcut('left', 'l', this));
      items.add('center', makeShortcut('center', 'c', this));
      items.add('right', makeShortcut('right', 'r', this));
      items.add('justify', makeShortcut('justify', 'j', this));

      items.add('strikethrough', makeShortcut('strikethrough', 'n', this));
      items.add('quote', makeShortcut('quote', 'q', this));
      items.add('spoiler', makeShortcut('spoiler', 's', this));
      items.add('code', makeShortcut('code', 'm', this));
      items.add('link', makeShortcut('link', 'd', this));
      items.add('image', makeShortcut('image', 'h', this));
      items.add('unordered_list', makeShortcut('unordered_list', 'u', this));
      items.add('ordered_list', makeShortcut('ordered_list', 'o', this));
    });
  

    const applyStyle = (id, editorDriver) => {
      // This is a nasty hack that breaks encapsulation of the editor.
      // In future releases, we'll need to tweak the editor driver interface
      // to support triggering events like this.
      styleSelectedText(editorDriver.el, styles[id]);
    };

    const items = typeof oldFunc === 'function' ? oldFunc() : new ItemList();

    function makeShortcut(id, key, editorDriver) {
      return function (e) {
        if (e.key === key && ((e.metaKey && modifierKey === '⌘') || (e.ctrlKey && modifierKey === 'ctrl'))) {
          e.preventDefault();
          applyStyle(id, editorDriver);
        }
      };
    }

    function tooltip(name, hotkey) {
      //return app.translator.trans(`imeepo-more-bbcode.forum.${name}_tooltip`) + (hotkey ? ` <${modifierKey}-${hotkey}>` : '');
      //return app.translator.trans(`imeepo-more-bbcode.forum.${name}`);
      return app.translator.trans(`imeepo-more-bbcode.forum.${name}`) + (hotkey ? ` <${modifierKey}-${hotkey}>` : '');
    }

    const makeApplyStyle = (id) => {
      return () => applyStyle(id, this.attrs.textEditor);
    };

    //items.add('header', <MarkdownButton title={tooltip('lib.header_tooltip')} icon="fas fa-heading" onclick={makeApplyStyle('header')} />, 20000);
    
    
    items.add(
      "heading",
      /*Button.component(
        {
          className: "More-BBcode-Dropdown",
          //buttonClassName: "Button Button--flat",
          label: icon("fas fa-th-large"),
        }
        //this.menu2().toArray()
      ),
      0*/
      Dropdown.component(
        {
          className: "More-BBcode-Dropdown item-heading",
          //buttonClassName: "Button Button--flat",
          label: icon("fas fa-h"),
        },
        this.heading().toArray()
      ),
      20000
    );
    items.add('bold', <MarkdownButton title={tooltip('lib.bold_tooltip', 'b')} icon="fas fa-bold" onclick={makeApplyStyle('bold')} />, 19000);
    items.add('italic', <MarkdownButton title={tooltip('lib.italic_tooltip', 'i')} icon="fas fa-italic" onclick={makeApplyStyle('italic')} />, 18000);
    items.add(
      'strikethrough',
      <MarkdownButton title={tooltip('lib.strikethrough_tooltip', 'n')} icon="fas fa-strikethrough" onclick={makeApplyStyle('strikethrough')} />,
      17000
    );
    items.add('quote', <MarkdownButton title={tooltip('lib.quote_tooltip', 'q')} icon="fas fa-quote-left" onclick={makeApplyStyle('quote')} />, 16000);
    items.add('spoiler', <MarkdownButton title={tooltip('lib.spoiler_tooltip', 's')} icon="fas fa-exclamation-triangle" onclick={makeApplyStyle('spoiler')} />, 15000);
    items.add('code', <MarkdownButton title={tooltip('lib.code_tooltip', 'm')} icon="fas fa-code" onclick={makeApplyStyle('code')} />, 14000);
    items.add('link', <MarkdownButton title={tooltip('lib.link_tooltip', 'd')} icon="fas fa-link" onclick={makeApplyStyle('link')} />, 13000);
    items.add('image', <MarkdownButton title={tooltip('lib.image_tooltip', 'h')} icon="fas fa-image" onclick={makeApplyStyle('image')} />, 12000);
    items.add(
      'unordered_list',
      <MarkdownButton title={tooltip('lib.unordered_list_tooltip', 'u')} icon="fas fa-list-ul" onclick={makeApplyStyle('unordered_list')} />,
      11000
    );
    items.add('ordered_list', <MarkdownButton title={tooltip('lib.ordered_list_tooltip', 'o')} icon="fas fa-list-ol" onclick={makeApplyStyle('ordered_list')} />, 10000);


    items.add('left', <MarkdownButton title={tooltip('button_tooltip_left', 'l')} icon="fas fa-align-left" onclick={makeApplyStyle('left')} />, 9500);
    items.add('center', <MarkdownButton title={tooltip('button_tooltip_center', 'c')} icon="fas fa-align-center" onclick={makeApplyStyle('center')} />, 9000);
    items.add('right', <MarkdownButton title={tooltip('button_tooltip_right', 'r')} icon="fas fa-align-right" onclick={makeApplyStyle('right')} />, 8500);
    items.add('justify', <MarkdownButton title={tooltip('button_tooltip_justify', 'j')} icon="fas fa-align-justify" onclick={makeApplyStyle('justify')} />, 8000);
    items.add('dropcap', <MarkdownButton title={tooltip('button_tooltip_dropcap')} icon="fas fa-list-alt" onclick={makeApplyStyle('dropcap')} />, 7500);
    items.add('ileft', <MarkdownButton title={tooltip('button_tooltip_img_left')} icon="fas fa-fast-backward" onclick={makeApplyStyle('ileft')} />, 7000);
    items.add('iright', <MarkdownButton title={tooltip('button_tooltip_img_right')} icon="fas fa-fast-forward" onclick={makeApplyStyle('iright')} />, 6500);
    items.add('pleft', <MarkdownButton title={tooltip('button_tooltip_p_left')} icon="fas fa-outdent" onclick={makeApplyStyle('pleft')} />, 6000);
    items.add('pright', <MarkdownButton title={tooltip('button_tooltip_p_right')} icon="fas fa-indent" onclick={makeApplyStyle('pright')} />, 5500);
    items.add('details', <MarkdownButton title={tooltip('button_tooltip_details')} icon="fas fa-eye-slash" onclick={makeApplyStyle('details')} />, 5000);
    items.add('like', <MarkdownButton title={tooltip('button_tooltip_like')} icon="fas fa-thumbs-up" onclick={makeApplyStyle('like')} />, 4500);
    items.add('reply', <MarkdownButton title={tooltip('button_tooltip_reply')} icon="fas fa-reply-all" onclick={makeApplyStyle('reply')} />, 4000);
    items.add('login', <MarkdownButton title={tooltip('button_tooltip_login')} icon="fas fa-sign-in-alt" onclick={makeApplyStyle('login')} />, 3500);
    items.add('cloud', <MarkdownButton title={tooltip('button_tooltip_cloud')} icon="fas fa-download" onclick={makeApplyStyle('cloud')} />, 3000);
    items.add('down', <MarkdownButton title={tooltip('button_tooltip_down')} icon="fas fa-download" onclick={makeApplyStyle('down')} />, 2500);
    items.add('audio', <MarkdownButton title={tooltip('button_tooltip_audio')} icon="fas fa-file-audio" onclick={makeApplyStyle('audio')} />, 2000);
    items.add('clip', <MarkdownButton title={tooltip('button_tooltip_clip')} icon="fas fa-file-video" onclick={makeApplyStyle('clip')} />, 1500);
    items.add('table', <MarkdownButton title={tooltip('button_tooltip_table')} icon="fas fa-table" onclick={makeApplyStyle('table')} />, 1000);
    items.add('word', <MarkdownButton title={tooltip('button_tooltip_word')} icon="fas fa-file-word" onclick={makeApplyStyle('word')} />, 950);
    //items.add('size', <MarkdownButton title={tooltip('button_tooltip_size')} icon="fas fa-text-height" onclick={makeApplyStyle('size')} />, 1000);
    //items.add('color', <MarkdownButton title={tooltip('button_tooltip_color')} icon="fas fa-palette" onclick={makeApplyStyle('color')} />, 1000);
    //items.add('bar', <MarkdownButton title={tooltip('button_tooltip_bar')} icon="fas fa-tasks" onclick={makeApplyStyle('bar')} />, 800);
    
    
    items.add(
      "color",
      Dropdown.component(
        {
          className: "More-BBcode-Dropdown item-color",
          //buttonClassName: "Button Button--flat",
          label: icon("fas fa-palette"),
        },
        this.color().toArray()
      ),
      900
    );    
    items.add(
      "size",
      Dropdown.component(
        {
          className: "More-BBcode-Dropdown item-size",
          //buttonClassName: "Button Button--flat",
          label: icon("fas fa-text-height"),
        },
        this.size().toArray()
      ),
      850
    );
    items.add(
      "alert",
      Dropdown.component(
        {
          className: "More-BBcode-Dropdown item-alert",
          //buttonClassName: "Button Button--flat",
          label: icon("fas fa-bell"),
        },
        this.alert().toArray()
      ),
      800
    );
    items.add(
      "bar",
      Dropdown.component(
        {
          className: "More-BBcode-Dropdown item-bar",
          //buttonClassName: "Button Button--flat",
          label: icon("fas fa-bars"),
        },
        this.bar().toArray()
      ),
      100
    );
    items.add('tab', <MarkdownButton title={tooltip('button_tooltip_tab')} icon="fas fa-tasks" onclick={makeApplyStyle('tab')} />, 0);
    

    return items;
  }

    /**
   * Build an item list for the contents of the dropdown menu.
   *
   * @return {ItemList}
   */

  size(oldFunc) {
    const items = typeof oldFunc === "function" ? oldFunc() : new ItemList();

    const modifierKey = navigator.userAgent.match(/Macintosh/) ? '⌘' : 'ctrl';

    const styles = {
      size_18: { prefix: "[size=18] Change text", suffix: " [/size]", trimFirst: true },
      size_20: { prefix: "[size=20] Change text", suffix: " [/size]", trimFirst: true },
      size_22: { prefix: "[size=22] Change text", suffix: " [/size]", trimFirst: true },
      size_24: { prefix: "[size=24] Change text", suffix: " [/size]", trimFirst: true },
      size_26: { prefix: "[size=26] Change text", suffix: " [/size]", trimFirst: true },
      size_28: { prefix: "[size=28] Change text", suffix: " [/size]", trimFirst: true },
      size_30: { prefix: "[size=30] Change text", suffix: " [/size]", trimFirst: true },
      size_32: { prefix: "[size=32] Change text", suffix: " [/size]", trimFirst: true },
      size_34: { prefix: "[size=34] Change text", suffix: " [/size]", trimFirst: true },
      size_36: { prefix: "[size=36] Change text", suffix: " [/size]", trimFirst: true },
      size_38: { prefix: "[size=38] Change text", suffix: " [/size]", trimFirst: true },
      size_40: { prefix: "[size=40] Change text", suffix: " [/size]", trimFirst: true },
    };

    //extend(BasicEditorDriver.prototype, 'keyHandlers', function (items) {
    //  items.add("h2", makeShortcut("h2", "2", this));
    //  items.add("h3", makeShortcut("h3", "3", this));
    //  items.add('h4', makeShortcut('h4', '4', this));
    //});
  

    const applyStyle = (id, editorDriver) => {
      // This is a nasty hack that breaks encapsulation of the editor.
      // In future releases, we'll need to tweak the editor driver interface
      // to support triggering events like this.
      styleSelectedText(editorDriver.el, styles[id]);
    };


    function makeShortcut(id, key, editorDriver) {
      return function (e) {
        if (e.key === key && ((e.metaKey && modifierKey === '⌘') || (e.ctrlKey && modifierKey === 'ctrl'))) {
          e.preventDefault();
          applyStyle(id, editorDriver);
        }
      };
    }

    function tooltip(name, hotkey) {
      //return app.translator.trans(`imeepo-more-bbcode.forum.${name}_tooltip`) + (hotkey ? ` <${modifierKey}-${hotkey}>` : '');
      //return app.translator.trans(`imeepo-more-bbcode.forum.${name}`);
      //return app.translator.trans(`imeepo-more-bbcode.forum.${name}`) + (hotkey ? ` <${modifierKey}-${hotkey}>` : '');
    }

    const makeApplyStyle = (id) => {
      return () => applyStyle(id, this.attrs.textEditor);
    };

    items.add('size_18', <MarkdownButton title={tooltip('size_18')} icon="fas fa-font" onclick={makeApplyStyle('size_18')} />, 2000);
    items.add('size_20', <MarkdownButton title={tooltip('size_20')} icon="fas fa-font" onclick={makeApplyStyle('size_20')} />, 1900);
    items.add('size_22', <MarkdownButton title={tooltip('size_22')} icon="fas fa-font" onclick={makeApplyStyle('size_22')} />, 1800);
    items.add('size_24', <MarkdownButton title={tooltip('size_24')} icon="fas fa-font" onclick={makeApplyStyle('size_24')} />, 1700);
    items.add('size_26', <MarkdownButton title={tooltip('size_26')} icon="fas fa-font" onclick={makeApplyStyle('size_26')} />, 1600);
    items.add('size_28', <MarkdownButton title={tooltip('size_28')} icon="fas fa-font" onclick={makeApplyStyle('size_28')} />, 1500);
    items.add('size_30', <MarkdownButton title={tooltip('size_30')} icon="fas fa-font" onclick={makeApplyStyle('size_30')} />, 1400);
    items.add('size_32', <MarkdownButton title={tooltip('size_32')} icon="fas fa-font" onclick={makeApplyStyle('size_32')} />, 1300);
    items.add('size_34', <MarkdownButton title={tooltip('size_34')} icon="fas fa-font" onclick={makeApplyStyle('size_34')} />, 1200);
    items.add('size_36', <MarkdownButton title={tooltip('size_36')} icon="fas fa-font" onclick={makeApplyStyle('size_36')} />, 1100);
    items.add('size_38', <MarkdownButton title={tooltip('size_38')} icon="fas fa-font" onclick={makeApplyStyle('size_38')} />, 1000);
    items.add('size_40', <MarkdownButton title={tooltip('size_40')} icon="fas fa-font" onclick={makeApplyStyle('size_40')} />, 900);
    
    return items;
  }

  color(oldFunc) {
    const items = typeof oldFunc === "function" ? oldFunc() : new ItemList();

    const modifierKey = navigator.userAgent.match(/Macintosh/) ? '⌘' : 'ctrl';

    const styles = {
      colorT: { prefix: "[colort] Change text", suffix: " [/colort]", trimFirst: true },
      colorG: { prefix: "[colorg] Change text", suffix: " [/colorg]", trimFirst: true },
      colorB: { prefix: "[colorb] Change text", suffix: " [/colorb]", trimFirst: true },
      colorP: { prefix: "[colorp] Change text", suffix: " [/colorp]", trimFirst: true },
      colorY: { prefix: "[colory] Change text", suffix: " [/colory]", trimFirst: true },
      colorO: { prefix: "[coloro] Change text", suffix: " [/coloro]", trimFirst: true },
      colorR: { prefix: "[colorr] Change text", suffix: " [/colorr]", trimFirst: true },
      colorS: { prefix: "[colors] Change text", suffix: " [/colors]", trimFirst: true },
    };

    //extend(BasicEditorDriver.prototype, 'keyHandlers', function (items) {
    //  items.add("h2", makeShortcut("h2", "2", this));
    //  items.add("h3", makeShortcut("h3", "3", this));
    //  items.add('h4', makeShortcut('h4', '4', this));
    //});
  

    const applyStyle = (id, editorDriver) => {
      // This is a nasty hack that breaks encapsulation of the editor.
      // In future releases, we'll need to tweak the editor driver interface
      // to support triggering events like this.
      styleSelectedText(editorDriver.el, styles[id]);
    };


    function makeShortcut(id, key, editorDriver) {
      return function (e) {
        if (e.key === key && ((e.metaKey && modifierKey === '⌘') || (e.ctrlKey && modifierKey === 'ctrl'))) {
          e.preventDefault();
          applyStyle(id, editorDriver);
        }
      };
    }

    function tooltip(name, hotkey) {
      //return app.translator.trans(`imeepo-more-bbcode.forum.${name}_tooltip`) + (hotkey ? ` <${modifierKey}-${hotkey}>` : '');
      //return app.translator.trans(`imeepo-more-bbcode.forum.${name}`);
      return app.translator.trans(`imeepo-more-bbcode.forum.${name}`) + (hotkey ? ` <${modifierKey}-${hotkey}>` : '');
    }

    const makeApplyStyle = (id) => {
      return () => applyStyle(id, this.attrs.textEditor);
    };

    items.add('colorT', <MarkdownButton title={tooltip('colorT')} icon="fas fa-color-t" onclick={makeApplyStyle('colorT')} />, 1000);
    items.add('colorG', <MarkdownButton title={tooltip('colorG')} icon="fas fa-color-g" onclick={makeApplyStyle('colorG')} />, 1000);
    items.add('colorB', <MarkdownButton title={tooltip('colorB')} icon="fas fa-color-b" onclick={makeApplyStyle('colorB')} />, 1000);
    items.add('colorP', <MarkdownButton title={tooltip('colorP')} icon="fas fa-color-p" onclick={makeApplyStyle('colorP')} />, 1000);
    items.add('colorY', <MarkdownButton title={tooltip('colorY')} icon="fas fa-color-y" onclick={makeApplyStyle('colorY')} />, 1000);
    items.add('colorO', <MarkdownButton title={tooltip('colorO')} icon="fas fa-color-o" onclick={makeApplyStyle('colorO')} />, 1000);
    items.add('colorR', <MarkdownButton title={tooltip('colorR')} icon="fas fa-color-r" onclick={makeApplyStyle('colorR')} />, 1000);
    items.add('colorS', <MarkdownButton title={tooltip('colorS')} icon="fas fa-color-s" onclick={makeApplyStyle('colorS')} />, 1000);

    return items;
  }
  heading(oldFunc) {
    const items = typeof oldFunc === "function" ? oldFunc() : new ItemList();

    const modifierKey = navigator.userAgent.match(/Macintosh/) ? '⌘' : 'ctrl';

    const styles = {
      h2: { prefix: '## ', suffix: ' ##', trimFirst: true },
      h3: { prefix: '### ', suffix: ' ###', trimFirst: true },
      h4: { prefix: '#### ', suffix: ' ####', trimFirst: true },
      h5: { prefix: '##### ', suffix: ' #####', trimFirst: true },
      h6: { prefix: '###### ', suffix: ' ######', trimFirst: true },
    };

    extend(BasicEditorDriver.prototype, 'keyHandlers', function (items) {
      items.add("h2", makeShortcut("h2", "2", this));
      items.add("h3", makeShortcut("h3", "3", this));
      items.add('h4', makeShortcut('h4', '4', this));
    });
  

    const applyStyle = (id, editorDriver) => {
      // This is a nasty hack that breaks encapsulation of the editor.
      // In future releases, we'll need to tweak the editor driver interface
      // to support triggering events like this.
      styleSelectedText(editorDriver.el, styles[id]);
    };


    function makeShortcut(id, key, editorDriver) {
      return function (e) {
        if (e.key === key && ((e.metaKey && modifierKey === '⌘') || (e.ctrlKey && modifierKey === 'ctrl'))) {
          e.preventDefault();
          applyStyle(id, editorDriver);
        }
      };
    }

    function tooltip(name, hotkey) {
      //return app.translator.trans(`imeepo-more-bbcode.forum.${name}_tooltip`) + (hotkey ? ` <${modifierKey}-${hotkey}>` : '');
      //return app.translator.trans(`imeepo-more-bbcode.forum.${name}`);
      return app.translator.trans(`imeepo-more-bbcode.forum.${name}`) + (hotkey ? ` <${modifierKey}-${hotkey}>` : '');
    }

    const makeApplyStyle = (id) => {
      return () => applyStyle(id, this.attrs.textEditor);
    };

    items.add('h2', <MarkdownButton title={tooltip('h2', '2')} icon="fas fa-h2" onclick={makeApplyStyle('h2')} />, 500);
    items.add('h3', <MarkdownButton title={tooltip('h3', '3')} icon="fas fa-h3" onclick={makeApplyStyle('h3')} />, 400);
    items.add('h4', <MarkdownButton title={tooltip('h4', '4')} icon="fas fa-h4" onclick={makeApplyStyle('h4')} />, 300);
    items.add('h5', <MarkdownButton title={tooltip('h5', '5')} icon="fas fa-h5" onclick={makeApplyStyle('h5')} />, 200);
    items.add('h6', <MarkdownButton title={tooltip('h6', '6')} icon="fas fa-h6" onclick={makeApplyStyle('h6')} />, 100);
    /*items.add(
      "h2",
      Button.component(
        {
          icon: "fas fa-align-right",
          onclick: () => this.right(),
        },
        app.translator.trans("imeepo-more-bbcode.forum.button_tooltip_right")
      ),
      50
    );*/


    return items;
  }
  alert(oldFunc) {
    const items = typeof oldFunc === "function" ? oldFunc() : new ItemList();

    const modifierKey = navigator.userAgent.match(/Macintosh/) ? '⌘' : 'ctrl';

    const styles = {
      warning: { prefix: '[awarning] this is an awarning message.', suffix: ' [/awarning]', trimFirst: true },
      asuccess: { prefix: '[asuccess] this is an asuccess message.', suffix: ' [/asuccess]', trimFirst: true },
      ainfo: { prefix: '[ainfo] this is an ainfo message.', suffix: ' [/ainfo]', trimFirst: true },
      abasic: { prefix: '[abasic] this is an abasic message.', suffix: ' [/abasic]', trimFirst: true },
      acustom: { prefix: '[acustom]red,black,green,this is an acustom message.', suffix: ' [/acustom]', trimFirst: true },
      bcustom: { prefix: '[bcustom]title=this is a bcustom title font=red bg=black border=green', suffix: '[/bcustom]', trimFirst: true },

      
      bwarning: { prefix: '[bwarning] this is n bwarning message.', suffix: ' [/bwarning]', trimFirst: true },
      bsuccess: { prefix: '[bsuccess] this is an bsuccess message.', suffix: ' [/bsuccess]', trimFirst: true },
      berror: { prefix: '[berror] this is a berror message.', suffix: ' [/berror]', trimFirst: true },
      bnotice: { prefix: '[bnotice] this is an bnotice message.', suffix: ' [/bnotice]', trimFirst: true },

      cwarning: { prefix: '[cwarning]darkorange,white,darkorange,THIS IS A CWARNING TITLE,This is a CWARNING message.', suffix: ' [/cwarning]', trimFirst: true },
      cnotice: { prefix: '[cnotice]teal,white,teal,this is a cnotice title,this is a cnotice message.', suffix: ' [/cnotice]', trimFirst: true },
      cerror: { prefix: '[cerror]red,white,red,this is a cerror title,this is a cerror message.', suffix: ' [/cerror]', trimFirst: true },
      csuccess: { prefix: '[csuccess]green,white,green,this is a cerror title,this is a csuccess message.', suffix: ' [/csuccess]', trimFirst: true },

      dnotice: { prefix: '[dnotice title="this is a dnotice title" font="teal" bg="white" border="teal"] this is a dnotice message.', suffix: ' [/dnotice]', trimFirst: true },
      derror: { prefix: '[derror title="this is a derror title" font="red" bg="white" border="red"]this is a derror message.', suffix: ' [/derror]', trimFirst: true },
      dwarning: { prefix: '[dwarning title="this is a dwarning title" font="darkorange" bg="white" border="darkorange"]this is a dwarning message.', suffix: ' [/dwarning]', trimFirst: true },
      dsuccess: { prefix: '[dsuccess title="this is a dsuccess title" font="green" bg="white" border="green"]this is a dsuccess message.', suffix: ' [/dsuccess]', trimFirst: true },
    };

    //extend(BasicEditorDriver.prototype, 'keyHandlers', function (items) {
      //items.add("h2", makeShortcut("h2", "2", this));
      //items.add("h3", makeShortcut("h3", "3", this));
      //items.add('h4', makeShortcut('h4', '4', this));
    //});
  

    const applyStyle = (id, editorDriver) => {
      // This is a nasty hack that breaks encapsulation of the editor.
      // In future releases, we'll need to tweak the editor driver interface
      // to support triggering events like this.
      styleSelectedText(editorDriver.el, styles[id]);
    };


    function makeShortcut(id, key, editorDriver) {
      return function (e) {
        if (e.key === key && ((e.metaKey && modifierKey === '⌘') || (e.ctrlKey && modifierKey === 'ctrl'))) {
          e.preventDefault();
          applyStyle(id, editorDriver);
        }
      };
    }

    function tooltip(name, hotkey) {
      //return app.translator.trans(`imeepo-more-bbcode.forum.${name}_tooltip`) + (hotkey ? ` <${modifierKey}-${hotkey}>` : '');
      //return app.translator.trans(`imeepo-more-bbcode.forum.${name}`);
      //return app.translator.trans(`imeepo-more-bbcode.forum.${name}`) + (hotkey ? ` <${modifierKey}-${hotkey}>` : '');
    }

    const makeApplyStyle = (id) => {
      return () => applyStyle(id, this.attrs.textEditor);
    };

    items.add('warning', <MarkdownButton title={tooltip('button_tooltip_notification_warning')} icon="fas fa-warning" onclick={makeApplyStyle('warning')} />, 2000);
    items.add('asuccess', <MarkdownButton title={tooltip('button_tooltip_notification_asuccess')} icon="fas fa-asuccess" onclick={makeApplyStyle('asuccess')} />, 1900);
    items.add('ainfo', <MarkdownButton title={tooltip('button_tooltip_notification_asuccess')} icon="fas fa-ainfo" onclick={makeApplyStyle('ainfo')} />, 1800);
    items.add('abasic', <MarkdownButton title={tooltip('button_tooltip_notification_abasic')} icon="fas fa-abasic" onclick={makeApplyStyle('abasic')} />, 1700);
    items.add('acustom', <MarkdownButton title={tooltip('button_tooltip_notification_acustom')} icon="fas fa-acustom" onclick={makeApplyStyle('acustom')} />, 1600);
    items.add('bcustom', <MarkdownButton title={tooltip('button_tooltip_notification_bcustom')} icon="fas fa-bcustom" onclick={makeApplyStyle('bcustom')} />, 800);
    
    items.add('bwarning', <MarkdownButton title={tooltip('button_tooltip_notification_bwarning')} icon="fas fa-bwarning" onclick={makeApplyStyle('bwarning')} />, 1500);
    items.add('bsuccess', <MarkdownButton title={tooltip('button_tooltip_notification_bsuccess')} icon="fas fa-bsuccess" onclick={makeApplyStyle('bsuccess')} />, 1400);
    items.add('berror', <MarkdownButton title={tooltip('button_tooltip_notification_berror')} icon="fas fa-berror" onclick={makeApplyStyle('berror')} />, 1300);
    items.add('bnotice', <MarkdownButton title={tooltip('button_tooltip_notification_bnotice')} icon="fas fa-bnotice" onclick={makeApplyStyle('bnotice')} />, 1100);
    
    items.add('cwarning', <MarkdownButton title={tooltip('button_tooltip_notification_cwarning')} icon="fas fa-cwarning" onclick={makeApplyStyle('cwarning')} />, 1200);
    items.add('cnotice', <MarkdownButton title={tooltip('button_tooltip_notification_cnotice')} icon="fas fa-cnotice" onclick={makeApplyStyle('cnotice')} />, 1100);
    items.add('cerror', <MarkdownButton title={tooltip('button_tooltip_notification_cerror')} icon="fas fa-cerror" onclick={makeApplyStyle('cerror')} />, 1000);
    items.add('csuccess', <MarkdownButton title={tooltip('button_tooltip_notification_csuccess')} icon="fas fa-csuccess" onclick={makeApplyStyle('csuccess')} />, 900);
    
    items.add('dnotice', <MarkdownButton title={tooltip('button_tooltip_notification_dnotice')} icon="fas fa-dnotice" onclick={makeApplyStyle('dnotice')} />, 700);
    items.add('derror', <MarkdownButton title={tooltip('button_tooltip_notification_derror')} icon="fas fa-derror" onclick={makeApplyStyle('derror')} />, 600);
    items.add('dwarning', <MarkdownButton title={tooltip('button_tooltip_notification_dwarning')} icon="fas fa-dwarning" onclick={makeApplyStyle('dwarning')} />, 500);
    items.add('dsuccess', <MarkdownButton title={tooltip('button_tooltip_notification_dsuccess')} icon="fas fa-dsuccess" onclick={makeApplyStyle('dsuccess')} />, 400);

    return items;
  }
  bar(oldFunc) {
    const items = typeof oldFunc === "function" ? oldFunc() : new ItemList();

    const modifierKey = navigator.userAgent.match(/Macintosh/) ? '⌘' : 'ctrl';

    const styles = {
      black: { prefix: '[pbar]Back-end,40% Complete,black,black,gray,1,40,20,0', suffix: '[/pbar]', trimFirst: true },
      blue: { prefix: '[pbar]Front-end,30% Complete,black,blue,teal,1,30,10,80', suffix: '[/pbar]', trimFirst: true },
      red: { prefix: '[pbar]Total,70% Complete,black,red,pink,1,70,5,40', suffix: '[/pbar]', trimFirst: true },
    };

    //extend(BasicEditorDriver.prototype, 'keyHandlers', function (items) {
      //items.add("h2", makeShortcut("h2", "2", this));
      //items.add("h3", makeShortcut("h3", "3", this));
      //items.add('h4', makeShortcut('h4', '4', this));
    //});
  

    const applyStyle = (id, editorDriver) => {
      // This is a nasty hack that breaks encapsulation of the editor.
      // In future releases, we'll need to tweak the editor driver interface
      // to support triggering events like this.
      styleSelectedText(editorDriver.el, styles[id]);
    };


    function makeShortcut(id, key, editorDriver) {
      return function (e) {
        if (e.key === key && ((e.metaKey && modifierKey === '⌘') || (e.ctrlKey && modifierKey === 'ctrl'))) {
          e.preventDefault();
          applyStyle(id, editorDriver);
        }
      };
    }

    function tooltip(name, hotkey) {
      //return app.translator.trans(`imeepo-more-bbcode.forum.${name}_tooltip`) + (hotkey ? ` <${modifierKey}-${hotkey}>` : '');
      //return app.translator.trans(`imeepo-more-bbcode.forum.${name}`);
      return app.translator.trans(`imeepo-more-bbcode.forum.${name}`) + (hotkey ? ` <${modifierKey}-${hotkey}>` : '');
    }

    const makeApplyStyle = (id) => {
      return () => applyStyle(id, this.attrs.textEditor);
    };

    items.add('black', <MarkdownButton title={tooltip('button_tooltip_bar_black')} icon="fas fa-bars black" onclick={makeApplyStyle('black')} />);
    items.add('blue', <MarkdownButton title={tooltip('button_tooltip_bar_blue')} icon="fas fa-bars blue" onclick={makeApplyStyle('blue')} />);
    items.add('red', <MarkdownButton title={tooltip('button_tooltip_bar_red')} icon="fas fa-bars red" onclick={makeApplyStyle('red')} />);
    
    return items;
  }


}

app.initializers.add("litalino/more-bbcode", () => {
  extend(CommentPost.prototype, "content", function () {
    if (app.session.user && app.current.matches(DiscussionPage)) {
      $(".reply2see_reply")
        .off("click")
        .on("click", () =>
          DiscussionControls.replyAction.call(
            app.current.get("discussion"),
            true,
            false
          )
        );
      $(".like2see_like")
        .off("click")
        .on("click", () =>
          DiscussionControls.likesAction.call(
            app.current.get("discussion"),
            true,
            false
          )
        );
    } else {
      $(".reply2see_reply")
        .off("click")
        .on("click", () => app.modal.show(LogInModal));
      $(".login2see_login")
        .off("click")
        .on("click", () => app.modal.show(LogInModal));
      $(".like2see_like")
        .off("click")
        .on("click", () => app.modal.show(LogInModal));
    }
  });

  // TODO: Find a better way to trigger this.
  //window.addEventListener('load', function() {
  //	populateGDocs();
  //});

  extend(PostStream.prototype, "oncreate", function () {
    populateGDocs();
  });

  /*extend(TextEditor.prototype, "toolbarItems", function (items) {
    
    items.add(
      "bbextend-google-doc",
      <TextEditorButton
        onclick={() => {
          this.attrs.composer.editor.insertAtCursor("[gdoc][/gdoc]");
          const range = this.attrs.composer.editor.getSelectionRange();
          this.attrs.composer.editor.moveCursorTo(range[1] - 8);
        }}
        icon="fas fa-file-word"
      >
      {app.translator.trans("imeepo-more-bbcode.forum.button_tooltip_word")}
      </TextEditorButton>
    );
  });*/

  //bbcode-tabs
  let id = 0;


  const createTabs = function () {
    const containers = this.$(".tabs");

    containers.each((i, container) => {
      const $container = $(container);

      if ($container.find('input[type="radio"][name]').length) return;

      const $inputs = $container.find('> .tab > input[type="radio"]');

      if (!$inputs.length) return;

      const $items = $container.find(".tab");
      const num = id++;

      $inputs.attr("name", `tab-group-${num}`);

      if (!$inputs.is("[checked]"))
        $inputs[0].setAttribute("checked", "checked");

      $items.each((i, item) => {
        const $item = $(item);
        const id = `tab-${num}-${++i}`;

        $item.find('input[type="radio"]').attr("id", id);
        $item.find("label").attr("for", id);
      });
    });
  };

  extend(CommentPost.prototype, ["oncreate", "onupdate"], createTabs);
  extend(ComposerPostPreview.prototype, "oncreate", function () {
    extend(this.attrs, "surround", () => createTabs.call(this));
  });

});

// Extra style attributes that are added to each line.
// There's a couple things that need manual tweaking.
var extraDocStyles = 'margin-bottom: 0;';

function populateGDocs() {
	var posts = document.getElementsByClassName('Post-body');
	if (posts.length == 0) { return; }

	for (var i = 0; i < posts.length; i++) {
		var post = posts[i];
		var gdocs = post.getElementsByClassName('bbextend-gdoc');
		for (var j = 0; j < gdocs.length; j++) {
			var gdoc = gdocs[j];
			var url = gdoc.getElementsByTagName('a')[0].getAttribute('href');

			// Remove the class from gdoc so we only try to process it once.
			gdoc.classList.remove('bbextend-gdoc');

			if (!url.startsWith('https://docs.google.com/document/d/')) {
				gdoc.innerHTML = '<i class="fas fa-triangle-exclamation"></i> Invalid Google Doc URL';
				continue;
			}

			gdoc.innerHTML = '<i class="fas fa-ellipsis fa-fade"></i> Loading Google Doc...';

			// remove anything after the last slash of the url.
			url = url.substring(0, url.lastIndexOf('/'));

			var xhr = new XMLHttpRequest();

			xhr.open('GET', url + '/pub', true);

			xhr.responseType = 'document';

			xhr.onload = function() {
				if (this.status == 200) {
					var doc = this.responseXML;
					var html = doc.getElementsByTagName('body')[0].innerHTML;

					gdoc.innerHTML = html;

					// We get the part of the html we want and get rid of the rest.
					// Basiclly we just keep the style information and the actual document body.
					var contents = gdoc.childNodes[1];

					while (gdoc.firstChild) {
						gdoc.removeChild(gdoc.firstChild);
					}

					gdoc.appendChild(contents);

					var style = gdoc.childNodes[0].childNodes[0].innerHTML;
					var div = gdoc.childNodes[0].childNodes[1];

					// Pharse the <style> element from the google doc.
					// We're reformatting it into strings that can be put directly in the style tag of the elements.
					var styles = {};

					style.split('}').forEach(function(e) {
						var parts = e.split('{');

						var element = parts[0];
						var style = parts[1];

						if (!style) { return; }

						styles[element] = style + ";";

						//console.log(element, styles[element]);
					});

					gdoc.childNodes[0].removeChild(gdoc.childNodes[0].childNodes[0]);

					function applyStyle(element) {
						if (element.childNodes.length > 0) {
							for (var i = 0; i < element.childNodes.length; i++) {
								applyStyle(element.childNodes[i]);
							}
						}

						if (!element.className) { return; }

						var classes = element.className.split(' ');

						var styleString = '';

						classes.forEach(function(e) {
							styleString += styles['.' + e];
						});

						element.setAttribute('style', styleString + extraDocStyles);

						// Just in case theres anything in Flarum that'll match the class name.
						// This is because we want to follow google doc's style exclusively.
						element.removeAttribute('class');
					}

					applyStyle(div);

					// We need to manually override the max-width of the document to fill the post container.
					var divStyle = div.getAttribute('style').split(';');

					divStyle.forEach(function(e, i) {
						if (e.includes('max-width')) {
							divStyle[i] = 'max-width: 100%';
						}
					});

					// Fallback to make sure the text is readable, sometimes it doesn't import with a color set.
					div.setAttribute('style', 'color: #000;' + divStyle.join(';'));

					var link = document.createElement('a');
					link.setAttribute('href', url);
					link.setAttribute('target', '_blank');
					link.innerHTML = '<i class="fas fa-file-word"></i> View Google Doc';

					gdoc.appendChild(link);
				}
			};

			xhr.onerror = function() {
				gdoc.innerHTML = '<i class="fas fa-triangle-exclamation"></i> Failed to load Google Doc';
			};

			xhr.send();
		}
	}
};