(function () {
"use strict";

angular.module('public').controller('InfoController', InfoController);

InfoController.$inject = ['myInfoData', 'SignUpService', 'ImageURLPath'];
function InfoController(myInfoData, SignUpService, ImageURLPath) {
	var $ctrl = this;
	var promise = SignUpService.dishInfo();

	$ctrl.flag = false;
	if ($ctrl.myInfoData = myInfoData)
		$ctrl.flag = true;
	if (promise) {
		promise.then(function (response) {
			console.log({response})
			/**
			 * response.short_name is A1
			 * pic should pull A2
			 */
			$ctrl.dish = {
				pic: ImageURLPath + '/images/' + response.short_name + '.jpg' ,
				title: response.name,
				description: response.description,
			}
		});
	}
}

})();
