import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddNewBlog from '../src/components/AddNewBlog';
import userEvent from '@testing-library/user-event';

test('AddNewBlog updates state and calls onSubmit', async () => {
  const addBlog = jest.fn();
  const user = userEvent.setup();

  render(<AddNewBlog addBlog={addBlog} />);

  const input = screen.getByPlaceholderText('Title');
  const sendButton = screen.getByText('post');

  await user.type(input, 'for testing...');
  await user.click(sendButton);

  expect(addBlog.mock.calls).toHaveLength(1);
  expect(addBlog.mock.calls[0][0].title).toBe('for testing...');
});
