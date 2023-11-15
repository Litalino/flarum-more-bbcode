<?php

namespace Litalino\MoreBBCode;

use Flarum\Api\Serializer\PostSerializer;
use Flarum\Database\AbstractModel;

class ReplaceCode extends FormatContent
{
    public function __invoke(PostSerializer $serializer, AbstractModel $post, array $attributes): array
    {
        //$discussion = $post->discussion;
        $actor = $serializer->getActor();

        if (isset($attributes["contentHtml"])) {

            $contentHtml = $attributes['contentHtml'];

            // 格式化cloudbox标签，如果需要回复/登录可见可以嵌套该标签，则需要把该标签放到前面优先替换
            // Định dạng nhãn cloudbox, nếu cần trả lời/đăng nhập để xem thì có thể lồng nhãn, đặt nhãn ở phía trước và thay thế trước.
            // if (str_contains($attributes["contentHtml"], '<cloudbox')) {
            //     $attributes = $this->cloud($serializer, $post, $attributes);
            // }

            // 在新标签打开 Mở ra trong trang mới
            if (str_contains($attributes["contentHtml"], '<cloudbtn')) {
                $attributes = $this->blank($serializer, $post, $attributes);
            }


            /*if (strpos($contentHtml, '<like2see>') === false) {

                return $attributes;
            }
            if (strpos($contentHtml, '<reply2see>') === false) {

                return $attributes;
            }
            if (strpos($contentHtml, '<login2see>') === false) {

                return $attributes;
            }*/
            
            $like2see = '/<like2see>(.*?)<\/like2see>/is';
            $reply2see = '/<reply2see>(.*?)<\/reply2see>/is';
            $login2see = '/<login2see>(.*?)<\/login2see>/is';

            if ($actor->isGuest()) {
                //$contentHtml = preg_replace($like2see, $this->loginHtml(), $contentHtml);
                //$contentHtml = preg_replace($reply2see, $this->loginHtml(), $contentHtml);
                //$contentHtml = preg_replace($login2see, $this->loginHtml(), $contentHtml);
                if (str_contains($attributes["contentHtml"], '<login2see>')) {
                    $contentHtml = preg_replace($login2see, $this->loginHide(), $contentHtml);
                }
                if (str_contains($attributes["contentHtml"], '<like2see>')) {
                    $contentHtml = preg_replace($like2see, $this->loginHide(), $contentHtml);
                }
                if (str_contains($attributes["contentHtml"], '<reply2see>')) {
                    $contentHtml = preg_replace($reply2see, $this->loginHide(), $contentHtml);
                }
            } elseif ($actor->id === $post->user_id) {
                //$contentHtml = preg_replace($like2see, '$1', $contentHtml);
                //$contentHtml = preg_replace($reply2see, '$1', $contentHtml);
                
                if (str_contains($attributes["contentHtml"], '<like2see>')) {
                    $contentHtml = preg_replace($like2see, '$1', $contentHtml);
                }
                if (str_contains($attributes["contentHtml"], '<reply2see>')) {
                    $contentHtml = preg_replace($reply2see, '$1', $contentHtml);
                }
            }

            //$contentHtml = preg_replace($login2see, '$1', $contentHtml);
            if (str_contains($attributes["contentHtml"], '<login2see>')) {
                $contentHtml = preg_replace($login2see, '$1', $contentHtml);
            }

            if (preg_match($like2see, $contentHtml)) {
                $liked = $actor->id && $post->likes()->where('user_id', $actor->id)->exists();

                if ($liked || $actor->hasPermission('post.bypasslikeRequirement')) {
                    $contentHtml = preg_replace($like2see, '$1', $contentHtml);
                } else {
                    $contentHtml = preg_replace($like2see, $this->likeHide(), $contentHtml);
                }
            }

            if (preg_match($reply2see, $contentHtml)) {
                $replied = $post->mentionedBy()->where('user_id', $actor->id)->exists();

                if ($replied || $actor->hasPermission('post.bypassreplyRequirement')) {
                    $contentHtml = preg_replace($reply2see, '$1', $contentHtml);
                } else {
                    $contentHtml = preg_replace($reply2see, $this->replyHide(), $contentHtml);
                }
            }

            $attributes['contentHtml'] = $contentHtml;
            
            
        }

        return $attributes;
    }

    // 格式化cloudbox标签 // Định dạng nhãn hộp đám mây
    public function cloud(PostSerializer $serializer, AbstractModel $post, array $attributes)
    {
        $newHTML = $attributes["contentHtml"];
        // var_dump($newHTML);die;
        $newHTML = preg_replace('/<cloudbox(.*?)<\/cloudbox>/is',
            '<div$1</div>',
            $newHTML
        );

        $attributes['contentHtml'] = $newHTML;

        return $attributes;
    }

    // 在新标签打开 //Mở ra trong trang mới
    public function blank(PostSerializer $serializer, AbstractModel $post, array $attributes)
    {
        $newHTML = $attributes["contentHtml"];

        $newHTML = preg_replace('/<cloudbtn(.*?)<\/cloudbtn>/is',
            '<a$1</a>',
            $newHTML
        );

        $attributes['contentHtml'] = $newHTML;

        return $attributes;
    }

    // 显示喜欢 // Hiển thị lượt thích
    public function likeHide(): string
    {
        return '<span class="bbcode-hide-content like">' .
            $this->translator->trans(
                'imeepo-more-bbcode.forum.like_to_see',
                array(
                    '{like}' => '<a href="javascript:void(0);" class="like2see_like">' . $this->translator->trans('flarum-likes.forum.post.like_link') . '</a>',
                )
            ) . '</span>';
    }
    
    // 回复可见 Trả lời có thể nhìn thấy
    public function replyHide(): string
    {
        return '<span class="bbcode-hide-content reply"> ' .
            $this->translator->trans('imeepo-more-bbcode.forum.reply_to_see',
                array(
                    '{reply}' => '<a href="javascript:void(0);" class="reply2see_reply">' . $this->translator->trans('core.forum.discussion_controls.reply_button') . '</a>',
                )
            ) . '</span>';
    }

    // 登录可见 Đăng nhập hiển thị
    public function loginHide(): string
    {

        return '<span class="bbcode-hide-content login"> ' .
            $this->translator->trans('imeepo-more-bbcode.forum.login_to_see',
                array(
                    '{login}' => '<a href="javascript:void(0);" class="login2see_login">' . $this->translator->trans('core.forum.header.log_in_link') . '</a>',
                )
            ) . '</span>';
    }
    
}