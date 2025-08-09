document.getElementById('addMedicineBtn').addEventListener('click', function() {
  const medicineContainer = document.getElementById('medicinesContainer');
  const newMedicineRow = document.createElement('div');
  newMedicineRow.classList.add('medicineRow');
  
  newMedicineRow.innerHTML = `
    <label for="medicine">Medicine Name:</label>
     <input type="text" class="medicine" placeholder="Amoxicillin" required>
    <br>
    <label for="morningDosage">Morning Dosage:</label>
    <input type="text" class="morningDosage" placeholder="1" value="1" required><br>
    <br>    
    <label for="afternoonDosage">Afternoon Dosage:</label>
    <input type="text" class="afternoonDosage" placeholder="1" value="1" required><br>
    <br>
    <label for="nightDosage">Night Dosage:</label>
    <input type="text" class="nightDosage" placeholder="1" value="1" required><br>
    <br>
    <label for="quantity">Quantity:</label>
    <input type="number" class="quantity" placeholder="30" required>
    <br>
  `;

  medicineContainer.appendChild(newMedicineRow);
});

document.getElementById('generatePdfBtn').addEventListener('click', function() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // === Letterhead ===
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, 210, 35, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(110, 144, 70); // green from card
  doc.text("Dr. Bhutada's", 10, 12);

  doc.setFontSize(16);
  doc.setTextColor(33, 33, 33);
  doc.text("Advanced Homeopathy", 10, 20);

  doc.setFontSize(12);
  doc.text("Specially Hair Care & Kidney Stones", 10, 26);

  doc.setFontSize(10);
doc.text("Phone: 9422046620 | 9970144102", 150, 12);
doc.text("Address: Main Road, GEORAI,", 150, 18);
doc.text("Dist. Beed",150 ,24)

  doc.setDrawColor(133, 184, 79);
  doc.setLineWidth(1.2);
  doc.line(10, 30, 200, 30);

  // Prescription content starts below
  const doctorName = document.getElementById('doctorName').value;
  const patientName = document.getElementById('patientName').value;

  const medicines = [];
  const medicineInputs = document.querySelectorAll('.medicine');
  const morningDosageInputs = document.querySelectorAll('.morningDosage');
  const afternoonDosageInputs = document.querySelectorAll('.afternoonDosage');
  const nightDosageInputs = document.querySelectorAll('.nightDosage');
  const quantityInputs = document.querySelectorAll('.quantity');

  for (let i = 0; i < medicineInputs.length; i++) {
    medicines.push({
      name: medicineInputs[i].value,
      morningDosage: morningDosageInputs[i].value,
      afternoonDosage: afternoonDosageInputs[i].value,
      nightDosage: nightDosageInputs[i].value,
      quantity: quantityInputs[i].value
    });
  }

  let yPosition = 40;
  doc.setFontSize(14);
  // doc.text(`Doctor: ${doctorName}`, 10, yPosition);
  doc.text(`Patient: ${patientName}`, 10, yPosition);

  yPosition += 20;
  medicines.forEach((medicine, index) => {
    const dosageText = `${medicine.morningDosage}-----------${medicine.afternoonDosage}----------${medicine.nightDosage}`;
    
    doc.text(`${index + 1}. ${medicine.name}`, 10, yPosition);
    doc.text(`Quantity: ${medicine.quantity}`, 160, yPosition);
    doc.text(`${dosageText}`, 20, yPosition + 10);
    yPosition += 20;
  });

  doc.save('prescription.pdf');
});