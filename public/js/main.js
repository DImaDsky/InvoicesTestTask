'use strict';

var invApp = angular.module('invApp', [
    'ui.router',
    'ngMessages',
    'ngResource'
]).
config(function($stateProvider, $urlServiceProvider, $httpProvider) {//$urlRouterProvider
    // $urlRouterProvider.otherwise('/invoices');
    $urlServiceProvider.rules.otherwise({ state: 'products' });

    $stateProvider
        .state({
            name: 'products',
            url: '/products',
            component: 'productsListComponent',
            resolve: {
                prodListPromise: function(ProductsService) {
                    return ProductsService.query();
                }
            }
        })
        .state('customers', {
            url: '/customers',
            templateUrl: '/js/Customers/Customers.html',
            controller: 'CustomersCtrl as vm'
        })
        .state('invoices', {
            url: '/invoices',
            templateUrl: '/js/Invoices/Invoices.html',
            controller: 'InvoicesCtrl as vm'
        })
        .state('invoices_edit', {
            url: '/invoice?{id}',
            component: 'invoiceEdit',
            resolve: {
                customersPromise: function(CustomersService) {
                    return CustomersService.query();
                }
            }
        });
        // .state('product_edit', {
        //     url: '/product?{id}',
        //     component: 'productEdit'
        // });


    $httpProvider.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    $httpProvider.interceptors.push(['$q', '$window', function ($q, $window) {
        return {
            'response': function(response) {
                if (response.status === 401) {
                    console.log("Response 401");
                }
                return response || $q.when(response);
            },
            'responseError': function(rejection) {
                if (rejection.status === 401) {
                    console.log("Response Error 401!", rejection);
                    //$window.location.pathname = '/login';
                }
                return $q.reject(rejection);
            }
        };
    }]);
});