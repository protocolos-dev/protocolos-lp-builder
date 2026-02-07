import { Data } from "@measured/puck";

export interface LandingPage {
  id: string;
  slug: string;
  title: string;
  data: Data;
  checkoutUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateLandingPageInput {
  slug: string;
  title: string;
  data: Data;
  checkoutUrl?: string;
}

export interface UpdateLandingPageInput {
  title?: string;
  data?: Data;
  checkoutUrl?: string;
}
