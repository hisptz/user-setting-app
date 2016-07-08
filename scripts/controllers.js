/* global angular */

'use strict';

/* Controllers */
var userSettingControllers = angular.module('userSettingControllers', [])

//Controller for settings page
.controller('MainController', function($scope,$http, storage, $timeout,$window, userSetting, ModalService,toaster,$sce,$q) {

        $http.get('../../../api/userSettings').success(function(userObject){
            $scope.userObject=userObject;
            $scope.userLang=userSetting.getInterfaceLanguage(userObject);
            $scope.userDb=userSetting.getDatabaseLanguage(userObject);
            $scope.displayModule=userObject.keyAnalysisDisplayProperty;
            $scope.userEmailNotification=userObject.keyMessageEmailNotification;
            $scope.userMessageNotification=userObject.keyMessageSmsNotification;
            $scope.styleInterface=userSetting.getUserInterfaceStyle(userObject);
         },function(error){
            console.log("Error" +error);
        });
        var promise={module:userSetting.getSystemModule(),
            systemObject:userSetting.getSystemSetting(),
            systemApp:userSetting.getSystemApps()
        }
        $q.all(promise).then(function(data){
            $scope.startModule=userSetting.getUserStartPage(data.systemObject,data.module,data.systemApp);
        });
        $scope.addUserStartModulePropert=function(userObject){
            if(userObject.hasOwnProperty('startModule')){
                return userObject.startModule;
            }else{
                var url = "../../../api/userSettings";
                $http({
                    method:"POST",
                    data:{startModule:null},
                    url:url
                })
                    .then(function successCallback(response) {

                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
            }
        }
        $scope.saveIntLanguage=function(){
           $scope.langToSave=$scope.userObject.keyUiLocale;
           $http({
               method:'POST',
               url:'../../../api/userSettings/keyUiLocale',
               data:$scope.langToSave
           }).then(function(data){
               if(data.data.httpStatus=="OK"){
                 toaster.pop(setHeaderDelayMessage( data.data.message ));
               }
               console.log($scope.langToSave);
               console.info(data);
           },function(error){
               setHeaderDelayMessage("Error: "+error.data.message);
           });

        }
        $scope.saveDbLocale=function(){
            var dbValue=$scope.userObject.keyDbLocale;
            $http({
                method:'POST',
                url:'../../../api/userSettings/keyDbLocale',
                data:dbValue
            }).then(function(data){
                if(data.data.httpStatus=="OK"){
                    toaster.pop(setHeaderDelayMessage( data.data.message ));
                }else{
                    setHeaderDelayMessage("Can not update user settings");
                }
                console.log(dbValue);
                console.info(data);
            },function(error){
                setHeaderDelayMessage("Error: "+error.data.message);
            });
        }
        $scope.saveStartPage=function(){
            var startPage=$scope.userObject.value;
            $http({
                method:'POST',
                url:'../../../api/userSettings/startModule',
                data:startPage
            }).then(function(data){
                if(data.data.httpStatus=="OK"){
                    toaster.pop(setHeaderDelayMessage( data.data.message ));
                }else{
                    toaster.pop(setHeaderDelayMessage("Can not update user settings"));
                }
                console.log(startPage);
            },function(error){
                setHeaderDelayMessage("Error: "+error.data.message);
            });
        }
        $scope.saveIntStyle=function(){
            var userStyle=$scope.userObject.keyStyle;
            $http({
                method:'POST',
                url:'../../../api/userSettings/keyStyle',
                data:userStyle
            }).then(function(data){
                if(data.data.httpStatus=="OK"){
                    toaster.pop(setHeaderDelayMessage( data.data.message ));
                }else{
                    toaster.pop(setHeaderDelayMessage("Can not update user settings"));
                }
                console.log(userStyle);
            },function(error){
                setHeaderDelayMessage("Error: "+error.data.message);
            });
        }
        $scope.saveAnalysisObject=function(){
            var userStyle=$scope.userObject.keyAnalysisDisplayProperty;
            $http({
                method:'POST',
                url:'../../../api/userSettings/keyAnalysisDisplayProperty',
                data:userStyle
            }).then(function(data){
                if(data.data.httpStatus=="OK"){
                    toaster.pop(setHeaderDelayMessage( data.data.message ));
                }else{
                    toaster.pop(setHeaderDelayMessage("Can not update user settings"));
                }
                console.log(userStyle);
            },function(error){
                setHeaderDelayMessage("Error: "+error.data.message);
            });
        }
        $scope.saveEmailNotif=function(){
            var userEmail=$scope.userObject.keyMessageEmailNotification;

            $http({
                method:'POST',
                url:'../../../api/userSettings/keyMessageEmailNotification?value='+userEmail
             }).then(function(data){
                if(data.data.httpStatus=="OK"){
                    toaster.pop(setHeaderDelayMessage( data.data.message ));
                }else{
                    toaster.pop(setHeaderDelayMessage("Can not update user settings"));
                }
                console.log(userEmail);
            },function(error){
                setHeaderDelayMessage("Error: "+error.data.message);
            });
        }
        $scope.saveMessageNotif=function(){
            var userMessageNotification=$scope.userObject.keyMessageSmsNotification;
            $http({
                method:'POST',
                url:'../../../api/userSettings/keyMessageSmsNotification?value='+userMessageNotification
             }).then(function(data){
                if(data.data.httpStatus=="OK"){
                    toaster.pop(setHeaderDelayMessage( data.data.message ));
                }else{
                    toaster.pop(setHeaderDelayMessage("Can not update user settings"));
                }
                console.log(userMessageNotification);
            },function(error){
                setHeaderDelayMessage("Error: "+error.data.message);
            });
        }
        $scope.getHelpContent = function ( id )
        {
            $http.get('../../../dhis-web-commons-about/getHelpContent.action?id='+id)
                .success(function( data )
                   {
                    $( "div#rightBar" ).fadeIn();
                    $scope.html =data;
                    $scope.trustedHtml = $sce.trustAsHtml($scope.html);
                  });

        }

        /**
         * Hides the help content.
         */
        $scope.hideHelpContent = function (){
            $( "div#rightBar" ).fadeOut();
        };
     });