import { MenuItem, Select, Box, Grow, useTheme } from '@mui/material';
import { useLanguageSwitcher } from '../../hooks/useLanguageSwitcher';
import { styled } from '@mui/material/styles';

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.tokens.color.primary,
  borderRadius: 16,
  padding: '4px 0',
  display: 'flex',
  alignItems: 'center',
  height: 40,
}));

const StyledSelect = styled(Select)`
  ${({ theme }) => `
    & .MuiSelect-select {
      padding: 4px 10px;
      border-radius: 12px;
      background-color: transparent;
      color: ${theme.tokens.color.lighten6};
      font-weight: 600;
      text-align: center;
    }

    & fieldset {
      border: none;
    }
    svg {
      color: ${theme.tokens.color.lighten6};
    }
  `}
`;

const StyledMenuItem = styled(MenuItem)`
  ${({ theme }) => `
    color: ${theme.tokens.color.lighten6};

    &.Mui-selected {
      background-color: ${theme.tokens.color.lighten3};
    }

    &:hover {
      background-color: ${theme.tokens.color.lighten3};
    }

    font-weight: 500;
    text-align: center;
  `}
`;

const LanguageSwitcher = () => {
  const { currentLanguage, changeLanguage, defaultLanguages } = useLanguageSwitcher();
  const theme = useTheme();

  return (
    <StyledBox>
      <StyledSelect
        data-testid="language-switcher"
        value={currentLanguage}
        onChange={event => {
          if (event.target.value !== currentLanguage) {
            changeLanguage(event.target.value as string);
          }
        }}
        variant="outlined"
        MenuProps={{
          TransitionComponent: Grow,
          PaperProps: {
            sx: {
              backgroundColor: theme.tokens.color.primary,
            },
          },
        }}
      >
        {defaultLanguages.map(lang => (
          <StyledMenuItem key={lang} value={lang}>
            {lang.toUpperCase()}
          </StyledMenuItem>
        ))}
      </StyledSelect>
    </StyledBox>
  );
};

export default LanguageSwitcher;
