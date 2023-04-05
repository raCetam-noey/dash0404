sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    var aEntitySetConfigs = [
        {
            entitySetPath: "/ZASCMT2001Set",
            modelName: "o2001Model"
        }, {
            entitySetPath: "/ZASCMT2002Set",
            modelName: "o2002Model"
        }, {
            entitySetPath: "/ZASCMT2003Set",
            modelName: "o2003Model"
        }
    ];

    return Controller.extend("dash0404.controller.BaseController", {

        getEntitySetConfigs: function () {
            return aEntitySetConfigs;
        },

        initializeEntitySetModel: function (p, o) {
            let _this = this;
            var oModel = this.getOwnerComponent().getModel('mainService');
            var oEntitySet = oModel.oMetadata._getEntityTypeByPath(p);
            var oEntitySetModel = new JSONModel(oEntitySet);
            this.getView().setModel(oEntitySetModel, o);

            // Read entity set OData
            oModel.read(p, {
                success: function (oData, oResponse) {
                    var oResult = oData.results;
                    oEntitySetModel.setData(oResult);
                }
            });
        },

        _setSelectedIconTab: function (sSelectedKey) {
            var oView = this.getOwnerComponent();
            var oIconTabBar = oView.byId("container-dash0404---App--iconTabHeader");
            oIconTabBar.setSelectedKey(sSelectedKey);
        },

        getRouter: function () {
            return sap.ui.core.UIComponent.getRouterFor(this);
        },
    });
});
