//ServiceNow用
function openEmailClient() {

	var catValue = g_form.getValue('category');

    var ga2 = new GlideAjax('CreateEmailText');
    ga2.addParam('sysparm_name', 'ComposeEmailText');
    ga2.addParam('sysparm_userid', g_form.getValue('assigned_to'));
    ga2.addParam('sysparm_incid', g_form.getUniqueValue());
	ga2.addParam('sysparm_category', catValue);
    ga2.getXML(emailCallBack2);

    function emailCallBack2(response) {
        var answer = response.responseXML.documentElement.getAttribute('answer');
        alert(answer);
        copyToClipboard(answer);
        g_form.addInfoMessage('クリップボードにメール本文をコピーしました。');
    }

    var ga = new GlideAjax('OpenEmailClientAjax');
    ga.addParam('sysparm_name', 'ComposeEmailDraft');
    ga.addParam('sysparm_subject', g_form.getValue('title'));
    ga.addParam('sysparm_incid', g_form.getUniqueValue());
    ga.getXML(emailCallBack);

    function emailCallBack(response) {
        var answer = response.responseXML.documentElement.getAttribute('answer');
        alert(answer);
        g_navigation.open(answer, '_blank');
    }
}
