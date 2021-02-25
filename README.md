# CoffiDa API & React Native Android Application

This repo contains the submission for the Mobile Applications Development coursework assignment. Following best practices, the 'node_modules' directory has been deleted which is also ignored by the Git through the '.gitignore' file. All code was written using a 'camelCase' structure. All files for the Android application are found within the 'newApp' directory. The version of npm used to develop this project is '7.5.4'. The Android application was developed and tested on a Pixel 4 (Play Store enabled) emulator running Android 10.0 (API 29). The recording for this submission will be contained within this repo however, will not be uploaded to GitHub.

Link to GitHub repo for submission: <https://github.com/ahmed-1445/coffida_server.git> (for submission purposes only)

## CoffiDa Endpoints

All of the below endpoints have been fully implemented, including appropriate response/error handling.

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

List of features implemented:

- Ability to create/register an account, login and logout.
- Ability to view & edit the logged in account details based of the saved values. i.e. Change Full Name & Password.
- Ability to view all Location information & Review details of a selected location.
- Ability to favourite & unfavourite a Location.
- Ability to create individual reviews and permissions to edit, view/add/delete a photo, like/unlike & delete the review.
- Ability to search for a location.
- Ability to easily view various ratings with the implementation of 'AirBnbRating' star rating method. i.e. Location & Review ratings.

## App Screenshots

Here are a few screenshots taken from the completed application:

![Home Screen](/screenshots/Home.png)
![User Welcome](/screenshots/UserWelcome.png)

## How to Run

1. Clone the repo, run 'npm install' to install the dependencies.
2. Create your .env file with your DB config details.
3. Create a directory called 'storage', within the storage directory, create a directory called 'photos'.
4. Run the server with 'npm start'.
5. Go into the newApp directory and run 'npx install' to install the required dependencies.
6. To run the application use 'npx react-native run-android'.

Enjoy!
