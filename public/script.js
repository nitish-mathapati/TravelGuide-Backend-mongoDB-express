fetch('/city/onedayplan/:city_name')
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => { throw new Error(err.message); });
        }
        return response.json();
    })
    .then(data => {
        // Handle successful data
        console.log(data);
    })
    .catch(error => {
        alert(`Error: ${error.message}`);
    });