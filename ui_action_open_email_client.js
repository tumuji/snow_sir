//ServiceNow用
function openEmailClient() {

	var catValue = g_form.getValue('category');
  var catLabel = g_form.getOption('category', catValue).text;

  alert(g_form.getValue('assigned_to'));
	alert(catLabel);

  var ga = new GlideAjax('CreateEmailText');
  ga.addParam('sysparm_name', 'ComposeEmailText');
  ga.addParam('sysparm_userid', g_form.getValue('assigned_to'));
  ga.addParam('sysparm_incid', g_form.getUniqueValue());
	ga.addParam('sysparm_category', catLabel);
  ga.getXML(emailCallBack);

  function emailCallBack(response) {
      var answer = response.responseXML.documentElement.getAttribute('answer');
      alert(answer);
      copyToClipboard(answer);
      g_form.addInfoMessage('クリップボードにメール本文をコピーしました。');
  }

  var ga2 = new GlideAjax('OpenEmailClient');
  ga2.addParam('sysparm_name', 'ComposeEmailDraft');
  ga2.addParam('sysparm_subject', g_form.getValue('title'));
  ga2.addParam('sysparm_incid', g_form.getUniqueValue());
  ga2.getXML(emailCallBack2);

  function emailCallBack2(response) {
      var answer = response.responseXML.documentElement.getAttribute('answer');
      alert(answer);
      g_navigation.open(answer, '_blank');
  }
}
