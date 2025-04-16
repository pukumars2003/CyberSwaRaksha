apiKey = 'at_zBTo7kguf8QBEcZqBahVk0PiFBbk7';


async function fetchData(ip) {
    const url = `https://ip-netblocks.whoisxmlapi.com/api/v2?apiKey=${apiKey}&ip=${ip}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}


document.getElementById('investigationForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const ip = document.getElementById('inputField').value.trim();

    if (!ip) {
        alert("Please enter an IP address or domain.");
        return;
    }

    
    document.getElementById('loadingMessage').style.display = 'block';
    document.getElementById('resultBox').style.display = 'none';

    try {
        const data = await fetchData(ip);

        
        document.getElementById('loadingMessage').style.display = 'none';
        document.getElementById('resultBox').style.display = 'block';

        
        const resultTableBody = document.getElementById('resultTableBody');
        resultTableBody.innerHTML = ''; 

        const inetnums = data.result.inetnums;

        if (inetnums && inetnums.length > 0) {
            inetnums.forEach(inet => {
                
                const resultRows = [
                    { label: 'IP Range', value: `<a href="https://www.ip2location.com/${inet.inetnum}" target="_blank">${inet.inetnum}</a>` },
                    { label: 'First IP', value: inet.inetnumFirstString },
                    { label: 'Last IP', value: inet.inetnumLastString },
                    { label: 'AS Number', value: `<a href="https://www.whois.com/whois/${inet.as.asn}" target="_blank">${inet.as.asn}</a>` },
                    { label: 'AS Name', value: inet.as.name },
                    { label: 'AS Type', value: inet.as.type },
                    { label: 'Netname', value: inet.netname },
                    { label: 'Net Description', value: inet.description ? inet.description.join(", ") : 'N/A' },
                    { label: 'Country', value: inet.country },
                    { label: 'City', value: inet.city || 'N/A' },
                    { label: 'Admin Contact', value: inet.adminContact[0]?.email ? `<a href="mailto:${inet.adminContact[0].email}">${inet.adminContact[0].email}</a>` : 'N/A' },
                    { label: 'Admin Phone', value: inet.adminContact[0]?.phone || 'N/A' },
                    { label: 'Admin Address', value: inet.adminContact[0]?.address ? inet.adminContact[0].address.join(', ') : 'N/A' },
                    { label: 'Tech Contact', value: inet.techContact[0]?.email ? `<a href="mailto:${inet.techContact[0].email}">${inet.techContact[0].email}</a>` : 'N/A' },
                    { label: 'Tech Phone', value: inet.techContact[0]?.phone || 'N/A' },
                    { label: 'Tech Address', value: inet.techContact[0]?.address ? inet.techContact[0].address.join(', ') : 'N/A' },
                    { label: 'Abuse Contact', value: inet.abuseContact[0]?.email ? `<a href="mailto:${inet.abuseContact[0].email}">${inet.abuseContact[0].email}</a>` : 'N/A' },
                    { label: 'Modified', value: inet.modified }
                ];

                resultRows.forEach(row => {
                    const tableRow = `<tr><td><strong>${row.label}</strong></td><td>${row.value}</td></tr>`;
                    resultTableBody.innerHTML += tableRow;
                });
            });
        } else {
            resultTableBody.innerHTML = `<tr><td colspan="2" class="text-center">No data found for the given IP address or domain.</td></tr>`;
        }
    } catch (error) {
        document.getElementById('loadingMessage').style.display = 'none';
        alert("An error occurred while fetching the data. Please try again.");
    }
});