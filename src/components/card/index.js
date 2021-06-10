import React, { createContext, useContext, useState } from "react";
import {
  Container,
  Item,
  Title,
  SubTitle,
  Image,
  Content,
  Entities,
  Feature,
  FeatureClose,
  FeatureText,
  FeatureTitle,
  Group,
  Maturity,
  Meta,
  Text,
} from "./styles/card";

export const FeatureContext = createContext();

export default function Card({ children, ...rest }) {
  const [showFeature, setShowFeature] = useState(false);
  const [itemFeature, setItemFeature] = useState({});

  return (
    <FeatureContext.Provider
      value={{ showFeature, setShowFeature, itemFeature, setItemFeature }}
    >
      <Container {...rest}>{children}</Container>
    </FeatureContext.Provider>
  );
}

Card.Title = function CardTitle({ children, ...rest }) {
  return <Title {...rest}>{children}</Title>;
};

Card.Group = function CardGroup({ children, ...rest }) {
  return <Group {...rest}>{children}</Group>;
};

Card.SubTitle = function CardSubTitle({ children, ...rest }) {
  return <SubTitle {...rest}>{children}</SubTitle>;
};

Card.Text = function CardText({ children, ...rest }) {
  return <Text {...rest}>{children}</Text>;
};

Card.Meta = function CardMeta({ children, ...rest }) {
  return <Meta {...rest}>{children}</Meta>;
};

Card.Item = function CardItem({ item, children, ...rest }) {
  const { setShowFeature, setItemFeature } = useContext(FeatureContext);

  return (
    <Item
      {...rest}
      onClick={() => {
        setItemFeature(item);
        setShowFeature(true);
      }}
    >
      {children}
    </Item>
  );
};

Card.Image = function CardImage({ ...rest }) {
  return <Image {...rest} />;
};

Card.Entities = function CardEntities({ children, ...rest }) {
  return <Entities {...rest}>{children}</Entities>;
};

Card.Feature = function CardFeature({ children, category, ...rest }) {
  const { showFeature, itemFeature, setShowFeature } =
    useContext(FeatureContext);

  return showFeature ? (
    <Feature
      {...rest}
      src={`/images/${category}/${itemFeature.genre}/${itemFeature.slug}/large.jpg`}
    >
      <Content>
        <FeatureTitle>{itemFeature.title}</FeatureTitle>
        <FeatureText>{itemFeature.description}</FeatureText>
        <FeatureClose onClick={() => setShowFeature(false)}>
          <img src="/images/icons/close.png" alt="close" />
        </FeatureClose>
        <Group margin="30px 0" flexDirection="row" alignItems="center">
          <Maturity rating={itemFeature.maturity}>
            {itemFeature.maturity < 12 ? "PG" : itemFeature.maturity}
          </Maturity>
          <FeatureText fontWeight="bold">
            {itemFeature.genre.charAt(0).toUpperCase() +
              itemFeature.genre.slice(1)}
          </FeatureText>
        </Group>
        {children}
      </Content>
    </Feature>
  ) : null;
};
