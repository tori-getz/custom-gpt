import { router } from "~/app/routing";

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
