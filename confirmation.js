document.addEventListener('DOMContentLoaded', function () {
    const confirmationDetails = document.getElementById('confirmation-details');
    const mainNameConfirm = document.getElementById('main-name-confirm');
    const mainEmailConfirm = document.getElementById('main-email-confirm');
    const mainPhoneConfirm = document.getElementById('main-phone-confirm');
    const hotelConfirm = document.getElementById('hotel-confirm');
    const roomConfirm = document.getElementById('room-confirm');
    const guestsConfirm = document.getElementById('guests-confirm');

    const bookingData = localStorage.getItem('bookingData');

    if (bookingData) {
        const data = JSON.parse(bookingData);

        mainNameConfirm.textContent = data.mainContact.name;
        mainEmailConfirm.textContent = data.mainContact.email;
        mainPhoneConfirm.textContent = data.mainContact.phone || 'Not provided';
        hotelConfirm.textContent = data.hotel;
        roomConfirm.textContent = data.room;

        if (data.guests && data.guests.length > 0) {
            data.guests.forEach((guest, index) => {
                const guestDiv = document.createElement('div');
                guestDiv.innerHTML = `<h4>Guest Group ${index + 1}</h4>`;
                guestDiv.innerHTML += `<p><strong>Adults:</strong> ${guest.adults}</p>`;
                if (guest.adultDetails && guest.adultDetails.length > 0) {
                    guest.adultDetails.forEach((adult, i) => {
                        guestDiv.innerHTML += `<p class="indent">Adult ${i + 1} Name: ${adult.name || 'Not provided'}</p>`;
                    });
                }
                guestDiv.innerHTML += `<p><strong>Children:</strong> ${guest.children}</p>`;
                if (guest.childDetails && guest.childDetails.length > 0) {
                    guest.childDetails.forEach((child, i) => {
                        guestDiv.innerHTML += `<p class="indent">Child ${i + 1} Name: ${child.name || 'Not provided'}, Age: ${child.age !== undefined ? child.age : 'Not provided'}</p>`;
                    });
                }
                guestsConfirm.appendChild(guestDiv);
            });
        }
    } else {
        window.location.href = 'index.html';
    }

    // localStorage.removeItem('bookingData');
    // localStorage.removeItem('hotelName');
    // localStorage.removeItem('roomType');
});