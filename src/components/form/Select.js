import React from 'react';
import styles from "../form/Select.module.css";
function Select({ type, text, name, placeholder, handleOnChange, value }) {
  return (
    <div className={styles.form_control}>
      <label htmlFor={name}>{text}</label>
      <select name={name} id={name}>
      <option>Selecione uma opção</option>
      </select>
    </div>
  );
}
export default Select;
