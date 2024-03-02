import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "~/app/routing";
import cls from './login.module.sass';
import { AuthModal } from "~/widgets/auth-modal";

export const LoginPage: React.FC = () => {
  return (
    <main className={cls.page}>
      <AuthModal />
    </main>
  );
};

export const loginRoute = createRoute({
  path: '/',
  getParentRoute: () => rootRoute,
  component: LoginPage,
});
