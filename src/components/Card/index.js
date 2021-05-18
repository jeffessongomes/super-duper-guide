import { Link } from 'react-router-dom';

import { IoIosArrowForward } from 'react-icons/io';

import './styles.scss';

export default function Card({
  name,
  avatar,
  link,
  description,
  followers,
  following,
}) {
  return (
    <Link to={link} className="cardUser">
      <img src={avatar} alt={`Foto de ${name}`} loading="lazy" />
      <div className="cardUser__container">
        <div className="cardUser__content">
          <div>
            <strong>{name}</strong>
            <p>{description}</p>
          </div>
          <div className="cardUser__content--social">
            <strong>Seguidores: {followers}</strong>
            <strong>Seguindo: {following}</strong>
          </div>
        </div>
        <button type="button">
          <IoIosArrowForward size={24} color="#BDC3C7" />
        </button>
      </div>
    </Link>
  );
}
