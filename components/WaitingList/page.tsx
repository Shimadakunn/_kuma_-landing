import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

import Stepper, { Step } from '@/components/ui/stepper';

export default function WaitingList() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="w-[90%] sm:max-w-[600px]">
        <DialogTitle>Join the waiting list</DialogTitle>
        <Stepper
          initialStep={1}
          onStepChange={(step) => {
            console.log(step);
          }}
          onFinalStepCompleted={() => console.log('All steps completed!')}
          backButtonText="Previous"
          nextButtonText="Next">
          <Step>
            <h2>Welcome to the React Bits stepper!</h2>
            <p>Check out the next step!</p>
          </Step>
          <Step>
            <h2>Step 2</h2>
            <p>Custom step content!</p>
          </Step>
          <Step>
            <h2>How about an input?</h2>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name?"
            />
          </Step>
          <Step>
            <h2>Final Step</h2>
            <p>You made it!</p>
          </Step>
        </Stepper>
      </DialogContent>
    </Dialog>
  );
}
