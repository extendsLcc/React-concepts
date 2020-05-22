import React, { useEffect, useState } from "react";
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa'
import { Link } from 'react-router-dom';

import api from '../../services/api';

import { Container, Form, SubmitButton, List } from "./styles";

function Main() {

    const [newRepo, setNewRepo] = useState('');
    const [repositories, setRepositories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log( 'loading repositories' )
        loadRepositories();
    }, []);

    useEffect(() => {
        console.log( 'repository change' )
        localStorage.setItem('respositories', JSON.stringify(repositories));
    }, [repositories]);

    function loadRepositories() {
        const localRepositories = localStorage.getItem('respositories');
        return localRepositories == null ? [] : JSON.parse(localRepositories);
    }

    function handleInputChange(e) {
        setNewRepo(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        setLoading(true);
        const response = await api.get(`/repos/${newRepo}`)

        console.log(response.data);

        const data = {
            name: response.data.full_name,
        };

        setRepositories([...repositories, data]);
        setLoading(false);

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
            <List>
                {repositories.map(repositorie => (
                    <li key={repositorie.name}>
                        <span>{repositorie.name}</span>
                        <Link to={`/repository/${encodeURIComponent(repositorie.name)}`}>Detalhes</Link>
                    </li>
                ))}
            </List>
        </Container>
    );

}

export default Main;