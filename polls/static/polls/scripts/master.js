(function () {
    var ahApp = angular.module('afterhours', ['ui.router']);
    
    ahApp.config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/start');

        $stateProvider
        .state('start', {
            url: '/start',
            views: {
                'main': {
                    templateUrl: 'templates/start.html'
                }
            }
        })
        .state('register', {
            url: '/register',
            views: {
                'main': {
                    templateUrl: 'templates/register.html'
                }
            }
        })
        .state('login', {
            url: '/login',
            views: {
                'main': {
                    templateUrl: 'templates/login.html'
                }
            }
        })
        .state('home', {
            url: '/home',
            views: {
                'main': {
                    templateUrl: 'templates/home.html'
                }
            }
        })
        .state('profile', {
            url: '/profile',
            views: {
                'main': {
                    templateUrl: 'templates/profile.html',
                    controller:['$scope', '$http', '$log', 'profileService', function($scope, $http, $log, profileService){
                        
                        loadProfile(false);

                        function loadProfile(refreshData) {
                            profileService.getProfile(refreshData)
                                .then(function(theProfile) {
                                    setProfile(theProfile);
                                })
                            ;
                        }

                        function setProfile(theProfile) {
                            $scope.profile = theProfile;
                        }

                    }],
                    controllerAs: 'profileCtrl'
                }
            },
        });
    })
    .service('profileService', ['$rootScope', '$http', '$log', function($rootScope, $http, $log) {
        return ({
            getProfile: getProfile
        });

        var model = null;

        function getProfile(refreshData) {
            if (refreshData || model === null || model === undefined)
                model = getProfileFromSvc();
            else
                model = new Promise(function(resolve, reject){resolve(model);})
            return model;
        }

        function getProfileFromSvc() {
            return $http.get('https://afterhours.herokuapp.com/profile')
                .then(getProfileFromSvcSuccess, getProfileFromSvcFailure);
        }

        function getProfileFromSvcSuccess(response) {
            $log.log(response.data);
            model = response.data;
            return model;
        }

        function getProfileFromSvcFailure() {
            $log.log('Error getting the user\'s profile.');
            model = {"id":1,"firstName":"John","lastName":"Doe","gender":"M","relStatus":"N","studies":"Biological Science","city":"Chicago","state":"IL","homeCity":"Naperville","homeState":"IL","selfSummary":"Lorem ipsum dolor sit amet...","email":"user@email.com","phone":"8471234567","schoolName":"DePaul University","birthDate":454896000000,"gradYear":2020,"organizations":[{"org":"Sigma Phi Epsilon","role":"President"},{"org":"Upsilon Pi Epsilon","role":"Member"}],"numFriends":356,"age":31};
            $log.log('Using Test Model: ');
            $log.log(model);
            return model;
        }
    }]);
    
})();