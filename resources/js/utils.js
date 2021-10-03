export function gqlErrors(error) {
  const hasInternal = errors => errors.some(e => e.internal);
  const replaceInternal = (errors, err) => hasInternal(errors) ? errors.filter(e => !e.internal).concat(err) : errors;
  return replaceInternal((error?.graphQLErrors || []).map(e => ({
    message: e.message,
    internal: Boolean(!e?.path?.length)
  })), {message: 'Something went wrong'});
}
