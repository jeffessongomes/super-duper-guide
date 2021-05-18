import { useState, useEffect } from 'react';

import { Container, Col, Row } from 'react-bootstrap';
import { useRouteMatch } from 'react-router-dom';

import api from '../../services/api';

import './styles.scss';

export default function Profile() {
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [isActive, setIsActive] = useState(false);

  const { params } = useRouteMatch();

  useEffect(() => {
    api.get(`${params.username}`).then((response) => {
      setUser(response.data);
    });
  }, [params]);

  async function handleListRepos(type) {
    const { data } = await api.get(`${params.username}/${type}`);
    setIsActive(true);
    setRepos([...data]);
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col sm={12} lg={8} className="offset-lg-1">
          <div className="profile">
            <div className="profile__info">
              <img
                src={user.avatar_url}
                alt="Foto de Jeffesson Gomes"
                loading="lazy"
              />
              <strong>{user.name}</strong>
              <p>{user.bio}</p>
              <ul>
                <li>
                  <strong>Seguidores: {user.followers}</strong>
                </li>
                <li>
                  <strong>Seguindo: {user.following}</strong>
                </li>
              </ul>
            </div>
            <div className="profile__action">
              <div className="profile__action--buttons">
                <button type="button" onClick={() => handleListRepos('repos')}>
                  Repos
                </button>
                <button
                  type="button"
                  onClick={() => handleListRepos('starred')}
                >
                  Starred
                </button>
              </div>
              {isActive && (
                <ul className="profile__action--list">
                  {repos?.map((repo) => (
                    <li key={repo.id}>
                      <strong>{repo.name}</strong>
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Acessar
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
