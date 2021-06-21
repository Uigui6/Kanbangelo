import React, { Component } from 'react';
import './Login.css';
import {withRouter} from "react-router-dom";

const apiUrl = 'http://localhost:5000/api/Login';
const stateInicial = {
    usuario: { nome: '', senha: '' }
}

class Login extends Component{

    state = { ...stateInicial };

    limpar() {
        this.setState({ usuario: stateInicial.usuario });
    }

    atualizaCampo(event) {
        //clonar usuário a partir do state, para não alterar o state diretamente
        const usuario = { ...this.state.usuario };
        //usar o atributo NAME do input identificar o campo a ser atualizado
        usuario[event.target.name] = event.target.value;
        //atualizar o state
        this.setState({ usuario });
    }

    salvar(e) { //Cadastra o Usuario
        e.preventDefault();
        const usuario = this.state.usuario;
        if(usuario.nome != '' && usuario.senha != '')
        {
            const randomizador = Number(usuario.nome);
            const metodo = randomizador ? 'put' : 'post';
            const url = randomizador ? `${apiUrl}/${randomizador}` : apiUrl;

            fetch(url, {
                method: metodo,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(usuario)
            })
            .then(
                resp => {
                    //console.log(resp.json());
                    resp.json().then((data) => {
                        console.log(data);
                        this.props.history.push("/Board/" + data.nome);
                    })
                })
        }
        else
        {
            alert("Os dois campos devem ser preenchidos corretamente!");
        }
    }

    irPraLogin() {
        var body = document.querySelector("body");
        body.className = "sign-in-js"; 
    }

    irPraCadastro() {
        var body = document.querySelector("body");
        body.className = "sign-up-js";
    }

    verificarLogin(e){
        e.preventDefault();
        const usuario = this.state.usuario;
        fetch(apiUrl+"/login", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            //body: JSON.stringify({"nome": "Teste", "senha": 12345})
            body: JSON.stringify(usuario)
        })
        .then(
            resp => {
                //console.log(resp.json());
                resp.json().then((data) => {
                    console.log(data);
                    this.props.history.push("/Board/" + data[0].nome);
                })
            })
    }

    render(){
        return(
            <div className="container">
                <div className="content first-content">
                    <div className="first-column">
                        <h2 className="title title-primary">Bem vindo de volta!</h2>
                        <p className="description description-primary">Caso você já possua uma conta</p>
                        <p className="description description-primary">clique no botão de login abaixo</p>
                        <button id="signin" className="btn btn-primary" onClick={this.irPraLogin}><h3>Login</h3></button>
                    </div>    
                    <div className="second-column">
                        <h2 className="title title-second">Criar uma conta</h2><br></br>
                        <form className="form">
                            <label className="label-input">
                                <i className="far fa-user icon-modify"></i>
                                <input
                                    type="text"
                                    id="nome"
                                    placeholder="Nome do usuário"
                                    className="form-input"
                                    name="nome"
                                    value={this.state.usuario.nome}
                                    onChange={ e => this.atualizaCampo(e)}
                                />
                            </label>
                            
                            <label className="label-input">
                                <i className="fas fa-lock icon-modify"></i>
                                <input 
                                    type="password"
                                    placeholder="Senha"
                                    id="senha"
                                    className="form-input"
                                    name="senha"
                                    value={this.state.usuario.senha}
                                    onChange={ e => this.atualizaCampo(e)}
                                />
                            </label>
                            
                            
                            <button className="btn btn-second" onClick={e => this.salvar(e)}>Cadastro</button>        
                        </form>
                    </div>
                </div>
                <div className="content second-content">
                    <div className="first-column">
                        <h2 className="title title-primary">Primeira vez?</h2>
                        <p className="description description-primary">Crie sua conta agora</p>
                        <p className="description description-primary">clicando no botão de cadastro</p>
                        <button id="signup" className="btn btn-primary" onClick={this.irPraCadastro}>Cadastro</button>
                    </div>
                    <div className="second-column">
                        <h2 className="title title-second">Login</h2>
                        <form className="form">
                            <label className="label-input">
                                <i className="far fa-user icon-modify"></i>
                                <input
                                    type="text"
                                    placeholder="Nome do Usuário"
                                    className="form-input"
                                    name="nome"
                                    value={this.state.usuario.nome}
                                    onChange={ e => this.atualizaCampo(e)}
                                />
                            </label>
                        
                            <label className="label-input">
                                <i className="fas fa-lock icon-modify"></i>
                                <input
                                    type="password"
                                    placeholder="Senha"
                                    className="form-input"
                                    name="senha"
                                    value={this.state.usuario.senha}
                                    onChange={ e => this.atualizaCampo(e)}
                                />
                            </label>
                        
                            <button className="btn btn-second" onClick={e => this.verificarLogin(e)}>Login</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Login);