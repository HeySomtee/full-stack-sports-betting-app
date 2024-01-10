// Make an HTTP request to the API endpoint
fetch('/api/data/')
    .then(response => response.json())
    .then(data => {
        processData(data)

    })
    .catch(error => console.error('Error fetching data:', error));    

const processData  = (data) => {
    var Matches = data.matches
    let widget = document.getElementById('widget');
    for (let i = 0; i < Matches.length; i++) {
        var homeTeam = Matches[i].homeTeam
        var awayTeam = Matches[i].awayTeam
        var homeScore = Matches[i].score.fullTime.home
        var awayScore = Matches[i].score.fullTime.away
        var homeTeamCrest = Matches[i].homeTeam.crest
        var awayTeamCrest = Matches[i].awayTeam.crest
        console.log( `${homeTeam.shortName} vs ${awayTeam.shortName} --> ${homeScore} : ${awayScore}`);
        console.log(homeTeamCrest, awayTeamCrest);
        console.log(Matches[i].status);

        //Display teams and match info on the html page 
        
        widget.innerHTML += ` 
            <div class="match-div">
                <div class="home team">
                    <img id="home-team-image" src="${homeTeamCrest}" alt=""><span id="home-team-name">${homeTeam.tla}</span>
                </div>
                <div class="scores flex">
                    <h5>${homeScore}</h5>
                    <h5 class="vs">:</h5>
                    <h5>${awayScore}</h5>
                </div>
                <div class="away team">
                    <img id="away-team-image" src="${awayTeamCrest}" alt=""><span id="away-team-name">${awayTeam.tla}</span>
                </div>
            </div>
        `
        
    }
} 