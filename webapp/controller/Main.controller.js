sap.ui.define([
    "dash0404/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/format/DateFormat",
    "sap/m/MessageToast",
    "sap/ui/integration/library"
], function (BaseController, JSONModel, DateFormat, MessageToast, library) {

    "use strict";

    return BaseController.extend("dash0404.controller.Main", {

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
            }.bind(this));

            this._initializeCardManifests();
            this._initializeMainInfo();
            this._initializeData();
        },

        _initializeCardManifests: function () {
            var cardManifests = new JSONModel();
            cardManifests.loadData(sap.ui.require.toUrl("dash0404/model/cardManifests.json"));
            this.getView().setModel(cardManifests, "manifests");
        },

        _initializeMainInfo: function () {
            var homeIconUrl = sap.ui.require.toUrl("dash0404/images/CompanyLogo.png"),
                date = DateFormat.getDateInstance({style: "long"}).format(new Date());
            this.getView().setModel(new JSONModel({homeIconUrl: homeIconUrl, date: date}));
        },

        _initializeData: function () {
            var oModel = new JSONModel();
            oModel.loadData(sap.ui.require.toUrl("dash0404/model/data.json"));
            this.getView().setModel(oModel, "data");
            var oTable = this.getView().byId("container-dash0404---Main--table");
            oTable.setModel(this.getView().getModel("data"));
        },

        _initializeRouter: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("RouteMain").attachPatternMatched(this._onRouteMatched, this);
        },

        _onRouteMatched: function (oEvent) {
            this._setSelectedIconTab("key1");
            this._clearTableSelections();
        },

        _clearTableSelections: function () {
            var oTable = this.getView().byId("container-dash0404---Main--table");
            oTable.removeSelections(true);
        },

        onPressDonut: function (oEvent) {
            this.getRouter().navTo("AccessStatus");
            this._setSelectedIconTab("key2");
        },

        onPressTable: function (oEvent) {
            var oItem = oEvent.getSource();
            var oContext = oItem.getSelectedItem().getCells()[0].getText();
            var sSelectedKey;

            if (oContext.includes("사용자 시스템")) {
                this.getRouter().navTo("AccessStatus");
                sSelectedKey = "key2";
            } else if (oContext.includes("Transaction")) {
                this.getRouter().navTo("AnalyzeProgram");
                sSelectedKey = "key3";
            } else if (oContext.includes("프로그램")) {
                this.getRouter().navTo("ModuleUsage");
                sSelectedKey = "key4";
            } else {
                MessageToast.show("해당 내용에 대한 분석은 준비중입니다.", {width: "22rem"});
            }
            if (sSelectedKey) { // Set rootView IconTab to the appropriate tab
                this._setSelectedIconTab(sSelectedKey);
                this._clearTableSelections();
            }
        },

        onPressChart: function (oEvent) {
            this.getRouter().navTo("ModuleUsage");
            this._setSelectedIconTab("key4");
        }
    });
});
