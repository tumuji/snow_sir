//ServiceNowのスクリプトインクルードで使用することを想定。
var ClientDateTimeUtils = Class.create();
ClientDateTimeUtils.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {

    type: 'ClientDateTimeUtils',

    getNowDateTime: function() {
        var dgt = new GlideDateTime();
        //var now = gs.nowDateTime(); //Now Date/Time
        var hours = 60 * 60 * 9;
        dgt.addSeconds(hours);
        return dgt;
    },
});
