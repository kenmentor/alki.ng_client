/** @format */

import React, { useEffect, useState } from "react";
import "./greeting.css";
import "../costom_styles/animation.css";

interface MapProps {
  total: string;
}

const Greeting: React.FC<MapProps> = ({ total }) => {
  const [message, setMessage] = useState("");
  const [displayMessage, setDisplayMessage] = useState("");
  const [index, setIndex] = useState(0);

  const messages = [
    `Discover ${total} new job openings near you!`,
    "Your dream job is just a click away!",
    "Find the perfect job around you today!",
    "Alki.ng—your next career move starts here!",
    "Stop searching, start applying—opportunities await!",
    "Jobs that fit your hustle, right where you are!",
    "Don't wait! Start your job search locally now!",
    "Your career journey begins here—don't miss out!",
    "Stay ahead—explore job listings tailored for you!",
    "Big opportunities, small distances. Get started now!",

  "You're among the first to explore amazing job opportunities!",
  "Find your hustle and make it thrive with our tailored job listings!",
  "Welcome to Alki.ng, where your career journey begins!",
  "Opportunities are knocking! Open the door to your next big break!",
  "Don't wait for luck—seize your dream job with us today!",
  "Ready to level up? Your next job is just a click away!",
  "Find local jobs that match your hustle today!",
  "Dream big, work smart—start here!",
  "Your breakthrough job is waiting around the corner!",
  "Step into success—apply now for jobs near you!",
  "Secure your future, one job at a time!",
  "Looking for a better fit? Find jobs that suit you perfectly!",
  "Achieve your goals with the right job for you!",
  "Explore top job listings without leaving your state!",
  "Stay ahead, stay sharp—new job openings daily!"


  ];

  useEffect(() => {
    const typeMessage = (message: string, index: number) => {
      if (index < message.length) {
        setDisplayMessage((prev) => prev + message.charAt(index));
        setTimeout(() => typeMessage(message, index + 1), 50); // Typing speed
      }
    };

    const showNextMessage = () => {
      const randomMessage =
        messages[Math.floor(Math.random() * messages.length)];
      setDisplayMessage("");
      typeMessage(randomMessage, 0);
    };

    const intervalId = setInterval(() => {
      showNextMessage();
    }, 24000); // Change message every 6 seconds

    // Set initial message
    showNextMessage();

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="greeting_space">
      <div className="greeting_cont slide-up">
      <div className="greeting">
        <div className="text">
          <h1>{displayMessage}</h1>
        </div>
        <div className="greeting_sub_text">Connect with Opportunities</div>
      </div>
    </div>
    </div>
  );
};

export default Greeting;
