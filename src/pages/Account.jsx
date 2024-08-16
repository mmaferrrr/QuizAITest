import React from 'react';
import './AccountPage.css';
import { HiMiniFire } from "react-icons/hi2";
import { MdViewList } from "react-icons/md";
import { FaUser } from "react-icons/fa";

function AccountPage() {
  return (
    <main>
    <h1>Account</h1>
    <div className='account-container'>
      <div className="info-box">
        <HiMiniFire className='icon' />
        <h2>Streak</h2>
        <p>You have a streak of 5 days!</p>
      </div> 
      
      <div className="info-box">
        <MdViewList className='icon' />
        <h2>Platinum Quizzes</h2>
        <ul>
          <li>golang - intermediate</li>
          <li>Javascript - beginner</li>
          <li>AWS - beginner</li>
        </ul>
      </div>
      
      <div className="info-box">
        <FaUser className='icon' />
        <h2>lrnr Level: 2</h2>
        <p>150/200 xp</p>
      </div>
    </div>
  </main>
  );
}

export default AccountPage;
