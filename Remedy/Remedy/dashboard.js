const greeting = document.getElementById('greeting');
const firstName = localStorage.getItem('userFirstName');
greeting.textContent = 'Hello, ' + firstName + '!';

const addMedBtn = document.getElementById('add-med-btn');
const addMedForm = document.getElementById('add-med-form');
const medList = document.getElementById('med-list');
const emptyState = document.getElementById('empty-state');

const medName = document.getElementById('med-name');
const medDose = document.getElementById('med-dose');
const medTime = document.getElementById('med-time');
const medFrequency = document.getElementById('med-frequency');

addMedBtn.addEventListener('click', function () {
  addMedForm.classList.toggle('hidden');
});

function getMedications() {
  const stored = localStorage.getItem('medications');
  if (stored) {
    return JSON.parse(stored);
  } else {
    return [];
  }
}

function renderMedications() {
  const medications = getMedications();

  medList.innerHTML = '';

  if (medications.length === 0) {
    emptyState.classList.remove('hidden');
  } else {
    emptyState.classList.add('hidden');

    medications.forEach(function (med) {
      const item = document.createElement('div');
      item.className = 'med-item';
      item.textContent = med.name + ' - ' + med.dose + ' - ' + med.time + ' - ' + med.frequency;
      medList.appendChild(item);
    });
  }
}

addMedForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const newMed = {
    name: medName.value,
    dose: medDose.value,
    time: medTime.value,
    frequency: medFrequency.value
  };

  const medications = getMedications();
  medications.push(newMed);
  localStorage.setItem('medications', JSON.stringify(medications));

  addMedForm.reset();
  addMedForm.classList.add('hidden');
  renderMedications();
});

renderMedications();