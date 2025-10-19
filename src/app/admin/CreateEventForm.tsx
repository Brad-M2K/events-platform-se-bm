"use client";

import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FormValues = {
  title: string;
  description: string;
  dateTime: string;
  durationMins: string;
  location: string;
  capacity: string;
  price: string;
  imageUrl: string;
  category: string;
};

type FormState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

const initialValues: FormValues = {
  title: "",
  description: "",
  dateTime: "",
  durationMins: "60",
  location: "",
  capacity: "0",
  price: "",
  imageUrl: "",
  category: "",
};

export function CreateEventForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [formState, setFormState] = useState<FormState>({ status: "idle" });
  const router = useRouter();

  const hasRequiredFields = useMemo(() => {
    return (
      values.title.trim().length > 0 &&
      values.description.trim().length > 0 &&
      values.dateTime.trim().length > 0 &&
      values.location.trim().length > 0
    );
  }, [values]);

  const resetForm = () => {
    setValues(initialValues);
    setFormState({ status: "idle" });
  };

  const handleChange =
    (name: keyof FormValues) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({
        ...prev,
        [name]: event.target.value,
      }));
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!hasRequiredFields) {
      setFormState({
        status: "error",
        message: "Please fill in the required fields marked with *.",
      });
      return;
    }

    const duration = values.durationMins.trim().length === 0 ? 0 : Number(values.durationMins);
    const capacity = values.capacity.trim().length === 0 ? 0 : Number(values.capacity);
    const price =
      values.price.trim().length === 0 ? null : Number(values.price);

    if (
      Number.isNaN(duration) ||
      Number.isNaN(capacity) ||
      (price !== null && Number.isNaN(price))
    ) {
      setFormState({
        status: "error",
        message: "Duration, capacity, and price must be valid numbers.",
      });
      return;
    }

    setFormState({ status: "submitting" });

    const payload = {
      title: values.title.trim(),
      description: values.description.trim(),
      dateTime: new Date(values.dateTime).toISOString(),
      durationMins: duration,
      location: values.location.trim(),
      capacity,
      price,
      imageUrl: values.imageUrl.trim().length === 0 ? null : values.imageUrl.trim(),
      category: values.category.trim().length === 0 ? null : values.category.trim(),
    };

    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        throw new Error(errorBody?.message ?? "Unable to create event. Please try again.");
      }

      const created = await response.json();
      setFormState({
        status: "success",
        message: `Event “${created.title}” created.`,
      });
      setValues(initialValues);
      router.refresh();
    } catch (error) {
      setFormState({
        status: "error",
        message:
          error instanceof Error ? error.message : "Unexpected error. Please try again.",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-xl border border-border bg-card/60 p-6 shadow-sm"
    >
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Create event</h2>
        <p className="text-sm text-muted-foreground">
          Publish a new event. Fields marked with * are required. Image upload will arrive later—add
          a URL for now or leave it blank.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            name="title"
            placeholder="e.g. Intro to TypeScript"
            value={values.title}
            onChange={handleChange("title")}
            required
          />
        </div>

        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="description">Description *</Label>
          <textarea
            id="description"
            name="description"
            value={values.description}
            onChange={handleChange("description")}
            placeholder="What can attendees expect?"
            required
            className="min-h-[140px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm text-foreground shadow-xs outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dateTime">Date &amp; time *</Label>
          <Input
            id="dateTime"
            name="dateTime"
            type="datetime-local"
            value={values.dateTime}
            onChange={handleChange("dateTime")}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="durationMins">Duration (mins)</Label>
          <Input
            id="durationMins"
            name="durationMins"
            type="number"
            min={15}
            step={15}
            value={values.durationMins}
            onChange={handleChange("durationMins")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location *</Label>
          <Input
            id="location"
            name="location"
            placeholder="Venue or online link"
            value={values.location}
            onChange={handleChange("location")}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="capacity">Capacity</Label>
          <Input
            id="capacity"
            name="capacity"
            type="number"
            min={0}
            value={values.capacity}
            onChange={handleChange("capacity")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price (£)</Label>
          <Input
            id="price"
            name="price"
            type="number"
            min={0}
            step="0.01"
            placeholder="Leave blank if free"
            value={values.price}
            onChange={handleChange("price")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            name="category"
            placeholder="Workshop, meetup, etc."
            value={values.category}
            onChange={handleChange("category")}
          />
        </div>

        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input
            id="imageUrl"
            name="imageUrl"
            type="url"
            placeholder="https://example.com/banner.png"
            value={values.imageUrl}
            onChange={handleChange("imageUrl")}
          />
          <div className="flex items-center gap-3 rounded-md border border-dashed border-border p-3 text-sm text-muted-foreground">
            <Input id="imageUpload" name="imageUpload" type="file" disabled className="cursor-not-allowed" />
            <span>Upload coming soon — for now paste a hosted image URL above.</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={formState.status === "submitting"}>
          {formState.status === "submitting" ? "Creating…" : "Create event"}
        </Button>
        {formState.status === "success" && (
          <p className="text-sm text-emerald-500" role="status">
            {formState.message}
          </p>
        )}
        {formState.status === "error" && (
          <p className="text-sm text-destructive" role="alert">
            {formState.message}
          </p>
        )}
        {formState.status === "success" && (
          <Button type="button" variant="outline" onClick={resetForm}>
            Add another event
          </Button>
        )}
      </div>
    </form>
  );
}
