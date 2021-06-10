import React from "react";
import { Container, Item, Picture, List, Name, Title } from "./styles/profiles";

export default function Profiles({ children, ...rest }) {
  return <Container {...rest}>{children}</Container>;
}

Profiles.Title = function ProfilesTitle({ children, ...rest }) {
  return <Title {...rest}>{children}</Title>;
};

Profiles.List = function ProfilesList({ children, ...rest }) {
  return <List {...rest}>{children}</List>;
};

Profiles.User = function ProfilesUser({ children, ...rest }) {
  return <Item {...rest}>{children}</Item>;
};

Profiles.Picture = function ProfilesPicture({ src, ...rest }) {
  return (
    <Picture
      {...rest}
      src={src ? `/images/users/${src}.png` : "/images/misc/loading.gif"}
    />
  );
};

Profiles.Name = function ProfilesName({ children, ...rest }) {
  return <Name {...rest}>{children}</Name>;
};
