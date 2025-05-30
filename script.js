const buttons = document.querySelectorAll('#button-group button');
let json;

fetch('data.json')
    .then(res => res.json())
    .then(data => {
        json = data;
        const activeBtn = document.querySelector('#button-group .active') || buttons[1];
        updateUI(activeBtn.dataset.view); 
    });

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        updateUI(btn.dataset.view);
    })
});

const slugifyTitle = (title) => title.toLowerCase().replace(/\s+/g, '-'); // Match JSON titles to cards

const previousLabel = (view) => 
    ({daily: 'Yesterday', weekly: 'Last Week', monthly: 'Last Month' } [view] || 'Previous');

function updateUI(view) {
    json.forEach(({title, timeframes}) => {
        const card = document.querySelector(`.card.${slugifyTitle(title)}`);
        if (!card) return;

        const {current, previous} = timeframes[view];
        
        card.querySelector('.card-title').textContent = title;
        card.querySelector('.current-hours').textContent = `${current}hrs`;
        card.querySelector('.previous-hours').textContent = `${previousLabel(view)} - ${previous}hrs`;
    });
}