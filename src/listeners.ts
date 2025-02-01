const textContainer = jsonViewer.$<HTMLElement>("#text-container");
const viewPanel = jsonViewer.$<HTMLElement>("#view-panel");

const textButton = jsonViewer.$<HTMLElement>("#text-button");
const viewerButton = jsonViewer.$<HTMLElement>("#viewer-button");

textButton.addEventListener("click", () => {
  textContainer.style.display = "block";
  viewPanel.style.display = "none";
});

viewerButton.addEventListener("click", async () => {
  await jsonViewer.process();
  textContainer.style.display = "none";
  viewPanel.style.display = "block";
});

