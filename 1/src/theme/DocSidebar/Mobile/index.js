import React, { useEffect } from 'react';
import { useLocation } from '@docusaurus/router';
import clsx from 'clsx';
import {
  NavbarSecondaryMenuFiller,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import {useNavbarMobileSidebar} from '@docusaurus/theme-common/internal';
import DocSidebarItems from '@theme/DocSidebarItems';
// eslint-disable-next-line react/function-component-definition
const DocSidebarMobileSecondaryMenu = ({sidebar, path}) => {
  const mobileSidebar = useNavbarMobileSidebar();
  const location = useLocation();
  const STORAGE_KEY = 'docusaurus.mobileSidebarKeepOpen';

  useEffect(() => {
    if (typeof window !== 'undefined') {
        try {
            const shouldOpen = sessionStorage.getItem(STORAGE_KEY);

            if (shouldOpen === 'true' && !mobileSidebar.shown) {
                // Open the sidebar
                const timer = setTimeout(() => {
                  mobileSidebar.toggle();
                }, 50);

                // CRITICAL: Clear the flag immediately so subsequent manual navigations don't re-open
                sessionStorage.removeItem(STORAGE_KEY);
                console.log("reopened")
                return () => clearTimeout(timer);

                // 💡 CRITICAL: Clear the flag immediately
            }
        } catch (e) {
            console.error('Error reading/writing session storage:', e);
        }
    }
  }, [location.pathname, mobileSidebar]);

  const shouldCloseSidebar = (item) => {
    if (item.type === 'category') {
        return true; // Categories still close/toggle immediately
    }
    // Link click: Set storage flag and prevent immediate close
    if (item.type === 'link') {
        try {
            // 💡 CRITICAL: Set the flag in session storage
            sessionStorage.setItem(STORAGE_KEY, 'true');
        } catch (e) {
            console.error('Session storage failed:', e);
        }
        return false; // Prevent manual close
    }
    return true;
  };

  return (
    <ul className={clsx(ThemeClassNames.docs.docSidebarMenu, 'menu__list')}>
      <DocSidebarItems
        items={sidebar}
        activePath={path}
        onItemClick={(item) => {
          if (shouldCloseSidebar(item)) {
             mobileSidebar.toggle();
             console.log("toggled")
          }
        }}
        level={1}
      />
    </ul>
  );
};
function DocSidebarMobile(props) {
  return (
    <NavbarSecondaryMenuFiller
      component={DocSidebarMobileSecondaryMenu}
      props={props}
    />
  );
}
export default React.memo(DocSidebarMobile);
