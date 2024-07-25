# WanderLust

WanderLust is a web application designed to help users discover and manage vacation rental listings. It provides features for users to browse listings, leave reviews, and manage their own property listings.

## Features

- **User Authentication**

  - Sign up and log in securely.
  - Password hashing using `bcrypt` for security.
  - Session management with `express-session`.

- **Listing Management**

  - Create, edit, and delete property listings.
  - Upload images for property listings with file storage using `multer`.

- **Review System**

  - Leave reviews on property listings.
  - Delete reviews associated with a listing.

- **Location Services**

  - Integrated with Mapbox for geocoding and mapping features.
  - Display listing locations on an interactive map.

- **Responsive Design**
  - Mobile-friendly views using Bootstrap and custom CSS.

## Technologies Used

- **Backend**

  - Node.js
  - Express.js
  - MongoDB with Mongoose

- **Frontend**

  - EJS (Embedded JavaScript) for templating
  - Bootstrap for responsive design
  - Mapbox for maps and geocoding

- **Authentication**
  - Passport.js for user authentication

## Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd wanderlust
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory and add the following:

   ```env
   CLOUD_NAME=your_cloud_name
   CLOUD_API_KEY=your_cloud_api
   CLOUD_API_SECRET=your_cloud_secrete

   MAP_TOKEN=your_map_token
   ```

4. **Run the application**

    ```bash
    npm start
    ```

The application will be running at `http://localhost:3000`.

## Usage

- Visit `http://localhost:3000` in your web browser to access the application.
- Sign up for a new account or log in with an existing one to start browsing listings.
- Create, edit, or delete your own property listings.
- Leave reviews on listings to share your experiences.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## Acknowledgments

- Built as a project for learning Node.js, Express.js, and MongoDB.
- Inspiration and initial structure from online tutorials and documentation.
