import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    allowedDevOrigins: ["localhost:3000", "172.30.1.100"],
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*.supabase.co', // 에러에 표시된 본인의 Supabase Hostname
                port: '',
                pathname: '/storage/v1/object/public/**', // Storage Public 파일 경로 허용
            },
        ],
    },
};

export default nextConfig;
