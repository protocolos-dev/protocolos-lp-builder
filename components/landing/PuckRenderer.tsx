"use client";

import { Render } from "@measured/puck";
import { puckConfig } from "@/lib/puck-config";
import type { Data } from "@measured/puck";

export default function PuckRenderer({ data }: { data: Data }) {
  return <Render config={puckConfig} data={data} />;
}
