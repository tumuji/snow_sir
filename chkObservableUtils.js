//Servicenowのスクリプトインクルードで使用することを想定
var chkObservableUtils = Class.create();
chkObservableUtils.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {

    type: 'chkObservableUtils',

    chkWhitelist: function() {
        var inc_id = this.getParameter('sysparm_incid');
        var gr = new GlideRecord('x_yyyy_observable');
        gr.addQuery('parent_incident', inc_id);
        gr.query();

        while (gr.next()) {
            var obs_value = gr.getValue('value');
            var querystr = "valueLIKE" + obs_value;
            var obs_type = gr.getValue('observable_type');

            var grWL = new GlideRecord('x_yyyy_whitelist');
            //ファイル名又はコマンドのときはあいまい検索。それ以外は完全一致
            if ((obs_type == "commandline") || (obs_type == "filename")) {
                gr.addEncodedQuery(querystr);
            } else {
                grWL.addQuery('value', '=', obs_value);
            }

            grWL.query();

            if (grWL.next()) {
                gr.setValue('whitelist', '有り');
                gr.update();
            } else {
                gr.setValue('whitelist', '無し');
                gr.update();
            }
        }
        return 0;
    }
});
