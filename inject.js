function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
document.addEventListener('DOMContentLoaded', function() {   
        if(window.location.href == 'https://poll.fm/10255595'){
                document.getElementById("PDI_answer47163907").click();
                document.getElementsByClassName("vote-button")[0].click();
        } 
        if(window.location == 'https://poll.fm/10255595/results?msg=voted'){
                var res = document.cookie;
                        var multiple = res.split(";");
                    for(var i = 0; i < multiple.length; i++) {
                       var key = multiple[i].split("=");
                       document.cookie = key[0]+" =; expires = Thu, 01 Jan 1970 00:00:00 UTC";
                    }
                window.location = "https://poll.fm/10255595";
        }
}, false);
