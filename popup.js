document.getElementById('showLog').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: toggleLogBox
        });
    });
});

function toggleLogBox() {
    // Create or get the log div
    var logDiv = document.getElementById('extensionLog');
    if (!logDiv) {
        logDiv = document.createElement('div');
        logDiv.id = 'extensionLog';
        logDiv.style.position = 'fixed';
        logDiv.style.bottom = '10px';
        logDiv.style.right = '320px';
        logDiv.style.width = '300px';
        logDiv.style.height = '200px';
        logDiv.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
        logDiv.style.border = '1px solid #ccc';
        logDiv.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
        logDiv.style.zIndex = '10001';
        logDiv.style.padding = '10px';
        logDiv.style.overflowY = 'auto';
        logDiv.innerHTML = '<div id="logContent"></div>';
        document.body.appendChild(logDiv);

        // Add event listener to update the log content
        updateLogDisplay();
    } else {
        // Toggle visibility
        logDiv.style.display = logDiv.style.display === 'none' ? 'block' : 'none';
    }
}

function updateLogDisplay() {
    const logContent = document.getElementById('logContent');
    if (logContent) {
        const logEntries = JSON.parse(localStorage.getItem('extensionLog')) || [];
        logContent.innerText = logEntries.join('\n');
    }
}
