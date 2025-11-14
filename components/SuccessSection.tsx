import React from "react";
import Section from "./Section";
import { Header, Description } from "../src/components/shared";
import { Button } from "./Button";
import CopyButton from "./CopyButton";
import OpenExternalButton from "./OpenExternalButton";
import { truncate } from "../utils/utils";

interface SuccessSectionProps {
  transactionHash?: string;
  tokenId?: string;
  onBackToHome: () => void;
}

const SuccessSection: React.FC<SuccessSectionProps> = ({
  transactionHash,
  tokenId,
  onBackToHome,
}) => {
  const explorerUrl = transactionHash
    ? `https://basecamp.cloud.blockscout.com/tx/${transactionHash}`
    : undefined;

  const shareText = transactionHash
    ? `Check out my minted IP NFT! Transaction: ${transactionHash}`
    : "Check out my minted IP NFT!";

  const handleShare = async () => {
    if (navigator.share && transactionHash) {
      try {
        await navigator.share({
          title: "Minted IP NFT",
          text: shareText,
          url: explorerUrl || window.location.href,
        });
      } catch (err) {
        // User cancelled or error occurred
        console.log("Share cancelled or failed");
      }
    } else {
      // Fallback: copy to clipboard
      if (transactionHash) {
        await navigator.clipboard.writeText(shareText);
      }
    }
  };

  return (
    <Section className="max-w-lg">
      <div className="flex flex-col items-center gap-4">
        <div className="text-6xl">✅</div>
        <Header text="Minting Successful!" />
        <Description text="Your IP NFT has been minted successfully." />
        
        {transactionHash && (
          <div className="w-full mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Transaction Hash:</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-900 font-mono">
                    {truncate(transactionHash, 8, 6)}
                  </span>
                  <CopyButton value={transactionHash} />
                  {explorerUrl && (
                    <OpenExternalButton
                      url={explorerUrl}
                      color="black"
                    />
                  )}
                </div>
              </div>
              
              {tokenId && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Token ID:</span>
                  <span className="text-sm text-gray-900 font-mono">{tokenId}</span>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex gap-3 w-full mt-4">
          {transactionHash && (
            <Button
              onClick={handleShare}
              text="Share"
              className="flex-1"
              justifyContent="center"
            />
          )}
          <Button
            onClick={onBackToHome}
            text="Back to Home"
            className="flex-1"
            justifyContent="center"
            arrow="left"
          />
        </div>
      </div>
    </Section>
  );
};

export default SuccessSection;

