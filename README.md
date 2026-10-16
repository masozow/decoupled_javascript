# decoupled_javascript

Small repo with a reminder of vanilla JS and classic CSS without frameworks, possible expansion to typescript

# Exercise

Use the URL https://jsonplaceholder.typicode.com/users to make a user search, the search should be executed everytime the user presses a key inside a searchBox. Display a grid with users cards and an action. The action is meant to mark an user as favorite,if an user was marked as favorite, this should be kept after every search, and if the user clicks again in the same button, the user should be unmarked as favorite. Use css classes to differentiate favorite from non favorite users. The screen should be empty when no search is made.

Relevant fields for User are: id, name, email, but email it's optional.

Later, if there's enought time, think of a way to keep the favorites even when the user reloads the page.

Begin from the simple, make it work first and refactor later. Apply design and architectural patterns to your final solution. Think about testability, decoupling, SOLID and a framworkless solution.

## Plan after reading the enunciate

1. Fetch the data and print in console
2. Define data structure
3. Define HTML structure
4. Print data in browser
5. Think about XSS
6. Add search functionality
7. Add a debounce function
8. Add the favorite functionality
9. Decouple code
10. Think about fetch states
11. Add persistance to favorite state
12. Think about race conditions
13. Add tests (should've been added first, but we've limited time)
