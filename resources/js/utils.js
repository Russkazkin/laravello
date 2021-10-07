export function gqlErrors(error) {
  const hasInternal = errors => errors.some(e => e.internal);
  const replaceInternal = (errors, err) => hasInternal(errors) ? errors.filter(e => !e.internal).concat(err) : errors;
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
