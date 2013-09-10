var shwedAppModule = angular.module("shWed");

function TopCtrl($scope) {
	
	//Bless计数
	var parseResponse = function(result) {
			$scope.blessCount = result.data;
			$scope.$apply();
	};
	Lungo.Service.post(URL_OUT_BLESSCOUNT, "", parseResponse, "json");
	
	
	$scope.loadBless = function(){
		Lungo.Notification.show();
		var parseResponse = function(result) {
			
			if (result.data.length > 0) {
				$scope.blessItems = result.data;
				$scope.$apply();
				Lungo.Notification.hide();
			} else {
				Lungo.Notification.error("赶快!", "还不赶紧抢个头彩?", "gift", 3);
			}
			
		};
		Lungo.Service.post(URL_OUT_ALLBLESS, "", parseResponse, "json");
		
		//Bless计数
		var parseResponse = function(result) {
				$scope.blessCount = result.data;
				$scope.$apply();
		};
		Lungo.Service.post(URL_OUT_BLESSCOUNT, "", parseResponse, "json");
		
	}

	$scope.submitBless = function(){
		
		if($scope.blsSender && $scope.blsContent){
			if (this.blsContent.length >= 4) {
				Lungo.Notification.show();
				var data = {
						blsSender : $scope.blsSender,
						blsContent :$scope.blsContent
					};
				var parseResponse = function(result) {
					
					//清空表单（否则会保留上次的输入）
					$scope.blsSender = '';
					$scope.blsContent = '';
					
					//setTimeout(Lungo.Notification.hide, 3000);
					Lungo.Notification.success("发表成功", "去看看还有哪些朋友的祝福吧~~",
							"thumbs-up", 3, function() {
								
								var parseResponse = function(result) {
									if (result.data.length > 0) {
										$scope.blessItems = result.data;
										$scope.$apply();
										Lungo.Notification.hide();
									}
								};
								Lungo.Service.post(URL_OUT_ALLBLESS, "", parseResponse, "json");
								
								//Bless计数
								var parseResponse = function(result) {
										$scope.blessCount = result.data;
										$scope.$apply();
								};
								Lungo.Service.post(URL_OUT_BLESSCOUNT, "", parseResponse, "json");
								
								
								//Lungo.Notification.hide();					
								Lungo.Router.section("listBless");
							});
				};
				Lungo.Service.post(URL_IN_SENDBLESS, data, parseResponse, "json");
				
			}else{
				Lungo.Notification.error("额！", "您不觉得内容少了点么~~", "remove-sign", 2);
			}
		}else{
			Lungo.Notification.error("不是吧", "填完整了再发送吧~~", "remove-sign", 2);
		}
	}
}

//图片swipe支持
function PhotoCtrl($scope) {
	
	//swipe-left:下一张
	$scope.left = function(){
		App.carousel.next();
	}
	
	//swipe-right:上一张
	$scope.right = function(){
		App.carousel.prev();
	}
	
}

//查询
function SearchCtrl($scope) {
	
	$scope.search = function(){
		if($scope.searchKey){
			
			var data = {
					searchKey : $scope.searchKey
				};
			
			var parseResponse = function(result) {
				
				Lungo.dom("#empty").style.display="hidden";
				
				var resObj = result.data;
				
				if(resObj){
					$scope.Seat = resObj[0][0];
					$scope.Room = resObj[0][1];
					$scope.Trip = resObj[0][2];
					$scope.Other = resObj[0][3];
				}else{
					$scope.Seat = '';
					$scope.Room = '';
					$scope.Trip = '';
					$scope.Other = '';
				}

				$scope.$apply();
			};
			Lungo.Service.post(URL_OUT_SEARCH, data, parseResponse, "json");
		}
	}
}

