import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Banner from "../components/Banner/Banner";
import ErrorFallback from "../components/ErrorBoundary";
import { CryptoState } from "../CryptoContext";
// import CoinsTable from "../components/CoinsTable";
const CoinsTable = React.lazy(() => import("../components/CoinsTable"));
const AdditionLink = React.lazy(() => import("../components/AdditionLink"));

const Homepage = () => {
  const { loading } = CryptoState();

  return (
    <div>
      <Banner />
      <AdditionLink/>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => {
          // reset the state of your app so the error doesn't happen again
          console.log(loading);
        }}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <CoinsTable />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default Homepage;
