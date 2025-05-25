// Retrieve data from json file
fetch('/data.json').then((reponse) => {
    if(!reponse.ok) return console.log('Oops! Something went wrong.');

    return reponse.json();
}).then((data) => {
    console.log(data);
});