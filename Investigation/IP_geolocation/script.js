function searchIP() {
    const ipAddress = document.getElementById("ipInput").value.trim();
    if (ipAddress === "") {
        alert("Please enter a valid IP address");
        return;
    }

    const apiKey = 'at_zBTo7kguf8QBEcZqBahVk0PiFBbk7'; 
    const url = `https://ip-geolocation.whoisxmlapi.com/api/v1?apiKey=${apiKey}&ipAddress=${ipAddress}`;

    $.getJSON(url, function (data) {
        if (data && data.location) {
            
            const { lat, lng, country, region, city, isp } = data.location;

            
            document.getElementById("ipAddress").innerText = data.ip;
            document.getElementById("country").innerText = country;
            document.getElementById("region").innerText = region;
            document.getElementById("city").innerText = city;
            document.getElementById("isp").innerText = isp;
            document.getElementById("latitude").innerText = lat;
            document.getElementById("longitude").innerText = lng;

            
            document.getElementById("infoTable").style.display = "table";

            
            const domains = data.domains || [];
            const domainListElement = document.getElementById("domains");
            domainListElement.innerHTML = ""; 
            if (domains.length > 0) {
                domains.forEach(function (domain) {
                    const li = document.createElement("li");
                    li.className = "list-group-item";

                    const link = document.createElement("a");
                    link.href = `http://${domain}`;
                    link.target = "_blank";  
                    link.textContent = domain;

                    li.appendChild(link);  
                    domainListElement.appendChild(li);  
                });
                document.getElementById("domainList").style.display = "block";
            } else {
                document.getElementById("domainList").style.display = "none";
            }

           
            const map = L.map('map').setView([lat, lng], 10);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            L.marker([lat, lng]).addTo(map)
                .bindPopup(`<b>${city}</b><br>${country}`)
                .openPopup();
        } else {
            alert('Unable to fetch data for the provided IP address.');
        }
    }).fail(function () {
        alert('Failed to fetch data.');
    });
}
