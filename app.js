var app = angular.module('app', []);

app.directive('rainbow', ['$window', '$interval', '$timeout', function($window, $interval, $timeout){
  return{
    restrict: 'A',
    controller: function($scope){
      var _this = this;
      this.getHsla = function(index){
        return [index, '100%', '50%', '1'].join();
      };
      this.getRandomNumber = function(){
        return Math.floor(Math.random() * (360 - 0 + 1)) + 0;
      };
      this.getRandomWord = function(){
        var words = ['such wow', 'so amaze', 'much awesome', 'so hip', 'much rainbow'];
        return words[parseInt(Math.random() * words.length)];
      };
      this.setPhrase = function(){
        return $scope.phrase = _this.getRandomWord();
      };
      $scope.magic = function(){
        $scope.$broadcast('magic');
        $scope.reset();
      };
      $scope.reset = function(){
        $timeout(function(){
          return $scope.$broadcast('reset');
        }, 1200);
      };
    },
    template: '<li data-test-item ng-repeat="item in testitems"></li>',
    link: function($scope, $element, $attribute, controller){
      $scope.testitems = [];
      for( var i = 0; i < 360; i++){
        $scope.testitems.push({title:'test item ' + i, value:i});
      }
      $scope.magic();
    }
  };
}]);

app.directive('testItem', ['$interval', function($interval){
  return{
    restrict: 'A',
    require: '^rainbow',
    controller: function($scope){

    },
    link: function($scope, $element, $attribute, rainbow){
      function setStyles(number){
        return $element.css({'background-color':'hsla(' + rainbow.getHsla(number) + ')'});
      };
      $scope.$on('magic', function(){
        $interval(function(){
          setStyles(rainbow.getRandomNumber());
          rainbow.setPhrase();
        }, 200, 5);
      });
      $scope.$on('reset', function(){
        setStyles($scope.item.value);
      });
      setStyles($scope.item.value);
    }
  };
}]);
