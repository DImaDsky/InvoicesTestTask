invApp.factory('InvoicesService', function($rootScope, $resource) {
    return $resource('/api/invoices/:id', {
        id: '@id'
    }, {
        query: {
            method: 'GET',
            isArray: true,
            transformResponse: function(responseData) {
                return angular.fromJson(responseData);
            }
        },
        update: {
            method:'PUT',
            transformResponse: function(responseData) {
                return angular.fromJson(responseData);
            }
        }

    })
});