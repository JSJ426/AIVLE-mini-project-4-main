/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  // S3 정적 호스팅(out 폴더 생성)용
  output: 'export',
  images: { unoptimized: true },

  // ✅ 이 줄 켜기
  trailingSlash: true,
};

export default nextConfig;
