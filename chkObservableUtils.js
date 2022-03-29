//Servicenowのスクリプトインクルードで使用することを想定
var chkObservableUtils = Class.create();
chkObservableUtils.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {

    type: 'chkObservableUtils',

    chkWhitelist: function() {

        var inc_id = this.getParameter('sysparm_incid');

        //デフォルト値をホワイトリスト該当「無し」にする。
        var grDF = new GlideRecord('x_yyyy_observable');
        grDF.query();

        while (grDF.next()) {
            grDF.setValue('whitelist', '無し');
            grDF.update();
        }

        //
		//観測事象の各値がホワイトリストの中に存在するか検索するのが自然だが、ここでは逆にホワイトリストの各値について、
		//当該インシデントの観測事象の中に存在するか検索する。これはファイル名とコマンドのあいまい検索を実現するためである。
        //具体的にいうと、観測事象の値が「C¥USER¥white.exe」で、ホワイトリストが「white.exe」の場合は、観測事象の値がホワイトリストの値を
		//CONTAINS(含む)という条件になる。クエリにはCONTAINSの逆の演算子はない。

        var grWL = new GlideRecord('x_yyyy_whitelist');
        grWL.query();

        while (grWL.next()) {
            var wl_value = grWL.getValue('value');

            //ファイル名又はコマンドのときはあいまい検索。それ以外は完全一致
            var grFC = new GlideRecord('x_yyyy_observable');
            grFC.addQuery('parent_incident', inc_id);
            grFC.addQuery('observable_type', 'IN', 'filename, commandline');
            grFC.addQuery('value', 'CONTAINS', wl_value);
            grFC.query();

            while (grFC.next()) {
                grFC.setValue('whitelist', '有り');
                grFC.update();
            }
            //ファイル名又はコマンド以外は完全一致
            var grOT = new GlideRecord('x_yyyy_observable');
            grOT.addQuery('parent_incident', inc_id);
            grOT.addQuery('observable_type', 'NOT IN', 'filename, commandline');
            grOT.addQuery('value', '=', wl_value);
            grOT.query();

            while (grOT.next()) {
                grOT.setValue('whitelist', '有り');
                grOT.update();
            }
        }
        return 0;
    }
});
