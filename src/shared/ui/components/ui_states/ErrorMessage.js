export const ErrorMessage = ({ specific_error_message = 'fetching users', show_try = false } = {}) => `
    <p>Error ${specific_error_message}</p>
    ${show_try ? '<button data-action="try-again">Try again</button>' : ''}
`;