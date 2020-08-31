import React , {useState, useEffect} from "react";
import {MenuItem,FormControl,Select ,Card, CardContent} from "@material-ui/core";
import Table from './Table';
import Infobox from './Infobox';
import Map from './Map';
import {sortData} from './util';
import LineGraph from './LineGraph';
import "./App.css";

function App() {

  const [countries, setCounties] = useState([]); 
  const [country, setCountry] = useState(['Worldwide']);
  const [countryInfo, setCountryInfo] = useState([]);
  const [tableData, setTableData] = useState([]);
 
  const countriesApi = "https://disease.sh/v3/covid-19/countries";
  const worldwideApi = "https://disease.sh/v3/covid-19/all";

  // to get wordwide data for first time
  useEffect(() => {
    fetch(worldwideApi)
      .then((response) => response.json())
      .then((data)=> {
        setCountryInfo(data)
      });
  },[])

  useEffect(()=> {

    const getCountriesData = async () => {
      await fetch(countriesApi)
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
              name: country.country,
              value: country.countryInfo.iso2}));
            console.log(data);
          const sortedData = sortData(data);   
          console.log(sortedData); 
          setTableData(sortedData);    
          setCounties(countries);
        });
    };

    getCountriesData();
    
  },[]);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
    console.log(countryCode);
    
    const countriesDataApi = `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    const url = countryCode === 'worldwide' ? worldwideApi : countriesDataApi;
    console.log(url);
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
        
      console.log(data)
      });

     // worldwide : "https://disease.sh/v3/covid-19/all";
    // counties data : "https://disease.sh/v3/covid-19/countries/[COUNTRY_CODE]";
  }
  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
        <h1>Corona Virus counter</h1>
        <select name="cars" value={country} 
        onChange={onCountryChange}>
          <option value="worldwide">Worldwide</option>
          {
              countries.map(country => {
                return  <option value={country.value}>{country.name}</option> 
              })
            }
        </select>
        {/* <FormControl className="app__dropdown">
          <Select variant="outlined" value={country} onChange={onCountryChange}>
          <MenuItem value="worldwide">Worldwide</MenuItem> 
            {
              countries.map(country => {
                return  <MenuItem value={country.value}>{country.name}</MenuItem> 
              })
            }
          </Select>
        </FormControl> */}
        </div> 

        <div className="app_stats">
            <Infobox title="Corona cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
            <Infobox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}  />
            <Infobox title="Deaths" cases={countryInfo.todayRecovered} total={countryInfo.deaths}  />
        {/* inforboxes title="cases" */}
        {/* inforboxes title="recoveries*/}

        </div>

        <Map/>
      </div>
      <div className="app__right card">    
          <h3>Live cases by Counties</h3>
          <Table countries={tableData}></Table>
          <LineGraph />
          <h3>World wide new cases</h3>
      </div>      
    </div>
  );
}

export default App;
