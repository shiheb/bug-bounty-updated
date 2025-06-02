import React from 'react';

import { screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import i18n from '../../i18n';
import AppHeader from '../../components/AppHeader';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { renderWithTheme } from '../utils';

jest.mock('@mui/material/useMediaQuery', () => jest.fn().mockReturnValue(true));

describe('LanguageSwitcher Integration Test', () => {
  function WrappedAppHeader() {
    const { t } = useTranslation();
    return <AppHeader user={{}} pageTitle={t('home.welcome')} />;
  }

  it('renders header and switches to German', async () => {
    const user = userEvent.setup();

    await act(async () => {
      renderWithTheme(
        <I18nextProvider i18n={i18n}>
          <WrappedAppHeader />
        </I18nextProvider>,
      );
    });

    expect(screen.getByText('SUPPLIER OS APPLICATION')).toBeInTheDocument();
    expect(screen.getByText('WELCOME!')).toBeInTheDocument();

    const button = screen.getByText('EN');
    await act(async () => {
      await user.click(button);
    });
    const deOption = await waitFor(() => screen.getByRole('option', { name: 'DE' }));
    await act(async () => {
      await user.click(deOption);
    });

    await waitFor(() => {
      expect(screen.getByText('SUPPLIER OS ANWENDUNG')).toBeInTheDocument();
      expect(screen.getByText('WILLKOMMEN!')).toBeInTheDocument();
    });
  });
});
