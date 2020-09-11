import React from 'react';
import {Card,CardContent,Typography} from "@material-ui/core";

function Infobox({cssClass,title,cases,total}) {
    return (
        <div className="card">
           <div className="top__container">
                <p className="card__title--primary">{title}</p>
            <p className={`card__title--secondary ${cssClass}`}>{cases}</p>           
           </div>         
           <h2 className="card__title--tertiary">Total: {total} </h2>
        </div>
    )
}

export default Infobox
