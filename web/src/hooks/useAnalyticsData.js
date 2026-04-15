import { useEffect, useState } from 'react';
import { getAnalytics } from '../services/appDataService';

const ANALYTICS_CACHE_KEY = 'centsibility.analytics.overview';

const EMPTY_ANALYTICS = {
  summary: null,
  spendingByCategory: [],
  monthlyBreakdown: [],
  categoryBreakdown: []
};

const isAnalyticsPayload = (value) => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  return Array.isArray(value.spendingByCategory)
    && (Array.isArray(value.monthlyBreakdown) || Array.isArray(value.categoryBreakdown))
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

    const handleRefresh = () => {
      loadAnalytics();
    };

    window.addEventListener('transactions:updated', handleRefresh);
    window.addEventListener('budgets:updated', handleRefresh);

    return () => {
      isMounted = false;
      window.removeEventListener('transactions:updated', handleRefresh);
      window.removeEventListener('budgets:updated', handleRefresh);
    };
  }, []);

  return {
    analytics: isAnalyticsPayload(analytics)
      ? {
          ...analytics,
          monthlyBreakdown: Array.isArray(analytics.monthlyBreakdown)
            ? analytics.monthlyBreakdown
            : analytics.categoryBreakdown
        }
      : EMPTY_ANALYTICS
  };
};

export default useAnalyticsData;
