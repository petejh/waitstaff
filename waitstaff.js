angular.module("WaitstaffCalculator", [])

  .controller("CalculatorCtrl", function($scope) {
    $scope.resetCalculator = function() {
      $scope.$broadcast('resetCalculator');
    };
  })

  .controller("MealDetailsCtrl", function($scope, $rootScope) {
    var data = {
      basePrice: 0,
      taxRate: 0,
      tipPercent: 0
    };
    function resetData() {
      for (item in data) {
        data[item] = 0;
      }
      $scope.data = data;
    }
    $scope.submit = function() {
      $rootScope.$broadcast('ticketPaid', $scope.data);
    };
    $scope.cancel = function() {
      resetData();
    };
    $scope.$on('resetCalculator', function() {
      resetData();
    });
    /* Initializations */
    $scope.data = data;
  })

  .controller("CustomerChargesCtrl", function($scope, $rootScope) {
    var data = {
      subtotal: 0,
      tip: 0
    };
    function resetData() {
      for (item in data) {
        data[item] = 0;
      }
      $scope.data = data;
    }
    $scope.$on('ticketPaid', function(event, ticketData) {
      $scope.data.subtotal = ticketData.basePrice * (1 + ticketData.taxRate / 100);
      $scope.data.tip = $scope.data.subtotal * (ticketData.tipPercent / 100);
      $rootScope.$broadcast('tipReceived', $scope.data.tip);
    });
    $scope.$on('resetCalculator', function() {
      resetData();
    });
    /* Initializations */
    $scope.data = data;
  })

  .controller("EarningsInfoCtrl", function($scope) {
    var data = {
      tipTotal: 0,
      mealCount: 0
    };
    function resetData() {
      for (item in data) {
        data[item] = 0;
      }
      $scope.data = data;
    }
    $scope.$on('tipReceived', function(event, tip) {
      $scope.data.tipTotal += tip;
      $scope.data.mealCount++;
    });
    $scope.$on('resetCalculator', function() {
      resetData();
    });
    /* Initializations */
    $scope.data = data;
  });

