(function () {
    "use strict";
    angular
        .module("NarrowItDownApp", [])
        .controller("NarrowItDownController", NarrowItDownController)
        .service("MenuSearchService", MenuSearchService)
        .directive("foundItems", FoundItemsDirective)
        .constant("ApiBasePath", "https://coursera-jhu-default-rtdb.firebaseio.com");

    NarrowItDownController.$inject = ["MenuSearchService"]

    function NarrowItDownController(MenuSearchService) {
        let menuCtrl = this
        menuCtrl.searchTerm = ""
        menuCtrl.firstSearched = false
        menuCtrl.getItems = function () {
            menuCtrl.firstSearched = true
            if (!menuCtrl.searchTerm) {
                menuCtrl.found = []
                return
            }

            let promise = MenuSearchService.getMatchedMenuItems(menuCtrl.searchTerm)
            promise.then(function (response) {
                menuCtrl.found = response
            }).catch(function (error) {
                console.log(error)
            })
        }

        menuCtrl.removeItem = function (index) {
            menuCtrl.found.splice(index, 1)
        }
    }

    MenuSearchService.$inject = ['$http', 'ApiBasePath'];

    function MenuSearchService($http, ApiBasePath) {
        let service = this

        service.getMatchedMenuItems = function (searchTerm) {
            return $http({
                url: ApiBasePath + "/menu_items.json"
            })
                .then(function (response) {
                    // process result and only keep items that match
                    if (searchTerm === false)
                        return []

                    if (response.data === undefined) {
                        return []
                    }

                    let menuItems = []
                    for (const [key, value] of Object.entries(response.data)) {
                        menuItems.push(...value.menu_items)
                    }

                    let foundItems = []
                    for (let i = 0; i < menuItems.length; i++) {
                        let description = menuItems[i].description
                        if (description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
                            foundItems.push(menuItems[i])
                        }
                    }

                    // console.log({foundItems})
                    // return processed items
                    return foundItems
                });
        }
    }

    function FoundItemsDirective() {
        return {
            templateUrl: 'found-items.html',
            restrict: "E",
            scope: {
                firstSearched: '<',
                foundItems: '<',
                onRemove: '&'
            }
        };
    }
})();
