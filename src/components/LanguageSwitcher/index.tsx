
import { MenuItem, Select, Box } from '@mui/material';

import { useLanguageSwitcher } from '../../hooks/useLanguageSwitcher'
import styled from '@emotion/styled';

const StyledBox = styled(Box)`
  background-color: #FF69B4;
  border-radius: 16px;
  padding: 4px;
  display: flex;
  align-items: center;

`;

const StyledSelect = styled(Select)`
  & .MuiSelect-select {
    padding: 5px 8px;
    border-radius: 12px;
    background-color: #FFC0CB;
    font-weight: 500;

  }
  & fieldset {
    border: none;
  }
`;

const StyledMenuItem = styled(MenuItem)`
  &.Mui-selected {
     background-color: #FF69B4;
  }
  &:hover {
    background-color: #FF69B4;
  }

`;

const LanguageSwitcher = () => {

  const { currentLanguage, changeLanguage, defaultLanguages } = useLanguageSwitcher();
  

  return (
    <StyledBox>
      <StyledSelect
        value={currentLanguage}
        onChange={(event) => changeLanguage(event.target.value as string) }
        variant="outlined"
        disableUnderline
        MenuProps={{
          PaperProps: {
            sx: {
              backgroundColor: ' #FFC0CB',
            },
          },
        }}
      >
        {defaultLanguages.map((lang) => (
          <StyledMenuItem key={lang} value={lang}>
            {lang.toUpperCase()}
          </StyledMenuItem>
        ))}
      </StyledSelect>
    </StyledBox>
  )
}

export default LanguageSwitcher