const apiKey = 'at_zBTo7kguf8QBEcZqBahVk0PiFBbk7'; 
const apiUrl = 'https://whois-history.whoisxmlapi.com/api/v1';


document.getElementById('fetchData').addEventListener('click', function () {
    const domain = document.getElementById('domain').value.trim();

    
    document.getElementById('errorMessage').style.display = 'none';
    document.getElementById('successMessage').style.display = 'none';
    document.getElementById('domainInfo').style.display = 'none';

    if (!domain) {
        showError('Please enter a domain name.');
        return;
    }

    
    document.getElementById('loading').style.display = 'block';

    
    fetch(`${apiUrl}?apiKey=at_zBTo7kguf8QBEcZqBahVk0PiFBbk7&domainName=${domain}&mode=purchase`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('loading').style.display = 'none';

            
            if (data.recordsCount === 0) {
                showError('No WHOIS data found for this domain.');
                return;
            }

            const records = data.records;
            let tableRows = '';

            
            records.forEach(record => {
                tableRows += `
                            <tr>
                                <td>${record.domainName}</td>
                                <td>${record.domainType}</td>
                                <td>${record.createdDateRaw}</td>
                                <td>${record.updatedDateRaw}</td>
                                <td>${record.expiresDateRaw}</td>
                                <td>${record.status.join(', ')}</td>
                            </tr>
                        `;
            });

            
            document.getElementById('domainTableBody').innerHTML = tableRows;
            document.getElementById('domainInfo').style.display = 'block';
            showSuccess('Domain information fetched successfully!');
        })
        .catch(error => {
            document.getElementById('loading').style.display = 'none';
            showError('Error fetching data: ' + error.message);
        });
});


function showError(message) {
    document.getElementById('errorMessage').textContent = message;
    document.getElementById('errorMessage').style.display = 'block';
}


function showSuccess(message) {
    document.getElementById('successMessage').textContent = message;
    document.getElementById('successMessage').style.display = 'block';
}