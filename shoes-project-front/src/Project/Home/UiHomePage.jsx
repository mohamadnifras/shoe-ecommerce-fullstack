import React, { useContext } from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import HomePage from "./HomePage";
import LastPage from "./LastPage";
import { productContext } from "./ProductContext";

function UiHomePage() {
  const { search } = useContext(productContext);
  return (
    <div>
      <Navbar />
      {search ? (
        <>
          <HomePage />
          <HeroSection />
        </>
      ) : (
        <>
          <HeroSection />
          <HomePage />
        </>
      )}

      <LastPage />
    </div>
  );
}

export default UiHomePage;
