document.addEventListener('DOMContentLoaded', function () {
    const bookingForm = document.getElementById('booking-form');
    const hotelName = document.querySelector('h1').textContent; // Get hotel name from the page

    bookingForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

        const selectedRoom = document.querySelector('input[name="roomChoice"]:checked');

        if (selectedRoom) {
            const roomType = selectedRoom.value;

            // Store hotel name and room type in local storage
            localStorage.setItem('hotelName', hotelName);
            localStorage.setItem('roomType', roomType);

            // Redirect to the booking information page
            window.location.href = 'booking.html';
        } else {
            alert('Please select a room before booking.');
        }
    });
});