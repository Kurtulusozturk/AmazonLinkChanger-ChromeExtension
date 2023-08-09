document.addEventListener('DOMContentLoaded', function() {
    var redirectButtonCa = document.getElementById('redirectButtonCa');
    var redirectButtonSa = document.getElementById('redirectButtonSa');
    var redirectButtonCaSa = document.getElementById('redirectButtonCaSa');
    var redirectButtonCom = document.getElementById('redirectButtonCom');
    var currentURL = "";

    var check = 0;
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        var currentTab = tabs[0];
        currentURL = currentTab.url;
        if(currentURL.includes("https://www.amazon.ca") || currentURL.includes("https://www.amazon.sa")){
            redirectButtonCa.disabled = true;
            redirectButtonSa.disabled = true;
        }
        if(currentURL.includes("https://www.amazon.com")){
            redirectButtonCom.disabled = true;
            redirectButtonCaSa.disabled = true;
        }
      });

    redirectButtonCa.addEventListener('click', function() {
        check = 0;
        Redirect('https://www.amazon.com','https://www.amazon.ca',check)
    });

    redirectButtonSa.addEventListener('click', function() {
        check = 0;
        Redirect('https://www.amazon.com','https://www.amazon.sa',check)
    });
    
    redirectButtonCaSa.addEventListener('click', function() {
        check = 0;
        if(currentURL.includes("https://www.amazon.ca")){
            Redirect('https://www.amazon.ca','https://www.amazon.sa',check)
        }else if(currentURL.includes(("https://www.amazon.sa"))){
            Redirect('https://www.amazon.sa','https://www.amazon.ca',check)
        }
    });

    redirectButtonCom.addEventListener('click', function() {
        check = 1;
        Redirect('https://www.amazon.ca','https://www.amazon.sa',check)
    });

    function Redirect(url1, url2 , check) {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            var tab = tabs[0];
            if(check == 0){
                var newURL = tab.url.replace(url1, url2);
            }else{
                if(currentURL.includes(url1)){
                    var newURL = tab.url.replace(url1, 'https://www.amazon.com');
                  }else if(currentURL.includes(url2)){
                    var newURL = tab.url.replace(url2, 'https://www.amazon.com');
                }
            }

            chrome.tabs.update(tab.id, { url: newURL });
          });
          window.close();
    }

  });