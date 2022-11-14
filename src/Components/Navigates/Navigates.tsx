import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const WarehouseScreenLazyLayout = React.lazy(
  () => import("../Warehouse/WarehouseScreen")
);
const ClientScreenLazyLayout = React.lazy(
  () => import("../Warehouse/ClientScreen")
);
const CreateClientScreenLazyLayout = React.lazy(
  () => import("../Warehouse/CreateClientScreen")
);
const ClientViewScreenLazyLayout = React.lazy(
  () => import("../Warehouse/ClientViewScreen")
);
const InventoryIndexScreenLazyLayout = React.lazy(
  () => import("../Storage/InventoryIndexScreen")
);
const PackagingMaterialLazyLayout = React.lazy(
  () => import("../Storage/PackagingMaterial")
);
const OrderProcessingB2CLazyLayout = React.lazy(
  () => import("../OrderProcessing/B2CD2CIndexScreen")
);
const OrderProcessingKittingLazyLayout = React.lazy(
  () => import("../OrderProcessing/KittingScreen")
);
const OrderProcessingB2BLazyLayout = React.lazy(
  () => import("../OrderProcessing/B2BIndexScreen")
);
const FreeStorageLazyLayout = React.lazy(() => import('../Storage/FreeStorageScreen'));
const InwardLazyLayout = React.lazy(() => import('../Inward/InwardIndexScreen'));
const RTOLazyLayout = React.lazy(() => import('../RTO/RtoIndexScreen'));
const CustomQcLazyLayout = React.lazy(() => import('../CustomQc/CustomQc'));


const InwardStickeringLazyLayout = React.lazy(() => import('../InwardStickering/InwardStickering'));
const StickeringLazyLayout = React.lazy(() => import('../Stickering/StickeringScreen'));
const LoadingLazyLayout = React.lazy(() => import('../Loading/LoadingScreen'));
const UnLoadingLazyLayout = React.lazy(() => import('../Loading/UnLoadingScreen'));
const PackagingLazyLayout = React.lazy(() => import('../Packaging/PackagingScreen'));
const OtherChargesLazyLayout = React.lazy(() => import('../OtherCharges/OtherCharges'));
const RTOB2BLazyLayout = React.lazy(() => import('../RTO/RtoB2BIndexScreen'));
const RTOExemptionLazyLayout = React.lazy(() => import('../RTO/RtoExemptionScreen'));
const ReturnLazyLayout = React.lazy(() => import('../Return/B2CD2CIndexScreen'));
const ReturnB2BLazyLayout = React.lazy(() => import('../Return/B2BIndexScreen'));





const OrderProcessingRTVSTNLazyLayout = React.lazy(
  () => import("../OrderProcessing/RTVSTNIndexScreen")
);

const OrderProcessingInternalStockTransferLazyLayout = React.lazy(
  () => import("../OrderProcessing/ISTIndexScreen")
);


function Navigates() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/warehouse"
          element={
            <Suspense fallback="Loading...">
              <WarehouseScreenLazyLayout />
            </Suspense>
          }
        />
        <Route
          path="/Client"
          element={
            <Suspense fallback="Loading...">
              <ClientScreenLazyLayout />
            </Suspense>
          }
        />
         <Route
          path="/create-client"
          element={
            <Suspense fallback="Loading...">
              <CreateClientScreenLazyLayout />
            </Suspense>
          }
        />
         <Route
          path="/view-client"
          element={
            <Suspense fallback="Loading...">
              < ClientViewScreenLazyLayout  />
            </Suspense>
          }
        />


        
        <Route
          path="/inventory"
          element={
            <Suspense fallback="Loading...">
              <InventoryIndexScreenLazyLayout />
            </Suspense>
          }
        />
        <Route
          path="/packaging-material"
          element={
            <Suspense fallback="Loading...">
              <PackagingMaterialLazyLayout />
            </Suspense>
          }
        />
        <Route
          path="/order-processing"
          element={
            <Suspense fallback="Loading...">
              <OrderProcessingB2CLazyLayout />
            </Suspense>
          }
        />
        <Route
          path="/kitting"
          element={
            <Suspense fallback="Loading...">
              <OrderProcessingKittingLazyLayout />
            </Suspense>
          }
        />
        <Route
          path="/b2b"
          element={
            <Suspense fallback="Loading...">
              <OrderProcessingB2BLazyLayout />
            </Suspense>
          }
        />
        <Route path="/free-storage" element={
          <Suspense fallback="Loading...">
            <FreeStorageLazyLayout/>
          </Suspense>
        }/>
        <Route path="/inward" element={
          <Suspense fallback="Loading...">
            <InwardLazyLayout/>
          </Suspense>
        }/>
        <Route path="/rto-b2cd2c" element={
          <Suspense fallback="Loading...">
            <RTOLazyLayout/>
          </Suspense>
        }/>
         <Route path="/customqc" element={
          <Suspense fallback="Loading...">
            <CustomQcLazyLayout/>
            </Suspense>} />
         <Route
          path="/inward-stickering"
          element={
            <Suspense fallback="Loading...">
              <InwardStickeringLazyLayout />
            </Suspense>
          }
        />
        <Route path="/stickering" element={
          <Suspense fallback="Loading...">
            <StickeringLazyLayout/>
          </Suspense>}
        />
        <Route path="/loading" element={
          <Suspense fallback="Loading...">
          <LoadingLazyLayout/>
          </Suspense>
        }/>
        <Route path="/unloading" element={
          <Suspense fallback="Loading...">
            <UnLoadingLazyLayout/>
          </Suspense>}/>
        <Route
          path="/rTVsTN"
          element={
            <Suspense fallback="Loading...">
              <OrderProcessingRTVSTNLazyLayout />
            </Suspense>
          }
        />
        <Route
          path="/internalstocktransfer"
          element={
            <Suspense fallback="Loading...">
              <OrderProcessingInternalStockTransferLazyLayout />
            </Suspense>
          }
        />
        <Route path="/packaging" element={
          <Suspense fallback="Loading...">
            <PackagingLazyLayout/>
          </Suspense>
        }/>
         <Route path="/otherCharges" element={
          <Suspense fallback="Loading...">
            <OtherChargesLazyLayout/>
            </Suspense>}/>
        <Route path="/rto-b2b" element={
          <Suspense fallback="Loading...">
            <RTOB2BLazyLayout/>
          </Suspense>
        }/>
        <Route path="/rto-exemption" element={
          <Suspense fallback="Loading...">
            <RTOExemptionLazyLayout/>
          </Suspense>
        }/>
         <Route path="/return-b2cd2c" element={
          <Suspense fallback="Loading...">
            <ReturnLazyLayout/>
          </Suspense>
        }/>
         <Route path="/return-b2b" element={
          <Suspense fallback="Loading...">
            <ReturnB2BLazyLayout/>
          </Suspense>
        }/>
      </Routes>
      
    </BrowserRouter>
  );
}


export { Navigates };
