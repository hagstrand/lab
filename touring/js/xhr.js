<!DOCTYPE HTML>
<html>
    <head>
        <title>test xhr</title>
        <script>
            function appendScript(file) {
                // mapperBase must be defined first!!
                var script = document.createElement("script");
                script.type   = "text/javascript";
                script.src   = file;
                document.getElementsByTagName("head")[0].appendChild(script);
            }
            
            function setup() {
                var iframe = document.createElement('iframe');
                document.getElementsByTagName("body")[0].appendChild(iframe);
                appendScript(iframe.
            }
            
            function test() {    
                
                var req = new XMLHttpRequest();  
                req.onreadystatechange = function (aEvt) {  
                  if (req.readyState == 4) {  
                     if(req.status == 200)  
                      dump(req.responseText);  
                     else  
                      dump("Error loading page\n");  
                  }  
                };  
                req.open('GET', 'https://jhagstrand.dev.sdslacker.com/webplayer/xhr.html', true);  
                req.send(null); 
            }
            
            function dump(s) {
                s = s.replace(/\</g, '&lt;');
                s = s.replace(/\>/g, '&gt;');
                document.getElementById('dump').innerHTML = s;
            }
        </script>
    </head>
    <body>
        <button onclick="setup()">setup</button>
        <button onclick="test()">test</button>
        <div id="dump"></div>
    </body>
</html>
