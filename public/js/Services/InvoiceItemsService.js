invApp.factory('InvoiceItemsService', function($rootScope, $resource) {
    return $resource('/api/invoices/:invoice_id/items/:id', {// /api/invoices/{id}/items
        invoice_id: '@invoice_id',
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