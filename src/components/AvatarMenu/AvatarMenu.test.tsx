import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AvatarMenu from '.';
import { renderWithTheme, mockUser } from '../../test/utils';
import '@testing-library/jest-dom';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('render AvatarMenu component', () => {
  it('renders avatar with initials', () => {
    renderWithTheme(<AvatarMenu user={mockUser} />);
    expect(screen.getByText('CH')).toBeInTheDocument();
  });

  it('opens the menu when avatar is clicked', async () => {
    renderWithTheme(<AvatarMenu user={mockUser} />);
    await userEvent.click(screen.getByText('CH'));
    expect(screen.getByText('Chiheb Hmida')).toBeInTheDocument();
    expect(screen.getByText('chiheb.hmida@example.com')).toBeInTheDocument();
  });

  it('renders Edit Profile and Edit Organization buttons', async () => {
    renderWithTheme(<AvatarMenu user={mockUser} />);
    await userEvent.click(screen.getByText('CH'));
    expect(screen.getByRole('button', { name: /Edit Profile/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Edit Organization/i })).toBeInTheDocument();
  });

  it('renders Logout button with tooltip', async () => {
    renderWithTheme(<AvatarMenu user={mockUser} />);
    await userEvent.click(screen.getByText('CH'));
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
  });

  it('renders legal links (Data Privacy Statement and Imprint)', async () => {
    renderWithTheme(<AvatarMenu user={mockUser} />);
    await userEvent.click(screen.getByText('CH'));
    expect(screen.getByText('Data Privacy Statement')).toBeInTheDocument();
    expect(screen.getByText('Imprint')).toBeInTheDocument();
  });
});
