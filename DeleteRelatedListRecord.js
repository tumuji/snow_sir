//Servicenowのbusiness ruleで使用することを想定
(function executeRule(current, previous /*null when async*/) {

	//インシデントテーブルのレコードを削除するときに、関連テーブルのレコードも削除する。
	
	//タスクを削除
	var task = new GlideRecord("x_yyyy_task");
	task.addQuery('parent_incident', current.sys_id);
	task.deleteMultiple();
	
	//対応サマリを削除
	var summary = new GlideRecord("x_yyyy_work_notes");
	summary.addQuery('parent_incident', current.sys_id);
	summary.deleteMultiple();
	
	//影響ホストを削除
	var host = new GlideRecord("x_yyyy_affected_host");
	host.addQuery('parent_incident', current.sys_id);
	host.deleteMultiple();
	
	//影響ユーザを削除
	var user = new GlideRecord("x_yyyy_affected_user");
	user.addQuery('parent_incident', current.sys_id);
	user.deleteMultiple();
	
    //観測事象を削除
	var obs = new GlideRecord("x_yyyy_observable");
	obs.addQuery('parent_incident', current.sys_id);
	obs.deleteMultiple();	

})(current, previous);