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

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(14);

  doc.text('Prescription', 10, 20);
  doc.text(`Doctor: ${doctorName}`, 10, 30);
  doc.text(`Patient: ${patientName}`, 10, 40);

  let yPosition = 50;
  medicines.forEach((medicine, index) => {
    // Format the dosage as x--------y-------z
    const dosageText = `${medicine.morningDosage}-----------${medicine.afternoonDosage}----------${medicine.nightDosage}`;
    
    doc.text(`${index + 1}. ${medicine.name}`, 10, yPosition);
    doc.text(`Quantity: ${medicine.quantity}`, 160, yPosition);
    doc.text(`${dosageText} `, 20, yPosition+10);
    yPosition += 20;
  });

  doc.save('prescription.pdf');
});