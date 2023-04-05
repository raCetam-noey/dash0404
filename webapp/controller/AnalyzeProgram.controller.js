sap.ui.define([
	"dash0404/controller/BaseController",
    "sap/ui/model/json/JSONModel",
], function(
	BaseController,
    JSONModel
) {
	"use strict";

	return BaseController.extend("dash0404.controller.AnalyzeProgram", {

        onInit: function() {
            this._initializeModels();
            this._initializeRouter();
            this._setTableFields();
        },

        _initializeModels: function () {
            var aEntitySetConfigs = this.getEntitySetConfigs();

            this.getOwnerComponent().getModel('mainService').metadataLoaded().then(function () {
                aEntitySetConfigs.forEach(function (oEntitySetConfig) {
                    this.initializeEntitySetModel(oEntitySetConfig.entitySetPath, oEntitySetConfig.modelName);
                }, this);

                var oTable = this.getView().byId("analyzeTable");
                oTable.setModel(this.getView().getModel("o2002Model"));
            }.bind(this));
        },

      

        _initializeRouter: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("AnalyzeProgram").attachPatternMatched(this._onRouteMatched, this);
        },

        _onRouteMatched: function (oEvent) {
            this._setSelectedIconTab("key3");
        },
        
        _setTableFields: function () {
            // set row field as blue color
            var oTable = this.getView().byId("analyzeTable");
        
        },
		formatAvailableToObjectState: function(bAvailable) {
            debugger;
			return bAvailable ? "Success" : "Error";
		},
        

        

	});
});