import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ScaleLoader } from 'react-spinners';

const App = () => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loadedAllRecords, setLoadedAllRecords] = useState(false);
  const maxItems = 40;

  const fetchMoreData = () => {
    setTimeout(() => {
      const newItems = Array.from({ length: 20 }).map((_, index) => `Item ${items.length + index + 1}`);
      setItems([...items, ...newItems]);

      if (items.length >= maxItems) {
        setHasMore(false);
        setLoadedAllRecords(true);
      }
    }, 1500);
  };

  useEffect(() => {
    fetchMoreData();
  }, []);

  useEffect(() => {
    let timer;
    if (loadedAllRecords) {
      timer = setTimeout(() => {
        console.log("Thank you Vee Center for reviewing the recruitment task.");
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [loadedAllRecords]);

  return (
    <div className="App" style={{ fontFamily: 'Arial, sans-serif', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ textAlign: 'center' }}>Infinite Scroll Task for Vee Center</h1>
      <div style={{ width: '500px' }}>
        <InfiniteScroll
          dataLength={items.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={(
            <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>
              <ScaleLoader color="#36D7B7" loading={true} height={35} width={4} radius={2} margin={2} />
              <p>Loading...</p>
            </div>
          )}
          endMessage={<p style={{ textAlign: 'center', marginTop: '20px', fontStyle: 'italic', color: 'red' }}>No more items!</p>}
        >
          {items.map((item, index) => (
            <div key={index} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0', color: 'white', backgroundColor: 'darkgray' }}>{item}</div>
          ))}
        </InfiniteScroll>
      </div>
      {loadedAllRecords && <div style={{ marginTop: '20px', fontStyle: 'italic' }}>Thank you <b>Vee Center</b> for reviewing the recruitment task!</div>}
    </div>
  );
};

export default App;
