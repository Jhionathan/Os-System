/** @type {import('next').NextConfig} */
export default {
    async rewrites() {
        return [
            {
                source: '/api/:path*', 
                destination: 'http://192.168.7.246:80/api/:path*', 
            },
        ];
    },
};