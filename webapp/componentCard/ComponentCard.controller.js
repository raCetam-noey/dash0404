sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("dash0404.componentCard.ComponentCard", {

		onInit: function () {
			var mapImageUrl = sap.ui.require.toUrl("dash0404/componentCard/images/map.png");
			this.getView().setModel(new JSONModel({ mapImageUrl: mapImageUrl }));
		}

	});
});