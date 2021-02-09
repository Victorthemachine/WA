import React from "react";

function Card(props) {
    console.log(props);
    return (
        <div class="contactCard">
            <h2>{props.info.name}</h2>
            <img src={props.info.img} alt={props.info.name} width="250px" />
            <hr />
			E-mail: <b><a href={`mailto:props.src.email`}>{props.info.email}</a> </b>
            <p>Phone numwbew: <b>{props.info.tel} </b> </p>
        </div>
    );
}

export default Card;