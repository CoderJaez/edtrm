"use client";
import React, { useEffect } from "react";
import { Marker, Popup, MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Log from "@/interfaces/Log";
import moment from "moment";

type Props = {
  Logs: Log[];
};
const MapOne: React.FC<Props> = ({ Logs }) => {
  const position: [number, number] = [7.79722, 122.765];
  const icon = L.icon({
    iconUrl: "/images/icon/marker-icon-2x.png",
    iconSize: [38, 50],
    iconAnchor: [22, 50],
    popupAnchor: [-3, -76],
    shadowUrl: "/images/icon/marker-shadow.png",
  });
  return (
    <div>
      <MapContainer center={position} zoom={10} style={{ height: 600 }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {Logs.map((log, key) =>
          (log.LAT && log.LON) || log.LAT == 0 ? (
            <Marker position={[log.LAT, log.LON]} icon={icon} key={key}>
              <Popup>
                <div>
                  <h5 className="text-xs text-blue-700">{log.EMPNAME}</h5>
                  <ul>
                    <li> {moment(log.LOGTIME).format("MMM DD, yyyy")}</li>
                    <li>{moment(log.LOGTIME).format("hh:mm a")}</li>
                  </ul>
                </div>
              </Popup>
            </Marker>
          ) : null,
        )}
      </MapContainer>
      ,
    </div>
  );
};

export default MapOne;
