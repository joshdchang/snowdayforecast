if(window.location.href == 'https://poll.fm/10255595'){
    if(document.cookie){
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++)
        {   
            var spcook =  cookies[i].split("=");
            deleteCookie(spcook[0]);
        }
        function deleteCookie(cookiename)
        {
            var d = new Date();
            d.setDate(d.getDate() - 1);
            var expires = ";expires="+d;
            var name=cookiename;
            //alert(name);
            var value="";
            document.cookie = name + "=" + value + expires + "; path=/acc/html";                    
        }
        window.location = ""; // TO REFRESH THE PAGE
    } else {
        document.getElementById("PDI_answer47163907").click();
        document.getElementsByClassName("vote-button")[0].click();
    }
} else {
    window.location = "https://poll.fm/10255595";
}
