/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  // S3 정적 호스팅(out 폴더 생성)용
  output: 'export',
  images: { unoptimized: true },

  // (선택) 정적 호스팅에서 경로 문제 줄이고 싶으면 켜도 됨
  // trailingSlash: true,
};

export default nextConfig;
