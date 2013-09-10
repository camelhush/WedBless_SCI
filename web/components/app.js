// AJAX路径定义 
var URL_ROOT = "/shwedding"
var URL_OUT_ALLBLESS = URL_ROOT + "/bless/getall";
var URL_OUT_BLESSCOUNT = URL_ROOT + "/bless/count";
var URL_IN_SENDBLESS = URL_ROOT + "/bless/save";
var URL_OUT_SEARCH = URL_ROOT + "/info/search";

// App对象（函数体内不能是空）
var App = (function(lng, undefined) {

	environment = function(event) {
		var environment = lng.Core.environment();
		var el = lng.dom("section > article#environment");

		if (environment.os) {
			el.find("#os > strong").html(environment.os.name);
			el.find("#os > small").html(environment.os.version);
		}
		el.find("#resolution > strong").html(
				environment.screen.height + "p x " + environment.screen.width
						+ "p");
		el.find("#navigator > strong").html(environment.browser);
		el.find("#navigator > small").html("Mobile: " + environment.isMobile);
	};

	return {
		environment : environment
	};

})(Lungo);

// @20130908
// DEMO中初始时用NULL，会在quo.js中导致事件绑定时出现null错误,故改成以下方式
// @20130910
// 原箭头切换图片，已用Angular+Hammer的swipe动作替代
//App.carousel = {
//	prev : function() {
//		App.carousel.refresh();
//		return App.carousel.prev();
//	},
//	next : function() {
//		App.carousel.refresh();
//		return App.carousel.next();
//	}
//};

Lungo.Events
		.init({
			//unload时清空表单
			'unload section#newBless' : function(event) {
				Lungo.dom("#blsSender").val("");
				Lungo.dom("#blsContent").val("");
			},

			//发表新内容
			//'touch article#textBless a[data-action=sendNew]' : saveNewBless,

			'touch section#newBless a[data-action=sendGift]' : function() {
				Lungo.Notification.success("开发中", // Title
				"等新版本出来吧~", // Description
				"wrench", // Icon
				5, // Time on screen
				function() {
					Lungo.Notification.hide();
					Lungo.Router.article("newBless", "textBless");
				} // Callback function
				);
			},

			'load section#listBless' : function(event) {

				App.pull = new Lungo.Element.Pull('section#listBless article',
						{
							onPull : "下拉刷新数据",
							onRelease : "松开获取新数据",
							onRefresh : "刷新中...",
							callback : function() {
								// 这里怎么搞???
								// TODO

								App.pull.hide();
							}
						});
			},

			'load section#carousel' : function(event) {
				App.carousel = Lungo.Element.Carousel(
						$$('[data-control=carousel]')[0], function(index,
								element) {
							Lungo.dom("section#carousel .title span").html(
									index + 1);
						});

			},

			//原箭头切换图片，已用Angular+Hammer的swipe动作替代
			//'tap section#carousel > header [data-direction=left]' : App.carousel.prev,
			//'tap section#carousel > header [data-direction=right]' : App.carousel.next

		});

// 可以放一些初始化的内容
Lungo
		.ready(function() {
			// var environment = Lungo.Core.environment();
			// var el = Lungo.dom("section > article#startup");

			// if(environment.isMobile){
			// environment.browser()
			// environment.screen.height
			document.getElementById('startup-img').src = "images/startup-image-320x420.png"
			// }else{
			// document.getElementById('startup-img').src =
			// "images/startup-image-1366x627.png"
			// }
		});