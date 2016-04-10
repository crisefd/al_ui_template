/**
 * Provides a movie-cast element
 *
 * @module tmdb.directives.movieCast
 *
 * @requires angular
 * @requires RemoteImageLoader
 *
 * @param {object} angular - An instance of AngularJS
 *
 * @author Cristhian Fuertes
 *
 * @copyright Alert Logic, Inc 2014
 *
 */

define( [ 'angular',
          'tmdb/partials/awesomeSearch/AwesomeSearchResultsController'],
    function( angular, AwesomeSearchResultsController ) {
        "use strict";

        return function() {
            return {
                transclude: true,
                replace: true,
                controller: AwesomeSearchResultsController,
                templateUrl: '/tmdb/partials/awesomeSearch/awesomeSearchResults.html',
                restrict: 'E',
                scope: {
                    view: '=ngModel'
                }
            };
        };
    }
);
