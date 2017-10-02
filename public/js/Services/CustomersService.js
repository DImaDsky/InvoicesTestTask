invApp.factory('CustomersService', function($rootScope, $resource) {
    return $resource('/api/customers/:id', {
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