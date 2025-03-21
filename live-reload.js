let lastModified = '';

function checkForChanges() {
    fetch(window.location.href + '?_=' + Date.now(), { method: 'HEAD' })
        .then(response => {
            const currentModified = response.headers.get('Last-Modified');
            if (lastModified && lastModified !== currentModified) {
                location.reload();
            }
            lastModified = currentModified;
        });
}

// Start checking for changes
setInterval(checkForChanges, 1000); 