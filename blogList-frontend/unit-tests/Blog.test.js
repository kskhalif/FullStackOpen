import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from '../src/components/Blog';

test('renders content', () => {
  const blog = { title: 'For Testing', url: 'coming soon' };
  
  const { container } = render(<Blog blog={blog} />);

  const div = container.querySelector('.blog');
  expect(div).toHaveTextContent('For Testing');
});

test('clicking button calls event handler once', async () => {
  const blog = { title: 'For Testing', url: 'coming soon' };

  const mockHandler = jest.fn();

  render(<Blog blog={blog} toggleVisibility={mockHandler} />);

  const user = userEvent.setup();
  const button = screen.getByText('view');
  await user.click(button);

  expect(mockHandler.mock.calls).toHaveLength(1);
});
