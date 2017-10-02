'use strict';

invApp.component('invoiceEdit', {
    bindings: {
        customersPromise: '<'
    },
    controller: function (InvoicesService, ProductsService, CustomersService, InvoiceItemsService, $location) {
        var $ctrl = this;
        this.fullPrice = 0;

        this.$onInit = function () {
            this.customersPromise.$promise.then(function (customers) {
                $ctrl.customers = customers;
            });
            var urlParams = $location.search();
            this.invoiceId = urlParams.id || 0;
            if (this.invoiceId > 0) { // for new invoices no need to query data
                InvoicesService.get({id:this.invoiceId}).$promise.then(function (res) {
                    $ctrl.invoice = res;
                    $ctrl.customersPromise.$promise.then(function () {
                        $ctrl.invoice.customer = $ctrl.customers.find(function (el) {
                            return el.id === $ctrl.invoice.customer_id;
                        });
                    });
                });
            } else {
                this.invoice = {discount: 0, total: 0};
            }
        };

        this.changeInvoice = function () {
            this.recalculateTotal();
            //messageComponent.showSuccess();
            if (!this.invoice.customer.id){
                return;
            }
            if (this.invoiceId > 0) {
                var invData = {
                    id: $ctrl.invoiceId,
                    customer_id: $ctrl.invoice.customer.id,
                    discount: $ctrl.invoice.discount,
                    total: $ctrl.invoice.total
                };
                InvoicesService.update(invData).$promise.then( function (res) {
                    // debugger
                });
            } else {
                InvoicesService.save($ctrl.invoice).$promise.then( function (res) {
                    $ctrl.invoice = res;
                    $ctrl.invoiceId = res.id;
                });
            }
        };

        this.recalculateTotal = function () {
            this.invoice.total = +(this.fullPrice * (1 - this.invoice.discount / 100)).toFixed(2);
        }
    },
    templateUrl: 'js/InvoiceEditComponent/InvoiceEdit.html'
});
