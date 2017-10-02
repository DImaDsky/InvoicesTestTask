invApp.component('productsComponent', {
    bindings: {
        invoiceId: '<',
        fullPrice: '=',
        changeInvoice: '&'
    },
    controller: function (ProductsService, InvoiceItemsService) {
        var $ctrl = this;

        this.$onChanges = function(changes) {
            if(changes.invoiceId) {
                this.getProducts($ctrl.invoiceId);
            }
        };

        var productsPromise = ProductsService.query().$promise.then(function (products) {
            $ctrl.products = products;
        });

        this.getProducts = function (id) {
            if(!id) {
                $ctrl.invoiceItems = [{}];
                return;
            }

            InvoiceItemsService.query({invoice_id: id}).$promise.then( function (invoiceItems) {
                productsPromise.then(function () {
                    invoiceItems.forEach(function (item) { // get product by product_id to be selected in <select>
                        item.product = $ctrl.products.find(function (el) {
                            return el.id === item.product_id
                        });
                    });
                    invoiceItems.push({});// add empty field for adding new product
                    $ctrl.invoiceItems = invoiceItems;
                    $ctrl.calcFullPrice();
                });
            });
        };

        this.addProductField = function () {
            $ctrl.invoiceItems.push({});
        };
        this.removeProductField = function (item) {
            var index = $ctrl.invoiceItems.indexOf(item);
            if(item.id > 0) { // if InvoiceItem not new
                InvoiceItemsService.delete(item)
            }
            $ctrl.invoiceItems.splice(index, 1);
            this.calcFullPrice();
        };
        this.changeProductField = function (item) {
            if (item.quantity && item.product) {
                this.calcFullPrice();
                var saveData = {
                    invoice_id: $ctrl.invoiceId,
                    product_id: item.product.id,
                    quantity: item.quantity
                };
                if (isNaN(item.id)) {
                    InvoiceItemsService.save(saveData).$promise.then( function (res) {
                        console.log('InvoiceItemsService.saved ',res)
                        item.id = res.id;
                    });
                } else {
                    saveData.id = item.id;
                    InvoiceItemsService.update(saveData).$promise.then( function (res) {
                        console.log('InvoiceItemsService.updated ',res)
                    });
                }
            }
        };
        this.calcFullPrice = function (){
            var price = 0;
            this.invoiceItems.forEach(function (item) {
                if(item.product) { // not empty invoiceItem
                    price += item.product.price * item.quantity;
                }
            });
            if(this.fullPrice == 0){
                this.fullPrice = price;
            } else if(price != $ctrl.fullPrice){
                this.fullPrice = price;
                this.changeInvoice();
            }
        };
    },
    templateUrl: 'js/ProductsComponent/Products.html',
});