function checkWhitelist(){
	var ga = new GlideAjax('chkObservableUtils');
	ga.addParam('sysparm_name', 'chkWhitelist');
	ga.addParam('sysparm_incid', g_form.getUniqueValue());
	alert(g_form.getUniqueValue());
	ga.getXML(CallBack);
	
	function CallBack(response){
		var answer = response.responseXML.documentElement.getAttribute('answer');
		alert(answer);
		setTimeout(function(){
			this.window.location.reload();
		}, 300);
	}
}