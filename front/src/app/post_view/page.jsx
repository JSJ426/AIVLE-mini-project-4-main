import { Suspense } from "react";
import PostViewClient from "./PostViewClient";

export default function Page() {
  return (
    <Suspense fallback={<div style={{ padding: 16 }}>Loading...</div>}>
      <PostViewClient />
    </Suspense>
  );
}
