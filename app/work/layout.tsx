import React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Work | 2PT",
  description:
    "Production AI shipped inside enterprise marketing organisations. Selected engagements from Mars Petcare, Yamaha, Harken and Barker Beds.",
  openGraph: {
    title: "Work | 2PT",
    description:
      "Production AI shipped inside enterprise marketing organisations.",
  },
}

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
