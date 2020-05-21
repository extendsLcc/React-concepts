import React, { useState } from "react";
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa'

import api from '../../services/api';

import { Container, Form, SubmitButton } from "./styles";

function Main() {

    const [newRepo, setNewRepo] = useState('');
    const [respositories, setRepositories] = useState([]);
    const [loading, setLoading] = useState(false);

    function handleInputChange(e) {
        setNewRepo(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        setLoading( true );
        const response = await api.get(`/repos/${newRepo}`)

        console.log(response.data);

        const data = {
            name: response.data.full_name,
        };

        setRepositories([...respositories, data]);
        setLoading( false );

    }

    return (
        <Container>
            <h1>
                <FaGithubAlt/>
                Repositórios
            </h1>
            <Form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Adicionar respositório!"
                    onChange={handleInputChange}
                />
                <SubmitButton loading={loading}>
                    {loading ? (
                        <FaSpinner color="#FFF" size={14}/>
                    ) : (
                        <FaPlus color="#FFF" size={14}></FaPlus>
                    )}
                </SubmitButton>
            </Form>
        </Container>
    );

}

export default Main;