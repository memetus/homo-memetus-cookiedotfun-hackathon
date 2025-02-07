import "ress";
import "@/styles/globals.scss";
import ReduxProvider from "@/states/global/provider";
import Web3Provider from "@/providers/Web3Provider";
import AppProvider from "@/providers/AppProvider";
import QueryProvider from "@/providers/QueryProvider";
import { cookies } from "next/headers";

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookie = cookies().get("accessToken");

  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <QueryProvider>
            <Web3Provider>
              <AppProvider jwt={cookie?.value}>{children}</AppProvider>
            </Web3Provider>
          </QueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
