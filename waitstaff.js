angular.module('WaitstaffCalculator', ['ngRoute', 'ngAnimate'])

  .value('earnings', { tipTotal: 0, mealCount: 0 })

  .config(function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'home.html'
    }).when('/new-meal', {
      templateUrl: 'new-meal.html',
      controller: 'MealTicketCtrl'
    }).when('/my-earnings', {
      templateUrl: 'my-earnings.html',
      controller: 'EarningsCtrl'
    }).otherwise({
      redirectTo: '/'
    });
  })

  .run(function($rootScope, $location, $timeout) {
    $rootScope.$on('$routeChangeError', function() {
      $location.path('/');
    });
  })

  .controller("CalculatorCtrl", function($scope) {
    // nothing, yet, to do
  })

  .controller("MealTicketCtrl", function($scope, $rootScope, earnings) {
    var data = $scope.data = {
      basePrice: 0,
      taxRate: 0,
      tipPercent: 0
    };

    var charges = $scope.charges = {
      subtotal: 0,
      tip: 0
    };

    function resetData() {
      for (item in data) {
        data[item] = 0;
      }
    }

    function clearCharges() {
      for (item in charges) {
        charges[item] = 0;
      }
    }

    function calculateCharges() {
      charges.subtotal = data.basePrice * (1 + data.taxRate / 100);
      charges.tip = charges.subtotal * (data.tipPercent / 100);
    }

    function calculateEarnings() {
      earnings.tipTotal += charges.tip;
      earnings.mealCount++;
    }

    $scope.validCurrency = function(value) {
      return (/^(\d+(\.\d?\d?)?|\.\d\d?)$/.test(value));
    };

    $scope.validPercentage = function(value) {
      return (/^(100(\.0*)?|[1-9]?\d(\.\d*)?|\.\d+)$/.test(value));
    };

    function validForm() {
      return ($scope.validCurrency(data.basePrice)
        && $scope.validPercentage(data.taxRate)
        && $scope.validPercentage(data.tipPercent)
      );
    }

    $scope.submit = function() {
      if (validForm()) {
        calculateCharges();
        // $rootScope.$broadcast('tipReceived', charges.tip);
        calculateEarnings();
      }
    };

    $scope.cancel = function() {
      resetData();
      clearCharges();
    };
  })

  .controller("EarningsCtrl", function($scope, earnings) {
    /*
    var data = $scope.data = {
      tipTotal: 0,
      mealCount: 0
    };
    */

    var data = $scope.data = earnings;

    function resetData() {
      for (item in data) {
        data[item] = 0;
      }
    }

    /*
    $scope.$on('tipReceived', function(event, tip) {
      data.tipTotal += tip;
      data.mealCount++;
    });
    */

    $scope.resetCalculator = function() {
      resetData();
    };
  });

