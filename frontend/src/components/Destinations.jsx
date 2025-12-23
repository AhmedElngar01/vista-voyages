import React from 'react';
import TripCard from './TripCard';

const Destinations = ({ filteredDestinations, setSelectedTrip }) => (
  <section id="destinations" className="container">
    <div className="section-header"><h2 className="section-title">Explore Popular Trips</h2></div>
    <div className="destinations-grid">
      {filteredDestinations.map((dest) => <TripCard key={dest.id} trip={dest} onSelect={setSelectedTrip} />)}
    </div>
  </section>
);
export default Destinations;