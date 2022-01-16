//Servicenowのクライアントスクリプトでの使用を想定。
function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if (isLoading || newValue === '') {
        return;
    }
    alert(newValue);
    //Type appropriate comment here, and begin script below
    if (newValue == 3) {
        var ajax = new GlideAjax('ClientDateTimeUtils');
        ajax.addParam('sysparm_name', 'getNowDateTime');
        ajax.getXML(doSomething);
        alert(newValue);
    }

    function doSomething(response) {
        var answer = response.responseXML.documentElement.getAttribute("answer");
        alert(answer);
        g_form.setValue('close_date', answer);
    }
}
