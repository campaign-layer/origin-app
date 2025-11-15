"use client";

import React, { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "../../components/Navbar";
import { Toaster } from "sonner";
import { useAccount as useWagmiAccount } from "wagmi";
import {
  CampModal,
  useAuthState,
  useModal as useCampModal,
  useConnect,
  useAuth,
} from "@campnetwork/origin/react";
import {
  useModal,
  useWallet,
  OAuthMethod,
  ParaModal,
} from "@getpara/react-sdk";
import { generateProvider } from "../../utils/utils";
import GalleryView from "../../components/GalleryView";
import WelcomeSection from "../../components/WelcomeSection";
import FileUploadSection from "../../components/FileUploadSection";
import IPDetailsSection from "../../components/IPDetailsSection";
import LoadingSection from "../../components/LoadingSection";
import SuccessSection from "../../components/SuccessSection";


export default function HomePage() {
  const [sectionIndex, setSectionIndex] = React.useState(0);
  const [galleryView, setGalleryView] = React.useState(false);
  const [selectedCharacter, setSelectedCharacter] = React.useState<
    string | null
  >(null);
  const [uploadedFile, setUploadedFile] = React.useState<File | null>(null);
  const [mintResult, setMintResult] = React.useState<{
    transactionHash?: string;
    tokenId?: string;
  } | null>(null);

  const [name, setName] = React.useState<string>("");
  const [provider, setProvider] = React.useState<any>(null);
  const { authenticated } = useAuthState();
  const auth = useAuth();
  const { disconnect } = useConnect();
  const { openModal: openCampModal } = useCampModal();
  const { data: wallet } = useWallet();
  const { openModal } = useModal();

  const acc = useWagmiAccount();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | number | undefined;
    
    // Only set provider if wallet address matches authenticated Origin address
    if (wallet?.address && authenticated && auth.walletAddress) {
      const walletAddress = wallet.address.toLowerCase();
      const originAddress = auth.walletAddress.toLowerCase();
      
      // Only set provider if addresses match
      if (walletAddress === originAddress) {
        timeoutId = setTimeout(async () => {
          const newProvider = await generateProvider(acc);
          setProvider(newProvider);
        }, 200);
      } else {
        // Addresses don't match, clear provider
        setProvider(null);
      }
    } else if (!wallet?.address || !authenticated) {
      // Clear provider if wallet disconnected or not authenticated
      setProvider(null);
    }
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [acc, wallet?.address, authenticated, auth.walletAddress]);

  const sections = [
    <WelcomeSection
      key="welcome"
      wallet={wallet}
      authenticated={authenticated}
      openCampModal={openCampModal}
      openModal={openModal}
      disconnect={disconnect}
      setSectionIndex={setSectionIndex}
    />,
    <FileUploadSection
      key="file-upload"
      setSectionIndex={setSectionIndex}
      uploadedFile={uploadedFile}
      setUploadedFile={setUploadedFile}
    />,
    <IPDetailsSection
      key="ip-details"
      uploadedFile={uploadedFile}
      setSectionIndex={setSectionIndex}
      setMintResult={setMintResult}
    />,

    <LoadingSection
      key="loading-mint"
      title="Minting in progress"
      subtitle="Minting in progress. Do not move away from this page."
    />,
    <SuccessSection
      key="success"
      transactionHash={mintResult?.transactionHash}
      tokenId={mintResult?.tokenId}
      onBackToHome={() => {
        setSectionIndex(0);
        setUploadedFile(null);
        setMintResult(null);
      }}
    />,
  ];

  return (
    <>
      <Navbar
        galleryView={galleryView}
        onGalleryToggle={(isGallery) => setGalleryView(isGallery)}
      />
      <Toaster theme="dark" />
      <main className="flex flex-col w-full h-screen items-center justify-center text-white">
        {galleryView ? (
          <GalleryView onSwitchToRemix={() => setGalleryView(false)} />
        ) : (
          <AnimatePresence mode="sync">
            {sections[sectionIndex]}
          </AnimatePresence>
        )}
        <CampModal 
          defaultProvider={
            provider && 
            wallet?.address && 
            authenticated && 
            auth.walletAddress &&
            wallet.address.toLowerCase() === auth.walletAddress.toLowerCase()
              ? provider 
              : undefined
          } 
          injectButton={false} 
        />
        <ParaModal
          appName="Camp"
          oAuthMethods={[OAuthMethod.GOOGLE, OAuthMethod.TWITTER]}
          authLayout={["EXTERNAL:FULL", "AUTH:FULL"]}
          externalWallets={[
            "METAMASK",
            "WALLETCONNECT",
            "COINBASE",
            "OKX",
            "ZERION",
          ]}
          disablePhoneLogin
          recoverySecretStepEnabled
        />
      </main>
    </>
  );
}
