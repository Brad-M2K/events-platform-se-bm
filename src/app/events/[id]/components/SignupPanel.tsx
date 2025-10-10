'use client'

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
import SignupSuccess from './SignupSuccess'
import { signupSchema } from '@/server/schema/events'
import { z } from 'zod'
import { useState, type ChangeEvent, type FormEvent } from 'react'

type SignupInput = z.infer<typeof signupSchema>

type SignupPanelProps = {
  eventId: string
  eventDetails: {
    title: string
    description: string
    dateTime: string
    durationMins: number
    location: string
  }
  ctaLabel?: string
}

export default function SignupPanel({
  eventId,
  eventDetails,
  ctaLabel = 'Reserve your spot',
}: SignupPanelProps) {

  const [values, setValues] = useState<SignupInput>({ name: '', email: '' })
  const [errors, setErrors] = useState<Partial<Record<keyof SignupInput, string>>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const validateField = (field: keyof SignupInput, value: string) => {
    const result = signupSchema.shape[field].safeParse(value)

    setErrors((prev) => ({
      ...prev,
      [field]: result.success ? undefined : result.error.issues[0]?.message,
    }))
  }

  const handleChange =
    (field: keyof SignupInput) => (event: ChangeEvent<HTMLInputElement>) => {
      const nextValue = event.target.value

      setValues((prev) => ({ ...prev, [field]: nextValue }))
      validateField(field, nextValue)
    }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const result = signupSchema.safeParse(values)

    if (!result.success) {
      const fieldErrors = result.error.issues.reduce(
        (acc, issue) => {
          const path = issue.path[0]

          if (typeof path === 'string' && !(path in acc)) {
            acc[path as keyof SignupInput] = issue.message
          }

          return acc
        },
        {} as Partial<Record<keyof SignupInput, string>>,
      )

      setErrors((prev) => ({ ...prev, ...fieldErrors }))
      return
    }

    setErrors({})
    setSubmitError(null)
    setSubmitSuccess(false)
    setSubmitting(true)

    try {
      const response = await fetch(`/api/events/${eventId}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        const payload = await response.json().catch(() => null)
        const message =
          response.status === 409
            ? 'You have already signed up for this event.'
            : payload?.issues?.[0]?.message ??
              payload?.message ??
              payload?.error ??
              'Something went wrong while submitting. Please try again.'

        setSubmitError(message)
        return
      }

      setSubmitSuccess(true)
      setValues({ name: '', email: '' })
    } catch {
      setSubmitError('Network error: please check your connection and try again.')
    } finally {
      setSubmitting(false)
    }

  }

  return (
    <Card className="rounded-2xl border border-border shadow-md">
      {!submitSuccess && (
        <CardHeader className="space-y-2 px-0 pb-0">
          <CardTitle className="text-lg px-6 text-foreground">Join this event</CardTitle>
          <CardDescription className="px-6">Enter your details below.</CardDescription>
        </CardHeader>
      )}
      <CardContent className="pt-6">
        {submitSuccess ? (
          <SignupSuccess eventId={eventId} eventDetails={eventDetails} />
        ) : (
          <form className="space-y-4" noValidate onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground">
                Name<span className="ml-1 text-xs text-[color:var(--primary)]">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Full Name"
                value={values.name}
                onChange={handleChange('name')}
                aria-invalid={errors.name ? 'true' : 'false'}
              />
              {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                Email<span className="ml-1 text-xs text-[color:var(--primary)]">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                value={values.email}
                onChange={handleChange('email')}
                aria-invalid={errors.email ? 'true' : 'false'}
              />
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>

            {submitError && <p className="text-xs text-destructive">{submitError}</p>}

            <Button
              type="submit"
              className="w-full justify-center cursor-pointer"
              disabled={submitting}
              aria-disabled={submitting ? 'true' : 'false'}
            >
              {ctaLabel}
            </Button>
          </form>
        )}
      </CardContent>

      <CardFooter className="border-t border-border pt-4 px-6">
        <p className="text-xs text-muted-foreground">
          We will confirm your reservation via email. Add the calendar integration once ready.
        </p>
      </CardFooter>
    </Card>
  )
}
