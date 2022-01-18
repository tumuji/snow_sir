//Servicenowのクライアントスクリプトでの使用を想定
function onCellEdit(sysIDs, table, oldValues, newValue, callback) {
    var saveAndClose = true;
    alert(newValue);
	　alert(sysIDs);
    //Type appropriate comment here, and begin script below
    if (newValue == 3) {
        var ajax = new GlideAjax('SetTaskCloseDateUtil');
        ajax.addParam('sysparm_name', 'setCloseDate');
        ajax.addParam('sysparm_sysid', sysIDs);
        ajax.getXML(doSomething);
    }
    //特に何もしない。
    function doSomething(response) {
        var answer = response.responseXML.documentElement.getAttribute("answer");
        //alert(answer);
    }

	　//リストをリロード
	　setTimeout(function(){
		　this.window.location.reload();
	　}, 300);

    callback(saveAndClose);
}
