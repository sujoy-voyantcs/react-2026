import { Container } from "react-bootstrap";
import reactLogo from "../assets/react.svg";
import viteLogo from "../assets/vite.svg";
import heroImg from "../assets/hero.png";
import { useState } from "react";
function Home(){
    return(
        <Container>
          <section id="center" className="pt-4">
            <div className="hero">
              <img src={heroImg} className="base" width="170" height="179" alt="" />
              <img src={reactLogo} className="framework" alt="React logo" />
              <img src={viteLogo} className="vite" alt="Vite logo" />
            </div>
            <div>
              <h2>Get started Project</h2>
              <p>
                Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
              </p>
            </div>
          </section>
        </Container>
    );
}
export default Home;