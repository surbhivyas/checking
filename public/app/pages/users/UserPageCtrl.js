/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.users')
      .controller('UserPageCtrl',['$scope', '$filter', 'editableOptions', 'editableThemes', '$window', '$http', '$uibModal', 'baProgressModal',UserPageCtrl] );

  /** @ngInject */
  function UserPageCtrl($scope, $filter, editableOptions, editableThemes, $window, $http, $uibModal, baProgressModal) {


    $http.get("http://localhost:7800/api/all-users").then(function(response) {
      $scope.users = response.data.data;
    });


    $scope.createPost = function(named, mobiled, emailid, passwordv ,levelid) {
      $http({
          method: 'POST',
          format: 'json',
          url: 'http://localhost:7800/api/add-user',
          data: JSON.stringify({
            name: named,
            mobile: mobiled,
            email: emailid,
            password: passwordv,
            level: levelid
          })
        })
        .then(function(success) {
          //console.log("hit " + JSON.stringify(success));
          $window.location.reload()
        }, function(error) {
          //console.log("not hit " + JSON.stringify(error));
        });
    }

    $scope.removeCourse = function(id) {
      var m = parseInt(id);
      if (confirm("Are you sure you want to delete?") == true) {
        $http.post("http://localhost:7800/api/delete-user/" + m).then(function(response) {
        });
        $window.location.reload()
      } else {
      }
    };

    $scope.updateCourse = function(id) {
      $scope.gotUser = {};
      $scope.form = {};

      // $window.location.reload()
      //console.log(user.id);

    //  console.log("scope id"+id);
    //  console.log("scope name"+name);
    //  console.log("scope mobile"+mobile);
    //  console.log("scope email"+email);
    //  console.log("scope password"+password);
    //  console.log("scope level"+level);
    //  console.log("scope user"+JSON.stringify($scope.users));
    $http.get("http://localhost:7800/api/get-user/"+id).then(function(response) {
      //console.log(response.data.response.data);
      $scope.gotUser = response.data.response.data;
      console.log($scope.gotUser.name);
      $scope.form.name = $scope.gotUser.name;
      console.log($scope.form.name);
    });



/*
      var m = parseInt(id);
      var data = JSON.stringify({
        name: name,
        mobile: mobile,
        email: email,
        password: password,
        level: level
      });
      alert('data'+data);
      // alert('m= '+m);
      $http({
          method: 'POST',
          format: 'json',
          url: 'http://localhost:7800/api/edit-user/'+m,
          data: data
        })
        .then(function(success) {
          console.log("hit " + JSON.stringify(success));
          //$window.location.reload()
        }, function(error) {
          console.log("not hit " + JSON.stringify(error));
        });*/
    }

    // $scope.addUser = function() {
    //   // $http.post("http://localhost:7800/api/addCourse").then(function(response) {
    //   //         console.log("hit");
    //   //         console.log("response"+JSON.stringify(response.data.data));
    //   //         // console.log("respomse data "+JSON.stringify(response.data));
    //   //
    //   //       //  $scope.users = response.data.data;
    //   //     });
    //   $scope.inserted = {
    //     // id: $scope.users.length+1,
    //     title: '',
    //     description: null,
    //     duration: null
    //   };
    //   $scope.users.push($scope.inserted);
    // }
    $scope.open = function(e,id,page, size) {

      $uibModal.open({
        animation: true,
        templateUrl: page,
        size: size,
        resolve: {
          items: function() {
            return $scope.items;
          }
        }
      });
      if(e.target.innerText == 'Edit'){
        $scope.updateCourse(id);

      }
    };
    $scope.openProgressDialog = baProgressModal.open;

    editableOptions.theme = 'bs3';
    editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="ion-checkmark-round"></i></button>';
    editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="ion-close-round"></i></button>';


  }

})();
