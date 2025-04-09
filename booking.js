document.addEventListener('DOMContentLoaded', function () {
    const bookingForm = document.getElementById('personal-info-form');
    const addGuestBtn = document.getElementById('add-guest-btn');
    const guestsContainer = document.getElementById('guests-container');
    const hotelNameDisplay = document.getElementById('hotel-name-display');
    const roomTypeDisplay = document.getElementById('room-type-display');

    // Get hotel and room information from local storage
    const hotelName = localStorage.getItem('hotelName');
    const roomType = localStorage.getItem('roomType');

    if (hotelName && roomType) {
        hotelNameDisplay.textContent = hotelName;
        roomTypeDisplay.textContent = roomType;
    } else {
        window.location.href = document.referrer;
    }

    let guestCount = 1;

    function generateGuestDetails(guestId, adults, children) {
        let detailsHTML = '';
        for (let i = 0; i < adults; i++) {
            detailsHTML += `
                <div class="guest-detail">
                    <h5>Adult ${i + 1}</h5>
                    <div class="form-group">
                        <label for="adult-name-${guestId}-${i + 1}">Name:</label>
                        <input type="text" id="adult-name-${guestId}-${i + 1}" name="adult-name-${guestId}-${i + 1}">
                    </div>
                    </div>
            `;
        }
        for (let i = 0; i < children; i++) {
            detailsHTML += `
                <div class="guest-detail">
                    <h5>Child ${i + 1}</h5>
                    <div class="form-group">
                        <label for="child-name-${guestId}-${i + 1}">Name:</label>
                        <input type="text" id="child-name-${guestId}-${i + 1}" name="child-name-${guestId}-${i + 1}">
                    </div>
                    <div class="form-group">
                        <label for="child-age-${guestId}-${i + 1}">Age:</label>
                        <input type="number" id="child-age-${guestId}-${i + 1}" name="child-age-${guestId}-${i + 1}" min="0" max="17">
                    </div>
                    </div>
            `;
        }
        const guestDetailsContainer = document.getElementById(`guest-details-${guestId}`);
        if (guestDetailsContainer) {
            guestDetailsContainer.innerHTML = detailsHTML;
        }
    }

    guestsContainer.addEventListener('change', function (event) {
        const target = event.target;
        if (target.classList.contains('adults-count') || target.classList.contains('children-count')) {
            const guestDiv = target.closest('.guest');
            if (guestDiv) {
                const guestId = guestDiv.dataset.guestId;
                const adults = parseInt(guestDiv.querySelector('.adults-count').value) || 0;
                const children = parseInt(guestDiv.querySelector('.children-count').value) || 0;
                generateGuestDetails(guestId, adults, children);
            }
        }
    });

    addGuestBtn.addEventListener('click', function () {
        guestCount++;
        const guestDiv = document.createElement('div');
        guestDiv.classList.add('guest');
        guestDiv.dataset.guestId = guestCount;
        guestDiv.innerHTML = `
            <h4>Guest ${guestCount}</h4>
            <div class="form-group">
                <label for="adults-${guestCount}">Adults:</label>
                <input type="number" id="adults-${guestCount}" name="adults-${guestCount}" value="1" min="0" class="adults-count">
            </div>
            <div class="form-group">
                <label for="children-${guestCount}">Children:</label>
                <input type="number" id="children-${guestCount}" name="children-${guestCount}" value="0" min="0" class="children-count">
            </div>
            <div id="guest-details-${guestCount}">
            </div>
        `;
        guestsContainer.appendChild(guestDiv);
        generateGuestDetails(guestCount, 1, 0); // Initial details for the new guest
    });

    bookingForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = {
            hotel: hotelName,
            room: roomType,
            mainContact: {
                name: document.getElementById('main-name').value,
                email: document.getElementById('main-email').value,
                phone: document.getElementById('main-phone').value
            },
            guests: []
        };

        const guestElements = guestsContainer.querySelectorAll('.guest');
        guestElements.forEach(guestDiv => {
            const guestId = guestDiv.dataset.guestId;
            const adults = parseInt(guestDiv.querySelector(`.adults-count`).value) || 0;
            const children = parseInt(guestDiv.querySelector(`.children-count`).value) || 0;
            const guestInfo = {
                adults: adults,
                children: children,
                adultDetails: [],
                childDetails: []
            };
            for (let i = 1; i <= adults; i++) {
                const nameInput = document.getElementById(`adult-name-${guestId}-${i}`);
                guestInfo.adultDetails.push({ name: nameInput ? nameInput.value : '' });
            }
            for (let i = 1; i <= children; i++) {
                const nameInput = document.getElementById(`child-name-${guestId}-${i}`);
                const ageInput = document.getElementById(`child-age-${guestId}-${i}`);
                guestInfo.childDetails.push({ name: nameInput ? nameInput.value : '', age: ageInput ? parseInt(ageInput.value) : '' });
            }
            formData.guests.push(guestInfo);
        });

        localStorage.setItem('bookingData', JSON.stringify(formData));
        window.location.href = 'confirmation.html';
    });

    // Initialize details for the first guest
    generateGuestDetails(1, 1, 0);
});