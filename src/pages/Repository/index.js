import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import api from "../../services/api";

import Container from "../../componentes/Cotainer";
import { Loading, Owner, IssueList } from "./styles";

function Repository({match}) {

    const [repository, setRepository] = useState({});
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadRepositoryData() {

            const repoName = decodeURIComponent(match.params.repository)

            const [repositoryData, issuesData] = await Promise.all([
                api.get(`repos/${repoName}`),
                api.get(`repos/${repoName}/issues`, {
                    params: {
                        state: 'open',
                        per_page: 5
                    }
                })
            ]);

            console.log(repositoryData.data);
            console.log(issuesData.data);

            setRepository(repositoryData.data);
            setIssues(issuesData.data);
            setLoading(false);

        }

        loadRepositoryData();

    }, [])

    if(loading) {
        return <Loading>Carregando</Loading>
    }

    return (
        <Container>
            <Owner>
                <Link to='/'> Voltar aos repositórios
                    <img src={repository.owner.avatar_url} alt={repository.owner.login}/>
                    <h1>{repository.name}</h1>
                    <h1>{repository.description}</h1>
                </Link>
            </Owner>

            <IssueList>
                {issues.map(issue => (
                    <li key={String(issue.id)}>
                        <img src={issue.user.avatar_url} alt={issue.user.login}/>
                        <div>
                            <strong>
                                <a href={issue.html_url}>{issue.title}</a>
                                {issue.labels.map(label => (
                                    <span key={String(label.id)}>{label.name}</span>
                                ))}
                            </strong>
                            <p>{issue.user.login}</p>
                        </div>
                    </li>
                ))}
            </IssueList>

        </Container>);

}

Repository.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            repository: PropTypes.string
        }),
    }).isRequired
};

export default Repository;