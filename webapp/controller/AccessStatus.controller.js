sap.ui.define([
    "dash0404/controller/BaseController",
    "sap/ui/model/json/JSONModel"
], function (BaseController, JSONModel) {
    "use strict";

   
    return BaseController.extend("dash0404.controller.AccessStatus", {

        onInit: function () {
            this._initializeModels();
            this._initializeRouter();
        },

        _initializeModels: function () {
            var aEntitySetConfigs = this.getEntitySetConfigs();

            this.getOwnerComponent().getModel('mainService').metadataLoaded().then(function () {
                aEntitySetConfigs.forEach(function (oEntitySetConfig) {
                    this.initializeEntitySetModel(oEntitySetConfig.entitySetPath, oEntitySetConfig.modelName);
                }, this);

                var oTable = this.getView().byId("table");
                oTable.setModel(this.getView().getModel("o2001Model"));
            }.bind(this));

            this._initializeCardManifests();
        },

        _initializeCardManifests: function () {
            var cardManifests = new JSONModel();
            cardManifests.loadData(sap.ui.require.toUrl("dash0404/model/cardManifests.json"));
            this.getView().setModel(cardManifests, "manifests");
        },

        _initializeRouter: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("AccessStatus").attachPatternMatched(this._onRouteMatched, this);
        },

        _onRouteMatched: function (oEvent) {
            this._setSelectedIconTab("key2");
        }

    });
});
