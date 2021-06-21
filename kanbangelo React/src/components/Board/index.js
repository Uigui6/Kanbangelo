import React, { useState, useEffect } from "react";
import {useParams} from "react-router-dom";
import produce from "immer";
import axios from "axios";
import BoardContext from "./context";
import Header from "../Header"
import List from "../List";
import { Container } from "./styles";

const apiUrlLista = 'http://localhost:5000/api/Lista';
const apiUrlIdeia = 'http://localhost:5000/api/Ideia';


export default function Board() {
  const [lists, setLists] = useState([]);
  const {name} = useParams();
  useEffect(() => {GetTudo()}, [])

  async function GetTudo(){
    const lista = (await axios.get(apiUrlLista)).data;
    const ideia = (await axios.get(apiUrlIdeia + "/" + name)).data;
    const data = lista.map(list => {
      const ideiaFiltrada = ideia.filter(i => i.title == list.title);
      return {
        ...list, cards: [...ideiaFiltrada]
      }
    })
    setLists(data);
  }

  function move(fromList, toList, from, to) {
    setLists(
      produce(lists, (draft) => {
        const dragged = draft[fromList].cards[from];

        draft[fromList].cards.splice(from, 1);
        draft[toList].cards.splice(to, 0, dragged);
      })
    );
  }

  return (
    <>
    <Header></Header>
    <BoardContext.Provider value={{ lists, move, GetTudo }}>
      <Container>
        {
        lists.map((list, index) => {
          //console.log(list);
          return <List key={list.title} index={index} data={list} name={name} /> 
        })}
      </Container>
    </BoardContext.Provider>
    </>
  );
}
