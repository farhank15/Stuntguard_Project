import React from "react";
import "aos/dist/aos.css";
import Teams from "../../components/Team/Allteams";
import Hero from "../../components/hero/Hero";
import QnA from "../../components/QnA/QnA";
import ContentHome from "../../components/content/Contenthome";

const Index = () => {
  return (
    <div>
      <Hero />
      <ContentHome />
      <Teams />
      <QnA />
    </div>
  );
};

export default Index;
