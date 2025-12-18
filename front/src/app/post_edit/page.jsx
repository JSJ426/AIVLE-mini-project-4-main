import { Suspense } from "react";
import PostEditClient from "./PostEditClient";

export default function Page() {
  return (
    <Suspense fallback={<div style={{ padding: 16 }}>Loading...</div>}>
      <PostEditClient />
    </Suspense>
  );
}
