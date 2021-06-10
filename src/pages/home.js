import React from "react";
import { FaqsContainer } from "../containers/faqsContainer";
import { FooterContainer } from "../containers/footerContainer";
import { JumbotronContainer } from "../containers/jumbotronContainer";
import { HeaderContainer } from "../containers/headerContainer";
import OptForm from "../components/opt-form/index";
import Feature from "../components/feature/index";

export default function Home() {
  return (
    <>
      <HeaderContainer>
        <Feature>
          <Feature.Title>
            Unlimited films, TV programmes and more.
          </Feature.Title>
          <Feature.SubTitle>
            Watch anywhere. Cancel at any time.
          </Feature.SubTitle>

          <OptForm>
            <OptForm.Input placeholder="Email address" />
            <OptForm.Button>Try it now</OptForm.Button>
            <OptForm.Break />
            <OptForm.text>
              Enter your email to create or restart your membership
            </OptForm.text>
          </OptForm>
        </Feature>
      </HeaderContainer>
      <JumbotronContainer />
      <FaqsContainer />
      <FooterContainer />
    </>
  );
}
