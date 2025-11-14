This is a [Next.js](https://nextjs.org) project for minting IP (Intellectual Property) NFTs on the Camp Network using the Origin SDK.

## Getting Started

### Prerequisites

- Node.js 18+ (recommended: Node.js 20+)
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# Origin/Camp Network Configuration
# These are configured in src/app/providers.tsx
# Client ID: 62713a3f-71fb-4373-8a22-052396ef4e23
# API Key: 5479be2e-1fa2-4d31-acf3-4012ddb0e68d

# Pinata IPFS Configuration (Required for minting)
# Get your JWT from https://app.pinata.cloud/
NEXT_PUBLIC_PINATA_JWT=your_pinata_jwt_token_here

# Subgraph URL for Gallery (Required for viewing minted NFTs)
NEXT_PUBLIC_SUBGRAPH_URL=https://api.goldsky.com/api/public/project_clu8sr03ji34301z2b4xte1g5/subgraphs/camp-origin-testnet-upgadable/1.0.0/gn

# Para Wallet Configuration (Optional)
NEXT_PUBLIC_PARA_API_KEY=your_para_api_key_here
```

### Configuration Details

#### Origin API Credentials
- **Client ID**: `62713a3f-71fb-4373-8a22-052396ef4e23`
- **API Key**: `5479be2e-1fa2-4d31-acf3-4012ddb0e68d`
- These are configured in `src/app/providers.tsx` via the `CampProvider` component

#### Subgraph URL
- **URL**: `https://api.goldsky.com/api/public/project_clu8sr03ji34301z2b4xte1g5/subgraphs/camp-origin-testnet-upgadable/1.0.0/gn`
- Used for querying minted IP NFTs in the gallery view
- Powered by Goldsky

### Running the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

## Features

- **IP NFT Minting**: Upload files and mint them as IP NFTs on Camp Network
- **Gallery View**: Browse and view all minted IP NFTs
- **Wallet Integration**: Connect with MetaMask, WalletConnect, Coinbase, and OKX wallets
- **IPFS Storage**: Files are automatically uploaded to IPFS via Pinata
- **Transaction Tracking**: View transaction hashes and token IDs after minting

## Project Structure

```
origin-app/
├── components/          # React components
│   ├── IPDetailsSection.tsx    # IP details form and minting logic
│   ├── GalleryView.tsx          # Gallery for viewing minted NFTs
│   ├── SuccessSection.tsx      # Success screen after minting
│   └── ...
├── src/
│   └── app/            # Next.js app directory
│       ├── page.tsx     # Main page component
│       ├── providers.tsx # App providers (Origin, Para, Apollo)
│       └── ...
└── utils/              # Utility functions
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Camp Network Origin SDK](https://www.npmjs.com/package/@campnetwork/origin) - Origin SDK documentation

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
