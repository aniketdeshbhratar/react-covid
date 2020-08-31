import React from 'react';
import './Table.css';
function Table({countries}) {
    return (
        <div className="table">
            {countries.map(({country,cases,active}) => {
                return <tr>
                    <td>{country}</td>
                    <td><b>{active}/{cases}</b></td>
                </tr>
            })}
        </div>
    )
}

export default Table
