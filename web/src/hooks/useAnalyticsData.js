import { useEffect, useState } from 'react';
import { getAnalytics } from '../services/appDataService';

const ANALYTICS_CACHE_KEY = 'centsibility.analytics.overview';

const EMPTY_ANALYTICS = {
  summary: null,
  spendingByCategory: [],
  monthlyTrend: [],
  categoryBreakdown: []
};

const isAnalyticsPayload = (value) => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  return Array.isArray(value.spendingByCategory)
    && Array.isArray(value.monthlyTrend)
    && Array.isArray(value.categoryBreakdown);
};

const readCachedAnalytics = () => {
  try {
    const rawValue = window.localStorage.getItem(ANALYTICS_CACHE_KEY);
    if (!rawValue) {
      return EMPTY_ANALYTICS;
    }

    const parsedValue = JSON.parse(rawValue);
    return isAnalyticsPayload(parsedValue) ? parsedValue : EMPTY_ANALYTICS;
  } catch (cacheError) {
    return EMPTY_ANALYTICS;
  }
};

const writeCachedAnalytics = (data) => {
  try {
    window.localStorage.setItem(ANALYTICS_CACHE_KEY, JSON.stringify(data));
  } catch (cacheError) {
    // Ignore write failures and continue with in-memory state.
  }
};

const useAnalyticsData = () => {
  const [analytics, setAnalytics] = useState(() => readCachedAnalytics());

  useEffect(() => {
    let isMounted = true;

    const loadAnalytics = async () => {
      const data = await getAnalytics();
      if (!isMounted || !isAnalyticsPayload(data)) {
        return;
      }

      setAnalytics(data);
      writeCachedAnalytics(data);
    };

    loadAnalytics();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    analytics: isAnalyticsPayload(analytics) ? analytics : EMPTY_ANALYTICS
  };
};

export default useAnalyticsData;
