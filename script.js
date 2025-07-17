document.addEventListener('DOMContentLoaded', function() {
    // Motorcycle data
    const motorcycles = [
        {
            id: 1,
            name: "Yamaha R1",
            type: "sports",
            image: "https://images.unsplash.com/photo-1558980394-4c7c9299fe96?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            description: "The ultimate sports bike with cutting-edge technology and breathtaking performance.",
            engine: "998cc",
            power: "200 HP",
            topSpeed: "186 kmph",
            price: "Rs.1200/day"
        },
        {
            id: 2,
            name: "Royal Enfield Classic 350",
            type: "cruiser",
            image: "https://images.unsplash.com/photo-1558981852-426c6c22a060?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80",
            description: "Iconic American cruiser with legendary comfort and style.",
            engine: "350cc",
            power: "93 HP",
            topSpeed: "180 kmph",
            price: "Rs.1500/day"
        },
        {
            id: 3,
            name: "BMW R 1250 GS",
            type: "adventure",
            image: "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            description: "The ultimate adventure bike for exploring both on and off-road.",
            engine: "1254cc",
            power: "136 HP",
            topSpeed: "140 kmph",
            price: "Rs.1400/day"
        },
        {
            id: 4,
            name: "Honda CBR500R",
            type: "sports",
            image: "https://images.unsplash.com/photo-1558981852-426c6c22a060?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80",
            description: "Perfect balance of performance and practicality for everyday riding.",
            engine: "471cc",
            power: "47 HP",
            topSpeed: "112 kmph",
            price: "Rs.1800/day"
        },
        {
            id: 5,
            name: "Vespa GTS 300",
            type: "scooter",
            image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            description: "Classic Italian scooter with modern performance and style.",
            engine: "278cc",
            power: "23 HP",
            topSpeed: "80 kmph",
            price: "Rs.500/day"
        },
        {
            id: 6,
            name: "Ducati Monster 1200",
            type: "sports",
            image: "https://images.unsplash.com/photo-1558980394-4c7c9299fe96?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            description: "Naked sports bike with aggressive styling and thrilling performance.",
            engine: "1198cc",
            power: "147 HP",
            topSpeed: "160 kmph",
            price: "Rs.1300/day"
        }
    ];

    // DOM elements
    const bikesContainer = document.getElementById('bikesContainer');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const bikeSelect = document.getElementById('bike');
    const rentalForm = document.getElementById('rentalForm');

    // Display all motorcycles initially
    displayMotorcycles(motorcycles);

    // Populate bike select options
    motorcycles.forEach(bike => {
        const option = document.createElement('option');
        option.value = bike.id;
        option.textContent = bike.name;
        bikeSelect.appendChild(option);
    });

    // Filter motorcycles by type
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.dataset.filter;
            if (filter === 'all') {
                displayMotorcycles(motorcycles);
            } else {
                const filteredBikes = motorcycles.filter(bike => bike.type === filter);
                displayMotorcycles(filteredBikes);
            }
        });
    });

    // Handle form submission
    

rentalForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get selected bike details
    const bikeSelect = document.getElementById('bike');
    const selectedBikeId = bikeSelect.value;
    const selectedBikeName = bikeSelect.options[bikeSelect.selectedIndex].text;
    
    // Prepare form data
    const formData = {
        customer_name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        bike_id: selectedBikeId, // For your records
        bike_name: selectedBikeName, // For Formspree display
        rental_date: document.getElementById('date').value,
        duration: document.getElementById('duration').value,
        notes: document.getElementById('message').value,
        _replyto: document.getElementById('email').value,
        _subject: `New Booking: ${selectedBikeName}` // Bike name in subject
    };

    // Submit to Formspree
    try {
        const response = await fetch("https://formspree.io/f/xpwlzybp", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            alert(`Booking request sent for ${selectedBikeName} , We'll contact you shortly!`);
            rentalForm.reset();
        }
    } catch (error) {
        console.error('Error:', error);
    }
});



    // Function to display motorcycles
    function displayMotorcycles(bikes) {
        bikesContainer.innerHTML = '';
        
        if (bikes.length === 0) {
            bikesContainer.innerHTML = '<p>No motorcycles found in this category.</p>';
            return;
        }
        
        bikes.forEach(bike => {
            const bikeCard = document.createElement('div');
            bikeCard.className = 'bike-card';
            bikeCard.innerHTML = `
                <img src="${bike.image}" alt="${bike.name}" class="bike-img">
                <div class="bike-info">
                    <h3>${bike.name}</h3>
                    <p>${bike.description}</p>
                    <div class="bike-specs">
                        <div class="spec">
                            <span>Engine</span>
                            ${bike.engine}
                        </div>
                        <div class="spec">
                            <span>Power</span>
                            ${bike.power}
                        </div>
                        <div class="spec">
                            <span>Top Speed</span>
                            ${bike.topSpeed}
                        </div>
                    </div>
                    <div class="price">${bike.price}</div>
                    <a href="#rent" class="btn" data-bike-id="${bike.id}">Rent Now</a>
                </div>
            `;
            bikesContainer.appendChild(bikeCard);
        });

        // Add event listeners to rent buttons
        document.querySelectorAll('[data-bike-id]').forEach(button => {
            button.addEventListener('click', function() {
                const bikeId = this.dataset.bikeId;
                bikeSelect.value = bikeId;
            });
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});