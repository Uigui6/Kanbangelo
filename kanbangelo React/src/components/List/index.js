import { render } from "@testing-library/react";
import React, { useState, useContext } from "react";
import { MdAdd } from "react-icons/md";
import Card from "../Card";
import { Container } from "./styles";
import axios from "axios";
import BoardContext from "../Board/context";

const apiUrl = 'http://localhost:5000/api/Ideia/';
  
export default function Lista({ data, index: listIndex, name }) {

  const [frase, setFrase] = useState("");
  const { GetTudo } = useContext(BoardContext);
  
  async function salvar(e) {
    e.preventDefault();
    if(frase)
    {
      const data = {
        Nome: name, Content: frase, Title: "Tarefas"
      }
      const response = await axios.post(apiUrl, data);
      console.log(response);
      GetTudo();
    }
    else
    {
        alert("A ideia está vazia!");
    }
  }

  return (
    <Container done={data.done}>
      <header>
        <h2>{data.title}</h2>
        
        {data.creatable && (
          <>
            <button type="button" onClick={salvar}>
              <MdAdd size={24} color="#FFF"/>
            </button>

                  <div className="Container">
                  <label> Nova Ideia: </label>
                      <input
                          type="text"
                          id="texto"
                          placeholder="Ideia"
                          className="form-input"
                          name="texto"
                          value={frase}
                          onChange={(e)=>setFrase(e.target.value)}
                      />
                </div>
          </>
        )}
      </header>

      <ul>
        {data.cards.map((card, index) => (
          <Card key={card.id} listIndex={listIndex} index={index} data={card} />
        ))}
      </ul>
    </Container>
  );
}
