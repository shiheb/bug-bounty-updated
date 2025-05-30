/* eslint-disable react/display-name */
import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { renderWithTheme, mockUser } from '../../test/utils';
import AppHeader from '.';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        appTitle: 'Supplier OS Application',
      };
      return translations[key] || key;
    },
  }),
}));

jest.mock('../LanguageSwitcher', () => () => <div data-testid="language-switcher" />);
jest.mock('../AvatarMenu', () => (props: any) => (
  <div data-testid="avatar-menu">{props.user?.eMail}</div>
));

describe('<AppHeader />', () => {
  it('renders the countdown timer', () => {
    renderWithTheme(<AppHeader user={mockUser} pageTitle="Dashboard" />);
    expect(screen.getByText('60:00')).toBeInTheDocument();
  });

  it('renders app title and page title', () => {
    renderWithTheme(<AppHeader user={mockUser} pageTitle="Dashboard" />);
    expect(screen.getByText('SUPPLIER OS APPLICATION')).toBeInTheDocument();
    expect(screen.getByText('DASHBOARD')).toBeInTheDocument();
  });

  it('renders the LanguageSwitcher and AvatarMenu with email', () => {
    renderWithTheme(<AppHeader user={mockUser} pageTitle="Settings" />);
    expect(screen.getByTestId('language-switcher')).toBeInTheDocument();
    expect(screen.getByTestId('avatar-menu')).toHaveTextContent(mockUser.eMail);
  });

  it('does not render AvatarMenu if user email is missing', () => {
    const noEmailUser = { ...mockUser, eMail: '' };
    renderWithTheme(<AppHeader user={noEmailUser} pageTitle="Profile" />);
    expect(screen.queryByText('DASHBOARD')).not.toBeInTheDocument();
    expect(screen.queryByTestId('avatar-menu')).not.toBeInTheDocument();
  });
});
