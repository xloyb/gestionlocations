import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/home(.*)", "/modcp(.*)", "/admincp(.*)", "/c(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const authResult = await auth(); // Resolve the auth promise
  
  // If the route is protected, check if the user is authenticated
  if (isProtectedRoute(req)) {
    if (!authResult || !authResult.userId) {
      // If no user is authenticated, redirect to the sign-in page
      return authResult.redirectToSignIn();
    }
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
