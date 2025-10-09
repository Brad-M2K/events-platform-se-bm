import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type SignupPanelProps = {
  ctaLabel?: string
}

export default function SignupPanel({ ctaLabel = 'Reserve your spot' }: SignupPanelProps) {
  return (
    <Card className="rounded-2xl border border-slate-200 shadow-md">
      <CardHeader className="space-y-2 px-0 pb-0">
        <CardTitle className="text-lg px-6">Join this event</CardTitle>
        <CardDescription className="px-6">
          Enter your details below. Hook up the submit handler to integrate with the signup API.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 pt-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-slate-700">
            Name<span className="ml-1 text-xs text-purple-500">*</span>
          </Label>
          <Input id="name" name="name" placeholder="Alex Johnson" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-slate-700">
            Email<span className="ml-1 text-xs text-purple-500">*</span>
          </Label>
          <Input id="email" name="email" type="email" placeholder="alex@example.com" />
        </div>

        <Button type="button" className="w-full justify-center">
          {ctaLabel}
        </Button>
      </CardContent>

      <CardFooter className="border-t border-slate-200 pt-4 px-6">
        <p className="text-xs text-slate-500">
          We will confirm your reservation via email. Add the calendar integration once ready.
        </p>
      </CardFooter>
    </Card>
  )
}
