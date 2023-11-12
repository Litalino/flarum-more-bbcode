import app from 'flarum/admin/app';

app.initializers.add('litalino/flarum-more-bbcode', () => {
  app.extensionData
    .for('litalino-more-bbcode')
    .registerPermission(
      {
        icon: 'fas fa-eye-slash',
        label: app.translator.trans('imeepo-more-bbcode.admin.permissions.bypass_reply_label'),
        permission: 'post.bypassReplyRequirement',
      },
      'view'
    );
});
