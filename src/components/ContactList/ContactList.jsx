import PropTypes from 'prop-types';
import css from './ContactList.module.css';

const ContactList = ({ contacts, toDelete }) => (
  <ul className={css.contactsList}>
    {contacts.map(({ id, name, number }) => (
      <li className={css.contactsItem} key={id}>
        <p>
          {name}: {number}
        </p>
        <button
          className={css.contactBtn}
          type="submit"
          onClick={() => toDelete(id)}
        >
          Delete
        </button>
      </li>
    ))}
  </ul>
);

ContactList.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  toDelete: PropTypes.func.isRequired,
};

export default ContactList;
