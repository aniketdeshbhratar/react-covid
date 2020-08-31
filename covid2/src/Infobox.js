import React from 'react';
import {Card,CardContent,Typography} from "@material-ui/core";

function Infobox({title,cases,total}) {
    return (
        <div className="card">
           <div className="top__container">
            <p className="card__title--primary">{title}</p>
            <h4 className="card__title--secondary">{cases}</h4>           
           </div>         
           <h2 className="card__title--secondary">Total: {total} </h2>
        </div>
    )
}

export default Infobox
