//ServiceNowのスクリプトインクルードで使用することを想定。
var CreateEmailText = Class.create();
CreateEmailText.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {
    ComposeEmailText: function() {
        var user_id = this.getParameter('sysparm_userid');
        var grAssignedTo = new GlideRecord('sys_user');
        grAssignedTo.addQuery('sys_id', user_id);
        grAssignedTo.query();
        if (grAssignedTo.next()) {
            var assigned_person = grAssignedTo.last_name;
        }

        var inc_id = this.getParameter('sysparm_incid');

        var grAffectedUser = new GlideRecord('x_yyyy_affected_user');
        grAffectedUser.addQuery('parent_incident', inc_id);
        grAffectedUser.query();
        if (grAffectedUser.next()) {
            var affected_user_name = grAffectedUser.name;
            var affected_user_dept = grAffectedUser.dept.getDisplayValue();
        }

        var grAffectedHost = new GlideRecord('x_yyyy_affected_host');
        grAffectedHost.addQuery('parent_incident', inc_id);
        grAffectedHost.query();
        if (grAffectedHost.next()) {
            var affected_host_name = grAffectedHost.host_name;
            var affected_host_num = grAffectedHost.asset_number;
        }

        var grObs = new GlideRecord('x_yyyy_observable');
        grObs.addQuery('parent_incident', inc_id);
        grObs.query();
        if (grObs.next()) {
            var obs_value = grObs.value;
            var obs_type = grObs.observable_type;
        }

        //事案種別を取得
        var category = this.getParameter('sysparm_category');

        var mailtext = '';

        // 事案種別に応じて本文を変更
        var grTXT = new GlideRecord('x_yyyy_email_template');
        grTXT.addQuery('category', category);
        grTXT.query();
        if (grTXT.next()) {
            mailtext = grTXT.text;
            mailtext = mailtext.replace("{{担当者}}", assigned_person);
        }

        //var orig = gs.base64Encode('送信側システムで作成した秘密鍵');

        return mailtext;
    },

    type: 'CreateEmailText'
});
