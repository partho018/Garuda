"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import './not-found.css';
import Navigation from '../components/Navigation';

export default function NotFound() {
  useEffect(() => {
    // Add class to body to completely prevent scrolling
    document.body.classList.add('not-found-body');
    
    return () => {
      // Remove when unmounting
      document.body.classList.remove('not-found-body');
    };
  }, []);

  return (
    <>
      <Navigation />
      
      <div className="not-found-container">
        <div className="not-found-content-wrapper">
          <h1 className="not-found-glitch">404</h1>
          <h2 className="not-found-title">Page Not Found</h2>
          <p className="not-found-desc">
            Oops! The page you are looking for does not exist or has been moved.
          </p>
          
          <Link href="/" className="nf-purple-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </>
  );
}
