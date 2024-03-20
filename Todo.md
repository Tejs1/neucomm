# Todo

## Features

- [ ] add `react-query` for data fetching
- [x] add `clerk-auth` for authentication
- [ ] add `prisma` for database
- [ ] investigate the signin/up responses, to see if there was an error if the
      user needs to complete more steps.
- [ ] add `otp timeout` feature
- [ ] add `forgot-password` feature

## Fix

- [x] store user name in db
- [ ] if user is not in `clerk db` but is in `prisma db`, then delete user from
      `prisma db` and redirect to signup page

- [ ] fix Extra attributes from the server for `next-themes`
- [ ] move `clerk-auth` logic to server actions instead of client side

## Optmizations

- [ ] add `next-iron-session` for session management
- [ ] use `neondb-edge` insted of `prisma accelerate` for form validation
- [ ] use `react-hook-form` for form validation
- [x] use `zod` for form validation
- [ ] use `next-optimized-images` for image optimization
- [ ] use `next-seo` for SEO
- [x] use `next-themes` for dark mode
- [ ] use `next-transpile-modules` for transpiling node_modules
- [ ] use `next-mdx-remote` for MDX
- [ ] use `next-i18next` for i18n
- [ ] use `next-pwa` for PWA
- [ ] use `input-otp` for OTP input
