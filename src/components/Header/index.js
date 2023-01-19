import { Container, SearchInputContainer } from './styles';
import logo from '../../assets/images/logo.svg';

export default function Header() {
  return (
    <Container>
      <img src={logo} alt="Logo My Contacts" width="201" />

      <SearchInputContainer>
        <input type="text" placeholder="Pesquisar contato..." />
      </SearchInputContainer>
    </Container>
  );
}
