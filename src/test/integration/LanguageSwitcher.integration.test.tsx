import i18n from '../../i18n';
import { screen, fireEvent } from '@testing-library/react';
import AppHeader from '../../components/AppHeader';

import { I18nextProvider, useTranslation } from 'react-i18next';
import { renderWithTheme } from '../utils';

describe('LanguageSwitcher Integration Test', () => {
  function WrappedAppHeader() {
    const { t } = useTranslation();
    return <AppHeader user={{}} pageTitle={t('home.welcome')} />;
  }

  it('renders header and switches to German', async () => {
    renderWithTheme(
      <I18nextProvider i18n={i18n}>
        <WrappedAppHeader />
      </I18nextProvider>,
    );
    expect(screen.getByText('SUPPLIER OS APPLICATION')).toBeInTheDocument();
    expect(screen.getByText('WELCOME!')).toBeInTheDocument();
    fireEvent.mouseDown(screen.getByRole('button'));
    fireEvent.click(screen.getByRole('option', { name: 'DE' }));

    expect(screen.getByText('SUPPLIER OS ANWENDUNG')).toBeInTheDocument();
    expect(screen.getByText('WILLKOMMEN!')).toBeInTheDocument();
  });
});
