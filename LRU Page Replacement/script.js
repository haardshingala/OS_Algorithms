function simulateLRU() {
    var memoryLength = parseInt(document.getElementById("memoryLength").value);
    var referenceString = document.getElementById("referenceString").value.split(",").map(Number);
    var memory = [];
    var pageDefault = 0;
    var pageHit = 0;

    var table = document.createElement('table');
    table.classList.add('output-table');

    var thead = document.createElement('thead');
    var headerRow = document.createElement('tr');
    var headers = ['Reference String', 'Main Memory', 'Page Default', 'Page Hit'];

    headers.forEach(function(headerText) {
        var th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    var tbody = document.createElement('tbody');

    for (var i = 0; i < referenceString.length; i++) {
        var page = referenceString[i];
        var index = memory.indexOf(page); //IF THE PAGE IS NOT FOUND RETURN -1;

        if (index === -1) {
            pageDefault++;
            if (memory.length === memoryLength) {
                memory.shift(); //SHIFT THE FIRST ELEMENT TO PLACE THE NEW ELEMENT
            }
            
            memory.push(page);
        } else {
            memory.splice(index, 1);
            memory.push(page);
            pageHit++;
        }

        var row = document.createElement('tr');
        row.innerHTML = '<td>' + page + '</td><td>' + memory.join(", ") + '</td><td>' + pageDefault + '</td><td>' + pageHit + '</td>';
        tbody.appendChild(row);
    }

    table.appendChild(tbody);

    var outputDiv = document.getElementById("output");
    outputDiv.innerHTML = '';
    outputDiv.appendChild(table);
}
