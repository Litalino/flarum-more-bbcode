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
import Separator from "flarum/components/Separator";

import ComposerPostPreview from "flarum/forum/components/ComposerPostPreview";

///////////////////
import styleSelectedText from "flarum/common/utils/styleSelectedText";

import MarkdownButton from "./MarkdownButton";

///////////////////


function makeShortcut(id, key, editorDriver) {
  return function (e) {
    if (e.key === key && ((e.metaKey && modifierKey === '⌘') || (e.ctrlKey && modifierKey === 'ctrl'))) {
      e.preventDefault();
      applyStyle(id, editorDriver);
    }
  };
}

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

      warning: { prefix: '[awarning] ', suffix: ' [/awarning]', trimFirst: true },
      asuccess: { prefix: '[asuccess] ', suffix: ' [/asuccess]', trimFirst: true },
      ainfo: { prefix: '[ainfo] ', suffix: ' [/ainfo]', trimFirst: true },
      abasic: { prefix: '[abasic] ', suffix: ' [/abasic]', trimFirst: true },
	    acustom: { prefix: '[acustom] ', suffix: ' [/acustom]', trimFirst: true },
      bwarning: { prefix: '[bwarning] ', suffix: ' [/bwarning]', trimFirst: true },
      bsuccess: { prefix: '[bsuccess] ', suffix: ' [/bsuccess]', trimFirst: true },
      berror: { prefix: '[berror] ', suffix: ' [/berror]', trimFirst: true },
      cwarning: { prefix: '[cwarning] ', suffix: ' [/cwarning]', trimFirst: true },
      cnotice: { prefix: '[cnotice] ', suffix: ' [/cnotice]', trimFirst: true },
      cerror: { prefix: '[cerror] ', suffix: ' [/cerror]', trimFirst: true },
      csuccess: { prefix: '[csuccess] ', suffix: ' [/csuccess]', trimFirst: true },
      bcustom: { prefix: '[bcustom] ', suffix: ' [/bcustom]', trimFirst: true },
      dnotice: { prefix: '[dnotice] ', suffix: ' [/dnotice]', trimFirst: true },
      derror: { prefix: '[derror] ', suffix: ' [/derror]', trimFirst: true },
      dwarning: { prefix: '[dwarning] ', suffix: ' [/dwarning]', trimFirst: true },
      dsuccess: { prefix: '[dsuccess] ', suffix: ' [/dsuccess]', trimFirst: true },
      
      //bold: { prefix: '**', suffix: '**', trimFirst: true },
      //italic: { prefix: '_', suffix: '_', trimFirst: true },
      //strikethrough: { prefix: '~~', suffix: '~~', trimFirst: true },
      //quote: { prefix: '> ', multiline: true, surroundWithNewlines: true },
      //code: { prefix: '`', suffix: '`', blockPrefix: '```', blockSuffix: '```' },
      //link: { prefix: '[', suffix: '](https://)', replaceNext: 'https://', scanFor: 'https?://' },
      //image: { prefix: '![', suffix: '](https://)', replaceNext: 'https://', scanFor: 'https?://' },
      //unordered_list: { prefix: '- ', multiline: true, surroundWithNewlines: true },
      //ordered_list: { prefix: '1. ', multiline: true, orderedList: true },
      //spoiler: { prefix: '>!', suffix: '!<', blockPrefix: '>! ', multiline: true, trimFirst: true },
    };

    const applyStyle = (id, editorDriver) => {
      // This is a nasty hack that breaks encapsulation of the editor.
      // In future releases, we'll need to tweak the editor driver interface
      // to support triggering events like this.
      styleSelectedText(editorDriver.el, styles[id]);
    };

    const items = typeof oldFunc === 'function' ? oldFunc() : new ItemList();
    

    function tooltip(name, hotkey) {
      //return app.translator.trans(`imeepo-more-bbcode.forum.${name}_tooltip`) + (hotkey ? ` <${modifierKey}-${hotkey}>` : '');
      return app.translator.trans(`imeepo-more-bbcode.forum.${name}`);
    }

    const makeApplyStyle = (id) => {
      return () => applyStyle(id, this.attrs.textEditor);
    };

    items.add('left', <MarkdownButton title={tooltip('button_tooltip_left')} icon="fas fa-align-left" onclick={makeApplyStyle('left')} />, 1000);
    items.add('center', <MarkdownButton title={tooltip('button_tooltip_center')} icon="fas fa-align-center" onclick={makeApplyStyle('center')} />, 1000);
    items.add('right', <MarkdownButton title={tooltip('button_tooltip_right')} icon="fas fa-align-right" onclick={makeApplyStyle('right')} />, 1000);
    items.add('justify', <MarkdownButton title={tooltip('button_tooltip_justify')} icon="fas fa-align-justify" onclick={makeApplyStyle('justify')} />, 1000);
    items.add('dropcap', <MarkdownButton title={tooltip('button_tooltip_dropcap')} icon="fas fa-list-alt" onclick={makeApplyStyle('dropcap')} />, 1000);
    items.add('ileft', <MarkdownButton title={tooltip('button_tooltip_img_left')} icon="fas fa-fast-backward" onclick={makeApplyStyle('ileft')} />, 1000);
    items.add('iright', <MarkdownButton title={tooltip('button_tooltip_img_right')} icon="fas fa-fast-forward" onclick={makeApplyStyle('iright')} />, 1000);
    items.add('pleft', <MarkdownButton title={tooltip('button_tooltip_p_left')} icon="fas fa-outdent" onclick={makeApplyStyle('pleft')} />, 1000);
    items.add('pright', <MarkdownButton title={tooltip('button_tooltip_p_right')} icon="fas fa-indent" onclick={makeApplyStyle('pright')} />, 1000);
    items.add('details', <MarkdownButton title={tooltip('button_tooltip_details')} icon="fas fa-eye-slash" onclick={makeApplyStyle('details')} />, 1000);
    items.add('like', <MarkdownButton title={tooltip('button_tooltip_like')} icon="fas fa-thumbs-up" onclick={makeApplyStyle('like')} />, 1000);
    items.add('reply', <MarkdownButton title={tooltip('button_tooltip_reply')} icon="fas fa-reply-all" onclick={makeApplyStyle('reply')} />, 1000);
    items.add('login', <MarkdownButton title={tooltip('button_tooltip_login')} icon="fas fa-sign-in-alt" onclick={makeApplyStyle('login')} />, 1000);
    items.add('cloud', <MarkdownButton title={tooltip('button_tooltip_cloud')} icon="fas fa-download" onclick={makeApplyStyle('cloud')} />, 1000);
    items.add('down', <MarkdownButton title={tooltip('button_tooltip_down')} icon="fas fa-download" onclick={makeApplyStyle('down')} />, 1000);
    items.add('audio', <MarkdownButton title={tooltip('button_tooltip_audio')} icon="fas fa-file-audio" onclick={makeApplyStyle('audio')} />, 1000);
    items.add('clip', <MarkdownButton title={tooltip('button_tooltip_clip')} icon="fas fa-file-video" onclick={makeApplyStyle('clip')} />, 1000);
    items.add('table', <MarkdownButton title={tooltip('button_tooltip_table')} icon="fas fa-table" onclick={makeApplyStyle('table')} />, 1000);
    items.add('word', <MarkdownButton title={tooltip('button_tooltip_word')} icon="fas fa-file-word" onclick={makeApplyStyle('word')} />, 1000);
    items.add('size', <MarkdownButton title={tooltip('button_tooltip_size')} icon="fas fa-text-height" onclick={makeApplyStyle('size')} />, 1000);
    items.add('color', <MarkdownButton title={tooltip('button_tooltip_color')} icon="fas fa-palette" onclick={makeApplyStyle('color')} />, 1000);
    items.add('tab', <MarkdownButton title={tooltip('button_tooltip_tab')} icon="fas fa-tasks" onclick={makeApplyStyle('tab')} />, 1000);

    items.add('warning', <MarkdownButton title={tooltip('button_tooltip_notification_warning')} icon="fas fa-bell" onclick={makeApplyStyle('warning')} />, 1000);
    items.add('asuccess', <MarkdownButton title={tooltip('button_tooltip_notification_asuccess')} icon="fas fa-bell" onclick={makeApplyStyle('asuccess')} />, 1000);
    items.add('ainfo', <MarkdownButton title={tooltip('button_tooltip_notification_asuccess')} icon="fas fa-bell" onclick={makeApplyStyle('ainfo')} />, 1000);
    items.add('abasic', <MarkdownButton title={tooltip('button_tooltip_notification_abasic')} icon="fas fa-bell" onclick={makeApplyStyle('abasic')} />, 1000);
    items.add('acustom', <MarkdownButton title={tooltip('button_tooltip_notification_acustom')} icon="fas fa-bell" onclick={makeApplyStyle('acustom')} />, 1000);
    items.add('bwarning', <MarkdownButton title={tooltip('button_tooltip_notification_bwarning')} icon="fas fa-bell" onclick={makeApplyStyle('bwarning')} />, 1000);
    items.add('bsuccess', <MarkdownButton title={tooltip('button_tooltip_notification_bsuccess')} icon="fas fa-bell" onclick={makeApplyStyle('bsuccess')} />, 1000);
    items.add('berror', <MarkdownButton title={tooltip('button_tooltip_notification_berror')} icon="fas fa-bell" onclick={makeApplyStyle('berror')} />, 1000);
    items.add('cwarning', <MarkdownButton title={tooltip('button_tooltip_notification_cwarning')} icon="fas fa-bell" onclick={makeApplyStyle('cwarning')} />, 1000);
    items.add('cnotice', <MarkdownButton title={tooltip('button_tooltip_notification_cnotice')} icon="fas fa-bell" onclick={makeApplyStyle('cnotice')} />, 1000);
    items.add('cerror', <MarkdownButton title={tooltip('button_tooltip_notification_cerror')} icon="fas fa-bell" onclick={makeApplyStyle('cerror')} />, 1000);
    items.add('csuccess', <MarkdownButton title={tooltip('button_tooltip_notification_csuccess')} icon="fas fa-bell" onclick={makeApplyStyle('csuccess')} />, 1000);
    items.add('bcustom', <MarkdownButton title={tooltip('button_tooltip_notification_bcustom')} icon="fas fa-bell" onclick={makeApplyStyle('bcustom')} />, 1000);
    items.add('dnotice', <MarkdownButton title={tooltip('button_tooltip_notification_dnotice')} icon="fas fa-bell" onclick={makeApplyStyle('dnotice')} />, 1000);
    items.add('derror', <MarkdownButton title={tooltip('button_tooltip_notification_derror')} icon="fas fa-bell" onclick={makeApplyStyle('derror')} />, 1000);
    items.add('dwarning', <MarkdownButton title={tooltip('button_tooltip_notification_dwarning')} icon="fas fa-bell" onclick={makeApplyStyle('dwarning')} />, 1000);
    items.add('dsuccess', <MarkdownButton title={tooltip('button_tooltip_notification_dsuccess')} icon="fas fa-bell" onclick={makeApplyStyle('dsuccess')} />, 1000);

    //items.add('bold', <MarkdownButton title={tooltip('bold', 'b')} icon="fas fa-bold" onclick={makeApplyStyle('bold')} />, 900);
    //items.add('italic', <MarkdownButton title={tooltip('italic', 'i')} icon="fas fa-italic" onclick={makeApplyStyle('italic')} />, 800);
    //items.add(
    //  'strikethrough',
    //  <MarkdownButton title={tooltip('strikethrough')} icon="fas fa-strikethrough" onclick={makeApplyStyle('strikethrough')} />,
    //  700
    //);
    //items.add('quote', <MarkdownButton title={tooltip('quote')} icon="fas fa-quote-left" onclick={makeApplyStyle('quote')} />, 600);
    //items.add('spoiler', <MarkdownButton title={tooltip('spoiler')} icon="fas fa-exclamation-triangle" onclick={makeApplyStyle('spoiler')} />, 500);
    //items.add('code', <MarkdownButton title={tooltip('code')} icon="fas fa-code" onclick={makeApplyStyle('code')} />, 400);
    //items.add('link', <MarkdownButton title={tooltip('link')} icon="fas fa-link" onclick={makeApplyStyle('link')} />, 300);
    //items.add('image', <MarkdownButton title={tooltip('image')} icon="fas fa-image" onclick={makeApplyStyle('image')} />, 200);
    //items.add(
    //  'unordered_list',
    //  <MarkdownButton title={tooltip('unordered_list')} icon="fas fa-list-ul" onclick={makeApplyStyle('unordered_list')} />,
    //  100
    //);
    //items.add('ordered_list', <MarkdownButton title={tooltip('ordered_list')} icon="fas fa-list-ol" onclick={makeApplyStyle('ordered_list')} />, 0);

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