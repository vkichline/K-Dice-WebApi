(function () {
    'use strict';

    angular
        .module('app')
        .controller('diceCtrl', diceCtrl);

    diceCtrl.$inject = ['$scope', '$http'];

    var dataUrl = document.location.protocol + "//" + document.location.host + "/";

    function diceCtrl($scope, $http) {
        /* jshint validthis:true */
        var submitButton = document.getElementById("SubmitButton");
        var vm = this;
        vm.title = 'diceCtrl';

        $scope.results = {};
        $scope.results.errorMessage = "";

        $scope.dice = 2;
        $scope.sides = 6;

        $scope.$watch("sides", function (newValue) {
            if (submitButton) {
                if (2 == newValue) {
                    submitButton.innerText = "Flip";
                } else {
                    submitButton.innerText = "Roll";
                }
            }
        });

        $scope.rollDice = function () {
            return getData($scope.dice, $scope.sides);
        };

        function getData(dice, sides) {
            $http.get(dataUrl + 'api/dice/' + dice + '/' + sides)
                .success(function (data, status, headers, config) {
                    $scope.results.errorMessage = "";
                    var pairs = [];
                    for (var i = 0; i < data.length; i++) {
                        pairs[i] = {
                            index: i, value: data[i]
                        };
                    }
                    $scope.results.data = pairs;
                })
                .error(function (data, status, headers, config) {
                    $scope.results.errorMessage = "Error: " + status;
                });
        }
    }
})();
