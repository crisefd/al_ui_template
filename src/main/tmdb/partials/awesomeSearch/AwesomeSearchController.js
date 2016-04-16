/**
 * AwesomeSearchController provides controller support for inline searching
 *
 * @module tmdb.partials.search.AwesomeSearchController
 *
 * @requires angular
 * @requires config
 * @requires TMDBAPIService
 *
 * @author John Gomez <jgomez@alertlogic.com>
 *
 * @returns instance of the AwesomeSearchController
 *
 * @copyright Alert Logic, Inc 2016
 *
 */

define( [ 'angular',
          'config/config',
          'tmdb/services/TMDBAPIService'],
    function( angular, config, TMDBAPIService ) {
        "use strict";

        var AwesomeSearchController = function($scope, TMDBAPIService, $timeout ) {
            var self = this;

            var apiSearch = TMDBAPIService.Search();
            var apiPerson = TMDBAPIService.Person();

            var searchPromise;

            $scope.view = {
              searchPhrase: "",
              resultList: []
            };

            $scope.$watch('view.searchPhrase',function(newValue,oldValue){

                $timeout.cancel(searchPromise);

                searchPromise = $timeout(function(){
                    searchPromise = undefined;
                    console.log("newValue="+newValue+",oldValue="+oldValue);
                    if (newValue) {
                        if (newValue.length >= 3) {
                            console.log("Aguanta buscar!");
                            self.search();
                        }
                    }
                },500);
            });



            $scope.performSearch = function(event) {
                // if (event.which === 13) {
                //     self.search();
                // }
            };

            /**
            * Call the API with the search phrase
            */
            self.search = function(){
                apiSearch.search.multi($scope.view.searchPhrase).then(function(response){
                    $scope.view.resultList = response.data.results;

                    $scope.view.resultList.forEach(function(item){
                        if (item.media_type === "person") {
                            // Get images for persons
                            apiPerson.person.person(item.id).then( function(r) {
                                item.image = r.data.profile_path;
                                console.log(r.data.profile_path);
                            });
                        }
                        else {
                            item.image = item.poster_path;
                        }
                    });

                });
            };

        };

        AwesomeSearchController.$inject = [ '$scope', 'TMDBAPIService', '$timeout' ];

        return AwesomeSearchController;
    }
);
