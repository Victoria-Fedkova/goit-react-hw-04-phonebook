import PropTypes from 'prop-types';
import { Form, FormGroup, FormInput, AddBtn } from './Filter.styled';

const Filter = ({ value, onChange, onFilterReset }) => (
  <Form>
    <FormGroup>
      Find contacts by name
      <FormInput type="text" value={value} onChange={onChange} />
    </FormGroup>
    <AddBtn type="button" onClick={onFilterReset}>
      Clear
    </AddBtn>
  </Form>
);

Filter.propeTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onFilterReset: PropTypes.func.isRequired,
};

export default Filter;
