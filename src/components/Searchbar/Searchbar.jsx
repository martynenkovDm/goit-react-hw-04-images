import { Header, Form, Button, Input } from './Searchbar.styled';
import PropTypes from 'prop-types';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { notifyOptions } from 'notify/notify';
import { toast } from 'react-toastify';
import { useState } from 'react';
export const Searchbar = ({ onSubmit }) => {
  // state = {
  //   value: '',
  // };
  const [value, setValue] = useState('');

  const onInputChange = ({ target: { value } }) => {
    setValue(value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (value.trim() === '') {
      return toast.info('Please enter key words for search', notifyOptions);
    }
    onSubmit(value);
    setValue('');
  };

  return (
    <Header>
      <Form className="form" onSubmit={handleSubmit}>
        <Button type="submit" className="button">
          <HiMagnifyingGlass size="24" padding="10px" />
        </Button>
        <Input
          className="input"
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={value}
          onChange={onInputChange}
        />
      </Form>
    </Header>
  );
};
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
