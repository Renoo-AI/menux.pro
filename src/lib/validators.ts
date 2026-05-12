export const validators = {
  isValidEmail: (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
  isValidSlug: (slug: string) => /^[a-z0-9-]+$/.test(slug),
};
