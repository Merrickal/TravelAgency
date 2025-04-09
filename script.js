// script.js

document.addEventListener('DOMContentLoaded', () => {

    console.log("Landing page script loaded.");

    const hotelList = document.getElementById('hotel-list');
    const searchInput = document.getElementById('hotel-search');

    if (hotelList) {
        hotelList.addEventListener('click', (event) => {
            if (event.target.tagName === 'A') {
                const hotelId = event.target.dataset.hotelId;
                const hotelName = event.target.textContent;
                console.log(`User clicked on hotel: ${hotelName} (ID: ${hotelId})`);
                // Navigation happens by default
            }
        });
    } else {
        console.error("Hotel list element not found!");
    }

    if (searchInput) {
        searchInput.addEventListener('input', (event) => {
            const searchTerm = event.target.value.toLowerCase();
            const listItems = hotelList.querySelectorAll('li');

            listItems.forEach(item => {
                const hotelName = item.querySelector('a').textContent.toLowerCase();
                if (hotelName.includes(searchTerm)) {
                    item.style.display = 'flex'; // Show the item
                } else {
                    item.style.display = 'none'; // Hide the item
                }
            });
        });
    } else {
        console.error("Search input element not found!");
    }

});