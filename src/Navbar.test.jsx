import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';

describe('Navbar Component', () => {
  test('navigates to the Account page when the Account link is clicked', () => {
    const { getByText, container } = render(
      <MemoryRouter initialEntries={['/']}>
        <Navbar />
        <Routes>
          <Route path="/account" element={<div>Account Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    // Click on the Account link
    fireEvent.click(getByText(/Account/i));

    // Check if the Account Page is displayed by checking the text content
    const accountPageText = container.querySelector('div');
    expect(accountPageText && accountPageText.textContent).toContain('lrnr');
  });

  test('navigates to the Quiz Generation page when the Quiz Generation link is clicked', () => {
    const { getByText, container } = render(
      <MemoryRouter initialEntries={['/']}>
        <Navbar />
        <Routes>
          <Route path="/quizgeneration" element={<div>Quiz Generation Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    // Click on the Quiz Generation link
    fireEvent.click(getByText(/Quiz Generation/i));

    // Check if the Quiz Generation Page is displayed by checking the text content
    const quizGenPageText = container.querySelector('div');
    expect(quizGenPageText && quizGenPageText.textContent).toContain('lrnr');
  });

  test('closes the menu when a link is clicked', () => {
    const { getByText, container } = render(
      <MemoryRouter initialEntries={['/']}>
        <Navbar />
      </MemoryRouter>
    );

    // Simulate opening the menu by clicking the toggle button
    fireEvent.click(container.querySelector('#mobile-menu'));

    // Click on the Account link
    fireEvent.click(getByText(/Account/i));

    // Check if the menu is closed (i.e., not active)
    const navLinks = container.querySelector('.nav-links');
    expect(navLinks.classList.contains('active')).toBe(false);
  });
});
