//ServiceNowのスクリプトインクルードで使用することを想定。
var OpenEmailClientAjax = Class.create();
OpenEmailClientAjax.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {

    ComposeEmailDraft: function() {

        var inc_id = this.getParameter('sysparm_incid');

        var grAffectedUser = new GlideRecord('x_yyyyyy_ir_test_affected_user');
        grAffectedUser.addQuery('parent_incident', inc_id);
        grAffectedUser.query();
		    //影響ユーザの部署を取得
        if (grAffectedUser.next()) {
            var affected_user_dept = grAffectedUser.dept.getDisplayValue();
        }

        var ToArray = [];
        var i = 0;

        var CCArray = [];
        var k = 0;

		    //影響ユーザの部署の連絡担当者のメールアドレスを配列に保存していく。
        var grSecPerson = new GlideRecord('x_yyyyyy_ir_test_sec_person');
        grSecPerson.addQuery('dept', affected_user_dept);
        grSecPerson.query();

        while (grSecPerson.next()) {
            var contact_title = grSecPerson.getValue('title');
            var contact_email = grSecPerson.getValue('email_address');
            if (contact_title == 'S実施責任者' || contact_title == 'S実施担当者'){
                ToArray[i] = contact_email;
				i += 1;
            } else if (contact_title == 'O実施責任者' || contact_title == 'O実施担当者') {
                CCArray[k] = contact_email;
				k += 1;
            }
        }

		    //CC
		     var cc = CCArray.join(",");
        // BCC
        var bcc = 'test@test.com';
        // 件名
        var subject = this.getParameter('sysparm_subject');

		    var to = ToArray.join(",");

        var mailto = 'mailto:';
		    mailto += to;
		    mailto += '?cc=' + cc;
        mailto += '&bcc=' + bcc;
        mailto += '&subject=' + subject;

        return mailto;
    },

    type: 'OpenEmailClientAjax'
});
