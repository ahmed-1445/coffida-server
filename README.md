# CoffiDa API & React Native Android Application

This repo contains the submission for the Mobile Applications Development coursework assignment. For this submission, the 'node_modules' directory has been deleted which is also ignored by the Git through the '.gitignore' file. All files for the Android application are found within the 'newApp' directory.
<<<<<<< HEAD

Link to GitHub repo for submission: <https://github.com/ahmed-1445/coffida_server.git>
=======
>>>>>>> d0d46f1a01bffb813387b78a013c6c28dc505cb4

## CoffiDa Endpoints

All of the below endpoints have been fully implemented, including appropriate response handling.
User Management:

- POST /user - Register
- POST /user/login - Login
- POST /user/logout - Logout
- GET /user/{usr_id} - View User Information
- PATCH /user/{usr_id} - Update Information

Location Reviews:

- POST /location/{loc_id}/review - Add Review
- PATCH /location/{loc_id}/review/{rev_id} - Update Review
- DELETE ​/location​/{loc_id}​/review​/{rev_id} - Delete Review
- GET /location/{loc_id}/review/{rev_id}/photo - Get Photo
- POST /location/{loc_id}/review/{rev_id}/photo - Add Photo
- DELETE /location/{loc_id}/review/{rev_id}/photo - Delete Photo
- POST /location/{loc_id}/review/{rev_id}/like - Like Review
- DELETE /location/{loc_id}/review/{rev_id}/like - Unlike Review

Location Management:

- GET /location/{loc_id} - Get Location Information & Reviews
- POST ​/location​/{loc_id}​/favourite - Favourite a Location
- DELETE /location/{loc_id}/favourite - Unfavourite a Location
- GET /find - Find Locations

## App Features

List of features that the app have implemented:

- Ability to create/register an account, login and logout.
- Ability to view and edit their account details based of the saved values. i.e. Change Full Name & Password.
- Ability to view all Location information and Review details of a selected location.
- Ability to favourite and unfavourite a Location.
- Ability to create individual reviews and persmissions to edit, view/add/delete a photo, like/unlike and delete the review.
- Ability to search for a location.
- Ability to easily view various ratings with the implementation of 'AirBnbRating' star rating method. i.e. Location & Review ratings.
<<<<<<< HEAD
=======

Link to GitHub repo for submission: <https://github.com/ahmed-1445/coffida_server.git>
>>>>>>> d0d46f1a01bffb813387b78a013c6c28dc505cb4

## How to run

1. Clone the repo, run 'npm install' to install the dependencies.
2. Create your .env file with your DB config details.
3. Create a directory called 'storage', within the storage directory, create a directory called 'photos'.
4. Run the server with 'npm start'.
