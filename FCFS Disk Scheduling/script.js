 let requests = [];
    let currentTrack =0;

    function addRequest() {
        debugger
        let trackInput = document.getElementById("trackInput");
        let track = trackInput.value.trim();
        if (track !== "") {
            track = parseInt(track);
            if (!isNaN(track)) {
                requests.push(track);
                updateOutput();
                trackInput.value = "";
            } else {
                alert("Invalid track number. Please enter a valid number.");
            }
        }
    }

    function startFCFS() {
    if (requests.length === 0) {
        alert("No requests added yet.");
        return;
    }

    let startInput = document.getElementById("trackInput").value.trim();
    currentTrack = startInput === "" ? 0 : parseInt(startInput);
    if (isNaN(currentTrack)) {
        alert("Invalid starting track number.");
        return;
    }

    let output = document.getElementById("output");
    let movements = [];
    let totalMovements = 0;
    let movementOrder = [currentTrack]; // To store access order

    for (let i = 0; i < requests.length; i++) {
        movements.push(Math.abs(currentTrack - requests[i]));
        totalMovements += Math.abs(currentTrack - requests[i]);
        currentTrack = requests[i];
        movementOrder.push(currentTrack);
    }

    output.innerHTML = `
        <p>FCFS completed.</p>
        <p>Total head movements: ${totalMovements}</p>
        <p>Order of access: ${movementOrder.join(" → ")}</p>
    `;
}


    function updateOutput() {
        let output = document.getElementById("output");
        let html = "<p>Requests:</p><ul>";
        for (let i = 0; i < requests.length; i++) {
            html += "<li>Track " + requests[i] + "</li>";
        }
        html += "</ul>";
        output.innerHTML = html;
    }