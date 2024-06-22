function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('open');
}

function showAdditionalDetails(id) {
  const additionalDetailsRow = document.getElementById(`additional-details-${id}`);
  additionalDetailsRow.classList.toggle('hidden');
  
}

function showRequestForm(event) {
  const form = document.getElementById('request-form');
  form.style.display = 'block';
  event.preventDefault();
}


function submitRequest(event) {
    event.preventDefault();
    
    const fullname = document.getElementById('fullname').value.trim();
    const nationalId = document.getElementById('national-id').value.trim();
    const birthdate = document.getElementById('birthdate').value.trim();
    const mobile = document.getElementById('mobile').value.trim();
    const email = document.getElementById('email').value.trim();
    const propertySelected = document.querySelector('input[type="checkbox"]:checked');

    const resultMessage = document.getElementById('result-message');



    if (fullname === "" || nationalId === "" || birthdate === "" || mobile === "" || email === "" || !propertySelected) {
        resultMessage.textContent = 'يرجى ملء جميع الحقول واختيار عقار.';
        return;
    }

    const arabicRegex = /^[\u0621-\u064A\s]+$/; 
    const nationalIdRegex = /^(01|02|03|04|05|06|07|08|09|10|11|12|13|14)[0-9]{9}$/; 
    const mobileRegex = /^09[0-9]{8}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!arabicRegex.test(fullname)) {
        resultMessage.textContent = 'يرجى إدخال الاسم بالحروف العربية فقط.';
        return;
    }

    if (!nationalIdRegex.test(nationalId)) {
        resultMessage.textContent = 'يرجى إدخال الرقم الوطني بشكل صحيح.';
        return;
    }

    if (!mobileRegex.test(mobile)) {
        resultMessage.textContent = 'يرجى إدخال رقم الموبايل بشكل صحيح.';
        return;
    }

    if (!emailRegex.test(email)) {
        resultMessage.textContent = 'يرجى إدخال بريد إلكتروني صحيح.';
        return;
    }

    resultMessage.textContent = 'تم ارسال الطلب بنجاح.';
}






function importDataFromJSON() {
  fetch('data/Properties.json')
      .then(response => response.json())
      .then(data => {

        const table = document.getElementById('properties-table');
          data.forEach(property => {
              const row = table.insertRow();
              
              const selectCell = row.insertCell();
              const selectCheckbox = document.createElement('input');
              selectCheckbox.type = 'checkbox';
              selectCheckbox.addEventListener('change', function() {

              });
              selectCell.appendChild(selectCheckbox);
              selectCheckbox.id = `select-checkbox-${property.id}`;


              const detailsCell = row.insertCell();
              const detailsLink = document.createElement('a');
              detailsLink.textContent = 'تفاصيل';
              detailsLink.href = '#';
              detailsLink.addEventListener('click', () => showAdditionalDetails(property.id));
              detailsCell.appendChild(detailsLink);


              const rentCell = row.insertCell();
              rentCell.textContent = property.monthlyRent;


              const detailsTextCell = row.insertCell();
              detailsTextCell.textContent = property.details;


              const cityCell = row.insertCell();
              cityCell.textContent = property.city;


              const additionalDetailsRow = table.insertRow();
              additionalDetailsRow.id = `additional-details-${property.id}`;
              additionalDetailsRow.classList.add('hidden'); 
              const additionalDetailsCell = additionalDetailsRow.insertCell();
              additionalDetailsCell.setAttribute('colspan', '5');
              additionalDetailsCell.textContent = property.additionalDetails;
          });
      })
      .catch(error => console.error('حدث خطأ أثناء تحميل الملف:', error));
}


window.onload = importDataFromJSON;
