import PropTypes from 'prop-types';
import { Table, TableHead } from './ContatcList.styled';

import ContactListRow from './ContactListRow/';

const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <TableHead>Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Actions</TableHead>
          </tr>
        </thead>
        <tbody>
          {contacts.map(({ id, name, number }) => (
            <ContactListRow
              key={id}
              id={id}
              name={name}
              number={number}
              onDeleteContact={onDeleteContact}
            />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

ContactList.propeTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactList;
