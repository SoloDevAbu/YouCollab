# Collaborator Platform for YouTubers and Editors

This project is a collaboration platform that connects YouTubers with editors. It allows editors to edit videos and upload them through the platform, enabling a seamless workflow for content creation. The platform also handles the confirmation and publishing of videos to YouTube channels.

---

## Features

### 1. **Account Creation**
- **YouTubers**: Can create accounts to manage their collaborations and video uploads.
- **Editors**: Can create accounts to work on assigned projects.

### 2. **Editor Management**
- YouTubers can add editors to their account for video editing tasks.

### 3. **Video Editing and Upload Workflow**
- Editors can upload edited videos to the platform.
- Videos are temporarily stored in cloud storage.

### 4. **Confirmation Process**
- YouTubers receive a confirmation email (via Gmail) after a video is uploaded.
- On confirmation, the video and its metadata are automatically uploaded to the YouTube channel.

### 5. **Cloud Storage Management**
- Videos are deleted from cloud storage once successfully uploaded to the YouTube channel.

---

## Tech Stack

### **Frontend**
- React (with React Router DOM for routing)
- Tailwind CSS (for styling)

### **Backend**
- Node.js (Express.js for API creation)
- Mongoose (for MongoDB database management)

### **Storage**
- Cloud storage solution (e.g., AWS S3, Firebase, or Google Cloud Storage)

### **Email Integration**
- Gmail API for sending confirmation emails.

### **YouTube API**
- For video uploads and metadata handling.

---

## Project Setup

### Prerequisites
- Node.js installed on your machine
- MongoDB database set up
- Access to Gmail API and YouTube API credentials
- Cloud storage configured

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-repo-url.git
    cd project-directory
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    Create a `.env` file in the root directory and add the following:
    ```env
    MONGO_URI=<your-mongodb-uri>
    GMAIL_API_KEY=<your-gmail-api-key>
    YOUTUBE_API_KEY=<your-youtube-api-key>
    CLOUD_STORAGE_KEY=<your-cloud-storage-key>
    ```

4. Start the server:
    ```bash
    npm start
    ```

5. Run the frontend (if separate):
    ```bash
    cd frontend
    npm start
    ```

---

## API Endpoints

### Authentication
- `POST /auth/register`: Register a new user
- `POST /auth/login`: Log in a user

### Editor Management
- `POST /youtuber/add-editor`: Add an editor to a YouTuber's account

### Video Workflow
- `POST /editor/upload-video`: Upload an edited video
- `GET /youtuber/confirm-upload`: Confirm video upload and publish to YouTube

---

## Future Enhancements
- Add a dashboard for tracking video progress.
- Introduce role-based notifications and reminders.
- Integrate payment options for editors.

---

## Contributing
1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Open a pull request.

---

## License
This project is licensed under the MIT License. See the LICENSE file for more details.