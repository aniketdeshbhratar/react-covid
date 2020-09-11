var fetchedData;
var loader = document.querySelector("#loader");

function showLoader() {
  loader.className = "show";
  setTimeout(() => {
    loader.className = loader.className.replace("show", "");
  }, 5000);
}
function removeLoader(){
    if(fetchedData.length > 0){
        loader.setAttribute('hidden', '');
    }
}
function init(){
    showLoader();
    const worldwideApi = "https://disease.sh/v3/covid-19/all";

    const getDatafromAPI = async () => {
        await fetch(worldwideApi)
          .then((response) => response.json())
          .then((data) => {              
            
            fetchedData = data;
            removeLoader();
            callme();
          })
      };
     
    getDatafromAPI();
    
}

init();

console.log(fetchedData)
function callme (){
    console.log(fetchedData)
}