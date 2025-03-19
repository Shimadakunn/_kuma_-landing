import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Stepper, { Step } from '@/components/ui/stepper';
import { Check, ChevronRight, Linkedin, Twitter, X, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function WaitingList() {
  const [socialClicks, setSocialClicks] = useState({
    linkedin: false,
    twitter: false,
    tiktok: false,
  });
  const [email, setEmail] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEmailValid = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const canProceedToNextStep = (step: number) => {
    if (step === 1) {
      return Object.values(socialClicks).some((clicked) => clicked);
    }
    if (step === 2) {
      return isEmailValid(email);
    }
    return true;
  };

  const handleSocialClick = (platform: keyof typeof socialClicks, url: string) => {
    window.open(url, '_blank');
    setSocialClicks((prev) => ({ ...prev, [platform]: true }));
  };

  const handleComplete = async () => {
    if (canProceedToNextStep(currentStep)) {
      setIsLoading(true);
      setError(null);

      try {
        const apiUrl = `https://kuma-server.vercel.app/register-waiting-list/${email}`;
        const response = await fetch(apiUrl, {
          headers: {
            'x-api-key': '1234567890',
          },
          method: 'GET',
        });
        console.log('response', response);

        if (!response.ok) throw new Error('Failed to join waiting list');

        // await fetch('/api/send', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ email }),
        // });

        setIsCompleted(true);
      } catch (error) {
        console.error(error);
        setError(error instanceof Error ? error.message : 'Something went wrong');
        setIsCompleted(false);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-8 gap-0 px-3 text-sm md:h-12 md:px-4 md:text-base">
          <span>
            Join <span className="hidden md:inline">the waiting list</span>
          </span>
          <ChevronRight size={10} strokeWidth={3} />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90%] sm:max-w-[600px]">
        <DialogTitle className="text-2xl font-black">Join the waiting list</DialogTitle>
        {isCompleted ? (
          <div className="flex flex-col items-center justify-center space-y-4 py-8">
            <Check className="h-16 w-16" color="white" />
            <h2 className="text-xl font-bold">Thank you for joining!</h2>
            <p>We&apos;ll be in touch soon.</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center space-y-4 py-8">
            <X className="h-16 w-16" color="white" />
            <h2 className="text-xl font-bold text-red-500">Oops! An error occurred</h2>
            <p className="text-red-500">{error}</p>
            <Button
              onClick={() => {
                setError(null);
                setIsCompleted(false);
                setIsLoading(false);
              }}
              variant="outline">
              Try Again
            </Button>
          </div>
        ) : isLoading ? (
          <div className="flex flex-col items-center justify-center space-y-4 py-8">
            <Loader2 className="h-16 w-16 animate-spin" color="white" />
            <h2 className="text-xl font-bold">Joining waiting list...</h2>
          </div>
        ) : (
          <Stepper
            currentStep={currentStep}
            onStepChange={(step) => {
              // Allow going back without validation
              if (step < currentStep) {
                setCurrentStep(step);
                return;
              }
              // Only validate when going forward
              if (canProceedToNextStep(currentStep)) {
                setCurrentStep(step);
              }
            }}
            onFinalStepCompleted={handleComplete}
            backButtonText="Previous"
            nextButtonText="Next"
            disableNextButton={(step) => !canProceedToNextStep(step)}>
            <Step>
              <h1 className="mb-4 text-xl font-bold">Follow us on social media</h1>
              <div className="flex flex-col gap-2">
                <div className="flex w-full flex-row items-center justify-between">
                  <div className="rounded-xl bg-white p-2">
                    <Linkedin size={20} className="text-black" fill="black" />
                  </div>
                  <Button
                    variant="outline"
                    className="h-10 px-4"
                    onClick={() =>
                      handleSocialClick('linkedin', 'https://www.linkedin.com/company/holo-ai')
                    }>
                    {socialClicks.linkedin ? <Check className="h-4 w-4" /> : 'Follow'}
                  </Button>
                </div>
                <div className="flex w-full flex-row items-center justify-between">
                  <div className="rounded-xl bg-white p-2">
                    <Twitter size={20} className="text-black" fill="black" />
                  </div>
                  <Button
                    variant="outline"
                    className="h-10 px-4"
                    onClick={() => handleSocialClick('twitter', 'https://www.twitter.com/holo_ai')}>
                    {socialClicks.twitter ? <Check className="h-4 w-4" /> : 'Follow'}
                  </Button>
                </div>
                <div className="flex w-full flex-row items-center justify-between">
                  <div className="rounded-xl bg-white p-2">
                    <Image
                      src="/tiktok.svg"
                      alt="Tiktok"
                      width={20}
                      height={20}
                      className="text-black"
                    />
                  </div>
                  <Button
                    variant="outline"
                    className="h-10 px-4"
                    onClick={() => handleSocialClick('tiktok', 'https://www.tiktok.com/@holo_ai')}>
                    {socialClicks.tiktok ? <Check className="h-4 w-4" /> : 'Follow'}
                  </Button>
                </div>
              </div>
            </Step>
            <Step>
              <h1 className="mb-4 text-xl font-bold">Enter your email</h1>
              <Input
                placeholder="Your email?"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={!isEmailValid(email) && email ? 'border-red-500' : ''}
              />
              {!isEmailValid(email) && email && (
                <p className="mt-2 text-sm text-red-500">Please enter a valid email address</p>
              )}
            </Step>
          </Stepper>
        )}
      </DialogContent>
    </Dialog>
  );
}
