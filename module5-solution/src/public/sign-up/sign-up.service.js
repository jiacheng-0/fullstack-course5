(function () {
"use strict";

angular.module('public').service('SignUpService', SignUpService);

SignUpService.$inject = ['$http', 'ApiPath'];
function SignUpService($http, ApiPath) {
	var $srvc = this;
	$srvc.items;
	var userinfo;

	$srvc.sendUser = function (user) {
		userinfo = user;
	};

	$srvc.sendDish = function (dish) {
		return $http.get(ApiPath + '/menu_items.json').then(function (response) {
			var foundItems;
			// var menuItems = (response.data)['menu_items'];
			var menuItems = []
			var data = response.data
			for (const shortName in data) {
				// console.log(shortName)
				menuItems.push(...data[shortName]['menu_items'])
			}
			for (var i = 0; i < menuItems.length; i++) {
				if (menuItems[i].short_name.toLowerCase() === dish.toLowerCase()) {
					foundItems = menuItems[i];
				}
			}
			$srvc.items = foundItems;
			// $srvc.dishInfo();
			return foundItems;
		});
	};

	$srvc.getUserInfo = function () {
		return userinfo;
	};

	$srvc.dishInfo = function () {
		if ($srvc.items)
		{
			var shortName = $srvc.items.short_name;

			let cat_short_name = ""
			let menu_number = ""
			for (let i = 0; i < shortName.length; i++) {
				let char = shortName[i]
				if (!'0123456789'.includes(char)) {
					cat_short_name += char
				} else {
					menu_number += char
				}
			}
			menu_number = (Number(menu_number) - 1).toString()
			// NOTE: minus 1 as A1 is saved as menu_items/A/menu_items/0.json in the new API Endpoint
			console.log(cat_short_name, menu_number)

			return $http.get(ApiPath + '/menu_items/' + cat_short_name.toUpperCase() + '/menu_items/' + menu_number + '.json')
				.then(function (response) {
					console.log(response.data)
					return response.data;
				});
			// return $http.get(ApiPath + '/menu_items/'+ shortName +'.json').then(function (response) {
			// 	return response.data;
			// });
		}
		return false;
	};
}

})();
