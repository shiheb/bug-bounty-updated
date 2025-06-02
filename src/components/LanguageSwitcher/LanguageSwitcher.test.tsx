import React from 'react';
import { screen, within, waitFor } from '@testing-library/react';
import { act } from 'react'; // Better import for React 18
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

describe('LanguageSwitcher component', () => {
  it('renders with the current language selected', () => {
    renderWithTheme(<LanguageSwitcher />);
    expect(screen.getByText('EN')).toBeInTheDocument();
  });

  it('opens the menu and displays all language options', async () => {
    const user = userEvent.setup();
    renderWithTheme(<LanguageSwitcher />);
    await act(async () => {
      await user.click(screen.getByText('EN'));
    });
    const listbox = await screen.findByRole('listbox');
    const options = within(listbox).getAllByRole('option');
    expect(options).toHaveLength(2);
    expect(options[0]).toHaveTextContent('EN');
    expect(options[1]).toHaveTextContent('DE');
  });

  it('calls changeLanguage when a different language is selected', async () => {
    const user = userEvent.setup();
    renderWithTheme(<LanguageSwitcher />);

    await act(async () => {
      await user.click(screen.getByText('EN'));
    });
    const listbox = await screen.findByRole('listbox');
    await act(async () => {
      await user.click(within(listbox).getByText('DE'));
    });

    expect(mockChangeLanguage).toHaveBeenCalledWith('de');
  });

  it('does not call changeLanguage when the same language is re-selected', async () => {
    const user = userEvent.setup();
    renderWithTheme(<LanguageSwitcher />);

    await act(async () => {
      await user.click(screen.getByText('EN'));
    });
    const listbox = await screen.findByRole('listbox');
    await act(async () => {
      await user.click(within(listbox).getByText('EN'));
    });
    expect(mockChangeLanguage).not.toHaveBeenCalled();
  });
});
