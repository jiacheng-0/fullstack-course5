(function () {
    "use strict";
    angular
        .module("ShoppingListCheckOff", [])
        .controller("ToBuyController", ToBuyController)
        .controller("AlreadyBoughtController", AlreadyBoughtController)
        .service("ShoppingListCheckOffService", ShoppingListCheckOffService);


    ToBuyController.$inject = ["ShoppingListCheckOffService"]
    function ToBuyController(ShoppingListCheckOffService) {
        let itemBuyer = this
        itemBuyer.buyItem = function (itemIndex) {
            ShoppingListCheckOffService.buyItem(itemIndex)
        }

        itemBuyer.items = ShoppingListCheckOffService.getItems()
    }

    AlreadyBoughtController.$inject = ["ShoppingListCheckOffService"]
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        let boughtController = this
        boughtController.items = ShoppingListCheckOffService.getBoughtItems()
    }

    function ShoppingListCheckOffService() {

        let service = this
        let toBuy = [
            {name: "cookies", quantity: 10},
            {name: "bread", quantity: 1},
            {name: "milk", quantity: 2},
            {name: "cake", quantity: 2},
            {name: "apples", quantity: 5},
        ]
        let bought = []

        service.buyItem = function (itemIndex) {
            bought.push(toBuy[itemIndex])
            toBuy.splice(itemIndex, 1)
        }

        service.getItems = function () {
            return toBuy
        }

        service.getBoughtItems = function () {
            return bought
        }
    }

})();
