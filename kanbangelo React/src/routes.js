import React from "react";
import Login from "./components/Login";
import Board from "./components/Board";
import {Switch, Route} from "react-router-dom";

export default function Routes(){
    return(
        <Switch>
            <Route path="/" exact component={Login}> 

            </Route>
            <Route path="/Board/:name" exact component={Board}> 

            </Route>

        </Switch>
    )
}