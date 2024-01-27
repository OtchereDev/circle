import Head from "next/head";
import React from "react";
import Footer from "~/components/shared/Footer";
import NavBar from "~/components/shared/NavBar";

interface IMainLayout {
  children: React.ReactNode;
  removeFooter?: boolean;
}

const MainLayout: React.FC<IMainLayout> = ({ children, removeFooter }) => {
  return (
    <div className="min-h-screen w-full bg-white">
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <div className="relative pt-20 lg:pt-24">{children}</div>
      {!removeFooter && <Footer />}
    </div>
  );
};

export default MainLayout;