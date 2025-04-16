function handleSearch() {
    const ioc = document.getElementById('iocInput').value.trim();
    const outputFormat = document.getElementById('outputFormat').value.toUpperCase();
    
    if (!ioc) {
        alert("Please enter an IoC value.");
        return;
    }
    
    fetchThreatIntelligenceData(ioc, outputFormat);
}

function fetchThreatIntelligenceData(ioc, outputFormat) {
    const apiKey = 'at_zBTo7kguf8QBEcZqBahVk0PiFBbk7'; 
    const url = `https://threat-intelligence.whoisxmlapi.com/api/v1?apiKey=${apiKey}&ioc=${ioc}&outputFormat=${outputFormat}`;
    
    
    document.getElementById('resultBody').innerHTML = "";
    document.getElementById('loader').style.display = 'block';
    document.getElementById('results').style.display = 'none';

    fetch(url)
        .then(response => response.json()) 
        .then(data => {
            document.getElementById('loader').style.display = 'none';
            document.getElementById('results').style.display = 'block';

            const results = data.results.slice(0, 10); 

            displayResults(results);
        })
        .catch(error => {
            console.error('Error fetching or parsing Threat Intelligence data:', error);
            document.getElementById('loader').style.display = 'none';
            alert('There was an error fetching the Threat Intelligence data. Please try again later.');
        });
}

function displayResults(results) {
    const tableBody = document.getElementById('resultBody');

    
    results.forEach(result => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${result.iocType}</td>
            <td>${result.value}</td>
            <td>${result.threatType}</td>
            <td>${result.firstSeen}</td>
            <td>${result.lastSeen}</td>
        `;
        tableBody.appendChild(row);
    });
}