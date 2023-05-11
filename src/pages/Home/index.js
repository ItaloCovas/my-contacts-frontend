/* eslint-disable no-nested-ternary */
import {
  useEffect, useMemo, useState, useCallback,
} from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Header,
  ListContainer,
  Card,
  SearchInputContainer,
  ListHeader,
  ErrorContainer,
  EmptyContactsContainer,
  EmptySearchContainer,
} from './styles';
import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import sad from '../../assets/images/sad-face.svg';
import emptyBox from '../../assets/images/empty-box.svg';
import magnifierQuestion from '../../assets/images/magnifier-question.svg';
import Loader from '../../components/Loader';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import toast from '../../utils/toast';

import ContactsService from '../../services/ContactsService';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState(null);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const filteredContacts = useMemo(() => contacts.filter((contact) => contact.name.toLowerCase().includes(searchTerm.toLowerCase())));

  const listContacts = useCallback(
    async (orderByParam = 'asc') => {
      try {
        setIsLoading(true);

        const contactsList = await ContactsService.listContacts(orderByParam);

        setHasError(false);

        setContacts(contactsList);
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    },
    [orderBy],
  );

  useEffect(() => {
    listContacts(orderBy);
  }, [listContacts]);

  function handleToggleOrderBy() {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  }

  function handleContactsSearch(e) {
    setSearchTerm(e.target.value);
  }

  function handleTryAgain() {
    listContacts();
  }

  function handleDeleteContact(contact) {
    setContactBeingDeleted(contact);
    setIsDeleteModalVisible(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalVisible(false);
    setContactBeingDeleted(null);
  }

  async function handleConfirmDeleteContact() {
    try {
      setIsLoadingDelete(true);
      await ContactsService.deleteContact(contactBeingDeleted.id);

      setContacts((prevState) => prevState.filter(
        (contact) => contact.id !== contactBeingDeleted.id,
      ));

      handleCloseDeleteModal();
      toast('success', 'Contato deletado com sucesso!');
    } catch (error) {
      toast('danger', 'Ocorreu um erro ao deletar o contato!');
    } finally {
      setIsLoadingDelete(false);
    }
  }

  return (
    <Container>
      <Loader isLoading={isLoading} />
      <Modal
        danger
        title={`Tem certeza que deseja remover o contato "${contactBeingDeleted?.name}"?`}
        confirmLabel="Deletar"
        visible={isDeleteModalVisible}
        onCancel={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteContact}
        isLoading={isLoadingDelete}
      >
        <p>Esta ação não poderá ser desfeita!</p>
      </Modal>
      {contacts.length > 0 && (
        <SearchInputContainer>
          <input
            type="text"
            placeholder="Pesquisar contato..."
            value={searchTerm}
            onChange={handleContactsSearch}
          />
        </SearchInputContainer>
      )}

      <Header
        justifyContent={
          hasError
            ? 'flex-end'
            : (contacts.length > 0
              ? 'space-between'
              : 'center')
        }
      >
        {!hasError && contacts.length > 0 && (
          <strong>
            {filteredContacts.length}
            {filteredContacts.length === 1 ? ' contato' : ' contatos'}
          </strong>
        )}
        <Link to="/new">Novo contato</Link>
      </Header>

      {(contacts.length > 0 && filteredContacts < 1) && (
      <EmptySearchContainer>
        <img src={magnifierQuestion} alt="Magnifier icon" />
        <span>
          Nenhum resultado foi encontrado para
          {' '}
          <strong>
            {`"${searchTerm}"`}
          </strong>
        </span>
      </EmptySearchContainer>
      )}

      {(contacts.length < 1 && !isLoading) && (
        <EmptyContactsContainer>
          <img src={emptyBox} alt="Empty box" />
          <p>
            Você ainda não tem nenhum contato cadastrado! Clique no botão
            {' '}
            <strong>”Novo contato”</strong>
            {' '}
            à cima para cadastrar o seu
            primeiro!
          </p>
        </EmptyContactsContainer>
      )}

      {hasError && (
        <ErrorContainer>
          <div className="error-message">
            <img src={sad} alt="Sad face" />
            <span>Ocorreu um erro ao obter seus contatos!</span>
          </div>
          <Button type="button" onClick={handleTryAgain}>
            Tentar novamente
          </Button>
        </ErrorContainer>
      )}

      {!hasError && (
        <ListContainer>
          <ListHeader orderBy={orderBy}>
            {filteredContacts.length > 0 && (
              <button type="button" onClick={handleToggleOrderBy}>
                <span>Nome</span>
                <img src={arrow} alt="Arrow Icon" />
              </button>
            )}
          </ListHeader>
          {filteredContacts.map((contact) => (
            <Card key={contact.id}>
              <div className="info">
                <div className="contact-info">
                  <strong>{contact.name}</strong>
                  {contact.category_name && (
                    <small>{contact.category_name}</small>
                  )}
                </div>
                <span>{contact.email}</span>
                <span>{contact.phone}</span>
              </div>

              <div className="actions">
                <Link to={`/edit/${contact.id}`}>
                  <img src={edit} alt="Edit Icon" />
                </Link>
                <button href="/" type="button" onClick={() => handleDeleteContact(contact)}>
                  <img src={trash} alt="Thrash Icon" />
                </button>
              </div>
            </Card>
          ))}
        </ListContainer>
      )}
    </Container>
  );
}
