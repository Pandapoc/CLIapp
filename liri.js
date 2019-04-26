require("dotenv").config()
var axios = require('axios')
var keys = require("./keys.js")
var Spotify = require('node-spotify-api')
var spotify = new Spotify(keys.spotify)
var {readFile} = require('fs')

// concert this
if (process.argv[2] === 'concert-this') {
    [, , , ...pArgs] = process.argv
    let band = pArgs.join(' ')
    axios.get(`https://rest.bandsintown.com/artists/${band}/events?app_id=codingbootcamp`)
        .then(data => {
            console.log(data.data[0].venue.name)
            console.log(`${data.data[0].venue.city}, ${data.data[0].venue.region}`)
            console.log(data.data[0].datetime)
        })
        .catch(e => console.log(e))
           
} else if (process.argv[2] === 'spotify-this-song'){
    if (process.argv[3]) {
        [, , , ...pArgs] = process.argv
        let song = pArgs.join(' ')
        spotify
            .search({ type: 'track', query: `${song}`})
            .then(data => {
                console.log(data.tracks.items[0].artists[0].name)
                console.log(data.tracks.items[0].name)
                console.log(data.tracks.items[0].external_urls)
                console.log(data.tracks.items[0].album.name)

                 })
            .catch(e => console.log(e))
    } else {
        readFile('random.txt', 'UTF8', (e, data) => {
            if (e) {
                console.log(e)
            } else {
                console.log(data)
            }
        }) 
    }
} else if (process.argv[2] === 'movie-this') {
    axios.get(`http://www.omdbapi.com/?t=${process.argv[3]}&apikey=trilogy`)
    .then(data => {
        console.log(data.data.Title)
        console.log(data.data.Year)
        console.log(data.data.imdbRating)
        console.log(`${data.data.Ratings[1].Source}: ${data.data.Ratings[1].Value}`)
        console.log(data.data.Country)
        console.log(data.data.Language)
        console.log(data.data.Plot)
        console.log(data.data.Actors)
    })
    .catch(e => console.log(e))
} else {
    console.log(`That's not a valid command!`)
}


// spotify this song

// movie this

// do what it says