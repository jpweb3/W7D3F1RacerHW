// function to retrieve ranger data

// create constant to hold DOM Elements
const racerList = '.ranger-list'

// creation of the Ranger List HTML
const createList = (givenName, familyName, nationality, permanentNumber, points, positionText, wins) => {
    const html = 
    `<div id=${positionText} class="card mt-3 mb-3" style="width: 18rem;">
        <ul class="list-group list-group-flush" id=${givenName}>
            <li class="list-group-item">Name: ${givenName} ${familyName}</li>
            <li class="list-group-item">Nationality: ${nationality}</li>    
            <li class="list-group-item">Driver Number: ${permanentNumber}</li>
            <li class="list-group-item">Season Points: ${points}</li>
            <li class="list-group-item">Position: ${positionText}</li>
            <li class="list-group-item">Wins: ${wins}</li>
            
        </ul>
    </div>`
    document.querySelector(racerList).insertAdjacentHTML('beforeend', html)
}

const loadData = async () => {
    let queryFirst = document.querySelector("#season").value 
    let queryLast = document.querySelector('#round').value
    console.log(queryFirst, queryLast)
    const f1Racer = await getData(queryFirst, queryLast)
    console.log(f1Racer)

    f1Racer.forEach(element => createList(element.Driver.givenName, element.Driver.familyName, element.Driver.nationality, element.Driver.permanentNumber, element.points, element.positionText, element.wins))

}

const getData = async (season, round) =>{
    let response = await axios.get(`https://ergast.com/api/f1/${season}/${round}/driverStandings.json`)

    console.log(response)
    console.log(response.data)
    return response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings
}

const clearData = () => {
    document.querySelector(racerList).innerHTML = ''
}