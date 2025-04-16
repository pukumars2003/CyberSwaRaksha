$(function() {
    // Stock data
    const companies = [
        { name: 'Apple', symbol: 'AAPL', price: 236.21, shares: 0, buyPrice: 230.00 },
        { name: 'Google', symbol: 'GOOG', price: 1215.45, shares: 0, buyPrice: 1200.00 },
        { name: 'Microsoft', symbol: 'MSFT', price: 139.68, shares: 0, buyPrice: 145.00 },
        { name: 'Tesla', symbol: 'TSLA', price: 247.89, shares: 0, buyPrice: 240.00 },
        { name: 'Facebook', symbol: 'FB', price: 184.89, shares: 0, buyPrice: 190.00 },
        { name: 'Amazon', symbol: 'AMZN', price: 1731.92, shares: 0, buyPrice: 1700.00 },
    ];

    let investedMoney = 10000;
    let portfolioValue = 0;
    const highPerformingCompanies = new Set(['AAPL', 'GOOG', 'MSFT']);

    function updateDOM() {
        $('#netWorth').text((investedMoney + portfolioValue).toFixed(2));
        $('#cashflow').text(investedMoney.toFixed(2));
        $('#portfolio').text(portfolioValue.toFixed(2));
    }

    // Populate the table
    for (const obj of companies) {
        let html = "<tr>";
        html += "<td>" + obj.name + "</td>";
        html += "<td>" + obj.symbol + "</td>";
        html += "<td><span class='price'>" + obj.price.toFixed(2) + "</span></td>";
        html += "<td id='shares" + obj.symbol + "'>" + obj.shares + "</td>";
        html += "<td><a href='#' class='buy' id='" + obj.symbol + "Buy'>buy 1 share</a></td>";
        html += "<td id='" + obj.symbol + "Sell' style='display:none;'><a href='#' class='sell' id='" + obj.symbol + "Sell'>sell 1 share</a></td>";
        html += "</tr>";
        $("#myPortfolio tbody").append(html);
    }

    function changePrice(price) {
        return price + ((Math.random() * 20 - 10) / 10);
    }

    setInterval(function() {
        for (const obj of companies) {
            obj.price = changePrice(obj.price);
            $('#shares' + obj.symbol).html(obj.shares);
            $('#' + obj.symbol + 'Sell').toggle(obj.shares > 0);

            if (obj.shares > 0) {
                if (highPerformingCompanies.has(obj.symbol)) {
                    portfolioValue += 100;
                } else {
                    portfolioValue -= 100;
                }
            }
        }
        updateDOM();
    }, 1000);

    $(document).on('click', "a", function() {
        const id = $(this).attr('id');
        const symbol = id.includes('Buy') ? id.replace('Buy', '') : id.replace('Sell', '');
        const obj = companies.find(c => c.symbol === symbol);

        if (id.includes('Buy')) {
            // Buy share logic
            if (investedMoney >= obj.price) {
                investedMoney -= obj.price;
                obj.shares += 1;

                if (!highPerformingCompanies.has(obj.symbol)) {
                    $('#profitMessage').text("Note: Buying shares in this company may result in a loss.");
                    $('#profitAmount').text("Investment made: " + obj.price.toFixed(2));
                    $('#profitModal').modal('show');
                }
            }
        } else if (id.includes('Sell')) {
            // Sell share logic
            if (obj.shares > 0) {
                const profit = obj.price - obj.buyPrice; // Calculate profit or loss
                portfolioValue += profit; // Update portfolio value
                investedMoney += obj.price; // Update invested money
                obj.shares -= 1;

                $('#profitAmount').text(Math.abs(profit).toFixed(2));
                $('#profitMessage').text(profit >= 0 
                    ? "Congratulations! You've made a profit of:" 
                    : "Sorry! You've made a loss of:"
                );
                $('#profitModal').modal('show');
            }
        }

        updateDOM();
        return false; // Prevent default link behavior
    });

    updateDOM();
});
