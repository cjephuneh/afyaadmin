import { NextConfig } from 'next';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove 'serverside' as it's not a valid Next.js config option
  output: 'export',
  
  // Disable server-side features for static export
  images: {
    unoptimized: true
  }
};


module.exports = nextConfig;