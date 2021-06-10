import React, { createContext, useContext, useState } from "react";
import {
  Container,
  Logo,
  Button,
  Background,
  Feature,
  Text,
  FeatureCall,
  Link,
  Group,
  Picture,
  Profile,
  Dropdown,
  Search,
  SearchIcon,
  SearchInput,
  PlayButton,
} from "./styles/header";
import { Link as ReactRouterLink } from "react-router-dom";

const FocusContext = createContext();

export default function Header({ bg = true, children, ...restProps }) {
  const [active, setActive] = useState(false);
  return (
    <FocusContext.Provider value={{ active, setActive }}>
      {bg ? (
        <Background
          {...restProps}
          onClick={() => (active ? setActive(false) : null)}
        >
          {children}
        </Background>
      ) : (
        children
      )}
    </FocusContext.Provider>
  );
}

Header.Frame = function HeaderFrame({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
};

Header.Group = function HeaderGroup({ children, ...restProps }) {
  return <Group {...restProps}>{children}</Group>;
};

Header.Logo = function HeaderLogo({ to, ...restProps }) {
  return (
    <ReactRouterLink to={to}>
      <Logo {...restProps} />
    </ReactRouterLink>
  );
};

Header.Button = function HeaderButton({ children, ...restProps }) {
  return <Button {...restProps}>{children}</Button>;
};

Header.Feature = function HeaderFeature({ children, ...rest }) {
  return <Feature {...rest}>{children}</Feature>;
};

Header.Text = function HeaderText({ children, ...rest }) {
  return <Text {...rest}>{children}</Text>;
};

Header.TextLink = function HeaderTextLink({ children, ...rest }) {
  return <Link {...rest}>{children}</Link>;
};

Header.FeatureCall = function HeaderFeatureCall({ children, ...rest }) {
  return <FeatureCall {...rest}>{children}</FeatureCall>;
};

Header.Picture = function HeaderPicture({ src, ...rest }) {
  return <Picture {...rest} src={`/images/users/${src}.png`} />;
};

Header.DropDown = function HeaderDropDown({ children, ...rest }) {
  return <Dropdown {...rest}>{children}</Dropdown>;
};

Header.Profile = function HeaderProfile({ children, ...rest }) {
  return <Profile {...rest}>{children}</Profile>;
};

Header.Search = function HeaderSearch({ searchTerm, setSearchTerm, ...rest }) {
  // const [active, setActive] = useState(false);
  const { active, setActive } = useContext(FocusContext);

  return (
    <Search {...rest}>
      <SearchIcon onClick={() => setActive((active) => !active)}>
        <img src="/images/icons/search.png" alt="Search" />
      </SearchIcon>
      <SearchInput
        value={searchTerm}
        onChange={({ target }) => setSearchTerm(target.value)}
        placeholder="Titles, people, genres"
        active={active}
        onClick={() => setActive(true)}
      />
    </Search>
  );
};

Header.PlayButton = function HeaderPlayButton({ children, ...rest }) {
  return <PlayButton {...rest}>{children}</PlayButton>;
};
