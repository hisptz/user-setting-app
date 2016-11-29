'use strict';

/* App Module */

var userSetting = angular.module('userSetting',
                    ['ui.bootstrap', 
                     'ngRoute', 
                     'ngCookies', 
                     'ngSanitize',
                     'userSettingDirectives',
                     'userSettingControllers',
                     'userSettingServices',
                     'userSettingFilters',
                     'd2Directives',
                     'd2Filters',
                     'd2Services',
                     'd2Controllers',
                     'angularLocalStorage',
                     'pascalprecht.translate',
                      'd2HeaderBar',
                     'ngAnimate',
                     'toaster'])
              
.value('DHIS2URL', '../../..')

.config(function($translateProvider) {   
    $translateProvider.preferredLanguage('en');
    $translateProvider.useSanitizeValueStrategy('escaped');
    $translateProvider.useLoader('i18nLoader');
});