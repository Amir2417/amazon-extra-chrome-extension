console.log("Its BackGround");

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse)  {
    cAjax = new XMLHttpRequest();
    console.log(request.url);
     var method = 'GET';
    if(request.method){
        method=request.method.toUpperCase(); 
    }
    cAjax.onload = function() {
        if(request.type=='search'){
            sendResponse({type:request.type,search_string:request.search_string,result:cAjax.responseText});
            // sendResponse({status:200,type:request.type,sku:request.sku,variations:request.variations,parent_sku:request.parent_sku,parent_id:request.parent_id,variation_counter:request.variation_counter,result:cAjax.responseText});
        }
        if(request.type=='details'){
            sendResponse({status:200,type:request.type,asin:request.asin,thumb:request.thumb,price:request.price,item:request.item,result:cAjax.responseText});
        }
        if(request.type=='variation'){
            sendResponse({status:200,type:request.type,sku:request.sku,variations:request.variations,parent_sku:request.parent_sku,parent_id:request.parent_id,variation_counter:request.variation_counter,result:cAjax.responseText});
        }
    };
    cAjax.onerror = function(err) {
        // callback to clean up the communication port.
        sendResponse(err);
    };
    cAjax.open(method, request.url, true);
    if (method == 'POST') {
        cAjax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    }
    //console.log(request.data)
    cAjax.send();
    return true; // prevents the callback from being called too early on return
    
});





























//ext dev


//send messaging
// chrome.tabs.onActivated.addListener((tab) => {
//   //console.log(tab);
//   chrome.tabs.get(tab.tabId, (currentTabData) => {
//     //console.log(currentTabData.url);
//     //scripting content js with background js
//   //  if(currentTabData.url !== "chrome://newtab/"){
//   //     chrome.scripting.executeScript({
//   //      target: {tabId: currentTabData.id},
//   //       file : ['/assets/js/content.js'],
//   //     });
//   //   }

//   //send message to content page
//   // setTimeout(()=>{
//   //   chrome.tabs.sendMessage(
//   //     tab.tabId,
//   //     "Hello Content. Iam From Background . This is Tab Id " + tab.tabId,
//   //     //take response from content page
//   //     (response)=> {
//   //         console.log(response);
//   //     }
//   // )
//   // },2000)
    
//   })
// })
//rcv message from content page 