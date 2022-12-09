(function () {
    "use strict";
    angular
        .module("myFirstApp", [])

        .controller("LunchCheckController", function ($scope) {

            $scope.dishes = ""
            $scope.labelMessage = ""

            $scope.checkIfTooMuch = function () {

                if ($scope.dishes === "") {
                    $scope.labelMessage = "Please enter data first"
                    return
                }

                let count = $scope.dishes.split(",").length

                if (count <= 3) {
                    $scope.labelMessage = "Enjoy!"
                } else {
                    $scope.labelMessage = "Too much!"
                }
            }
        });
})();
