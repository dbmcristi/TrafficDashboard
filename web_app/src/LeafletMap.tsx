import React, {useEffect, useRef} from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";


interface RepresentationDto {
    latitude: number;
    longitude: number;
    message: string;
    eta: string | null;
}

interface Props {
    representations: RepresentationDto[];
}

const LeafletMap: React.FC<Props> = ({representations}) => {
    const mapRef = useRef<L.Map | null>(null);
    const markersRef = useRef<L.LayerGroup | null>(null);

    const haversineDistance = (
        lat1: number,
        lon1: number,
        lat2: number,
        lon2: number
    ) => {
        const toRadians = (deg: number) => (deg * Math.PI) / 180;
        const R = 6371;
        const dLat = toRadians(lat2 - lat1);
        const dLon = toRadians(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) ** 2 +
            Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };
    const checkMessageJAM = (message: string) =>
        !(message.includes("JAM") || message.includes("HAZARD") || message.includes("CLOSED")) || message.includes("ACCIDENT");

    const checkMessageCLOSED = (message: string) =>
        message.includes("CLOSED");

    const checkMessage = (message: string, type: "TRAFFIC" | "CLOSED") =>
        type === "TRAFFIC" ? checkMessageJAM(message) : checkMessageCLOSED(message);

    const getElements = (
        array: RepresentationDto[],
        type: "TRAFFIC" | "CLOSED"
    ): RepresentationDto[] =>
        array.filter((rep) => checkMessage(rep.message, type));

    const verifyIfExistsInList = (
        elem: RepresentationDto,
        list: RepresentationDto[]
    ): boolean =>
        list.some(item => item.latitude === elem.latitude && item.longitude === elem.longitude);

    const getUniqueElem = (
        source: RepresentationDto[],
        filterSource: RepresentationDto[],
        type: "TRAFFIC" | "CLOSED"
    ): RepresentationDto[] => {
        const filtered = getElements(source, type);
        const toCompare = getElements(filterSource, "CLOSED");
        return type === "TRAFFIC"
            ? filtered.filter(item => !verifyIfExistsInList(item, toCompare))
            : toCompare;
    };

    const makeMarker = (
        latitude: number,
        longitude: number,
        txt: string,
        color: string
    ) => {
        const icon = new L.Icon({
            iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
            shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
        });

        return L.marker([latitude, longitude], {icon}).bindPopup(txt);
    };

    const checkTypeAndMakeMarker = (
        latitude: number,
        longitude: number,
        message: string,
        eta: string | null
    ) => {
        const text = `${message}<br /><span style="color:red;">${eta ?? "N/A"}</span>`;

        if (message.includes("HAZARD")) return makeMarker(latitude, longitude, text, "yellow");
        if (message.includes("JAM")) return makeMarker(latitude, longitude, text, "red");
        if (message.includes("ACCIDENT")) return makeMarker(latitude, longitude, text, "green");
        if (message.includes("CLOSED")) return makeMarker(latitude, longitude, text, "grey");
        // return makeMarker(latitude, longitude, text, "blue"); // default marker
    };

    useEffect(() => {
        if (!mapRef.current) {
            mapRef.current = L.map("map").setView([46.77, 23.60], 13);
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                maxZoom: 19,
            }).addTo(mapRef.current);
        }

        if (markersRef.current) {
            markersRef.current.clearLayers(); // clear old markers
        } else {
            markersRef.current = L.layerGroup().addTo(mapRef.current);
        }

        representations.forEach((rep) => {
            const marker = checkTypeAndMakeMarker(rep.latitude, rep.longitude, rep.message, rep.eta);
            if (marker) marker.addTo(markersRef.current!);
        });
        const jams = getUniqueElem(representations, representations, "TRAFFIC");
        const closedRoads = getUniqueElem(representations, representations, "CLOSED");

        const drawPolyline = (points: RepresentationDto[], color: string) => {
            const sorted = [...points].sort((a, b) => a.message.localeCompare(b.message));
            let group: L.LatLngExpression[] = [];

            for (let i = 0; i < sorted.length; i++) {
                const curr = sorted[i];
                const prev = sorted[i - 1];

                if (i > 0 && curr.message !== prev.message) {
                    if (group.length > 1) {
                        L.polyline(group, {color}).addTo(mapRef.current!);
                    }
                    group = [];
                }
                group.push([curr.latitude, curr.longitude]);
            }

            if (group.length > 1) {
                L.polyline(group, {color}).addTo(mapRef.current!);
            }
        };

        drawPolyline(jams, "red");
        drawPolyline(closedRoads, "grey");

    }, [representations]);

    return (
        <div
            id="map"
            style={{width: "100%", height: "100vh"}}
        />
    );
};

export default LeafletMap;
