"use client";

/**
 * Mock session handling for the demo login gate. There is no real auth here —
 * this only exists so the product feels like an internal tool that sits
 * behind SSO, and so the login screen has somewhere to redirect to and from.
 */
const SESSION_KEY = "amplify_session";

export interface MockUser {
  name: string;
  email: string;
  initials: string;
}

export const MOCK_USER: MockUser = {
  name: "Jordan Ellis",
  email: "jordan.ellis@spotify.com",
  initials: "JE",
};

export function isSignedIn(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(SESSION_KEY) === "true";
}

export function signIn(): void {
  window.localStorage.setItem(SESSION_KEY, "true");
}

export function signOut(): void {
  window.localStorage.removeItem(SESSION_KEY);
}
