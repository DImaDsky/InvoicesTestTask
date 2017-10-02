invApp.factory('ProductsService', function($rootScope, $resource) {
    return $resource('/api/products/:id', {
        id: '@id'
    }, {
        query: {
            method: 'GET',
            isArray: true,
            transformResponse: function(responseData) {
                return angular.fromJson(responseData);
            }
        }
    })
});