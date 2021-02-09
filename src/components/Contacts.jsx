import React from "react";
import { InferencePriority } from "typescript";
import Card from "./Card";
const contactArray = require("./../Utils/contact.json");

function initContacts() {
    const arr = new Array(contactArray.contacts.length);
    contactArray.contacts.forEach((el, i) => {
        arr[i] = <Card info={el} />;
    });
    return arr;
}

function Contacts() {
    console.log(initContacts());
    return (
        <div>
            <h1>Contacts :3</h1>
            {initContacts()}
        </div>
    );
}

export default Contacts;