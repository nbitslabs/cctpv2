'use client';

import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import CopyIconTooltip from '@/components/ui2/CopyIconTooltip';
import ExternalLink from '@/components/ui2/ExternalLink';
import { cn, formatNumber, shortenAddress } from '@/lib/utils';
import { useAptBalance } from '@aptos-labs/react';
import {
  AboutAptosConnect,
  AboutAptosConnectEducationScreen,
  AdapterNotDetectedWallet,
  AdapterWallet,
  AptosPrivacyPolicy,
  WalletItem,
  WalletSortingOptions,
  groupAndSortWallets,
  isInstallRequired,
  useWallet,
} from '@aptos-labs/wallet-adapter-react';
import { ArrowLeft, ArrowRight, ChevronDown, CopyIcon } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import { formatUnits } from 'viem';

const adapter = {
  name: 'Aptos',
  logoUrl: '/images/chains/aptos.svg',
  explorer: { name: 'Aptos Explorer', url: 'https://explorer.aptoslabs.com' },
};

export default function AptosWalletSelector(
  walletSortingOptions: WalletSortingOptions
) {
  const {
    account: accountState,
    connected,
    disconnect,
    wallet: walletInfo,
  } = useWallet();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { data: aptBalance, isLoading } = useAptBalance();
  const balance = formatUnits(aptBalance?.valueOf() || BigInt(0), 8);

  const address = accountState?.address?.toString() || '';

  const closeDialog = useCallback(() => setIsDialogOpen(false), []);

  if (connected && accountState)
    return (
      <HoverCard
        openDelay={100}
        closeDelay={100}
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <HoverCardTrigger asChild onTouchStart={() => setIsOpen(true)}>
          <div
            className={cn(
              'flex items-center gap-2 rounded-sm py-1 px-1.5 border border-foreground/10'
            )}
          >
            <Image
              src={walletInfo?.icon || '/placeholder.svg'}
              alt={walletInfo?.name || ''}
              className="size-4 rounded-sm"
              width={16}
              height={16}
            />
            <p className="text-xs font-mono text-muted-foreground flex items-center gap-1">
              {shortenAddress(address, 2, '..')}
            </p>
          </div>
        </HoverCardTrigger>
        <HoverCardContent>
          <div>
            <div className="flex justify-between items-start gap-2 text-xs">
              {walletInfo && (
                <div className="flex flex-col gap-1.5">
                  <p className="font-semibold flex items-center">
                    <Image
                      src={walletInfo.icon || '/placeholder.svg'}
                      alt={walletInfo.name}
                      className="size-4 rounded-sm inline mr-1.5 sm:hidden"
                      width={16}
                      height={16}
                    />
                    {walletInfo.name}
                  </p>
                  {balance && (
                    <p className="font-mono text-muted-foreground">
                      {formatNumber(balance, {
                        maximumFractionDigits: 6,
                      })}{' '}
                      APT
                    </p>
                  )}
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <div className="ml-auto flex items-center gap-1 font-medium">
                  {adapter?.name}
                  {adapter?.logoUrl && (
                    <Image
                      src={adapter.logoUrl}
                      alt={adapter.name}
                      className="size-4 rounded-sm inline"
                      width={16}
                      height={16}
                    />
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <ExternalLink
                    href={`${adapter?.explorer?.url}/address/${address}`}
                    className="text-primary hover:underline font-mono"
                  >
                    {shortenAddress(address, 3, '..')}
                  </ExternalLink>
                  <CopyIconTooltip text={address}>
                    <CopyIcon
                      size={14}
                      className="cursor-pointer text-muted-foreground hover:text-foreground"
                    />
                  </CopyIconTooltip>
                </div>
              </div>
            </div>
            <footer className="flex items-center gap-1 mt-2 border-t pt-2">
              <Button
                variant="destructive-outline"
                size="sm"
                onClick={disconnect}
                className="mr-auto"
              >
                Disconnect
              </Button>
            </footer>
          </div>{' '}
        </HoverCardContent>
      </HoverCard>
    );
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant={'outline-solid'} className="h-[26px]">
          Connect Aptos
        </Button>
      </DialogTrigger>
      <ConnectWalletDialog close={closeDialog} {...walletSortingOptions} />
    </Dialog>
  );
}

interface ConnectWalletDialogProps extends WalletSortingOptions {
  close: () => void;
}

function ConnectWalletDialog({
  close,
  ...walletSortingOptions
}: ConnectWalletDialogProps) {
  const { wallets = [], notDetectedWallets = [] } = useWallet();

  const { aptosConnectWallets, availableWallets, installableWallets } =
    groupAndSortWallets(
      [...wallets, ...notDetectedWallets],
      walletSortingOptions
    );

  const hasAptosConnectWallets = !!aptosConnectWallets.length;

  return (
    <DialogContent className="max-h-screen overflow-auto">
      <AboutAptosConnect renderEducationScreen={renderEducationScreen}>
        <DialogHeader>
          <DialogTitle className="flex flex-col text-center leading-snug">
            {hasAptosConnectWallets ? (
              <>
                <span>Log in or sign up</span>
                <span>with Social + Aptos Connect</span>
              </>
            ) : (
              'Connect Wallet'
            )}
          </DialogTitle>
        </DialogHeader>

        {hasAptosConnectWallets && (
          <div className="flex flex-col gap-2 pt-3">
            {aptosConnectWallets.map((wallet) => (
              <AptosConnectWalletRow
                key={wallet.name}
                wallet={wallet}
                onConnect={close}
              />
            ))}
            <p className="flex gap-1 justify-center items-center text-muted-foreground text-sm">
              Learn more about{' '}
              <AboutAptosConnect.Trigger className="flex gap-1 py-3 items-center text-foreground">
                Aptos Connect <ArrowRight size={16} />
              </AboutAptosConnect.Trigger>
            </p>
            <AptosPrivacyPolicy className="flex flex-col items-center py-1">
              <p className="text-xs leading-5">
                <AptosPrivacyPolicy.Disclaimer />{' '}
                <AptosPrivacyPolicy.Link className="text-muted-foreground underline underline-offset-4" />
                <span className="text-muted-foreground">.</span>
              </p>
              <AptosPrivacyPolicy.PoweredBy className="flex gap-1.5 items-center text-xs leading-5 text-muted-foreground" />
            </AptosPrivacyPolicy>
            <div className="flex items-center gap-3 pt-4 text-muted-foreground">
              <div className="h-px w-full bg-secondary" />
              Or
              <div className="h-px w-full bg-secondary" />
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3 pt-3">
          {availableWallets.map((wallet) => (
            <WalletRow key={wallet.name} wallet={wallet} onConnect={close} />
          ))}
          {!!installableWallets.length && (
            <Collapsible className="flex flex-col gap-3">
              <CollapsibleTrigger asChild>
                <Button size="sm" variant="ghost" className="gap-2">
                  More wallets <ChevronDown />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="flex flex-col gap-3">
                {installableWallets.map((wallet) => (
                  <WalletRow
                    key={wallet.name}
                    wallet={wallet}
                    onConnect={close}
                  />
                ))}
              </CollapsibleContent>
            </Collapsible>
          )}
        </div>
      </AboutAptosConnect>
    </DialogContent>
  );
}

interface WalletRowProps {
  wallet: AdapterWallet | AdapterNotDetectedWallet;
  onConnect?: () => void;
}

function WalletRow({ wallet, onConnect }: WalletRowProps) {
  return (
    <WalletItem
      wallet={wallet}
      onConnect={onConnect}
      className="flex items-center justify-between px-4 py-3 gap-4 border rounded-md"
    >
      <div className="flex items-center gap-4">
        <WalletItem.Icon className="h-6 w-6" />
        <WalletItem.Name className="text-base font-normal" />
      </div>
      {isInstallRequired(wallet) ? (
        <Button size="sm" variant="ghost" asChild>
          <WalletItem.InstallLink />
        </Button>
      ) : (
        <WalletItem.ConnectButton asChild>
          <Button size="sm">Connect</Button>
        </WalletItem.ConnectButton>
      )}
    </WalletItem>
  );
}

function AptosConnectWalletRow({ wallet, onConnect }: WalletRowProps) {
  return (
    <WalletItem wallet={wallet} onConnect={onConnect}>
      <WalletItem.ConnectButton asChild>
        <Button size="lg" variant="outline" className="w-full gap-4">
          <WalletItem.Icon className="h-5 w-5" />
          <WalletItem.Name className="text-base font-normal" />
        </Button>
      </WalletItem.ConnectButton>
    </WalletItem>
  );
}

function renderEducationScreen(screen: AboutAptosConnectEducationScreen) {
  return (
    <>
      <DialogHeader className="grid grid-cols-[1fr_4fr_1fr] items-center space-y-0">
        <Button variant="ghost" size="icon" onClick={screen.cancel}>
          <ArrowLeft />
        </Button>
        <DialogTitle className="leading-snug text-base text-center">
          About Aptos Connect
        </DialogTitle>
      </DialogHeader>

      <div className="flex h-[162px] pb-3 items-end justify-center">
        <screen.Graphic />
      </div>
      <div className="flex flex-col gap-2 text-center pb-4">
        <screen.Title className="text-xl" />
        <screen.Description className="text-sm text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a]:text-foreground" />
      </div>

      <div className="grid grid-cols-3 items-center">
        <Button
          size="sm"
          variant="ghost"
          onClick={screen.back}
          className="justify-self-start"
        >
          Back
        </Button>
        <div className="flex items-center gap-2 place-self-center">
          {screen.screenIndicators.map((ScreenIndicator, i) => (
            <ScreenIndicator key={i} className="py-4">
              <div className="h-0.5 w-6 transition-colors bg-muted [[data-active]>&]:bg-foreground" />
            </ScreenIndicator>
          ))}
        </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={screen.next}
          className="gap-2 justify-self-end"
        >
          {screen.screenIndex === screen.totalScreens - 1 ? 'Finish' : 'Next'}
          <ArrowRight size={16} />
        </Button>
      </div>
    </>
  );
}
