if (device.lost == true) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((l) => {
            fetch('/missing-device', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ latitude: position.coords.latitude, longitude: position.coords.longitude })
            });
        });
    } else {
        fetch('/missing-device', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ latitude: "none", longitude: "none" })
        });
    }
}


function recordedLocationMessage() {

}