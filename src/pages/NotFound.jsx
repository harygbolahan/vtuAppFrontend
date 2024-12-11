import  { useEffect, useState } from 'react';
import {Button } from '../components/ui/button'
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);



  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#111827',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      overflow: 'hidden',
      position: 'relative'
    }}>
      <div
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'rgba(139, 92, 246, 0.5)',
          filter: 'blur(100px)',
          transition: 'all 0.2s ease-out',
          transform: `translate(${mousePosition.x - 250}px, ${mousePosition.y - 250}px)`,
        }}
      />
      <div style={{ zIndex: 10, textAlign: 'center' }}>
        <h1 style={{
          fontSize: '9rem',
          fontWeight: 'bold',
          marginBottom: '1rem',
          animation: 'fadeInDown 0.5s ease-out'
        }}>
          404
        </h1>
        <p style={{
          fontSize: '1.5rem',
          marginBottom: '2rem',
          animation: 'fadeInUp 0.5s ease-out 0.2s both'
        }}>
          Oops! Looks like you&apos;ve ventured into unknown space.
        </p>
        <Link to='./dashboard'>
        <Button 
          
          style={{
            backgroundColor: 'white',
            color: '#111827',
            padding: '0.75rem 1.5rem',
            borderRadius: '9999px',
            fontWeight: 600,
            textDecoration: 'none',
            transition: 'background-color 0.3s',
            animation: 'fadeIn 0.5s ease-out 0.4s both'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e5e7eb'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
        >
          Return to Earth
        </Button></Link>
      </div>
      <div style={{
        position: 'absolute',
        bottom: '2.5rem',
        right: '2.5rem',
        animation: 'float 5s ease-in-out infinite'
      }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100"
          height="100"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
          <path d="M21 3v5h-5" />
          <path d="M22 21h-5" />
          <path d="M15 17.89V21" />
          <path d="M8 14.89V21" />
          <path d="M3 16h7" />
          <path d="M5 10h5" />
        </svg>
      </div>
      <style>
        {`
          @keyframes fadeInDown {
            from {
              opacity: 0;
              transform: translateY(-50px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(50px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          @keyframes float {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-20px);
            }
          }
        `}
      </style>
    </div>
  );
};

export default NotFoundPage;

