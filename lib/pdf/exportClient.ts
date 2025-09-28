import html2canvas from "html2canvas";
import jsPDF from "jspdf";

/**
 * exportElementToPdf: captures an element and downloads A4 PDF.
 * - elementId: id of DOM node that contains styled plan
 */
export async function exportElementToPdf(
  elementId: string,
  filename = "fitforge-plan.pdf"
) {
  const el = document.getElementById(elementId);
  if (!el) throw new Error("Element not found: " + elementId);
  const canvas = await html2canvas(el, { scale: 2 });
  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // Calculate aspect ratio fit
  const imgProps = pdf.getImageProperties(imgData);
  const imgWidth = pageWidth - 20; // margins
  const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

  pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
  pdf.save(filename);
}
