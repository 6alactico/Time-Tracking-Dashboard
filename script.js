const buttons = document.querySelectorAll('#view-toggle button');
let timeData = [];
// Fetch data from json file
fetch('data.json')
    .then(res => res.json()) // Converts data.json to object
        .then(data => {
            timeData = data; // Saves JSON into timeData for use

            const activeBtn = document.querySelector('#view-toggle .active') || buttons[1]; // If no button is active, it defaults to the second one
            updateUI(activeBtn.dataset.view); 
})
.catch(err => console.error('Failed to load data:', err));

// Toggle between views using buttons
buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const view = btn.dataset.view;
        updateUI(view);
    });
});

// Match JSON titles to card IDs
function titleToCard(title) {
    return title.toLowerCase().replace(/\s+/g, '-');
}

// Get label based on timeframe
function previousLabel(view) {
    switch (view) {
        case 'daily':
            return 'Yesterday';
        case 'weekly':
            return 'Last Week';
        case 'monthly':
            return 'Last Month';
        default:
            return 'Previous';
    }  
}

// Update cards on selected view
function updateUI(view) {
    timeData.forEach(item => {
        const cardClass = titleToCard(item.title);
        console.log('Looking for card with class:', cardClass);
        const card = document.querySelector(`.card.${cardClass}`);
        if (!card) return;

        const currentTime = card.querySelector('.current-hours');
        const previousTime = card.querySelector('.previous-hours');
        const cardTitle = card.querySelector('.card-title');
        cardTitle.textContent = item.title;

        // Get values for chosen view
        const { current, previous } = item.timeframes[view];
        const label = previousLabel(view);
        currentTime.textContent = `${current}hrs`; 
        previousTime.textContent = `${label} - ${previous}hrs`;
    });
}