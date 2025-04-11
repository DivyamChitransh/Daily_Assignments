let data = [
    {
      "movieName": "The Shawshank Redemption",
      "actors": ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
      "rating": 4.8,
      "bestScenes": [
        {
          "title": "Andy Dufresne escapes from prison",
          "duration": "15 mins"
        },
        {
          "title": "Brooks was here",
          "duration": "10 mins"
        }
      ]
    },
    {
      "movieName": "The Godfather",
      "actors": ["Marlon Brando", "Al Pacino", "James Caan"],
      "rating": 4.9,
      "bestScenes": [
        {
          "title": "Horse head in bed",
          "duration": "5 mins"
        },
        {
          "title": "Cannoli scene",
          "duration": "3 mins"
        }
      ]
    },
    {
      "movieName": "The Dark Knight",
      "actors": ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
      "rating": 4.8,
      "bestScenes": [
        {
          "title": "Opening bank robbery",
          "duration": "12 mins"
        },
        {
          "title": "Why So Serious interrogation",
          "duration": "8 mins"
        }
      ]
    },
    {
      "movieName": "The Lord of the Rings: The Return of the King",
      "actors": ["Elijah Wood", "Viggo Mortensen", "Ian McKellen"],
      "rating": 4.9,
      "bestScenes": [
        {
          "title": "Ride of the Rohirrim",
          "duration": "10 mins"
        },
        {
          "title": "Frodo destroys the One Ring",
          "duration": "7 mins"
        }
      ]
    }
  ]
  
function movies(data){
    return data.map(movie => {
      const longest = movie.bestScenes.reduce((max,scene) => {
        const duration = parseInt(scene.duration);
        return duration > max? duration:max;
      },0);
      return {
        movieName:movie.movieName,
        longestDuration: longest
      }
    })
}

function AvgRating(data){
  const total = data.reduce((sum,movie) => sum+movie.rating,0);
  return total/data.length;
}

function sortMovies(data){
  return data.sort((a,b) => {
    if(b.rating !== a.rating){
      return b.rating - a.rating;
    }else{
      return a.movieName.localeCompare(b.movieName)
    }
  });
}

console.log(movies(data))
console.log(AvgRating(data));
console.log(JSON.stringify(sortMovies(data), null, 2));
