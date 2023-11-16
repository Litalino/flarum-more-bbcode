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

export default class TextEditorButton extends Component {
  view() {
    return Dropdown.component(
      {
        className: "More-bbcode-buttonsDropdown",
        buttonClassName: "Button Button--flat",
        label: icon("fas fa-th-large"),
      },
      this.items().toArray()
    );
  }

  /**
   * Build an item list for the contents of the dropdown menu.
   *
   * @return {ItemList}
   */
  items() {
    const items = new ItemList();

    /**
     * Make selected text left.
     */
    items.add(
      "left",
      Button.component(
        {
          icon: "fas fa-align-center",
          onclick: () => this.left(),
        },
        app.translator.trans("imeepo-more-bbcode.forum.button_tooltip_left")
      ),
      50
    );

    /**
     * Make selected text Center.
     */
    items.add(
      "center",
      Button.component(
        {
          icon: "fas fa-align-center",
          onclick: () => this.center(),
        },
        app.translator.trans("imeepo-more-bbcode.forum.button_tooltip_center")
      ),
      0
    );

    /**
     * Make selected text Right.
     */
    items.add(
      "right",
      Button.component(
        {
          icon: "fas fa-align-right",
          onclick: () => this.right(),
        },
        app.translator.trans("imeepo-more-bbcode.forum.button_tooltip_right")
      ),
      0
    );

    /**
     * Make selected text Justify.
     */
    items.add(
      "justify",
      Button.component(
        {
          icon: "fas fa-align-justify",
          onclick: () => this.justify(),
        },
        app.translator.trans("imeepo-more-bbcode.forum.button_tooltip_justify")
      ),
      0
    );

    /**
     * Make selected text Dropcap.
     */
    items.add(
      "dropcap",
      Button.component(
        {
          icon: "fas fa-list-alt",
          onclick: () => this.dropcap(),
        },
        app.translator.trans("imeepo-more-bbcode.forum.button_tooltip_dropcap")
      ),
      0
    );

    /**
     * Make selected text Img left.
     */
    items.add(
      "ileft",
      Button.component(
        {
          icon: "fas fa-fast-backward",
          onclick: () => this.ileft(),
        },
        app.translator.trans("imeepo-more-bbcode.forum.button_tooltip_img_left")
      ),
      0
    );

    /**
     * Make selected text Img Right.
     */
    items.add(
      "iright",
      Button.component(
        {
          icon: "fas fa-fast-forward",
          onclick: () => this.iright(),
        },
        app.translator.trans(
          "imeepo-more-bbcode.forum.button_tooltip_img_right"
        )
      ),
      0
    );

    /**
     * Make selected text Padding left.
     */
    items.add(
      "pleft",
      Button.component(
        {
          icon: "fas fa-outdent",
          onclick: () => this.pleft(),
        },
        app.translator.trans("imeepo-more-bbcode.forum.button_tooltip_p_left")
      ),
      0
    );

    /**
     * Make selected text Padding Right.
     */
    items.add(
      "pright",
      Button.component(
        {
          icon: "fas fa-indent",
          onclick: () => this.pright(),
        },
        app.translator.trans("imeepo-more-bbcode.forum.button_tooltip_p_right")
      ),
      0
    );

    /**
     * Make selected text Detail.
     */
    items.add(
      "details",
      Button.component(
        {
          icon: "fas fa-eye-slash",
          onclick: () => this.details(),
        },
        app.translator.trans("imeepo-more-bbcode.forum.button_tooltip_details")
      ),
      0
    );

    /**
     * Make selected text Like.
     */
    items.add(
      "like",
      Button.component(
        {
          icon: "fas fa-thumbs-up",
          onclick: () => this.like(),
        },
        app.translator.trans("imeepo-more-bbcode.forum.button_tooltip_like")
      ),
      0
    );

    /**
     * Make selected text Raply.
     */
    items.add(
      "reply",
      Button.component(
        {
          icon: "fas fa-reply-all",
          onclick: () => this.reply(),
        },
        app.translator.trans("imeepo-more-bbcode.forum.button_tooltip_reply")
      ),
      0
    );

    /**
     * Make selected text Login.
     */
    items.add(
      "login",
      Button.component(
        {
          icon: "fas fa-sign-in-alt",
          onclick: () => this.login(),
        },
        app.translator.trans("imeepo-more-bbcode.forum.button_tooltip_login")
      ),
      0
    );

    /**
     * Make selected text cloud.
     */
    items.add(
      "imeepo-cloud",
      Button.component(
        {
          icon: "fas fa-download",
          onclick: () => this.cloud(),
        },
        app.translator.trans("imeepo-more-bbcode.forum.button_tooltip_cloud")
      ),
      0
    );

    /**
     * Make selected text Audio.
     */
    items.add(
      "audio",
      Button.component(
        {
          icon: "fas fa-file-audio",
          onclick: () => this.audio(),
        },
        app.translator.trans("imeepo-more-bbcode.forum.button_tooltip_audio")
      ),
      0
    );

    /**
     * Make selected text Audio.
     */
    items.add(
      "clip",
      Button.component(
        {
          icon: "fas fa-file-video",
          onclick: () => this.clip(),
        },
        app.translator.trans("imeepo-more-bbcode.forum.button_tooltip_clip")
      ),
      0
    );

    /**
     * Make selected text Table.
     */
    items.add(
      "table",
      Button.component(
        {
          icon: "fas fa-file-video",
          onclick: () => this.insertTable(),
        },
        app.translator.trans("imeepo-more-bbcode.forum.button_tooltip_table")
      ),
      0
    );

    /**
     * Make selected text Word.
     */
    items.add(
      "word",
      Button.component(
        {
          icon: "fas fa-file-word",
          onclick: () => this.insertWord(),
        },
        app.translator.trans("imeepo-more-bbcode.forum.button_tooltip_word")
      ),
      0
    );

    /**
     * Make selected text Size.
     */
    items.add(
      "size",
      Button.component(
        {
          icon: "fas fa-text-height",
          onclick: () => this.insertSize(),
        },
        app.translator.trans("imeepo-more-bbcode.forum.button_tooltip_size")
      ),
      0
    );

    /**
     * Make selected text Color.
     */
    items.add(
      "color",
      Button.component(
        {
          icon: "fas fa-palette",
          onclick: () => this.insertColor(),
        },
        app.translator.trans("imeepo-more-bbcode.forum.button_tooltip_color")
      ),
      0
    );

    /**
     * Make selected text Tab.
     */
    items.add(
      "tab",
      Button.component(
        {
          icon: "fas fa-tasks",
          onclick: () => this.insertTab(),
        },
        app.translator.trans("imeepo-more-bbcode.forum.button_tooltip_tab")
      ),
      0
    );

    /**
     * Make selected text Down.
     */
    items.add(
      "down",
      Button.component(
        {
          icon: "fas fa-download",
          onclick: () => this.insertDown(),
        },
        app.translator.trans("imeepo-more-bbcode.forum.button_tooltip_down")
      ),
      0
    );

    const symbols = JSON.parse(app.forum.attribute("editorSymbols") || "[]");

    if (symbols.length > 0) {
      items.add("sep", Separator.component());

      for (let i in symbols) {
        const symbol = symbols[i];
        items.add(
          "symbol-" + i,
          Button.component({
            children: symbol.label || symbol.insert,
            className: "Button",
            onclick: () => this.insertAtCursor(symbol.insert),
          })
        );
      }
    }

    /**
     * Make selected text Notification .
     */
    items.add(
      "warning",
      Button.component(
        {
          //icon: "fas fa-tasks",
          onclick: () => this.notification_warning(),
        },
        app.translator.trans("imeepo-more-bbcode.forum.button_tooltip_notification_warning")
      ),
      0
    );
    items.add(
      "asuccess",
      Button.component(
        {
          //icon: "fas fa-tasks",
          onclick: () => this.notification_asuccess(),
        },
        app.translator.trans(
          "imeepo-more-bbcode.forum.button_tooltip_notification_asuccess"
        )
      ),
      0
    );
    items.add(
      "ainfo",
      Button.component(
        {
          //icon: "fas fa-tasks",
          onclick: () => this.notification_ainfo(),
        },
        app.translator.trans(
          "imeepo-more-bbcode.forum.button_tooltip_notification_ainfo"
        )
      ),
      0
    );
    items.add(
      "abasic",
      Button.component(
        {
          //icon: "fas fa-tasks",
          onclick: () => this.notification_abasic(),
        },
        app.translator.trans(
          "imeepo-more-bbcode.forum.button_tooltip_notification_abasic"
        )
      ),
      0
    );
    items.add(
      "acustom",
      Button.component(
        {
          //icon: "fas fa-tasks",
          onclick: () => this.notification_acustom(),
        },
        app.translator.trans(
          "imeepo-more-bbcode.forum.button_tooltip_notification_acustom"
        )
      ),
      0
    );
    items.add(
      "bwarning",
      Button.component(
        {
          //icon: "fas fa-tasks",
          onclick: () => this.notification_bwarning(),
        },
        app.translator.trans(
          "imeepo-more-bbcode.forum.button_tooltip_notification_bwarning"
        )
      ),
      0
    );
    items.add(
      "bsuccess",
      Button.component(
        {
          //icon: "fas fa-tasks",
          onclick: () => this.notification_bsuccess(),
        },
        app.translator.trans(
          "imeepo-more-bbcode.forum.button_tooltip_notification_bsuccess"
        )
      ),
      0
    );
    items.add(
      "berror",
      Button.component(
        {
          //icon: "fas fa-tasks",
          onclick: () => this.notification_berror(),
        },
        app.translator.trans(
          "imeepo-more-bbcode.forum.button_tooltip_notification_berror"
        )
      ),
      0
    );
    items.add(
      "cwarning",
      Button.component(
        {
          //icon: "fas fa-tasks",
          onclick: () => this.notification_cwarning(),
        },
        app.translator.trans(
          "imeepo-more-bbcode.forum.button_tooltip_notification_cwarning"
        )
      ),
      0
    );
    items.add(
      "cnotice",
      Button.component(
        {
          //icon: "fas fa-tasks",
          onclick: () => this.notification_cnotice(),
        },
        app.translator.trans(
          "imeepo-more-bbcode.forum.button_tooltip_notification_cnotice"
        )
      ),
      0
    );
    items.add(
      "cerror",
      Button.component(
        {
          //icon: "fas fa-tasks",
          onclick: () => this.notification_cerror(),
        },
        app.translator.trans(
          "imeepo-more-bbcode.forum.button_tooltip_notification_cerror"
        )
      ),
      0
    );
    items.add(
      "csuccess",
      Button.component(
        {
          //icon: "fas fa-tasks",
          onclick: () => this.notification_csuccess(),
        },
        app.translator.trans(
          "imeepo-more-bbcode.forum.button_tooltip_notification_csuccess"
        )
      ),
      0
    );
    items.add(
      "bcustom",
      Button.component(
        {
          //icon: "fas fa-tasks",
          onclick: () => this.notification_bcustom(),
        },
        app.translator.trans(
          "imeepo-more-bbcode.forum.button_tooltip_notification_bcustom"
        )
      ),
      0
    );
    items.add(
      "dnotice",
      Button.component(
        {
          //icon: "fas fa-tasks",
          onclick: () => this.notification_dnotice(),
        },
        app.translator.trans(
          "imeepo-more-bbcode.forum.button_tooltip_notification_dnotice"
        )
      ),
      0
    );
    items.add(
      "derror",
      Button.component(
        {
          //icon: "fas fa-tasks",
          onclick: () => this.notification_derror(),
        },
        app.translator.trans(
          "imeepo-more-bbcode.forum.button_tooltip_notification_derror"
        )
      ),
      0
    );
    items.add(
      "dwarning",
      Button.component(
        {
          //icon: "fas fa-tasks",
          onclick: () => this.notification_dwarning(),
        },
        app.translator.trans(
          "imeepo-more-bbcode.forum.button_tooltip_notification_dwarning"
        )
      ),
      0
    );
    items.add(
      "dsuccess",
      Button.component(
        {
          //icon: "fas fa-tasks",
          onclick: () => this.notification_dsuccess(),
        },
        app.translator.trans(
          "imeepo-more-bbcode.forum.button_tooltip_notification_dsuccess"
        )
      ),
      0
    );

    return items;
  }

  /**
   * Make selected text left Right Center Justify.
   */
  left() {
    this.attrs.textEditor.insertAtCursor("[left][/left]");
    const range = this.attrs.textEditor.getSelectionRange();
    this.attrs.textEditor.moveCursorTo(range[1] - 7);
  }
  right() {
    this.attrs.textEditor.insertAtCursor("[right][/right]");
    const range = this.attrs.textEditor.getSelectionRange();
    this.attrs.textEditor.moveCursorTo(range[1] - 8);
  }
  center() {
    this.attrs.textEditor.insertAtCursor("[center][/center]");
    const range = this.attrs.textEditor.getSelectionRange();
    this.attrs.textEditor.moveCursorTo(range[1] - 9);
  }
  justify() {
    this.attrs.textEditor.insertAtCursor("[justify][/justify]");
    const range = this.attrs.textEditor.getSelectionRange();
    this.attrs.textEditor.moveCursorTo(range[1] - 10);
  }

  dropcap() {
    this.attrs.textEditor.insertAtCursor("[dropcap][/dropcap]");
    const range = this.attrs.textEditor.getSelectionRange();
    this.attrs.textEditor.moveCursorTo(range[1] - 10);
  }

  ileft() {
    this.attrs.textEditor.insertAtCursor("[ileft][/ileft]");
    const range = this.attrs.textEditor.getSelectionRange();
    this.attrs.textEditor.moveCursorTo(range[1] - 8);
  }

  iright() {
    this.attrs.textEditor.insertAtCursor("[iright][/iright]");
    const range = this.attrs.textEditor.getSelectionRange();
    this.attrs.textEditor.moveCursorTo(range[1] - 9);
  }

  pleft() {
    this.attrs.textEditor.insertAtCursor("[pleft][/pleft]");
    const range = this.attrs.textEditor.getSelectionRange();
    this.attrs.textEditor.moveCursorTo(range[1] - 8);
  }

  pright() {
    this.attrs.textEditor.insertAtCursor("[pright][/pright]");
    const range = this.attrs.textEditor.getSelectionRange();
    this.attrs.textEditor.moveCursorTo(range[1] - 9);
  }

  details() {
    this.attrs.textEditor.insertAtCursor("[details=TITLE]CONTENT[/details]");
    const range = this.attrs.textEditor.getSelectionRange();
    this.attrs.textEditor.moveCursorTo(range[1] - 10);
  }

  reply() {
    this.attrs.textEditor.insertAtCursor("[reply][/reply]");
    const range = this.attrs.textEditor.getSelectionRange();
    this.attrs.textEditor.moveCursorTo(range[1] - 8);
  }

  login() {
    this.attrs.textEditor.insertAtCursor("[login][/login]");
    const range = this.attrs.textEditor.getSelectionRange();
    this.attrs.textEditor.moveCursorTo(range[1] - 8);
  }

  like() {
    this.attrs.textEditor.insertAtCursor("[like][/like]");
    const range = this.attrs.textEditor.getSelectionRange();
    this.attrs.textEditor.moveCursorTo(range[1] - 7);
  }

  cloud() {
    this.attrs.textEditor.insertAtCursor(
      "[cloud type=other title=title url=link]Password[/cloud]"
    );
    const range = this.attrs.textEditor.getSelectionRange();
    this.attrs.textEditor.moveCursorTo(range[1] - 8);
  }

  audio() {
    this.attrs.textEditor.insertAtCursor('[audio mp3="URL"]');
  }

  clip() {
    this.attrs.textEditor.insertAtCursor('[clip mp4="URL"]');
  }

  insertTable(e) {
    //console.log(e);
    //console.log(this.attrs.textEditor);
    this.attrs.textEditor.insertAtCursor(
      `|Column|Column|Column|Column|
|---|---|---|---|
| row  |  row | row | row  |` + "\n"
    );
  }

  insertWord() {
    //console.log(e);
    //console.log(this.attrs.textEditor);
    this.attrs.textEditor.insertAtCursor(`[GDOC][/GDOC]` + "\n");
    const range = this.attrs.textEditor.getSelectionRange();
    this.attrs.textEditor.moveCursorTo(range[1] - 7);
  }

  insertSize() {
    this.attrs.textEditor.insertAtCursor("[SIZE=16][/SIZE]");
    const range = this.attrs.textEditor.getSelectionRange();
    this.attrs.textEditor.moveCursorTo(range[1] - 7);
  }

  insertColor() {
    this.attrs.textEditor.insertAtCursor("[COLOR=red][/COLOR]");
    const range = this.attrs.textEditor.getSelectionRange();
    this.attrs.textEditor.moveCursorTo(range[1] - 8);
  }

  insertTab(e) {
    //console.log(e);
    //console.log(this.attrs.textEditor);
    this.attrs.textEditor.insertAtCursor(
      `[tabs]
    [tab="hi"]Hi[/tab]
    [tab="hello"]Hello[/tab]
[/tabs]` + "\n"
    );
  }

  insertDown() {
    this.attrs.textEditor.insertAtCursor("[down link=\"https://khatvongsong.vn/\" size=2kB name=file.zip]");
  }

  notification_awarning() {
    this.attrs.textEditor.insertAtCursor(
      "[awarning]this is an awarning message.[/awarning]"
    );
    const range = this.attrs.textEditor.getSelectionRange();
    this.attrs.textEditor.moveCursorTo(range[1] - 11);
  }
  notification_asuccess() {
    this.attrs.textEditor.insertAtCursor(
      "[asuccess]this is an asuccess message.[/asuccess]"
    );
    const range = this.attrs.textEditor.getSelectionRange();
    this.attrs.textEditor.moveCursorTo(range[1] - 11);
  }
  notification_ainfo() {
    this.attrs.textEditor.insertAtCursor(
      "[ainfo]this is an ainfo message.[/ainfo]"
    );
    const range = this.attrs.textEditor.getSelectionRange();
    this.attrs.textEditor.moveCursorTo(range[1] - 8);
  }
  notification_abasic() {
    this.attrs.textEditor.insertAtCursor(
      "[abasic]this is an abasic message.[/abasic]"
    );
    const range = this.attrs.textEditor.getSelectionRange();
    this.attrs.textEditor.moveCursorTo(range[1] - 9);
  }
  notification_acustom() {
    this.attrs.textEditor.insertAtCursor(
      "[acustom]red,black,green,this is an acustom message.[/acustom]"
    );
    const range = this.attrs.textEditor.getSelectionRange();
    this.attrs.textEditor.moveCursorTo(range[1] - 10);
  }
  notification_bwarning() {
    this.attrs.textEditor.insertAtCursor(
      "[bwarning]this is n bwarning message.[/bwarning]"
    );
    const range = this.attrs.textEditor.getSelectionRange();
    this.attrs.textEditor.moveCursorTo(range[1] - 11);
  }
  notification_berror() {
    this.attrs.textEditor.insertAtCursor(
      "[berror]this is a berror message.[/berror]"
    );
    const range = this.attrs.textEditor.getSelectionRange();
    this.attrs.textEditor.moveCursorTo(range[1] - 9);
  }
  notification_cwarning() {
    this.attrs.textEditor.insertAtCursor(
      "[cwarning]darkorange,white,darkorange,this is a cwarning title,this is a cwarning message.[/cwarning]"
    );
    const range = this.attrs.textEditor.getSelectionRange();
    this.attrs.textEditor.moveCursorTo(range[1] - 11);
  }
  notification_cnotice() {
    this.attrs.textEditor.insertAtCursor(
      "[cnotice]teal,white,teal,this is a cnotice title,this is a cnotice message.[/cnotice]"
    );
    const range = this.attrs.textEditor.getSelectionRange();
    this.attrs.textEditor.moveCursorTo(range[1] - 10);
  }
  notification_cerror() {
    this.attrs.textEditor.insertAtCursor(
      "[cerror]red,white,red,this is a cerror title,this is a cerror message.[/cerror]"
    );
    const range = this.attrs.textEditor.getSelectionRange();
    this.attrs.textEditor.moveCursorTo(range[1] - 9);
  }
  notification_csuccess() {
    this.attrs.textEditor.insertAtCursor(
      "[csuccess]green,white,green,this is a cerror title,this is a csuccess message.[/csuccess]"
    );
    const range = this.attrs.textEditor.getSelectionRange();
    this.attrs.textEditor.moveCursorTo(range[1] - 11);
  }
  notification_bcustom() {
    this.attrs.textEditor.insertAtCursor(
      "[bcustom]title=this is a bcustom title font=red bg=black border=green[/bcustom]"
    );
    const range = this.attrs.textEditor.getSelectionRange();
    this.attrs.textEditor.moveCursorTo(range[1] - 10);
  }
  notification_dnotice() {
    this.attrs.textEditor.insertAtCursor(
      '[dnotice title="this is a dnotice title" font="teal" bg="white" border="teal"]this is a dnotice message.[/dnotice]'
    );
    const range = this.attrs.textEditor.getSelectionRange();
    this.attrs.textEditor.moveCursorTo(range[1] - 10);
  }
  notification_derror() {
    this.attrs.textEditor.insertAtCursor(
      '[derror title="this is a derror title" font="red" bg="white" border="red"]this is a derror message.[/derror]'
    );
    const range = this.attrs.textEditor.getSelectionRange();
    this.attrs.textEditor.moveCursorTo(range[1] - 9);
  }
  notification_dwarning() {
    this.attrs.textEditor.insertAtCursor(
      '[dwarning title="this is a dwarning title" font="darkorange" bg="white" border="darkorange"]this is a dwarning message.[/dwarning]'
    );
    const range = this.attrs.textEditor.getSelectionRange();
    this.attrs.textEditor.moveCursorTo(range[1] - 11);
  }
  notification_dsuccess() {
    this.attrs.textEditor.insertAtCursor(
      '[dsuccess title="this is a dsuccess title" font="green" bg="white" border="green"]this is a dsuccess message.[/dsuccess]'
    );
    const range = this.attrs.textEditor.getSelectionRange();
    this.attrs.textEditor.moveCursorTo(range[1] - 11);
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
