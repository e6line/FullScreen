/*
* Name  	  : ExitAndFullScreen
* Description : ExitFullScreen and FullScreen Plug
* Date 	 	  : 2014-08-01
* Author 	  : Robin
*/

function ExitAndFullScreen() {
	console.log(this)
	this._init.apply(this, arguments)
};
ExitAndFullScreen.prototype = {
	constructor: ExitAndFullScreen,
	//Init: To provide an external modification parameters, in order to add ClassName
	_init: function (config) {
		config = config || {};
		this.className = config.className || "fullScreenBtn";
		this.exitClassName = "un" + this.className;
		this.wrap = config.wrap || document.body;
		this._create();
	},
	//AddEventListener isFullScreen, The default value is false
	_isFullScreen: function (el) {
		var doc = document;
		var eld = el || doc.documentElement;
		var fsc = eld.fullscreenchange || eld.mozfullscreenchange || eld.webkitfullscreenchange || eld.msfullscreenchange;
		var fs = doc.fullscreen || doc.mozFullScreen || doc.webkitIsFullScreen || doc.msFullscreenElement;
		doc.addEventListener(fsc, function () { return fs}, false);
	},
	_create: function () {
		var oBtn = document.createElement("a");
		oBtn.className = this.className;
		oBtn.href = "javascript:;";
		oBtn.innerHTML = "\u5168\u5C4F\u9605\u8BFB";
		this.wrap.insertBefore(oBtn);
		this._addEvent(oBtn);
	},
	//addEvent and setinnerHTML
	_addEvent: function (obj) {
		var that = this;

		obj.onclick = function  () {
			if(!that._isFullScreen){
				this.className = that.className;
				this.innerHTML = "\u5168\u5C4F\u9605\u8BFB";
				that._exitFullScreen();
			}else{
				this.className = that.exitClassName;
				this.innerHTML = "\u9000\u51FA\u5168\u5C4F";
				that._fullScreen();
			}
			that._isFullScreen = !that._isFullScreen;
		}
	},
	//FullScreen Function
	_fullScreen: function (element) {
		var el = element || document.documentElement;
		var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen; 
		if (typeof rfs != "undefined" && rfs) { 
			rfs.call(el); 
		} else if (typeof window.ActiveXObject != "undefined") {
			this._sendKeys()
		}
	},
	//ExitFullScreen Function
	_exitFullScreen: function () {
		var el = document;
		var efs = el.exitFullscreen || el.mozCancelFullScreen || el.webkitCancelFullScreen || el.msExitFullscreen;
		if (typeof efs != "undefined" && efs) {
			efs.call(el); 
		} else if (typeof window.ActiveXObject != "undefined") {
			this._sendKeys()
		}
	},
	//SendKeys Function
	_sendKeys: function () {
		// for Internet Explorer 
		var wscript = new ActiveXObject("WScript.Shell"); 
		if (wscript != null) { 
			wscript.SendKeys("{F11}"); 
		} 
	}
};
