// script.js
document.getElementById('addMedicineBtn').addEventListener('click', function() {
  const medicineContainer = document.getElementById('medicinesContainer');
  const newMedicineRow = document.createElement('div');
  newMedicineRow.classList.add('medicineRow');
  
  newMedicineRow.innerHTML = `
    <label for="medicine">Medicine Name:</label>
    <input type="text" class="medicine" placeholder="Medicine Name" required>
    <label for="dosage">Dosage:</label>
    <input type="text" class="dosage" placeholder="Dosage" required>
    <label for="quantity">Quantity:</label>
    <input type="number" class="quantity" placeholder="Quantity" required>
  `;

  medicineContainer.appendChild(newMedicineRow);
});

document.getElementById('generatePdfBtn').addEventListener('click', function() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Get form values
  const doctorName = document.getElementById('doctorName').value;
  const patientName = document.getElementById('patientName').value;

  // Collect all medicines
  const medicines = [];
  const medicineInputs = document.querySelectorAll('.medicine');
  const dosageInputs = document.querySelectorAll('.dosage');
  const quantityInputs = document.querySelectorAll('.quantity');

  for (let i = 0; i < medicineInputs.length; i++) {
    medicines.push({
      name: medicineInputs[i].value,
      dosage: dosageInputs[i].value,
      quantity: quantityInputs[i].value
    });
  }

  // Add prescription content to the PDF
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(14);
  
  doc.text('Prescription', 10, 20);
  doc.text(`Doctor: ${doctorName}`, 10, 30);
  doc.text(`Patient: ${patientName}`, 10, 40);
  
  let yPosition = 50;  // Starting Y position for medicines
  medicines.forEach((medicine, index) => {
    doc.text(`${index + 1}. ${medicine.name} - Dosage: ${medicine.dosage} x Quantity: ${medicine.quantity}`, 10, yPosition);
    yPosition += 10;  // Move down for the next medicine
  });
  
  // Download the PDF
  doc.save('prescription.pdf');
});