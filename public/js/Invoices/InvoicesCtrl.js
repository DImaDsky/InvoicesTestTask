'use strict';

invApp.controller('InvoicesCtrl', function(InvoicesService) {
    var that = this;

    InvoicesService.query().$promise.then( function (res){
        that.invoices = res;
    });
});
