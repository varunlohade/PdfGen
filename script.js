const generatePDF = async (name) => {
  const { PDFDocument, rgb } = PDFLib;
  const exBytes = await fetch("./Bonafide.pdf").then((res) =>
    res.arrayBuffer()
  );
  const pngUrl =
    "https://static.cdn.wisestamp.com/wp-content/uploads/2020/08/Oprah-Winfrey-Signature-1.png";
  const pngImageBytes = await fetch(pngUrl).then((res) => res.arrayBuffer());
  const pngImage = await pdfDoc.embedPng(pngImageBytes);
  const pngDims = pngImage.scale(0.5);

  const PDFDoc = await PDFDocument.load(exBytes);
  const pages = PDFDoc.getPages();
  const firstpg = pages[0];
  firstpg.drawText(name, {
    x: 100,
    y: 190,
    size: 19,
  });
  firstpg.drawText(name, {
    x: 330,
    y: 545,
    size: 15,
  });
  page.drawImage(pngImage, {
    x: 200,
    y: 200,
    width: pngDims.width,
    height: pngDims.height,
  });
  const uri = await PDFDoc.saveAsBase64({ dataUri: true });
  console.log("working");
  console.log(uri);

  saveAs(uri, "certificate.pdf", { autoBom: true });
  console.log("no error maybe");
  document.querySelector("#mypdf").src = uri;
};
const submitBtn = document.getElementById("submit");
const inputVal = document.querySelector("#name");
submitBtn.addEventListener("click", () => {
  const val = inputVal.value;
  generatePDF(val);
  console.log(val);
});
