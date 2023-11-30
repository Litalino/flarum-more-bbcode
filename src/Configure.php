<?php

/*
 * This file is part of Flarum.
 *
 * For detailed copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

namespace Litalino\MoreBBCode;

use s9e\TextFormatter\Configurator;

class Configure
{
    public function __invoke(Configurator $config)
    {
        $this->addTagsFromRepositories($config);
        $this->adaptHighlightJs($config);
    }

    protected function addTagsFromRepositories(Configurator $config): void
    {
        // Allowed BBCode tags
        $config->BBCodes->addFromRepository('B');
        $config->BBCodes->addFromRepository('I');
        $config->BBCodes->addFromRepository('U');
        $config->BBCodes->addFromRepository('S');
        $config->BBCodes->addFromRepository('URL');
        $config->BBCodes->addFromRepository('IMG');
        $config->BBCodes->addFromRepository('EMAIL');
        $config->BBCodes->addFromRepository('CODE');
        $config->BBCodes->addFromRepository('QUOTE', 'default', [
            'authorStr' => '<xsl:value-of select="@author"/> <xsl:value-of select="$L_WROTE"/>'
        ]);
        $config->BBCodes->addFromRepository('LIST');
        //$config->BBCodes->addFromRepository('DEL');
        $config->BBCodes->addFromRepository('COLOR');
        $config->BBCodes->addFromRepository('CENTER');
        $config->BBCodes->addFromRepository('SIZE');
        $config->BBCodes->addFromRepository('*');
        //Allowed BBCode ADD
        $config->BBCodes->addFromRepository('ALIGN');
        $config->BBCodes->addFromRepository('LEFT');
        $config->BBCodes->addFromRepository('RIGHT');
        $config->BBCodes->addFromRepository('JUSTIFY');
        $config->BBCodes->addFromRepository('BACKGROUND');
        $config->BBCodes->addFromRepository('SUB');
        $config->BBCodes->addFromRepository('SUP');
        $config->BBCodes->addFromRepository('DEL');
        $config->BBCodes->addFromRepository('INS');
        $config->BBCodes->addFromRepository('VAR');
        $config->BBCodes->addFromRepository('DD');
        $config->BBCodes->addFromRepository('FLOAT');
        //$config->BBCodes->addFromRepository('MAGNET'); // NO
        //$config->BBCodes->addFromRepository('DL');
        //$config->BBCodes->addFromRepository('DT');
        //$config->BBCodes->addFromRepository('C');
        //$config->BBCodes->addFromRepository('INDENT');
        $config->BBCodes->addFromRepository('HR');
        //$config->BBCodes->addFromRepository('OL');
        //$config->BBCodes->addFromRepository('UL');
        $config->BBCodes->addFromRepository('ACRONYM');
        //$config->BBCodes->addFromRepository('NOPARSE');
        //$config->BBCodes->add('LI');

        // Allowed HTML tags
        //$config->HTMLElements->allowElement('hr');
        //$config->HTMLElements->allowElement('ol');
        //$config->HTMLElements->allowElement('ul');
        //$config->HTMLElements->allowElement('li');
    }

    /**
     * Fix for highlight JS not working after changing post content.
     *
     * @link https://github.com/flarum/framework/issues/3794
     */
    protected function adaptHighlightJs(Configurator $config): void
    {
        $codeTag = $config->tags->get('CODE');
        $script = '
                <script>
                    if(window.hljsLoader && !document.currentScript.parentNode.hasAttribute(\'data-s9e-livepreview-onupdate\')) {
                        window.hljsLoader.highlightBlocks(document.currentScript.parentNode);
                    }
                </script>';
        $codeTag->template = str_replace('</pre>', $script.'</pre>', $codeTag->template);
    }
}