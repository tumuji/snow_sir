//Servicenowのbefore query business ruleで使用することを想定
(function executeRule(current, previous /*null when async*/ ) {

    // Add your code here
    if (!gs.hasRole("admin, x_ir_test.admin, x_ir_test.user")) {
        //ログインユーザーのIDとメールアドレスを取得
        var user_id = gs.getUserID(); //sets u to ID of current user

        //ログインユーザーの部署名を取得
        var gr = new GlideRecord('sys_user');
        gr.get(user_id);
        var dept_id = gr.department;
        var dept_name = dept_id.name;

//ログインユーザーのグループ名を取得
        var groups = gs.getUser().getMyGroups();

        current.addQuery('affected_dept', dept_name).addOrCondition('caller', user_id).addOrCondition("watch_list", "CONTAINS", user_id).addOrCondition('assignment_group', groups);

    }
})(current, previous);
