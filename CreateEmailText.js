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

        var grAffectedUser = new GlideRecord('x_yyyyyy_ir_test_affected_user');
        grAffectedUser.addQuery('parent_incident', inc_id);
        grAffectedUser.query();
        if (grAffectedUser.next()) {
            var affected_user_name = grAffectedUser.name;
            var affected_user_dept = grAffectedUser.dept.getDisplayValue();
        }

        var grAffectedHost = new GlideRecord('x_yyyyyy_ir_test_affected_host');
        grAffectedHost.addQuery('parent_incident', inc_id);
        grAffectedHost.query();
        if (grAffectedHost.next()) {
            var affected_host_name = grAffectedHost.host_name;
            var affected_host_num = grAffectedHost.asset_number;
        }

        var grObs = new GlideRecord('x_yyyyyy_ir_test_observable');
        grObs.addQuery('parent_incident', inc_id);
        grObs.query();
        if (grObs.next()) {
            var obs_value = grObs.value;
            var obs_type = grObs.observable_type;
        }

        var lineFeed = "\r\n";

        //事案種別を取得
        var category = this.getParameter('sysparm_category');

        var body = [];

          // 事案種別に応じて本文を変更
          if (category == '不審なファイル' || category == '不審なコマンド') {
              body.push(
                  '各位',
                  '',
                  'お世話になっております。〇〇部の' + assigned_person + 'です。',
                  '',
                  '貴所属の社員の使用する端末から不審なコマンド・ファイルが検知されました。',
                  'お手数ですが、下記【依頼事項】への対応をお願いします。',
                  '',
                  '【検知情報】',
                  '-------------------------------',
                  '社員名：' + affected_user_name,
                  '社員所属：' + affected_user_dept,
                  '端末名：' + affected_host_name,
                  '端末管理番号：' + affected_host_num,
                  '検知されたコマンド・ファイル：' + obs_value + '   種別：' + obs_type,
                  '-------------------------------',
                  '',
                  '【依頼事項】',
                  '-------------------------------',
                  '①検知されたコマンド・ファイルに心当たりはありますか？',
                  'Yes　→　②にお答えください。',
                  '②経緯について教えてください。',
                  '③端末の動作が重くなるなど不審な点はありますか？',
                  'Yes →　端末のフルスキャン及びネットワークからの隔離をお願いします。',
                  '-------------------------------',
                  '',
                  '以上、よろしくお願い致します。'
              );
          } else if (category == '不審な通信') {
              body.push(
                  '各位',
                  '',
                  'お世話になっております。〇〇部の' + assigned_person + 'です。',
                  '',
                  '貴所属の社員の使用する端末から不審な通信が検知されました。',
                  'お手数ですが、下記【依頼事項】への対応をお願いします。',
                  '',
                  '【検知情報】',
                  '-------------------------------',
                  '社員名：' + affected_user_name,
                  '社員所属：' + affected_user_dept,
                  '端末名：' + affected_host_name,
                  '端末管理番号：' + affected_host_num,
                  '検知された通信：' + obs_value + '   種別：' + obs_type,
                  '-------------------------------',
                  '',
                  '【依頼事項】',
                  '-------------------------------',
                  '①検知された通信に心当たりはありますか？',
                  'Yes　→　②にお答えください。',
                  '②経緯について教えてください。',
                  '③端末の動作が重くなるなど不審な点はありますか？',
                  'Yes →　端末のフルスキャン及びネットワークからの隔離をお願いします。',
                  '-------------------------------',
                  '',
                  '以上、よろしくお願い致します。'
              );
          }

        //var mailtext = body.join(encodeURIComponent(lineFeed));
		    var mailtext = body.join(lineFeed);

        return mailtext;
    },

    type: 'CreateEmailText'
});
