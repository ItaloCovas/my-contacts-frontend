import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Button from '../Button';
import { Overlay, Container, ModalFooter } from './styles';

export default function Modal({ danger }) {
  return ReactDOM.createPortal(
    <Overlay>
      <Container danger={danger}>
        <h1>Title</h1>
        <p>corpo do modal</p>

        <ModalFooter>
          <button type="button" className="cancel-button">Cancelar</button>
          <Button type="button">Deletar</Button>
        </ModalFooter>
      </Container>
    </Overlay>,
    document.getElementById('modal-root'),
  );
}

Modal.propTypes = {
  danger: PropTypes.bool,
};

Modal.defaultProps = {
  danger: false,
};
