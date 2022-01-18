//ServiceNowのスクリプトインクルードで使用することを想定
var SetTaskCloseDateUtil = Class.create();
SetTaskCloseDateUtil.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {

    type: 'SetTaskCloseDateUtil',

    setCloseDate: function() {
		//現時刻を取得
        var gdt = new GlideDateTime();
        //日本時間に修正
        var hours = 60 * 60 * 9;
        gdt.addSeconds(hours);

		//タスクテーブルの完了日時に現時刻をセット
        var sysid = this.getParameter('sysparm_sysid');
        var gr = new GlideRecord('x_661859_ir_test_ir_test_task');
        gr.addQuery('sys_id', sysid);
        gr.query();
        if (gr.next()) {
            gr.setValue('end_date', gdt);
            gr.update();
        }
		return gdt;
    },
});
