import { MenuItem, Select, Box, Grow, useTheme } from "@mui/material";
import { useLanguageSwitcher } from "../../hooks/useLanguageSwitcher";
import styled from "@emotion/styled";

const StyledBox = styled(Box)<{ bgColor: string }>`
  background-color: ${(props) => props.bgColor};
  border-radius: 16px;
  padding: 4px 5px;
  display: flex;
  align-items: center;
`;

const StyledSelect = styled(Select)<{ selectBg: string; textColor: string }>`
  & .MuiSelect-select {
    padding: 4px 10px;
    border-radius: 12px;
    background-color: ${(props) => props.selectBg};
    color: ${(props) => props.textColor};
    font-weight: 600;
    min-width: 22px;
    text-align: center;
  }

  & fieldset {
    border: none;
  }

  svg {
    color: ${(props) => props.textColor};
  }
`;

const StyledMenuItem = styled(MenuItem)<{ textColor: string; hoverBg: string }>`
  color: ${(props) => props.textColor};

  &.Mui-selected {
    background-color: ${(props) => props.hoverBg};
  }

  &:hover {
    background-color: ${(props) => props.hoverBg};
  }

  font-weight: 500;
  text-align: center;
`;

const LanguageSwitcher = () => {
  const { currentLanguage, changeLanguage, defaultLanguages } =
    useLanguageSwitcher();
  const theme = useTheme();
  const switcherBackground = theme.tokens.color.primary;
  const menuItemHover = theme.tokens.color.lighten3;
  const textColor = theme.tokens.color.lighten6;

  return (
    <StyledBox bgColor={switcherBackground}>
      <StyledSelect
        value={currentLanguage}
        onChange={(event) => {
          if (event.target.value !== currentLanguage) {
            changeLanguage(event.target.value as string);
          }
        }}
        variant="outlined"
        selectBg="transparent"
        textColor={textColor}
        MenuProps={{
          TransitionComponent: Grow,
          PaperProps: {
            sx: {
              backgroundColor: switcherBackground,
            },
          },
        }}
      >
        {defaultLanguages.map((lang) => (
          <StyledMenuItem
            key={lang}
            value={lang}
            textColor={textColor}
            hoverBg={menuItemHover}
          >
            {lang.toUpperCase()}
          </StyledMenuItem>
        ))}
      </StyledSelect>
    </StyledBox>
  );
};

export default LanguageSwitcher;
