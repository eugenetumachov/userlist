A simple Nextjs CRUD app for managing a collection of users.

## Done / not done:

- [x] list users
- [x] pagination
- [x] create user
- [x] delete user
- [x] update user
- [x] FE validation: make all fields required
- [x] filter by name
- [ ] AI feature - couldn't make it within the timeframe :(

possible additions and improvements:

- [ ] tests!
- [ ] use zod for schema based validation
- [ ] table page resets after refetch
- [ ] localization
- [ ] server-side validation (payload json, if user id exists, valid email, phone, etc.)
- [ ] use Form from shadcn
- [ ] UI: responsive design
- [ ] UI: show more specific info (user name) in deletion alert
- [ ] UI: advanced pagination
- [ ] UI: filter input: add a clear button
- [ ] use a DB


# Objectives:

Develop an application that allows a user to view, add, update, and delete users
from a list.

The estimated time for this task is a maximum of 4 hours. When you reach it, let’s have a call regardless of the features you delivered. 

The idea is to have a practical conversation about your craftsmanship, such as technological choices, engineering excellence, mindset, and approach. 

Consider it as a Pull request review.

# Requirements:

In general: consider quality code, architecture, and overall engineering standards that are appropriate and sound for you.

## List Users:

- Display a list of users with their Name, Email, and Phone number.
- Implement pagination.
- Each user should have a 'Delete' button next to their details.

## Add/Update/Delete User:

- Provide a form to manage users with fields for Name, Email, and
Phone number.
- Validate that all fields are filled before submitting.

## Error Handling:

- Display user-friendly error messages if the API calls fail.

## Bonus Tasks:

- Add a search bar to filter through the user list based on their names.
- Implement & enhance it with AI of your choosing
    - examples: AI-generated avatars, chatbot help with the user context, smarter search with ChatGPT integration, etc.)
