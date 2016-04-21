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

define(['angular',
    'config/config',
    'tmdb/services/TMDBAPIService'
  ],
  function(angular, config, TMDBAPIService, $timeout) {
    "use strict";

    var AwesomeSearchController = function($scope, TMDBAPIService, $timeout) {
      var self = this;

      var apiSearch = TMDBAPIService.Search();
      var apiPerson = TMDBAPIService.Person();
      self.TIME_WATCHER = 500;
      var limitName = 24;
      var searchPromise;
      var config = angular.module("config");


      $scope.view = {
        searchPhrase: "",
        resultList: []
      };

      $scope.$watch('view.searchPhrase', function(newValue, oldValue) {

        $timeout.cancel(searchPromise);

        searchPromise = $timeout(function() {
          console.log("newValue=" + newValue + ",oldValue=" + oldValue);
          searchPromise = undefined;
          self.search();
        }, self.TIME_WATCHER);
      });



      $scope.performSearch = function(event) {
        if (event.which === 13) {
            self.search();
        }
      };
      
      /**
            * Return the name depending on the results.
            */
            var formatName = function(data) {

                var newName = data.name || data.title;

                if (newName) {
                    if(newName.length > limitName){ 
                        return newName.substr(0, limitName)+"...";
                    }
                    return newName;
                }

                return "No name";
            };

            /**
            * Return the default image if not have a defined
            * image path.
            */
            self.getImagePath = function( path ) {
                var defaultImage = "http://simpleicon.com/wp-content/uploads/movie-1.png";
                if(path){
                    return config.apiImg + path;   
                }
                return defaultImage;  
            };

      /**
       * Call the API with the search phrase
       */
      self.search = function() {
        apiSearch.search.multi($scope.view.searchPhrase).then(function(response) {
          $scope.view.resultList = response.data.results;

          $scope.view.resultList.forEach(function(item) {
            if (item.media_type === "person") {
              // Get images for persons
              apiPerson.person.person(item.id).then(function(response) {
                 if(response.data.profile_path == null){
                    item.image = self.getImagePath();
                  } else{
                    item.image = self.getImagePath(response.data.profile_path);
                  }
                  });
            } else {
              if(item.poster_path == null){
                item.image = self.getImagePath();
              } else{
                item.image = self.getImagePath(item.poster_path);
              }
            }
            item.formatName = formatName(item);
          });

        });
      };

    };

    AwesomeSearchController.$inject = ['$scope', 'TMDBAPIService', '$timeout'];

    return AwesomeSearchController;
  }
);
