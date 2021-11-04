export function gqlErrors(error) {
  const hasInternal = errors => errors.some(e => e.internal);
  const replaceInternal = (errors, err) => hasInternal(errors) ? errors.filter(e => !e.internal).concat(err) : errors;
  if (error?.networkError && error.networkError.statusCode === 419) {
    throw new AuthError("Unauthenticated");
  }
  return replaceInternal((error?.graphQLErrors || []).map(e => {
    if (e.extensions?.category) {
      const validationErrors = e.extensions?.validation;
      return Object.keys(validationErrors || {}).map(key => validationErrors[key]).flat().map(value => ({message: value, internal: false}));
    }
    return {
      message: e.message,
      internal: Boolean(!e?.path?.length)
    }
  }), {message: 'Something went wrong'}).flat();
}

export class AuthError extends Error {}

export const colorMap500 = {
  pink: "bg-pink-500",
  gray: "bg-gray-500",
  yellow: "bg-yellow-500",
  purple: "bg-purple-500",
  red: "bg-red-500",
  green: "bg-green-500",
  blue: "bg-blue-500",
  indigo: "bg-indigo-500"
};
