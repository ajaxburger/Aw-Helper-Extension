chrome.action.onClicked.addListener(function(tab){
    console.log("VPN Script Loaded");

    function callThirdParty(server, name) {
        var api = server;
        logit("Connecting " + server + " ...");
        $.ajax({
            type: "GET",
            url: api,
            success: function(data) {
                let current_ip = "";
                if (data && data['ip']) {
                    current_ip = data['ip'];
                    $('#ip').append(current_ip + "\n");
                } else if (data) {
                    current_ip = data;
                    $('#ip').append(current_ip + "\n");
                }
                if (current_ip) {
                    process(current_ip);
                }
            },
            error: function(request, status, error) {
                logit('Response: ' + request.responseText);
                logit('Error: ' + error );
                logit('Status: ' + status);
            },
            complete: function(data) {
                console.log('API Finished: ' + ip + " Server!");
            }             
        });    
    }

});