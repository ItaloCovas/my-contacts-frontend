import { Link } from 'react-router-dom';
import {
  Container, Header, ListContainer, Card, SearchInputContainer,
} from './styles';
import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';

export default function Home() {
  return (
    <Container>
      <SearchInputContainer>
        <input type="text" placeholder="Pesquisar contato..." />
      </SearchInputContainer>

      <Header>
        <strong>3 contatos</strong>
        <Link to="/new">Novo contato</Link>
      </Header>

      <ListContainer>
        <header>
          <button type="button">
            <span>Nome</span>
            <img src={arrow} alt="Arrow Icon" />
          </button>
        </header>

        <Card>
          <div className="info">
            <div className="contact-info">
              <strong>Ítalo Covas</strong>
              <small>Instagram</small>
            </div>
            <span>italocovas@gmail.com</span>
            <span>(16) 99369-0944</span>
          </div>

          <div className="actions">
            <Link to="/edit/11919">
              <img src={edit} alt="Edit Icon" />
            </Link>
            <button href="/" type="button">
              <img src={trash} alt="Thrash Icon" />
            </button>
          </div>
        </Card>
      </ListContainer>
    </Container>
  );
}
