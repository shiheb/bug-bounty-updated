import { MenuItem, Select, Box, Grow } from "@mui/material";
import { useLanguageSwitcher } from "../../hooks/useLanguageSwitcher";
import styled from "@emotion/styled";

const StyledBox = styled(Box)`
  background-color: #ff69b4;
  border-radius: 16px;
  padding: 5px;
  display: flex;
  align-items: center;
`;

const StyledSelect = styled(Select)`
  & .MuiSelect-select {
    padding: 5px;
    border-radius: 16px;
    background-color: #ffc0cb;
    font-weight: 500;
  }
  & fieldset {
    border: none;
  }
`;

const StyledMenuItem = styled(MenuItem)`
  &.Mui-selected {
    background-color: #ff69b4;
  }
  &:hover {
    background-color: #ff69b4;
  }
`;

const LanguageSwitcher = () => {
  const { currentLanguage, changeLanguage, defaultLanguages } =
    useLanguageSwitcher();

  return (
    <StyledBox>
      <StyledSelect
        value={currentLanguage}
        onChange={(event) => {
          if (event.target.value !== currentLanguage) {
            changeLanguage(event.target.value as string);
          }
        }}
        variant="outlined"
        MenuProps={{
          TransitionComponent: Grow,
          PaperProps: {
            sx: {
              backgroundColor: "#FFC0CB",
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
  );
};

export default LanguageSwitcher;
