function handleSearch() {
    const domain = document.getElementById('domainInput').value.trim();
    if (domain) {
        fetchWhoisData(domain);
    } else {
        alert("Please enter a domain name.");
    }
}

function fetchWhoisData(domain) {
    const apiKey = 'at_zBTo7kguf8QBEcZqBahVk0PiFBbk7';
    const url = `https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=${apiKey}&domainName=${domain}&outputFormat=XML`;

    
    document.getElementById('resultBody').innerHTML = "";
    document.getElementById('loader').style.display = 'block';
    document.getElementById('results').style.display = 'none';

    fetch(url)
        .then(response => response.text()) 
        .then(xmlString => {
            
            document.getElementById('loader').style.display = 'none';
            document.getElementById('results').style.display = 'block';

            console.log('Raw XML response:', xmlString);

            
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, "application/xml");

            
            const errorNode = xmlDoc.querySelector("parsererror");
            if (errorNode) {
                throw new Error('Error parsing XML');
            }

           
            const whoisRecord = xmlDoc.querySelector('WhoisRecord');

            
            const domainName = whoisRecord.querySelector('domainName').textContent;
            const createdDate = whoisRecord.querySelector('createdDate').textContent;
            const updatedDate = whoisRecord.querySelector('updatedDate').textContent;
            const expiresDate = whoisRecord.querySelector('expiresDate').textContent;
            const registrantOrganization = whoisRecord.querySelector('registrant organization') ? whoisRecord.querySelector('registrant organization').textContent : 'N/A';
            const registrantState = whoisRecord.querySelector('registrant state') ? whoisRecord.querySelector('registrant state').textContent : 'N/A';
            const registrantCountry = whoisRecord.querySelector('registrant country') ? whoisRecord.querySelector('registrant country').textContent : 'N/A';
            const registrarName = whoisRecord.querySelector('registrarName').textContent;
            const nameServers = whoisRecord.querySelector('nameServers rawText').textContent;

            
            displayResults({
                domainName,
                createdDate,
                updatedDate,
                expiresDate,
                registrantOrganization,
                registrantState,
                registrantCountry,
                registrarName,
                nameServers,
            });
        })
        .catch(error => {
            console.error('Error fetching or parsing Whois data:', error);
            document.getElementById('loader').style.display = 'none';
            alert('There was an error fetching the Whois data. Please try again later.');
        });
}

function displayResults(data) {
    let tableBody = document.getElementById('resultBody');

    const resultRows = [
        { key: 'Domain Name', value: data.domainName },
        { key: 'Created Date', value: data.createdDate },
        { key: 'Updated Date', value: data.updatedDate },
        { key: 'Expires Date', value: data.expiresDate },
        { key: 'Registrant Organization', value: data.registrantOrganization },
        { key: 'Registrant State', value: data.registrantState },
        { key: 'Registrant Country', value: data.registrantCountry },
        { key: 'Registrar', value: data.registrarName },
        { key: 'Name Servers', value: data.nameServers },
    ];

    resultRows.forEach(result => {
        let row = document.createElement('tr');
        row.innerHTML = `<td><strong>${result.key}</strong></td><td>${result.value}</td>`;
        tableBody.appendChild(row);
    });
}