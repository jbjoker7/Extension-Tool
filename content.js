(function() {
    let logEntries = [];
    let lastLocationText = '';
    let lastBarcodeText = '';
    let lastSelectValue = '';
    let lastLogMessage = '';

    function log(message) {
        if (message !== lastLogMessage) {
            console.log(message);
            logEntries.push(`${new Date().toLocaleTimeString()}: ${message}`);
            // Store log entries in local storage to persist across page reloads
            localStorage.setItem('extensionLog', JSON.stringify(logEntries));
            updateLogDisplay();
            lastLogMessage = message;
        }
    }

    // Retrieve stored log entries on load
    if (localStorage.getItem('extensionLog')) {
        logEntries = JSON.parse(localStorage.getItem('extensionLog'));
    }

    // Create the floating div
    var floatingDiv = document.createElement('div');
    floatingDiv.id = 'extensionPopup';
    floatingDiv.style.position = 'fixed';
    floatingDiv.style.bottom = '10px';
    floatingDiv.style.right = '10px';
    floatingDiv.style.width = '300px';
    floatingDiv.style.height = '200px';
    floatingDiv.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    floatingDiv.style.border = '1px solid #ccc';
    floatingDiv.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
    floatingDiv.style.zIndex = '10000';
    floatingDiv.style.padding = '10px';
    floatingDiv.innerHTML = '<div id="popupContent">Loading...</div>';
    document.body.appendChild(floatingDiv);

    // Function to update the content
    function updateContent() {
        var locationElement = document.getElementById('OriginatingLocationDetails');
        var barcodeElement = document.getElementById('barcodeText');
        var locationText = locationElement ? (locationElement.innerText || locationElement.textContent) : 'Location element not found';
        var barcodeText = barcodeElement ? (barcodeElement.innerText || barcodeElement.textContent) : 'Barcode element not found';

        if (locationText !== lastLocationText) {
            log(`Location is: ${locationText}`);
            lastLocationText = locationText;
        }

        if (barcodeText !== lastBarcodeText) {
            log(`Barcode is: ${barcodeText}`);
            lastBarcodeText = barcodeText;
        }

        document.getElementById('popupContent').innerText = 'Location: ' + locationText + '\nCustomer ID: ' + barcodeText;
    }

    // Function to update the select element
    function updateSelectElement() {
        var selectElement = document.querySelector('select[name="customersTicketTable_length"]');

        if (selectElement) {
            if (selectElement.value !== '300') {
                if (!Array.from(selectElement.options).some(option => option.value === '300')) {
                    var option = document.createElement('option');
                    option.value = '300';
                    option.text = '300';
                    selectElement.add(option);
                }

                selectElement.value = '300';

                var select2Container = document.querySelector('#select2-customersTicketTable_length-cx-container');
                if (select2Container) {
                    select2Container.innerText = '300';
                    select2Container.title = '300';
                }

                var event = new Event('change', { bubbles: true });
                selectElement.dispatchEvent(event);

                log('Updated rows to 300');
            } else if (selectElement.value !== lastSelectValue) {
                log('Size is already set to 300');
                lastSelectValue = '300';
            }
        } else {
            log('Select element not found');
        }
    }

    // Function to check if the select element needs updating
    function checkAndUpdate() {
        try {
            updateSelectElement();
        } catch (error) {
            log('Error updating select element: ' + error);
        }
    }

    // Function to update the log display in the log box
    function updateLogDisplay() {
        const logContent = document.getElementById('logContent');
        if (logContent) {
            logContent.innerText = logEntries.join('\n');
        }
    }

    // Update content every 0.1 seconds
    setInterval(updateContent, 100);

    // Check and update the select element every 1.5 seconds
    setInterval(checkAndUpdate, 1500); // Adjust the interval as needed
})();
