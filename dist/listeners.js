"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const textContainer = jsonViewer.$("#text-container");
const viewPanel = jsonViewer.$("#view-panel");
const textButton = jsonViewer.$("#text-button");
const viewerButton = jsonViewer.$("#viewer-button");
textButton.addEventListener("click", () => {
    textContainer.style.display = "block";
    viewPanel.style.display = "none";
});
viewerButton.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    yield jsonViewer.process();
    textContainer.style.display = "none";
    viewPanel.style.display = "block";
}));
