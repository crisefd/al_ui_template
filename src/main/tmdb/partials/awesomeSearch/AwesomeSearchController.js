/**
 * SearchController provides controller support for inline searching
 *
 * @module tmdb.partials.search.SearchController
 *
 * @requires angular
 * @requires ngRoute
 * @requires config
 * @requires TMDBAPIService
 *
 * @author Barry Skidmore <bskidmore@alertlogic.com>
 *
 * @returns instance of the SearchController
 *
 * @copyright Alert Logic, Inc 2014
 *
 */

define( [ 'angular',
          'ngRoute',
          'config/config',
          'tmdb/services/TMDBAPIService'],
    function( angular, $routeParams, config, TMDBAPIService ) {
        "use strict";

        var AwesomeSearchController = function($scope, TMDBAPIService, $routeParams ) {
          var config    = angular.module("config");
          $scope.view   = {
              searchPhrase: "",
              resultList: [],
              images: config.apiImg
          };
          var api = TMDBAPIService.Search();
          var self = this;
          $scope.search = function () {
              self.applyQuery();
          };
          self.applyQuery = function() {
              if ( $scope.view.searchPhrase.length >= 2 ) {
                  api.search.multi($scope.view.searchPhrase)
                    .then( function ( response ) {
                        $scope.view.resultList = response.data.results;
                    });
              } else {
                  $scope.view.resultList = [];
              }
          };
          $scope.$on( '$routeChangeSuccess', function() {
              $scope.view.searchPhrase = "";
              $scope.view.resultList = [];
          });

      };

        AwesomeSearchController.$inject = [ '$scope', 'TMDBAPIService', '$routeParams' ];

        return AwesomeSearchController;
    }
);
