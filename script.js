const { jsPDF } = window.jspdf;

const filesInput = document.getElementById("images");
const btn = document.getElementById("createPdf");
const bar = document.getElementById("progressBar");
const nameInput = document.getElementById("pdfName");

btn.onclick = async () => {
  const files = filesInput.files;
  if (!files.length) return alert("Select images first");

  const pdf = new jsPDF();
  const name = nameInput.value || "document";

  bar.style.width = "0%";

  for (let i = 0; i < files.length; i++) {
    const img = await loadImage(files[i]);

    const w = pdf.internal.pageSize.getWidth();
    const h = (img.height * w) / img.width;

    if (i > 0) pdf.addPage();
    pdf.addImage(img, "JPEG", 0, 0, w, h);

    bar.style.width = ((i + 1) / files.length) * 100 + "%";
  }

  pdf.save(name + ".pdf");
};

function loadImage(file){
  return new Promise(resolve=>{
    const reader = new FileReader();
    reader.onload = ()=>{
      const img = new Image();
      img.onload = ()=>resolve(img);
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}
