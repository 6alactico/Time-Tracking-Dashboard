const buttons = document.querySelectorAll('#segmented-buttons button');
let timeData = []; // Hold JSON data

// Fetch data from json file
fetch('data.json')
    .then(res => res.json()) // Converts data.json to object
        .then(data => {
            timeData = data; // Saves JSON into timeData for use

            const activeBtn = document.querySelector('segmented-buttons .active') || buttons[1]; // If no button is active, it defaults to the second one
            updateUI(activeBtn.dataset.view); 
})
.catch(err => console.error('Failed to load data:', err));

// Match JSON titles to card IDs
function titleToId(title) {
    return title.toLowerCase().replace(' ', '-') + '-card';
}

// Update cards on selected view
function updateUI(view) {
    // Loop through each activity
    timeData.forEach(item => {
        const cardId = titleToId(item.title);
        const card = document.getElementById(cardId);
        if (!card) return; // If card is not found, skip

        const currentTime = card.querySelector('.current');
        const previousTime = card.querySelector('.previous');
        const cardTitle = card.querySelector('.card-title');
        cardTitle.textContent = item.title;
        console.log(cardTitle);

        // Get values for the chosen view
        const { current, previous } = item.timeframes[view];
        currentTime.textContent = `${current}hrs`; // Displays current hours

        if (previousTime) {
            previousTime.textContent = `${'Last Week'} - ${previous}hrs`; // Displays previous hours
        }
    });
}

// Toggle between views using buttons
buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const view = btn.dataset.view;
        updateUI(view);
    });
});