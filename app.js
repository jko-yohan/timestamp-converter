(() => {
    const liveTs = document.getElementById('live-ts');
    const liveDate = document.getElementById('live-date');

    function updateLive() {
        const now = new Date();
        liveTs.textContent = Math.floor(now.getTime() / 1000);
        liveDate.textContent = now.toUTCString();
    }

    setInterval(updateLive, 1000);
    updateLive();

    document.getElementById('btn-to-date').addEventListener('click', () => {
        const input = document.getElementById('ts-input').value.trim();
        const result = document.getElementById('ts-result');
        if (!input) { result.innerHTML = ''; return; }

        let ts = parseInt(input);
        if (isNaN(ts)) { result.innerHTML = '<span style="color:#f85149;">Invalid timestamp</span>'; return; }

        // Auto-detect seconds vs milliseconds
        let ms = ts;
        let unit = 'seconds';
        if (ts > 9999999999) {
            unit = 'milliseconds';
        } else {
            ms = ts * 1000;
        }

        const date = new Date(ms);
        if (isNaN(date.getTime())) { result.innerHTML = '<span style="color:#f85149;">Invalid timestamp</span>'; return; }

        result.innerHTML =
            '<div><span class="result-label">UTC: </span><span class="result-value">' + date.toUTCString() + '</span></div>' +
            '<div><span class="result-label">Local: </span><span class="result-value">' + date.toString() + '</span></div>' +
            '<div><span class="result-label">ISO 8601: </span><span class="result-value">' + date.toISOString() + '</span></div>' +
            '<div><span class="result-label">Detected: </span><span class="result-value">' + unit + '</span></div>';
    });

    document.getElementById('btn-to-ts').addEventListener('click', () => {
        const dateVal = document.getElementById('date-input').value;
        const timeVal = document.getElementById('time-input').value || '00:00:00';
        const result = document.getElementById('date-result');

        if (!dateVal) { result.innerHTML = '<span style="color:#f85149;">Please select a date</span>'; return; }

        const date = new Date(dateVal + 'T' + timeVal);
        if (isNaN(date.getTime())) { result.innerHTML = '<span style="color:#f85149;">Invalid date</span>'; return; }

        const seconds = Math.floor(date.getTime() / 1000);
        const millis = date.getTime();

        result.innerHTML =
            '<div><span class="result-label">Seconds: </span><span class="result-value">' + seconds + '</span></div>' +
            '<div><span class="result-label">Milliseconds: </span><span class="result-value">' + millis + '</span></div>' +
            '<div><span class="result-label">ISO 8601: </span><span class="result-value">' + date.toISOString() + '</span></div>';
    });

    // Set default date/time to now
    const now = new Date();
    const pad = n => String(n).padStart(2, '0');
    document.getElementById('date-input').value = now.getFullYear() + '-' + pad(now.getMonth() + 1) + '-' + pad(now.getDate());
    document.getElementById('time-input').value = pad(now.getHours()) + ':' + pad(now.getMinutes()) + ':' + pad(now.getSeconds());
})();
