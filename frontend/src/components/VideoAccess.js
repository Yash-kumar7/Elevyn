import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

const VideoAccess = () => {
  const [errorMessage, setErrorMessage] = useState(''); // For storing error message
  const [videoUrl, setVideoUrl] = useState(null); // For storing video URL
  const [loading, setLoading] = useState(true); // Loading state
  const location = useLocation();  // Get query parameters from URL

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const address = queryParams.get('address');  // Get the donor address from query params

    const checkAccess = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/check-access?address=${address}`);
        const data = await response.json();
        
        console.log("API Response:", data);  // Debugging response

        if (data.accessGranted) {
          console.log("Video URL:", data.videoUrl);  // Log the video URL
          setVideoUrl(data.videoUrl);  // Set the video URL from backend
          setErrorMessage('');  // Clear any error message
        } else {
          setErrorMessage(data.message || 'Access denied or expired.');
        }
      } catch (error) {
        console.error('Error fetching access information:', error);  // Log errors
        setErrorMessage('Error fetching access information.');
      } finally {
        setLoading(false);  // Set loading to false after the API call
      }
    };

    if (address) {
      checkAccess();
    } else {
      setErrorMessage('No address provided.');
      setLoading(false);  // Set loading to false if there's no address
    }
  }, [location]);

  return (
    <Container maxWidth="md" style={{ marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom>
        Video Access
      </Typography>
      {loading && <Typography>Loading video...</Typography>}
      {errorMessage && !videoUrl && !loading && <Typography color="error">{errorMessage}</Typography>}
      {videoUrl && !loading && (
        // Use iframe for embeddable content or video tag otherwise
        videoUrl.includes("contentfabric.io") || videoUrl.includes("embed") ? (
          <iframe
            width="100%"
            height="500"
            src={videoUrl}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded content"
          />
        ) : videoUrl.includes("youtube.com") ? (
          <iframe
            width="100%"
            height="500"
            src={videoUrl.replace('watch?v=', 'embed/')}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded video"
          />
        ) : (
          <video controls style={{ width: '100%' }} src={videoUrl} onError={() => setErrorMessage("Video could not be loaded.")}>
            Your browser does not support the video tag.
          </video>
        )
      )}
    </Container>
  );
};

export default VideoAccess;
