import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

const measurementId = 'G-486L2SLZQ1'; // Replace with your GA4 ID
ReactGA.initialize(measurementId);

export default function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    // Sends pageview to GA on every route change
    ReactGA.send({ hitType: 'pageview', page: location.pathname + location.search });
  }, [location]);

  return null;
}
