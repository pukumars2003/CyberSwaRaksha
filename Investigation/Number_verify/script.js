const apiKey = 'pD2yq4QfIDQspTBwlPd8wSAx9DyCdCyg';
const apiUrl = 'https://api.apilayer.com/number_verification/validate';


const geocodingUrl = 'https://nominatim.openstreetmap.org/search';

async function validatePhoneNumber(phoneNumber) {
    const url = `${apiUrl}?number=${phoneNumber}`;
    const headers = {
        'apikey': apiKey
    };

    try {
        const response = await fetch(url, { headers });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}


async function getCoordinatesFromLocation(location, country) {
    const url = `${geocodingUrl}?q=${location},${country}&format=json`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data && data.length > 0) {
            const lat = parseFloat(data[0].lat);
            const lon = parseFloat(data[0].lon);
            console.log('Coordinates:', lat, lon);
            return { lat, lon };
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error geocoding location:', error);
        return null;
    }
}


function displayResults(data) {
    
    document.getElementById('resultsTableBody').innerHTML = '';

    if (data && data.valid) {
        
        document.getElementById('validationResult').classList.add('alert-success');
        document.getElementById('validationResult').classList.remove('alert-danger');
        document.getElementById('validationResult').textContent = `Valid number! (${data.international_format})`;

        
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const row = document.createElement('tr');
                const keyCell = document.createElement('td');
                const valueCell = document.createElement('td');
                keyCell.textContent = key.replace(/_/g, ' ').toUpperCase(); // format keys
                valueCell.textContent = data[key];
                row.appendChild(keyCell);
                row.appendChild(valueCell);
                document.getElementById('resultsTableBody').appendChild(row);
            }
        }

        
        const location = data.location;
        const country = data.country_name;

        getCoordinatesFromLocation(location, country).then((coordinates) => {
            if (coordinates) {
                const { lat, lon } = coordinates;

                
                const map = L.map('map').setView([lat, lon], 13);

                
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);

                
                const marker = L.marker([lat, lon]).addTo(map);
                marker.bindPopup(`<b>${location}</b><br>${country}`).openPopup();
            } else {
                console.log('Location not found.');
            }
        });

    } else {
        
        document.getElementById('validationResult').classList.add('alert-danger');
        document.getElementById('validationResult').classList.remove('alert-success');
        document.getElementById('validationResult').textContent = 'Invalid phone number.';
    }
}


document.getElementById('validateBtn').addEventListener('click', async function () {
    const phoneNumber = document.getElementById('phoneNumber').value.trim();
    if (phoneNumber) {
        const data = await validatePhoneNumber(phoneNumber);
        displayResults(data);
    } else {
        alert('Please enter a phone number.');
    }
});