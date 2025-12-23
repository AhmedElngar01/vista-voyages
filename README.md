<h1 align="center">Vista Voyages</h1>

<blockquote align="center">
  A modern, full-stack travel booking application designed to provide a seamless experience for exploring destinations and managing trips.
</blockquote>

<h2>Overview</h2>
<p>
  <strong>Vista Voyages</strong> bridges the gap between static travel brochures and complex booking engines. It is a Single Page Application (SPA) that allows users to browse curated trips, search by destination, apply discount codes, and manage bookings instantly.
</p>
<p>
  For administrators, it offers a powerful dashboard to manage trips, track revenue, and handle bookings in real-time.
</p>

<h2>Features</h2>

<h3>User Features</h3>
<ul>
  <li><strong>Dynamic Search:</strong> Filter trips by destination and date.</li>
  <li><strong>Trip Details:</strong> View comprehensive itinerary details, ratings, and pricing.</li>
  <li><strong>Booking Engine:</strong> Real-time price calculation based on guest count and discount codes.</li>
  <li><strong>User Dashboard:</strong> Track booking history and view upcoming trips.</li>
</ul>

<h3>Admin Features</h3>
<ul>
  <li><strong>Dashboard Analytics:</strong> Monitor total revenue, active bookings, and total users.</li>
  <li><strong>Trip Management (CRUD):</strong> Add, edit, and delete travel packages.</li>
  <li><strong>Booking Management:</strong> Search bookings by ID and view passenger lists.</li>
  <li><strong>Discount System:</strong> Create and manage promotional codes.</li>
</ul>

<h2>Tech Stack</h2>

<h3>Frontend</h3>
<ul>
  <li><strong>Framework:</strong> React.js (v18)</li>
  <li><strong>Build Tool:</strong> Vite</li>
  <li><strong>Styling:</strong> CSS Variables (Responsive Grid/Flexbox)</li>
  <li><strong>Icons:</strong> Lucide React</li>
</ul>

<h3>Backend</h3>
<ul>
  <li><strong>Runtime:</strong> Node.js</li>
  <li><strong>Framework:</strong> Express.js</li>
  <li><strong>Database:</strong> SQLite (Persistent file-based storage)</li>
  <li><strong>API:</strong> RESTful architecture</li>
</ul>

<h2>Installation & Setup</h2>
<p>Follow these steps to get the project running locally.</p>

<h3>Prerequisites</h3>
<ul>
  <li>Node.js (v16+)</li>
  <li>NPM</li>
</ul>

<h3>1. Clone the Repository</h3>
<pre>
<code>
git clone https://github.com/yourusername/vista-voyages.git
cd vista-voyages
</code>
</pre>

<h3>2. Backend Setup</h3>
<p>The backend runs on port <code>5000</code> and handles the database connection.</p>
<pre>
<code>
cd backend
npm start
</code>
</pre>
<p><em>You should see: <code>Server running on http://localhost:5000</code></em></p>

<h3>3. Frontend Setup</h3>
<p>Open a <strong>new terminal</strong> window/tab for the frontend.</p>
<pre>
<code>
cd frontend
npm run dev
</code>
</pre>
<p><em>Access the app at: <code>http://localhost:5173</code></em></p>

<h2>Usage & Credentials</h2>

<h3>Admin Portal</h3>
<p>To access the Admin Dashboard and manage the system:</p>
<ul>
  <li><strong>Email:</strong> <code>admin@vista.com</code></li>
  <li><strong>Password:</strong> (Any password works in this demo environment)</li>
</ul>

<h3>User Portal</h3>
<p>To book trips and view user history:</p>
<ul>
  <li><strong>Sign Up:</strong> Use any valid email format (e.g., <code>user@test.com</code>) to create a new account.</li>
  <li><strong>Log In:</strong> Use the credentials you created.</li>
</ul>

<h2>Project Structure</h2>
<pre>
vista-voyages/
├── backend/
│   ├── config/         # Database connection
│   ├── controllers/    # Business logic
│   ├── routes/         # API Endpoints
│   ├── models/         # Database schemas (implicit in SQLite setup)
│   └── server.js       # Entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/ # Reusable UI components (Navbar, Cards, Modals)
│   │   ├── App.jsx     # Main state controller
│   │   └── main.jsx    # React DOM render
│   └── public/
└── README.md
</pre>

<h2>Authors</h2>
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>ID</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Ahmed Ibrahim Ali Elnaggar</strong></td>
      <td>23101542</td>
    </tr>
    <tr>
      <td><strong>Mohamed Shrief Mohamed</strong></td>
      <td>23101817</td>
    </tr>
  </tbody>
</table>

<h2>License</h2>
<p>
  This project is open source and available under the <a href="LICENSE">MIT License</a>.
</p>
```
