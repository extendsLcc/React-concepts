import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';

import api from "../../services/api";

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

            console.log(repositoryData);
            console.log(issuesData);

            setRepository(repositoryData);
            setIssues(issuesData);
            setLoading(false);

        }

        loadRepositoryData();

    }, [])

    return (<h1>Respository: {decodeURIComponent(match.params.repository)}</h1>);

}

Repository.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            repository: PropTypes.string
        }),
    }).isRequired
};

export default Repository;