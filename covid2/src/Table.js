import React from 'react';
import './Table.css';
function Table({countries}) {
    console.log({countries})
    return (
        <div className="table">
            {countries.map(({country,cases,active,countryInfo}) => {
                return <tr>
                    <td>
                        <div class="country">
                            <div class="country__flag">
                                <img src= {countryInfo.flag}/>
                            </div>
                            <p>{country}</p>
                        </div>
                    </td>
                    <td><b>{active}/{cases}</b></td>
                </tr>
            })}
        </div>
    )
}

export default Table
