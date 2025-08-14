"use client";
import { persistor, store } from "@/redux/store";
import antTheme from "@/theme/antTheme";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import FirebaseProvider from "./FirebaseProvider";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <FirebaseProvider>
          <AntdRegistry>
            <ConfigProvider theme={antTheme}>{children}</ConfigProvider>
          </AntdRegistry>
        </FirebaseProvider>
      </PersistGate>
    </Provider>
  );
};

export default Providers;
