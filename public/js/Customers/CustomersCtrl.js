'use strict';

invApp.controller('CustomersCtrl', function (CustomersService) {
    var that = this;

    CustomersService.query().$promise.then(function (res) {
        that.customers = res;
        //ShareData.customers = res;
    });
});