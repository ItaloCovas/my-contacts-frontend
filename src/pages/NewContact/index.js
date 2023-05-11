import { useRef } from 'react';
import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';
import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';

export default function NewContact() {
  const contactFormRef = useRef(null);

  async function handleSubmit(formData) {
    try {
      const contact = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.categoryId,
      };

      await ContactsService.createContact(contact);
      contactFormRef.current.resetFields();

      toast('success', 'Contato cadastrado com sucesso!', 3000);
    } catch {
      toast('danger', 'Ocorreu um erro ao cadastrar o contato!');
    }
  }

  return (
    <>
      <PageHeader title="Novo contato" />
      <ContactForm buttonText="Cadastrar" onSubmit={handleSubmit} ref={contactFormRef} />
    </>
  );
}
