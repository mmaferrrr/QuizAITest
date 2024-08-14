import React from "react";
import "../pages/Home.css";
import { FaBoltLightning } from "react-icons/fa6";
import { BsCashStack } from "react-icons/bs";
import { FaUser } from "react-icons/fa";

const Home = () => {
  return (
    <div className="home-container"><img src='images/Lrnr-logo.png' alt="Website Logo"
        className="heroimg"
      />
      <h2 className="herotxt">
        Your guided path to programming enlightenment
      </h2>
      <button className="hero-btn">Begin journey</button>
      <div className="card-container">
        <div className="card">
        <FaBoltLightning className="icon"/>
          <p className="card-title">Personalized Quizzes</p>
          <p className="card-text">
            Greetings, young padawan. Are you ready to embark on a journey of
            personalized enlightenment through the art of coding? Our app, can
            create custom quizzes that align with your coding skills and
            interests. Whether you are a novice or a master, our system can
            generate questions that will test your proficiency in programming
            languages, tools, and concepts.
          </p>
        </div>
        <div className="card">
        <BsCashStack className="icon"/>
          <p className="card-title">Rewarding</p>
          <p className="card-text">
            Our app is designed to be both challenging and rewarding, so you can
            learn new concepts while enjoying the process. With our personalized
            quiz app, you can track your progress, compete with your peers, and
            discover new areas of expertise. The journey of a thousand lines of
            code begins with a single keystroke.
          </p>
        </div>
        <div className="card">
        <FaUser className="icon"/>
          <p className="card-title">Personal SME</p>
          <p className="card-text">
            Welcome to the path of knowledge. Our app is like having a personal
            subject matter expert at your side, guiding you on your journey
            towards wisdom.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;