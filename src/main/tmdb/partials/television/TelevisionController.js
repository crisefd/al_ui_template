/**
 * TelevisionController provides controller support for fetching movies from tmdb
 *
 * @module tmdb.partials.movie.TelevisionController
 *
 * @requires angular
 * @requires ngRoute
 * @requires config
 * @requires TMDBAPIService
 *
 * @author Barry Skidmore <bskidmore@alertlogic.com>
 *
 * @returns instance of the TelevisionController
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

        var TelevisionController = function($scope, TMDBAPIService, $routeParams ) {

            $scope.view   = {
                details: {},
            };
            
            TMDBAPIService.getTVShowDetails( $routeParams.id ).then( function( response ) {
                console.log("Television!", response.data );
                TMDBAPIService.getTVShowSeasons( $routeParams.id ).then( function( seasons ) {
                    console.log("Seasons", seasons );
                } );
            } );

        };

        TelevisionController.$inject = [ '$scope', 'TMDBAPIService', '$routeParams' ];

        return TelevisionController;
    }
);
