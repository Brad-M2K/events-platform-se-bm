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
import { signupSchema } from '@/server/schema/events'
import { z } from 'zod'
import { useState, type ChangeEvent, type FormEvent } from 'react'

type SignupInput = z.infer<typeof signupSchema>

type SignupPanelProps = {
  ctaLabel?: string
}

export default function SignupPanel({ ctaLabel = 'Reserve your spot' }: SignupPanelProps) {

  const [values, setValues] = useState<SignupInput>({ name: '', email: '' })
  const [errors, setErrors] = useState<Partial<Record<keyof SignupInput, string>>>({})

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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
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

    // TODO: hook up API submission once available.
  }

  return (
    <Card className="rounded-2xl border border-slate-200 shadow-md">
      <CardHeader className="space-y-2 px-0 pb-0">
        <CardTitle className="text-lg px-6">Join this event</CardTitle>
        <CardDescription className="px-6">
          Enter your details below.
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-6">
        <form className="space-y-4" noValidate onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-700">
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
            <Label htmlFor="email" className="text-slate-700">
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

          <Button type="submit" className="w-full justify-center">
            {ctaLabel}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="border-t border-slate-200 pt-4 px-6">
        <p className="text-xs text-slate-500">
          We will confirm your reservation via email. Add the calendar integration once ready.
        </p>
      </CardFooter>
    </Card>
  )
}
