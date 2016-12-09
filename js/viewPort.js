;(function(){
	var design_width=800;
	if(/Android (\d+\.\d+)/.test(navigator.userAgent)){
		var version = parseFloat(RegExp.$1);
		if(version>2.3){
			var phoneScale = parseInt(window.screen.width)/design_width;
			document.write('<meta name="viewport" content="width='+design_width+', minimum-scale = '+ phoneScale +', maximum-scale = '+ phoneScale +', target-densitydpi=device-dpi">');
		}else{
			document.write('<meta name="viewport" content="width='+design_width+', target-densitydpi=device-dpi">');
		}
	}else{
		document.write('<meta name="viewport" content="width='+design_width+', user-scalable=no, target-densitydpi=device-dpi">');
	}
	//微信去掉下方刷新栏
	if(navigator.userAgent.indexOf('MicroMessenger') >= 0){
		document.addEventListener('WeixinJSBridgeReady', function() {
			WeixinJSBridge.call('hideToolbar');
		});
	}
})();