import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Note from './Notes';

test('renders content', () => {
  const note = {
    content: 'for testing',
    important: true
  };

  render(<Note note={note} />);

  // screen.debug();

  const element = screen.getByText('for testing');
});
