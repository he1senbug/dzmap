const text = document.getElementById('text');
const img = document.getElementById('img');

fetch('https://worldtimeapi.org/api/timezone/Etc/UTC').then(r => r.json()).then(d => {
    const maps = ['Blacksite', 'Vineyard', 'Sirocco', 'Ember'];
    const mapDuration = 180;

    const start = 1686098160 + (Math.floor(Date.now() / 1000) - d.unixtime);

    const showStatus = () => {
        const current = (Math.floor(Date.now() / 1000) - start) % (mapDuration * 4);
        const mapIndex = Math.floor(current / mapDuration);
        const time = Math.ceil(mapDuration - current % mapDuration);
        const mins = Math.floor(time / 60);
        const timeFormatted = `${mins ? mins + ':' : ''}${mins ? ('0' + time % 60).substr(-2) : time % 60}`;

        img.src = 'images/' + maps[mapIndex].toLowerCase() + '.webp';
        text.innerHTML = `<p>current map is ${maps[mapIndex]}</p><p>next map is ${mapIndex === maps.length - 1 ? maps[0] : maps[mapIndex + 1]} in ${timeFormatted}</p>`;
    };

    showStatus();
    setInterval(showStatus, 1000);
}).catch(function (e) {
    document.body.innerText = e;
});