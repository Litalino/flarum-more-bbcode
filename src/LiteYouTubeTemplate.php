<?php

/*
 * This file is part of sycho/flarum-lite-youtube.
 *
 * Copyright (c) 2022 Sami Mazouz.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace Litalino\MoreBBCode;

use s9e\TextFormatter\Configurator;

class LiteYouTubeTemplate
{
    public function __invoke(Configurator $config)
    {
        if (! isset($config->MediaEmbed)) {
            return;
        }

        $tag = $config->tags['YOUTUBE'];

        $tag->template = '<lite-youtube videoid="{@id}"></lite-youtube>';
    }
}