import React, { useContext, useEffect, useState } from "react";
import { SelectProfileContainer } from "./profilesContainer";
import { FirebaseContext } from "../context/firebase";
import useAuth from "../hooks/useAuth";
import Loading from "../components/loading";
import Header from "../components/header";
import * as ROUTES from "../constants/routes";
import Logo from "../logo.svg";
import { useHistory } from "react-router";
import Card from "../components/card";
import { FooterContainer } from "./footerContainer";

export function BrowseContainer({ slides }) {
  const [category, setCategory] = useState("series");
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [slideRows, setSlideRows] = useState([]);

  const { firebase } = useContext(FirebaseContext);
  const user = firebase.auth().currentUser || {};
  //   const user = useAuth();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [profile.displayName]);

  useEffect(() => {
    setSlideRows(slides[category]);
  }, [slides, category]);

  /***  Logout ***/

  const history = useHistory();

  const handleLogOut = (e) => {
    e.preventDefault();

    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("signed out");
        history.push(ROUTES.HOME);
      })
      .catch((error) => {
        console.error("❌❌❌", error.message);
      });
  };
  //   console.log(slides);
  return profile.displayName ? ( // if there is a selected profile return
    <>
      {loading ? <Loading src={user.photoURL} /> : <Loading.ReleaseBody />}
      <Header src="joker1" dontShowOnSmallViewPort>
        <Header.Frame>
          <Header.Group>
            <Header.Logo to={ROUTES.HOME} src={Logo} alt="Netflix" />
            <Header.TextLink
              active={category === "series" ? "true" : "false"}
              onClick={() => setCategory("series")}
            >
              TV Shows
            </Header.TextLink>
            <Header.TextLink
              active={category === "films" ? "true" : "false"}
              onClick={() => setCategory("films")}
            >
              Films
            </Header.TextLink>
          </Header.Group>
          <Header.Group>
            <Header.Search
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
            <Header.Profile>
              <Header.Picture src={user.photoURL} />
              <Header.DropDown>
                <Header.Group>
                  <Header.Picture src={user.photoURL} />
                  <Header.TextLink>{user.displayName}</Header.TextLink>
                </Header.Group>
                <Header.Group>
                  <Header.TextLink onClick={handleLogOut}>
                    Sign out
                  </Header.TextLink>
                </Header.Group>
              </Header.DropDown>
            </Header.Profile>
          </Header.Group>
        </Header.Frame>

        <Header.Feature>
          <Header.FeatureCall>Watch Joker Now</Header.FeatureCall>
          <Header.Text>
            Forever alone in a crowd, failed comedian Arthur Fleck seeks
            connection as he walks the streets of Gotham City. Juaquin Phoenix
            gives an Oscar worthy performance.
          </Header.Text>
          <Header.PlayButton>Play</Header.PlayButton>
        </Header.Feature>
      </Header>

      <Card.Group>
        {slideRows.map((item) => (
          <Card key={`${category}-${item.title.toLowerCase()}`}>
            <Card.Title>{item.title}</Card.Title>
            <Card.Entities>
              {item.data.map((i) => (
                <Card.Item key={i.docId} item={i}>
                  <Card.Image
                    src={`/images/${category}/${i.genre}/${i.slug}/small.jpg`}
                  />
                  <Card.Meta>
                    <Card.SubTitle>{i.title}</Card.SubTitle>
                    <Card.Text>{i.description}</Card.Text>
                  </Card.Meta>
                </Card.Item>
              ))}
            </Card.Entities>
            <Card.Feature category={category}>
              {/* <Player>
                    <Player.Button />
                    <Player.Video src="/videos/bunny.mp4" />
                </Player> */}
              <p>Honey bunny</p>
            </Card.Feature>
          </Card>
        ))}
      </Card.Group>
      <FooterContainer />
    </>
  ) : (
    // if there isn't a selected profile return
    <SelectProfileContainer user={user} setProfile={setProfile} />
  );
}
