# Orange-Music
A school project where I cloned apple music


For AH computing I chose to do a web/database project, and I created a music streaming service
Due to technological-restrictions I was unable to use any frameworks, and was forced to use PHP as my backend, in the XAMPP stack.
And I had specced it as a single page app, so I had to use a middle layer of javascript between the frontend and the backend.

## Notes
Due to time constraints, there is some spaghetti code in the project, particularly with the front-end's interaction with PHP. For version 2 of this project, I plan to switch over to using an API that interacts with the JS directly. Unfortunately, the htdocs folder contains many small files that are not organized in a neat way, again due to time constraints.

Additionally, there are no tests or similar components included in the project as it was not within the scope of this project and was not feasible due to time constraints.

Furthermore, if I were to start this project again, I would focus on creating a more original content, styling, and name. While it is not enjoyable to simply copy or steal someone else's work, I did not have a clear idea for an original concept when I began the project, and this is the current state of it. It is important to note, however, that all the code in the project is original.


## Features
### Music Playback
* Play music: Users can play music on the platform.
* Loop function: There is a loop function for audio playback, allowing users to loop a song or the queue.
* Shuffle function: Users can shuffle the audio queue.
* Queue view: Users can view all the upcoming songs in the queue, and add albums to the queue to play later.
* Visible player: There is a visible player that shows the currently playing song, the artist of it, and the album artwork, along with a slider that shows the current progress of playing through the song and allows the user to seek through to any time in the song.
* Volume control: Users can change the volume of playback using the volume slider.
* Playback controls: Users can skip, go back to the previous track, pause and play songs using the playback controls.
### Music Library
* Library page: There is a library page that shows all the music in the user's library, allowing them to play/view their different albums.
* Album page: Users can click on an album to open a page specially designed for that album, where they can read the description and get all the details about the album.
* Browse page: There is a browse page where users can view all the songs on the platform.
* Music uploading: Users can upload music to the platform and add other people's music to their own library from the browse page.
* Search function: Users can search for music in the platform using a search function.
### User Accounts
* User accounts: Users can sign up, make an account, sign in, and log out.



## Installation
### Requirements
* XAMPP stack: The project requires XAMPP to run, which includes Apache, MySQL, and PHP.
* Code editor: You will need a code editor to make changes to the code, such as Visual Studio Code, Atom, or Sublime Text.


### Installation Steps
* Clone the repository: Clone the Orange-Music repository to your local machine using Git or download it as a zip file and extract it.
* Copy the project files: Copy the extracted project files to the htdocs folder of your XAMPP installation. This is typically located in C:\xampp\htdocs on Windows or /Applications/XAMPP/htdocs on macOS.
* Import the database: Open phpMyAdmin in your web browser and import the database.sql file located in the database folder of the project.
* Start Apache and MySQL: Once XAMPP is installed, start Apache and MySQL from the XAMPP control panel.
* Start the application: Open your web browser and go to http://localhost/ to start the application.


### Troubleshooting
* If you encounter any issues with the installation process, please refer to the XAMPP documentation or consult online forums for help.

 
 
 
## Screenshots
###### *Library View*
![Library View](https://user-images.githubusercontent.com/112939203/233318534-e696913d-3356-4b97-8d71-6f4ec0d6ecfe.png)



###### *Album View, with music playing* 
![Album View, with music playing](https://user-images.githubusercontent.com/112939203/233319445-2c3eed15-259a-4b72-bef9-fb558bad23f3.png)



###### *Searching for Music with "Night" in it* 
![Searching for Music with "Night" in it](https://user-images.githubusercontent.com/112939203/233321125-3a2fce3f-3de1-4fc5-b146-f557e3ecb3cf.png)



###### *Library View, with music playing (shuffle and looped), and the up next queue visible, showing the songs that will be playing next*
![Library View, with music playing (shuffle and looped), and the up next queue visible, showing the songs that will be playing next](https://user-images.githubusercontent.com/112939203/233321221-95eb78cc-cd2c-4d13-ad5e-7abce16483db.png)



 
###### *Browse View, showing all the music in the service, with the up next queue*
![Browse View, showing all the music in the service, with the up next queue](https://user-images.githubusercontent.com/112939203/233321239-e5cc7742-4ac2-4fbc-91f8-a79b534105b9.png)




