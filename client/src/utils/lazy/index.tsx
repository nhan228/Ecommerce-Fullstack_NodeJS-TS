import { lazy, Suspense } from "react";
import BackHome from './components/BackHome'
import Loading from "./components/Loading";
const lazyFn = (importFn, access = true) => {
  if(!access) {
    return () => (
        <BackHome/>
    )
  }
  const LazyComponent = lazy(importFn)
  return () => (
    <Suspense fallback={<Loading/>}>
      <LazyComponent />
    </Suspense>
  );
};

export default {
    lazyFn
}