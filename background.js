chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'getInfo') {
        chrome.scripting.executeScript({
            target: { tabId: sender.tab.id },
            function: getLocationAndBarcode
        });
    }
});

function getLocationAndBarcode() {
    var locationElement = document.getElementById('OriginatingLocationDetails');
    var barcodeElement = document.getElementById('barcodeText');
    var locationText = locationElement ? (locationElement.innerText || locationElement.textContent) : 'Location element not found';
    var barcodeText = barcodeElement ? (barcodeElement.innerText || barcodeElement.textContent) : 'Barcode element not found';

    chrome.runtime.sendMessage({ location: locationText, barcode: barcodeText });
}
