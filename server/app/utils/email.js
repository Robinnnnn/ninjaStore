
//emailing
var mandrillApiKey = 'AAOQpCeqtBnLHJyy0X6HDw';
var mandrill = require('mandrill-api/mandrill');
//instantiates mandrill api and makes its functions available
var mandrill_client = new mandrill.Mandrill(mandrillApiKey);

var from_email = 'Patrick@gmail.com';
var from_name = 'NinjaSupplyShop';

function sendEmail(to_name, to_email, subject, message_html){
    var message = {
        "html": message_html,
        "subject": subject,
        "from_email": from_email,
        "from_name": from_name,
        "to": [{
                "email": to_email,
                "name": to_name
            }],
        "important": false,
        "track_opens": true,    
        "auto_html": false,
        "preserve_recipients": true,
        "merge": false,
        "tags": [
            "NinjaSupplyShop"
        ]    
    };
    var async = false;
    var ip_pool = "Main Pool";
    mandrill_client.messages.send({"message": message, "async": async, "ip_pool": ip_pool}, function(result) {
        // console.log(message);
        // console.log(result);   
    }, function(e) {
        // Mandrill returns the error as an object with name and message keys
        console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
        // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
    });
}

module.exports= sendEmail;