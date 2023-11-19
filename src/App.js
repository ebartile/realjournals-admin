import React, { useEffect } from 'react';
import ThemeConfig from 'theme';
import ThemePrimaryColor from 'components/general/ThemePrimaryColor';
import ThemeLocalization from 'components/general/ThemeLocalization';
import Settings from 'components/settings';
import RtlLayout from 'components/general/RtlLayout';
import NotistackProvider from 'components/general/NotistackProvider';
import GoogleAnalytics from 'components/general/GoogleAnalytics';
import ScrollToTop from 'components/ScrollToTop';
import Router from 'routes';
import context, { AppContext } from 'context';

export default function App() {
  return (
    <ThemeConfig>
      <ThemePrimaryColor>
        <ThemeLocalization>
          <RtlLayout>
            <NotistackProvider>
              <AppContext.Provider value={context}>
                <Settings />
                <ScrollToTop />
                <GoogleAnalytics />
                <Router />
              </AppContext.Provider>
            </NotistackProvider>
          </RtlLayout>
        </ThemeLocalization>
      </ThemePrimaryColor>
    </ThemeConfig>
  );
}
