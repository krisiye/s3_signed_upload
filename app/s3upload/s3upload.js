'use strict';

angular.module('myApp.s3upload', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/s3upload', {
    templateUrl: 's3upload/s3upload.html',
    controller: 's3uploadCtrl'
  });
}])

.controller('s3uploadCtrl', ['$scope', '$http', function($scope, $http) {

$scope.onFileSelect = function(element) {
  
  var file = element.files[0];
  
  // init
  angular.element(document.querySelector('#get_url')).html("");
  angular.element(document.querySelector('#error')).html("");
  angular.element(document.querySelector('#status')).html("");

  $http({
      method: 'POST',
      url: '/signedPUTUrl',
      data: {name: file.name, size: file.size, type:file.type}
    }).success(function (data, status, headers, config){
      
      //alert("PUT url: " + data.url);
      $http({
        method: 'PUT',
        headers: {'Content-Type': file.type != '' ? file.type : 'application/octet-stream'},
        url: data.url,
        data: file
      }).success(function (data, status, headers, config){
        
        //alert("Upload status:" + status);
        angular.element(document.querySelector('#file')).val("");
        angular.element(document.querySelector('#status')).html("HTTP Status Code:" +status);
        angular.element(document.querySelector('#error')).html("");
        
        $http({
          method: 'POST',
          url: '/signedGETUrl',
          data: {name: file.name}
        }).success(function (data, status, headers, config) {
           angular.element(document.querySelector('#get_url')).html("<a href='"+data.url+"'>"+data.url+"</a>");  
        }).error(function (data, status, headers, config){
          angular.element(document.querySelector('#error')).html("Failed to get Signed URL for download");
          angular.element(document.querySelector('#get_url')).html("");
        })
        
      }).error(function (data, status, headers, config){
        angular.element(document.querySelector('#error')).html("failed to upload");
        angular.element(document.querySelector('#get_url')).html("");
      });
    }).error(function (data, status, headers, config){
      angular.element(document.querySelector('#error')).html("Failed signing PUT URL");
      angular.element(document.querySelector('#get_url')).html("");
    });
}

}]);
