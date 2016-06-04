/* global angular */

'use strict';

/* Services */

var userSettingServices = angular.module('userSettingServices', ['ngResource']);

/*service for local db */
userSettingServices.service('userSetting', function ($window, $q,$http,$rootScope) {
    var userSetting = {

        getInterfaceLanguage:function(userSettingObject){
            var laguange=[
                {'name':'Arabic','value':'ar','selected':false},
                {'name':'Arabic (Egypt)','value':'ar_EG','selected':false},
                {'name':'Arabic (Iraq)','value':'ar_IQ','selected':false},
                {'name':'Arabic (Sudan)','value':'ar_SD','selected':false},
                {'name':'Bengali','value':'bn','selected':false},
                {'name':'Bislama','value':'bi','selected':false},
                {'name':'Burmese','value':'my','selected':false},
                {'name':'Chinese','value':'zh','selected':false},
                {'name':'Dzongkha','value':'dz','selected':false},
                {'name':'English','value':'en','selected':false},
                {'name':'French','value':'fr','selected':false},
                {'name':'Indonesian (Indonesia)','value':'in_ID','selected':false},
                {'name':'Khmer','value':'km','selected':false},
                {'name':'Kinyarwanda','value':'rw','selected':false},
                {'name':'Lao','value':'lo','selected':false},
                {'name':'Mongolian','value':'mn','selected':false},
                {'name':'Nepali','value':'ne','selected':false},
                {'name':'Portuguese','value':'pt','selected':false},
                {'name':'Portuguese (Brazil)','value':'pt_BR','selected':false},
                {'name':'Russian','value':'ru','selected':false},
                {'name':'Tajik','value':'tg','selected':false},
                {'name':'Tetum','value':'tet','selected':false},
                {'name':'Urdu','value':'ur','selected':false},
                {'name':'Vietnamese','value':'vi','selected':false},
                {'name':'ckb','value':'ckb','selected':false}
            ];
            angular.forEach(laguange,function(langDb){
                if(langDb.value==userSettingObject.keyUiLocale){
                    langDb.selected=true;
                }
            });
            return laguange;

        },
        getDatabaseLanguage:function(langDbObject){
            var dbLanguage=[
                {'name':'Afrikaans','value':'af','selected':false},
                {'name':'Amharic','value':'am','selected':false},
                {'name':'Arabic','value':'ar','selected':false},
                {'name':'Bislama','value':'bi','selected':false},
                {'name':'Burmese','value':'my','selected':false},
                {'name':'Chinese','value':'zh','selected':false},
                {'name':'Dutch','value':'nl','selected':false},
                {'name':'Dzongkha','value':'dz','selected':false},
                {'name':'English','value':'en','selected':false},
                {'name':'French','value':'fr','selected':false},
                {'name':'German','value':'de','selected':false},
                {'name':'Gujarati','value':'gu','selected':false},
                {'name':'Hindi','value':'hi','selected':false},
                {'name':'Indonesian','value':'in','selected':false},
                {'name':'Italian','value':'it','selected':false},
                {'name':'Khmer','value':'km','selected':false},
                {'name':'Kinyarwanda','value':'rw','selected':false},
                {'name':'Lao','value':'lo','selected':false},
                {'name':'Nepali','value':'ne','selected':false},
                {'name':'Norwegian','value':'no','selected':false},
                {'name':'Persian','value':'fa','selected':false},
                {'name':'Portuguese','value':'pt','selected':false},
                {'name':'Pushto','value':'ps','selected':false},
                {'name':'Russian','value':'ru','selected':false},
                {'name':'Spanish','value':'es','selected':false},
                {'name':'Swahili','value':'sw','selected':false},
                {'name':'Tajik','value':'tg','selected':false},
                {'name':'Vietnamese','value':'vi','selected':false},
            ];
            angular.forEach(dbLanguage,function(dbOject){
                if(dbOject.value==langDbObject.keyDbLocale){
                    dbOject.selected=true;
                }
            });
            return dbLanguage;

        },
        getUserStartPage:function(object){
            var assignedModules=[];
            var startApps = [];
            var hardCodedMemu=[];
            $http.get('../../../api/apps?fields=name,folderName').success(function(returnedArray){
                hardCodedMemu.push({"name":"Dashboard","value":"/dhis-web-dashboard-integration"},{"name":"Pivot Table","value":"/dhis-web-pivot"},
                    {"name":"Data Visualizer","value":"/dhis-web-visualizer"},{"name":"GIS","value":"/dhis-web-mapping"},{"name":"Data Administration","value":"/dhis-web-maintenance-dataadmin"},
                    {"name":"Entry Forms","value":"/dhis-web-maintenance-dataset"},{"name":"Import-Export","value":"/dhis-web-importexport"},{"name":"Administrative Units","value":"/dhis-web-maintenance-organisationunit"},
                    {"name":"Users","value":"/dhis-web-maintenance-user"},{"name":"Data Elements / Indicators","value":"/dhis-web-maintenance"});
                angular.forEach(returnedArray,function(valueKey){
                    startApps.push({"name":valueKey.name,"value":valueKey.name});
                });
                var startModulesCombined=hardCodedMemu.concat(startApps);
                angular.forEach(startModulesCombined,function(pages){
                    if(object.startModule==pages.value){
                        pages['selected']=true;
                    }else{
                        pages['selected']=false;
                    }
                    assignedModules.push(pages);
                })
            },function(error){
                //Error if fails
                console.log("Fails "+error)
            });
            return assignedModules;
        },
        getUserInterfaceStyle:function(styleObject){
            var userSettingStyle=[];
            $http.get('../../../api/system/styles').success(function(returnedArray){
            angular.forEach(returnedArray,function(styles){
                if(styleObject.keyStyle==styles.path){
                styles['selected']=true;
                }else{
                styles['selected']=false;
                }
                userSettingStyle.push(styles);
            })
            },function(error){
                //Error if fails
                console.log("Fails "+error)
            });
            return userSettingStyle;
        }

     };

    return userSetting

});
