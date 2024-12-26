// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useAuth } from '../context/authprovider'; // Correct path if needed

// const FetchCard = () => {
//   const { token } = useAuth(); // Get token from AuthContext or cookies
//   const [cards, setCards] = useState([]); // State for cards
//   const [loading, setLoading] = useState(false); // Loading state
//   const [error, setError] = useState(null); // Error state

//   useEffect(() => {
//     if (!token) {
//       setError('No token found. Please login again.');
//       return; // If no token, return early
//     }

//     const fetchCards = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get('http://localhost:5000/api/cards/allCard', {
//           headers: {
//             Authorization: `Bearer ${token}`, // Token sent here
//           },
//         });
    
//         setCards(response.data); // Set fetched cards to state
//       } catch (err) {
//         setError('Failed to fetch cards');
//         console.error(err.response || err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCards(); // Call function to fetch cards
//   }, [token]); // Run only when token changes

//   // If loading, show loading message
//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   // If there's an error, show error message
//   if (error) {
//     return <div>{error}</div>;
//   }

//   // Render cards if they exist
//   return (
//     <div>
//       {cards.length > 0 ? (
//         cards.map((card) => (
//           <div key={card._id} className="card">
//             <h3>{card.name}</h3>
//             <p>{card.description}</p>
//             {/* Other card properties */}
//           </div>
//         ))
//       ) : (
//         <div>No cards available</div>
//       )}
//     </div>
//   );
// };

// export default FetchCard;
