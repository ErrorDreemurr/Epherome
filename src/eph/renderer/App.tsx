import HomePage from "../views/HomePage";
import AccountsPage from "../views/AccountsPage";
import ProfilesPage from "../views/ProfilesPage";
import SettingsPage, { UpdateAvailableDialog } from "../views/SettingsPage";
import DownloadsPage from "../views/DownloadsPage";
import { showOverlay } from "../overlay";
import {
  MdAccountCircle,
  MdApps,
  MdArrowBack,
  MdDeveloperBoard,
  MdGamepad,
  MdMenu,
  MdRefresh,
  MdSettings,
  MdViewCarousel,
} from "react-icons/md";
import { IconContext } from "react-icons/lib";
import ProcessesPage from "../views/ProcessesPage";
import { intlStore, KeyOfLanguageDefinition, t } from "../intl";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { useCallback, useEffect, useMemo, useState } from "react";
import { configStore } from "common/struct/config";
import { VscChromeMinimize, VscClose, VscDebugConsole } from "react-icons/vsc";
import ProfileInstallPage from "../views/ProfileInstallPage";
import { ipcRenderer } from "electron";
import { historyStore } from "./history";
import { observer } from "mobx-react-lite";
import { GlobalOverlay } from "eph/overlay";
import JavaInstallPage from "eph/views/JavaInstallPage";
import { IconButton, AppBar, Menu, AppBarTitle } from "@resetpower/rcs";
import ModpackExportPage from "eph/views/ModpackExportPage";
import { useFloating } from "@floating-ui/react-dom";
import { shift } from "@floating-ui/core";
import TaskPanel from "eph/components/TaskPanel";
import { FaServer } from "react-icons/fa";
import { checkEphUpdate } from "./updater";
import ExtensionStore from "eph/views/ExtensionStore";

function TaskPanelShower(): JSX.Element {
  const { x, y, reference, floating, refs, strategy } = useFloating({
    placement: "bottom",
    middleware: [shift()],
  });
  const [show, setShow] = useState(false);
  const close = useCallback(
    (event: Event) => {
      if (
        !refs.reference.current?.contains(event.target as Node) &&
        !refs.floating.current?.contains(event.target as Node)
      ) {
        setShow(false);
      }
    },
    [refs]
  );

  useEffect(
    () =>
      (show ? document.addEventListener : document.removeEventListener)(
        "click",
        close
      ),
    [show, close]
  );

  return (
    <div>
      <div ref={reference}>
        <IconButton
          className="flex"
          onClick={() => setShow(!show)}
          active={show}
        >
          <FaServer size="1.2em" />
        </IconButton>
      </div>
      {show && (
        <TaskPanel
          className="z-20 right-1"
          ref={floating}
          style={{
            position: strategy,
            top: y ?? "",
            left: x ?? "",
          }}
        />
      )}
    </div>
  );
}

export const EphAppBar = observer(
  (props: { pathname: KeyOfLanguageDefinition }) => {
    // visit the key
    // in order to update title on language change correctly
    intlStore.language;
    // keep title bar style
    const isTitleBarEph = useMemo(
      () => configStore.titleBarStyle === "eph",
      []
    );
    const title = t(props.pathname);
    const isAtHome = props.pathname === "home";

    const popMenuItems = [
      {
        icon: <MdAccountCircle />,
        text: t("accounts"),
        action: () => historyStore.push("accounts"),
      },
      {
        icon: <MdGamepad />,
        text: t("profiles"),
        action: () => historyStore.push("profiles"),
      },
      {
        icon: <MdViewCarousel />,
        text: t("processes"),
        action: () => historyStore.push("processes"),
      },
      {
        icon: <MdApps />,
        text: t("extensions"),
        action: () => historyStore.push("extensions"),
      },
      {
        icon: <MdSettings />,
        text: t("settings"),
        action: () => historyStore.push("settings"),
      },
    ];

    return (
      <AppBar className={`${isTitleBarEph && "eph-drag"}`}>
        <div className="eph-no-drag">
          {isAtHome ? (
            <Menu items={popMenuItems}>
              {(open) => (
                <IconButton active={open}>
                  <MdMenu />
                </IconButton>
              )}
            </Menu>
          ) : (
            <IconButton
              onClick={isAtHome ? undefined : () => historyStore.back()}
            >
              {<MdArrowBack />}
            </IconButton>
          )}
        </div>
        <AppBarTitle>{title}</AppBarTitle>

        <div className="eph-no-drag flex">
          <TaskPanelShower />
          {configStore.developerMode && (
            <Menu
              className="right-1"
              items={[
                {
                  icon: <VscDebugConsole />,
                  text: "Developer Tools",
                  action: () => ipcRenderer.send("open-devtools"),
                },
                {
                  icon: <MdRefresh />,
                  text: "Reload Epherome",
                  action: () => location.reload(),
                },
              ]}
            >
              {(open) => (
                <IconButton active={open}>
                  <MdDeveloperBoard />
                </IconButton>
              )}
            </Menu>
          )}
          {isTitleBarEph && (
            <>
              <IconButton onClick={() => ipcRenderer.send("minimize")}>
                <VscChromeMinimize />
              </IconButton>
              <IconButton
                onClick={() =>
                  showOverlay({
                    title: t("warning"),
                    message: t("confirmQuitting"),
                    cancellable: true,
                    action: () => ipcRenderer.send("quit"),
                  })
                }
              >
                <VscClose />
              </IconButton>
            </>
          )}
        </div>
      </AppBar>
    );
  }
);

export function RouterView({
  pathname,
  params,
}: {
  pathname: KeyOfLanguageDefinition;
  params: string;
}) {
  return (
    <SwitchTransition mode="out-in">
      <CSSTransition key={pathname} timeout={120} classNames="fade">
        {pathname === "home" ? (
          <HomePage />
        ) : pathname === "accounts" ? (
          <AccountsPage />
        ) : pathname === "profiles" ? (
          <ProfilesPage params={params} />
        ) : pathname === "profile.install" ? (
          params ? (
            <ProfileInstallPage profile={configStore.profiles[+params]} />
          ) : (
            <div />
          )
        ) : pathname === "profile.exportModpack" ? (
          params ? (
            <ModpackExportPage profile={configStore.profiles[+params]} />
          ) : (
            <div />
          )
        ) : pathname === "settings" ? (
          <SettingsPage />
        ) : pathname === "extensions" ? (
          <ExtensionStore />
        ) : pathname === "download" ? (
          <DownloadsPage version={params ? JSON.parse(params) : undefined} />
        ) : pathname === "java.installJava" ? (
          <JavaInstallPage />
        ) : pathname === "processes" ? (
          <ProcessesPage />
        ) : (
          <></>
        )}
      </CSSTransition>
    </SwitchTransition>
  );
}

const App = observer(() => {
  const { pathname, params } = historyStore.use;

  // response route change
  useEffect(() => {
    // check update automatic
    if (configStore.checkUpdate) {
      checkEphUpdate().then((result) => {
        if (result && result.need) {
          showOverlay({
            title: t("epheromeUpdate"),
            content: UpdateAvailableDialog,
            params: {
              version: result.name,
            },
          });
        }
      });
    }
  }, []);

  const pn = pathname as KeyOfLanguageDefinition;
  return (
    <IconContext.Provider value={{ size: "1.5em", className: "mx-0.5" }}>
      <GlobalOverlay />
      <EphAppBar pathname={pn} />
      <RouterView pathname={pn} params={decodeURIComponent(params)} />
    </IconContext.Provider>
  );
});

export default App;
