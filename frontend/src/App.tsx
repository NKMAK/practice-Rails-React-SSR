import { lazy, Suspense } from "react";

import Fallback from "./components/Fallback";

const Dataloader = lazy(() => import("./components/DataLoader"));

export default function App() {  
  return (
    <>
      <h1>App Component</h1>
      <Suspense fallback={<Fallback />}>
        <Dataloader />
      </Suspense>
    </>
  );
}
