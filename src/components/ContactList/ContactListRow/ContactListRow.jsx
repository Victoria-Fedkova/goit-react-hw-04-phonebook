import { DelBtn, TableD, TableRow } from './ContactListRow.styled';
import { ReactComponent as Logo } from './Delete-button.svg';
import PropTypes from 'prop-types';

const ContactListRow = ({ id, name, number, onDeleteContact }) => {
  return (
    <TableRow>
      <TableD>{name}</TableD>
      <TableD>{number}</TableD>
      <TableD>
        <DelBtn type="button" onClick={() => onDeleteContact(id)}>
          <Logo />
        </DelBtn>
      </TableD>
    </TableRow>
  );
};

ContactListRow.propeTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactListRow;
