sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"
 ], function (BaseController,
	JSONModel) {
    "use strict";

    return BaseController.extend("dash0404.controller.App", {
        onInit() {
            //check current Page nav id
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.attachRouteMatched(this._onRouteMatched, this);

        },
        _onRouteMatched(oEvent) {
            var sRouteName = oEvent.getParameter("name");
            //create model include sRouteName
            var oModel = new JSONModel({
                routeName: sRouteName
            });
            this.getView().setModel(oModel);
        },
       
        onSelectTab(oEvent) {
            let _this = this;
            var sKey = oEvent.getSource().getSelectedKey();
                 var oKeyFormMapping = {
                key1: "RouteMain",
                key2: "AccessStatus",
                key3: "AnalyzeProgram",
                key4: "ModuleUsage"
            };
            if (oKeyFormMapping[sKey]) {
                _this.getOwnerComponent().getRouter().navTo(oKeyFormMapping[sKey]);
            }
        },
        onHomePress() {
            this.getOwnerComponent().getRouter().navTo("RouteMain");
        }
    });

});
