import React, { useEffect, useState } from 'react';
import ContentPage from './components/ContentPage';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [tracksList, setTracksList] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null);
  useEffect(() => {
    const fetchTracksList = async () => {
      try {
        const fetchReq = await fetch('/api/tracks', {
          headers: { Accept: 'application/json' },
        });
        const resData = await fetchReq.json();
        if (!resData.success)
          throw new Error('fetch to /api/tracks returned not successful');
        setTracksList(resData.tracks.order);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchTracksList();
  }, []);

  if (loading) return <div>Loading data, please wait...</div>;
  if (error) return <div>An error occurred.</div>;

  const TrackOptions = tracksList
    .filter((track) => track !== selectedTrack)
    .map((track) => (
      <button type="button" key={track} onClick={() => setSelectedTrack(track)}>
        {track}
      </button>
    ));
  return (
    <div>
      <h1>YAML CMS Demo</h1>
      {selectedTrack && (
        <ContentPage
          contentType="track"
          contentFetchEndpoint={`tracks/${selectedTrack}`}
        />
      )}
      {TrackOptions.length ? (
        <>
          <h2>{selectedTrack && 'More '}Track Options</h2>
          {TrackOptions}
        </>
      ) : null}
    </div>
  );
}

export default App;
