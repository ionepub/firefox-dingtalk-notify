Notification.requestPermission(function(status) {  
    //status是授权状态，如果用户允许显示桌面通知，则status为'granted'  
    console.log('status: ' + status);  
  
    //permission只读属性  
    var permission = Notification.permission;  
    //default 用户没有接收或拒绝授权请求 不能显示通知  
    //granted 用户接受授权请求 允许显示通知  
    //denied  用户拒绝授权请求 不允许显示通知  
  
    console.log('permission: ' + permission);  
});

var title='';

if (Notification.permission === 'granted') {
	title = document.title;
	checkTitle();
}

function checkTitle(){
	setTimeout(function(){
		console.log('current title:'+title);
		
		if(title != document.title){
			title = document.title; // 更新值
			var n = new Notification("您有新的钉钉消息！", {  
				body: '您有新的钉钉消息，请及时查看！'
			});
			/*n.onshow = function() {  
				//5秒后关闭消息框  
				setTimeout(function() {  
					n.close();  
				}, 5000);
			};*/
		}
		// 始终循环
		checkTitle();
	}, 5555);
}


