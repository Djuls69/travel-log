import React, { useState, useEffect, Fragment } from 'react'
import ReactMapGL, { Popup } from 'react-map-gl'
import { listLogEntries } from './API'
import CustomMarker from './components/CustomMarker'
import LogEntryForm from './components/LogEntryForm'

const App = () => {
  const [showPopup, setShowPopup] = useState(false)
  const [addEntryLocation, setAddEntryLocation] = useState(null)
  const [logEntries, setLogEntries] = useState([])
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 37.7577,
    longitude: -95.665,
    zoom: 4
  })

  const fetchEntries = async () => {
    const entries = await listLogEntries()
    setLogEntries(entries)
  }

  useEffect(() => {
    fetchEntries()
  }, [])

  const showAddMarkerPopup = e => {
    const [longitude, latitude] = e.lngLat
    setAddEntryLocation({
      latitude,
      longitude
    })
  }

  return (
    <ReactMapGL
      mapStyle='mapbox://styles/falk69/ckiadqoq04nw119rykjlfug20'
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      {...viewport}
      onViewportChange={nextViewport => setViewport(nextViewport)}
      onDblClick={showAddMarkerPopup}
    >
      {logEntries.map(entry => {
        return (
          <Fragment key={entry._id}>
            <CustomMarker
              place={entry}
              viewport={viewport}
              color='orange'
              onClick={() =>
                setShowPopup({
                  // ...showPopup,
                  [entry._id]: true
                })
              }
            />
            {showPopup[entry._id] && (
              <Popup
                latitude={entry.latitude}
                longitude={entry.longitude}
                dynamicPosition={true}
                closeButton={true}
                closeOnClick={false}
                onClose={() => setShowPopup(false)}
                anchor='top'
              >
                <div className='popup'>
                  <h3>{entry.title}</h3>
                  <p>{entry.comments}</p>
                  {entry.image && <img src={entry.image} alt={entry.title} />}
                  <small>Visited on: {new Date(entry.visitDate).toLocaleDateString()}</small>
                </div>
              </Popup>
            )}
          </Fragment>
        )
      })}
      {addEntryLocation && (
        <Fragment>
          <CustomMarker place={addEntryLocation} viewport={viewport} color='red' />
          <Popup
            latitude={addEntryLocation.latitude}
            longitude={addEntryLocation.longitude}
            dynamicPosition={true}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setAddEntryLocation(null)}
            anchor='top'
          >
            <div className='popup'>
              <LogEntryForm
                onClose={() => {
                  setAddEntryLocation(null)
                  fetchEntries()
                }}
                location={addEntryLocation}
              />
            </div>
          </Popup>
        </Fragment>
      )}
    </ReactMapGL>
  )
}

export default App
