(function execute(inputs, outputs) {
// ... code ...
var request = new sn_ws.RESTMessageV2();
var sid = inputs.incident_sid;
var base_url = inputs.base_url;
var table_id = inputs.table_id;
request.setHttpMethod('post');
request.setEndpoint('https://xxxxxx.webhook.office.com/webhookb2/yyyyyyy-ffd6-4779-yyyy/IncomingWebhook/yyyyyyy-yyyyyy');
var body = "{\"text\": \"SNOWからのテスト通知2\n\n新たなチケットが起票されました。\n\n" + base_url + "%2f" + table_id + "\.do%3fsys_id%3d" + sid + "\", \"title\": \"test\"}";
request.setRequestBody(body);
        
        // api.myjson.com/bins/4j985 is just a static JSON data store


        var response = request.execute();
        var httpResponseStatus = response.getStatusCode();
        var httpResponseContentType = response.getHeader('Content-Type');


        gs.debug("http response status_code: " + httpResponseStatus);
        gs.debug("http response content-type: " + httpResponseContentType);


        //  if request is successful then parse the response body
    
})(inputs, outputs);
