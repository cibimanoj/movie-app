const APIURL ="https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI ="https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main=document.getElementById("main")
const form=document.getElementById("form")
const search=document.getElementById("search")
getMovies(APIURL)
async function getMovies(url){
    try{
        const res =await fetch(url)
        const data=await res.json();
        showMovies(data.results)
        return data;
    }catch(e)
    {
     console.log(e)
    }
}

function showMovies(movie){
    
    main.innerHTML="";
    movie.forEach((movies)=>{
            const {poster_path,title,vote_average,overview}=movies
            const div=document.createElement("div")
            div.classList.add("movie")
            div.innerHTML=`<img
                        src="${IMGPATH + poster_path}"
                            alt="NO PREVIEW AVAILABLE"/>
                            <div class="movie-info">
                            <h3>${title}</h3>
                            <span class=${getClassByRate(vote_average)}>${vote_average}</span>
                            </div>
                            <div class="overview">
                            <h3>Overview<h3>
                            ${overview}
                            </div>`
                            ;
                            main.appendChild(div)
                        });

}
function getClassByRate(vote){
    if(vote>=8){
        return "green";
    }else if(vote>=6){
        return "orange";
    }else{
        return "red";
    }
}
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const searchTerm=search.value
    if(searchTerm){
        getMovies(SEARCHAPI+searchTerm)
    }
})
