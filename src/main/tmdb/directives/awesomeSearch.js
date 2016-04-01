/**
 * Provides a search element
 *
 * @module tmdb.directives.search
 *
 * @requires angular
 * @requires SearchController
 *
 * @author Barry Skidmore <bskidmore@alertlogic.com>
 *
 * @copyright Alert Logic, Inc 2014
 *
 */

 define( [ 'angular',
           'tmdb/partials/awesomeSearch/AwesomeSearchController' ],
    function( angular, AwesomeSearchController ) {
        "use strict";

        return function() {
            return {
                transclude: true,
                replace: true,
                controller: AwesomeSearchController,
                templateUrl: '/tmdb/partials/awesomeSearch/awesomeSearch.html',
                restrict: 'E',
                scope: {
                    movieList: '=ngModel'
                }
            };
        };
    }
);
