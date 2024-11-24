import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className="py-4 mt-4 mb-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-sm">
          &copy; {new Date().getFullYear()} Reantia. All rights reserved.
        </div>
        <div className="text-sm">
          <Link href={'https://mydevify.com'}> Made with ❤️</Link> 
        </div>
      </div>
    </footer>

    
  );
};

export default Footer;