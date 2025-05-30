import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import LanguageSwitcher from '.';
import { renderWithTheme } from '../../test/utils';

jest.mock('../../hooks/useLanguageSwitcher', () => ({
  useLanguageSwitcher: jest.fn(),
}));

import { useLanguageSwitcher } from '../../hooks/useLanguageSwitcher';

const mockChangeLanguage = jest.fn();
const defaultLanguages = ['en', 'de'];

beforeEach(() => {
  (useLanguageSwitcher as jest.Mock).mockReturnValue({
    currentLanguage: 'en',
    changeLanguage: mockChangeLanguage,
    defaultLanguages,
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('render LanguageSwitcher component', () => {
  it('renders with the current language selected', () => {
    renderWithTheme(<LanguageSwitcher />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('EN');
  });

  it('opens the menu and displays all language options', async () => {
    const user = userEvent.setup();
    renderWithTheme(<LanguageSwitcher />);
    await user.click(screen.getByRole('button'));
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(2);
    expect(options.map(o => o.textContent)).toEqual(expect.arrayContaining(['EN', 'DE']));
  });

  it('calls changeLanguage when a different language is selected', async () => {
    const user = userEvent.setup();
    renderWithTheme(<LanguageSwitcher />);
    await user.click(screen.getByRole('button'));
    await user.click(screen.getByRole('option', { name: 'DE' }));
    expect(mockChangeLanguage).toHaveBeenCalledWith('de');
  });

  it('does not call changeLanguage when the same language is re-selected', async () => {
    const user = userEvent.setup();
    renderWithTheme(<LanguageSwitcher />);
    await user.click(screen.getByRole('button'));
    await user.click(screen.getByRole('option', { name: 'EN' }));
    expect(mockChangeLanguage).not.toHaveBeenCalled();
  });
});
