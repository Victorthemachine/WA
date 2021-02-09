import React from "react";
const Util = require('../Utils/Util.js');

function Header() {
    return <header>{new Util().formatHeaderText()}</header>;
}

export default Header;