import { useState, useEffect } from 'react';

import { Container, Row, Col } from 'react-bootstrap';
import api from '../../services/api';

import Card from '../../components/Card';

import './styles.scss';
import LogoCompasso from '../../assets/img/LogoCompasso.png';

export default function Home() {
  const [message, setMessage] = useState('');
  const [userName, setUserName] = useState('');

  const [users, setUsers] = useState(() => {
    const storagedUsers = localStorage.getItem('@GitSearch:users');

    if (storagedUsers) {
      return JSON.parse(storagedUsers);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('@GitSearch:users', JSON.stringify(users));
  }, [users]);

  async function handleAddUser(e) {
    e.preventDefault();

    if (!userName) {
      setMessage('Digite o nome do usuário');

      return;
    }

    try {
      const { data } = await api.get(`${userName}`);

      setMessage('');
      setUserName('');
      setUsers([...users, data]);
    } catch (err) {
      setMessage('Não foi possivel encontrar esse usuário');
    }
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col sm={12} lg={8} className="offset-lg-1">
          <div className="header">
            <div className="header__logo">
              <img
                src={LogoCompasso}
                alt="Logo da Compasso Uol"
                loading="lazy"
              />
            </div>
            <h1 className="header__title">
              Encontre informações sobre os desenvolvedores no Github.
            </h1>
            <form onSubmit={handleAddUser} className="header__search">
              <input
                className="header__search--input"
                type="text"
                placeholder="Digite o usuário do desenvolvedor. Ex: jeffessongomes"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <button
                className="header__search--button"
                type="button"
                onClick={handleAddUser}
              >
                Pesquisar
              </button>
            </form>
            {message && (
              <strong className="pl-2 text-warning">{message}</strong>
            )}
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center">
        {users.map((user) => (
          <Col key={user.id} sm={12} lg={8} className="offset-lg-1">
            <Card
              link={user?.login}
              name={user?.name}
              bio={user?.bio}
              followers={user?.followers}
              following={user?.following}
              avatar={user?.avatar_url}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
