<?php

/*
 * This file is part of imeepo/flarum-more-bbcode.
 *
 * Copyright (c) 2023 imeepo.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace Litalino\MoreBBCode;

use Flarum\Api\Serializer\PostSerializer;
use Flarum\Extend;
use Litalino\MoreBBCode\ReplaceCode;
use s9e\TextFormatter\Configurator;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/forum.js')
        ->css(__DIR__ . '/resources/less/forum.less'),

    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js'),
    (new Extend\Formatter)
        ->configure(function (Configurator $config) {
            $config->Litedown;

            // Overwrite the default inline spoiler so that it is compatible
            // with more styling for children in an external stylesheet.
            $config->tags['ispoiler']->template = '<span class="spoiler" data-s9e-livepreview-ignore-attrs="class" onclick="removeAttribute(\'class\')"><xsl:apply-templates/></span>';
            
            // 添加自定义BBCode
            // https://s9etextformatter.readthedocs.io/Plugins/BBCodes/Add_custom_BBCodes/
            $config->BBCodes->addCustom(
                '[REPLY]{TEXT}[/REPLY]',
                '<reply2see>{TEXT}</reply2see>'
            );
            $config->BBCodes->addCustom(
                '[LOGIN]{TEXT}[/LOGIN]',
                '<login2see>{TEXT}</login2see>'
            );
            $config->BBCodes->addCustom(
                '[LIKE]{TEXT}[/LIKE]',
                '<like2see>{TEXT}</like2see>'
            );
            /*$config->BBCodes->addCustom(
                '[REPLY]{TEXT}[/REPLY]',
                '<div><reply2see></reply2see>{TEXT}<reply2see></reply2see></div>'
            );
            $config->BBCodes->addCustom(
                '[LOGIN]{TEXT}[/LOGIN]',
                '<div><login2see></login2see>{TEXT}<login2see></login2see></div>'
            );
            $config->BBCodes->addCustom(
                '[LIKE]{TEXT}[/LIKE]',
                '<div><like2see></like2see>{TEXT}<like2see></like2see></div>'
            );*/
            $config->BBCodes->addCustom(
                '[cloud type={TEXT1} title={TEXT2} url={URL}]{TEXT3}[/cloud]',
                '<div class="imeepo_cloud cloud_{TEXT1}"><div class="cloud_logo"></div><div class="cloud_describe"><div class="cloud_title">{TEXT2}</div><div class="cloud_content"><span class="cloud_type"></span><span class="cloud_password cloud_hide{TEXT3}"> | <span class="cloud_text"></span>{TEXT3}</span></div></div><cloudbtn class="cloud_button" href="{URL}" target="_blank" rel="noopener noreferrer"><i class="fa fa-download"></i></cloudbtn></div>'
            );

            //ADD
            $config->BBCodes->addCustom(
                '[right]{TEXT}[/right]',
                '<div align="right">{TEXT}</div>'
            );
            $config->BBCodes->addCustom(
                '[left]{TEXT}[/left]',
                '<div align="left">{TEXT}</div>'
            );
            $config->BBCodes->addCustom(
                '[justify]{TEXT}[/justify]',
                '<div align="justify">{TEXT}</div>'
            );
            $config->BBCodes->addCustom(
                '[center]{TEXT}[/center]',
                '<div align="center">{TEXT}</div>'
            );
            $config->BBCodes->addCustom(
                '[pleft]{TEXT}[/pleft]',
                '<div style="padding-left: 40px;">{TEXT}</div>'
            );
            $config->BBCodes->addCustom(
                '[pright]{TEXT}[/pright]',
                '<div style="padding-right: 40px;">{TEXT}</div>'
            );
            $config->BBCodes->addCustom(
                '[dropcap]{TEXT}[/dropcap]',
                '<div class="has-dropcap">{TEXT}</div>'
            );
            $config->BBCodes->addCustom(
                '[img-left]{TEXT}[/img-left]',
                '<div class="img-left">{TEXT}</div>'
            );
            $config->BBCodes->addCustom(
                '[img-right]{TEXT}[/img-right]',
                '<div class="img-right">{TEXT}</div>'
            );
            $config->BBCodes->addCustom(
                '[ileft]{TEXT}[/ileft]',
                '<div class="img-left">{TEXT}</div>'
            );
            $config->BBCodes->addCustom(
                '[iright]{TEXT}[/iright]',
                '<div class="img-right">{TEXT}</div>'
            );
            $config->BBCodes->addCustom(
                '[indent={NUMBER}]{TEXT}[/indent]',
                '<div style="padding-left: {NUMBER}px;">{TEXT}</div>'
            );
            $config->BBCodes->addCustom(
                '[hr]',
                '<hr style="border-top: 1px solid var(--muted-color);">'
            );

            $config->BBCodes->addCustom(
               '[audio mp3="{URL1?}" m4a="{URL2?}" wav="{URL3?}" ogg="{URL4?}" flac="{URL5?}" webm="{URL6?}" width="{NUMBER?;defaultValue=100}"]',
               '<p><audio class="bbaudio inline-exclude" style="width:{NUMBER}%;" controls controlsList="nodownload">
                        <source src="{URL1}" type="audio/mpeg">
                        <source src="{URL2}" type="audio/mp4">
                        <source src="{URL3}" type="audio/wav">
                        <source src="{URL4}" type="audio/ogg">
                        <source src="{URL5}" type="audio/flac">
                        <source src="{URL6}" type="audio/webm">
                </audio></p>'
            );
            $config->BBCodes->addCustom(
               '[clip mp4="{URL?}"]',
               '<p><video controls src="{URL}"></video></p>'
            );
            
            $config->BBCodes->addCustom(
                '[GDOC]{URL}[/GDOC]',
                '<div class="bbextend-gdoc"><a href="{URL}" target="_blank"><i class="fas fa-file-word"></i> View Google Doc</a></div>'
            );

            $config->BBCodes->addCustom(             
                '[SIZE1]{TEXT}[/SIZE1]',             
                '<span style="font-size: 12px;">{TEXT}</span>'
            );
            $config->BBCodes->addCustom(             
                '[SIZE2]{TEXT}[/SIZE2]',             
                '<span style="font-size: 15px;">{TEXT}</span>'
            );
            $config->BBCodes->addCustom(             
                '[SIZE3]{TEXT}[/SIZE3]',             
                '<span style="font-size: 22px;">{TEXT}</span>'
            );
            $config->BBCodes->addCustom(             
                '[SIZE4]{TEXT}[/SIZE4]',             
                '<span style="font-size: 26px;">{TEXT}</span>'
            );

            //$event->configurator->BBCodes->addFromRepository('COLORT');
            $config->BBCodes->addCustom(             
                '[COLORT]{TEXT}[/COLORT]',             
                '<span style="color: #1abc9c;">{TEXT}</span>'
            );
            $config->BBCodes->addCustom(             
                '[COLORG]{TEXT}[/COLORG]',             
                '<span style="color: #2ecc71;">{TEXT}</span>'
            );
            $config->BBCodes->addCustom(             
                '[COLORB]{TEXT}[/COLORB]',             
                '<span style="color: #3498db;">{TEXT}</span>'
            );
            $config->BBCodes->addCustom(             
                '[COLORP]{TEXT}[/COLORP]',             
                '<span style="color: #9b59b6;">{TEXT}</span>'
            );
            $config->BBCodes->addCustom(             
                '[COLORY]{TEXT}[/COLORY]',             
                '<span style="color: #f1c40f;">{TEXT}</span>'
            );
            $config->BBCodes->addCustom(             
                '[COLORO]{TEXT}[/COLORO]',             
                '<span style="color: #e67e22;">{TEXT}</span>'
            );
            $config->BBCodes->addCustom(            
                '[COLORR]{TEXT}[/COLORR]',             
                '<span style="color: #e74c3c;">{TEXT}</span>'
            );
            $config->BBCodes->addCustom(             
                '[COLORS]{TEXT}[/COLORS]',             
                '<span style="color: #95a5a6;">{TEXT}</span>'
            );
            
            $config->BBCodes->addCustom(             
                '[COLOR={COLOR}]{TEXT}[/COLOR]',             
                '<span style="color: {COLOR}">{TEXT}</span>'
            );
            $config->BBCodes->addCustom(             
                '[SIZE={NUMBER}]{TEXT}[/SIZE]',             
                '<span style="font-size: {NUMBER}px;">{TEXT}</span>'
            );
            $config->BBCodes->addCustom(             
                '[INS]{TEXT}[/INS]',             
                '<ins>{TEXT}</ins>'
            );
            $config->BBCodes->addCustom(             
                '[DEL]{TEXT}[/DEL]',             
                '<del>{TEXT}</del>'
            );
            $config->BBCodes->addCustom(             
                '[VAR]{TEXT}[/VAR]',             
                '<var>{TEXT}</var>'
            );
            $config->BBCodes->addCustom(             
                '[SUP]{TEXT}[/SUP]',             
                '<sup>{TEXT}</sup>'
            );

            $config->BBCodes->addCustom(
                '[DETAILS title={TEXT1;optional}]{TEXT2}[/DETAILS]',
                '<details><summary>{TEXT1}</summary><div>{TEXT2}</div></details>'
            );
            
            $config->BBCodes->addCustom(
                '[tabs]{TEXT}[/tabs]',
                '<div class="tabs"><xsl:apply-templates/></div>'
            );
            $config->BBCodes->addCustom(
                '[tab name={ANYTHING} active={ANYTHING?}]{TEXT}[/tab]',
                <<<'XML'
<div class="tab">
    <input type="radio">
        <xsl:if test="@active">
            <xsl:attribute name="checked">checked</xsl:attribute>
        </xsl:if>
    </input>
    <label>{@name}</label>

    <div class="content">
        <xsl:apply-templates/>
    </div>
</div>
XML
            );
            //16-11-2023 //composer require ramesh-dada/bbcode-alerts
            $config->BBCodes->addCustom(
                '[awarning]{TEXT}[/awarning]',
                '<div id="aaalertbody"><div class="aaalert aaerror"><p class="aainner"><strong>Warning! </strong>{TEXT}</p></div></div>'
            );

            $config->BBCodes->addCustom(
                '[asuccess]{TEXT}[/asuccess]',
                '<div id="aaalertbody"><div class="aaalert aasuccess"><p class="aainner">{TEXT}</p></div></div>'
            );

            $config->BBCodes->addCustom(
                '[ainfo]{TEXT}[/ainfo]',
                '<div id="aaalertbody"><div class="aaalert aainfo"><p class="aainner">{TEXT}</p></div></div>'
            );

            $config->BBCodes->addCustom(
                '[abasic]{TEXT}[/abasic]',
                '<div id="aaalertbody"><div class="aaalert"><p class="aainner">{TEXT}</p></div></div>'
            );

            $config->BBCodes->addCustom(
                '[acustom]{COLOR},{COLOR2},{COLOR3},{TEXT}[/acustom]',
                '<div id="aaalertbody"><div class="aaalert"><p class="aainner" style="color: {COLOR}; background-color: {COLOR2}; border-color: {COLOR3};">{TEXT}</p></div></div>'
            );

            $config->BBCodes->addCustom(
                '[bcustom]title={TEXT} font={COLOR} bg={COLOR2} border={COLOR3}[/bcustom]',
                '<div id="aaalertbody"><div class="aaalert"><p class="aainner" style="color: {COLOR}; background-color: {COLOR2}; border-color: {COLOR3};">{TEXT}</p></div></div>'
            );

            $config->BBCodes->addCustom(
                '[berror]{TEXT}[/berror]',
                '<div id="aaalertbody"><div class="bbalert-box bberror"><span>ERROR: </span>{TEXT}</div></div>'
            );

            $config->BBCodes->addCustom(
                '[cerror]{COLOR},{COLOR2},{COLOR3},{TEXT},{TEXT2}[/cerror]',
                '<div id="aaalertbody"><div class="bbalert-box bberror" style="color: {COLOR}; background-color: {COLOR2}; border-color: {COLOR3};"><span>{TEXT}: </span>{TEXT2}</div></div>'
            );

            $config->BBCodes->addCustom(
                '[bsuccess]{TEXT}[/bsuccess]',
                '<div id="aaalertbody"><div class="bbalert-box bbsuccess"><span>SUCCESS: </span>{TEXT}</div></div>'
            );

            $config->BBCodes->addCustom(
                '[csuccess]{COLOR},{COLOR2},{COLOR3},{TEXT},{TEXT2}[/csuccess]',
                '<div id="aaalertbody"><div class="bbalert-box bbsuccess" style="color: {COLOR}; background-color: {COLOR2}; border-color: {COLOR3};"><span>{TEXT}: </span>{TEXT2}</div></div>'
            );

            $config->BBCodes->addCustom(
                '[bwarning]{TEXT}[/bwarning]',
                '<div id="aaalertbody"><div class="bbalert-box bbwarning"><span>WARNING: </span>{TEXT}</div></div>'
            );

            $config->BBCodes->addCustom(
                '[cwarning]{COLOR},{COLOR2},{COLOR3},{TEXT},{TEXT2}[/cwarning]',
                '<div id="aaalertbody"><div class="bbalert-box bbwarning" style="color: {COLOR}; background-color: {COLOR2}; border-color: {COLOR3};"><span>{TEXT}: </span>{TEXT2}</div></div>'
            );

            $config->BBCodes->addCustom(
                '[bnotice]{TEXT}[/bnotice]',
                '<div id="aaalertbody"><div class="bbalert-box bbnotice"><span>Notice: </span>{TEXT}</div></div>'
            );

            $config->BBCodes->addCustom(
                '[cnotice]{COLOR},{COLOR2},{COLOR3},{TEXT},{TEXT2}[/cnotice]',
                '<div id="aaalertbody"><div class="bbalert-box bbnotice" style="color: {COLOR}; background-color: {COLOR2}; border-color: {COLOR3};"><span>{TEXT}: </span>{TEXT2}</div></div>'
            );

            $config->BBCodes->addCustom(
                '[derror title="{TEXT}" font="{COLOR}" bg="{COLOR2}" border="{COLOR3}"]{TEXT2}[/derror]',
                '<div id="aaalertbody"><div class="bbalert-box bberror" style="color: {COLOR}; background-color: {COLOR2}; border-color: {COLOR3};"><span>{TEXT}: </span>{TEXT2}</div></div>'
            );

            $config->BBCodes->addCustom(
                '[dsuccess title="{TEXT}" font="{COLOR}" bg="{COLOR2}" border="{COLOR3}"]{TEXT2}[/dsuccess]',
                '<div id="aaalertbody"><div class="bbalert-box bbsuccess" style="color: {COLOR}; background-color: {COLOR2}; border-color: {COLOR3};"><span>{TEXT}: </span>{TEXT2}</div></div>'
            );

            $config->BBCodes->addCustom(
                '[dwarning title="{TEXT}" font="{COLOR}" bg="{COLOR2}" border="{COLOR3}"]{TEXT2}[/dwarning]',
                '<div id="aaalertbody"><div class="bbalert-box bbwarning" style="color: {COLOR}; background-color: {COLOR2}; border-color: {COLOR3};"><span>{TEXT}: </span>{TEXT2}</div></div>'
            );

            $config->BBCodes->addCustom(
                '[dnotice title="{TEXT}" font="{COLOR}" bg="{COLOR2}" border="{COLOR3}"]{TEXT2}[/dnotice]',
                '<div id="aaalertbody"><div class="bbalert-box bbnotice" style="color: {COLOR}; background-color: {COLOR2}; border-color: {COLOR3};"><span>{TEXT}: </span>{TEXT2}</div></div>'
            );

            //download-button //composer require ramesh-dada/download-button
            $config->BBCodes->addCustom(
                '[down link={URL} size={TEXT1} name={TEXT2}][/down]',
                '<a target="_blank" href="{URL}"><div class="ButtonGroup dadadownload"><div class="Button hasIcon Button--icon Button--primary dadadownload"><i class="fas fa-download"></i></div><div class="Button">{TEXT2}</div><div class="Button Button--primary">{TEXT1}</div></div></a>'
            );
        }),
    new Extend\Locales(__DIR__ . '/resources/locale'),
    (new Extend\ApiSerializer(PostSerializer::class))
        ->attributes(ReplaceCode::class),
];
