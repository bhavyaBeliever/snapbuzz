# SnapBuzz 📸🎥

SnapBuzz is a social media platform built using the MERN stack (MongoDB, Express, React, Node.js). The platform allows users to authenticate, create posts, and maintain a profile page. Media files such as images and videos are stored in Cloudinary for quick access and efficient management.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Features ✨
- **Authentication**: Secure user authentication using JWT.
- **Create Post**: Users can create and share posts with text, images, and videos.
- **Profile Page**: Each user has a profile page displaying their posts and personal information.
- **Media Storage**: Images and videos are stored and fetched from Cloudinary for efficient media management.

## Technologies Used 🛠️
- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Media Storage**: Cloudinary

## Installation 💻

1. **Clone the repository**:
    ```sh
    git clone https://github.com/bhavyaBeliever/snapbuzz.git
    cd snapbuzz
    ```

2. **Backend Setup**:
    ```sh
    cd backend
    npm install
    ```

3. **Create a `.env` file in the backend directory** and add the following environment variables:
    ```env
    PORT=5000
    MONGO_URI=your_mongo_database_uri
    JWT_SECRET=your_jwt_secret
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    ```

4. **Start the backend server**:
    ```sh
    npm start
    ```

5. **Frontend Setup**:
    ```sh
    cd ../frontend
    npm install
    ```

  

6. **Start the frontend development server**:
    ```sh
    npm start
    ```

## Usage 🚀
- **Register/Login**: Users can register and log in to the platform.
- **Create Post**: After logging in, users can create posts with text, images, and videos.
- **Profile Page**: Users can view and manage their profile page.

## Contributing 🤝
Contributions are welcome! Please open an issue or submit a pull request.

## License 📜
This project is licensed under the GPL License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements 🙏
- Thanks to [Cloudinary](https://cloudinary.com) for providing an excellent media management solution.
- Special thanks to the developers of the MERN stack for their awesome tools and libraries.
