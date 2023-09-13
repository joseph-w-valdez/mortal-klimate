/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['cdn.weatherapi.com']
        // remotePatterns: [
        //     {
        //         protocol: 'https',
        //         hostname: ''
        //     }
        // ]
    }
}

module.exports = nextConfig
