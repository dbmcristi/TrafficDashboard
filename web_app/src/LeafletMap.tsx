import React, {useEffect, useRef, useImperativeHandle, forwardRef, useState} from "react";
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
    refreshData: () => Promise<void>;
    filterByDate: () => Promise<void>;
    startDate: string;
    endDate: string;
}

const LeafletMap = forwardRef<unknown, Props>(({
                                                   representations,
                                                   refreshData,
                                                   filterByDate,
                                                   startDate,
                                                   endDate
                                               }, ref) => {
    const [selectedDetails, setSelectedDetails] = useState<RepresentationDto | null>(null);
    const mapRef = useRef<L.Map | null>(null);
    const markersRef = useRef<L.LayerGroup | null>(null);
    const polylinesRef = useRef<L.LayerGroup | null>(null);
    const [etaDate, setEtaDate] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const selectedMarkerRef = useRef<L.Marker | null>(null);

    const clearMap = () => {

        if (markersRef.current) {
            markersRef.current.clearLayers();
        }
        if (polylinesRef.current) {
            polylinesRef.current.clearLayers();
        }
        if (mapRef.current) {
            mapRef.current.eachLayer((layer) => {
                if (!(layer instanceof L.TileLayer)) {
                    mapRef.current?.removeLayer(layer);
                }
            });
        }
        if (polylinesRef.current) {
            polylinesRef.current.eachLayer((layer) => {
                if (!(layer instanceof L.TileLayer)) {
                    polylinesRef.current?.removeLayer(layer);
                }
            });
        }
        selectedMarkerRef.current = null;
    };

    useImperativeHandle(ref, () => ({
        clearMap,
        clearSelectedMarker: () => {
            selectedMarkerRef.current = null;
            setSelectedDetails(null);
        }
    }));

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
        color: string,
        onClick?: () => void
    ) => {
        const icon = new L.Icon({
            iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
            shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
        });
        const marker = L.marker([latitude, longitude], {icon}).bindPopup(txt);
        if (selectedDetails &&
            selectedDetails.latitude === latitude &&
            selectedDetails.longitude === longitude) {
            selectedMarkerRef.current = marker;
        }
        if (onClick) {
            marker.on("click", onClick);
        }
        return marker;
    };

    const checkTypeAndMakeMarker = (
        latitude: number,
        longitude: number,
        message: string,
        eta: string | null
    ) => {
        const text = `
        ${message}<br />
        <span style="color:red;">ETA: ${eta ?? "N/A"}</span><br />
        <span style="font-size: 12px; color: gray;">
            Lat: ${latitude.toFixed(5)}, Lng: ${longitude.toFixed(5)}
        </span>
    `;
        const onClick = () => {
            setSelectedDetails({latitude, longitude, message, eta});
        };
        if (message.includes("HAZARD")) return makeMarker(latitude, longitude, text, "yellow", onClick);
        if (message.includes("JAM")) return makeMarker(latitude, longitude, text, "red", onClick);
        if (message.includes("ACCIDENT")) return makeMarker(latitude, longitude, text, "green", onClick);
        if (message.includes("CLOSED")) return makeMarker(latitude, longitude, text, "grey", onClick);
    };

    const getTypeAndSubtype = (message: string) => {
        const parts = message.trim().split(" ");
        const type = parts[parts.length - 2];
        const subtype = parts[parts.length - 1];
        console.log("type", type, "subtype", subtype);
        return {
            type: type.toUpperCase(),
            subtype: subtype.toUpperCase()
        };
    };
    const handleSetEta = async () => {
        const {type, subtype} = getTypeAndSubtype(selectedDetails.message);
        const payload = {
            type,
            subtype,
            location: {
                x: selectedDetails.longitude,
                y: selectedDetails.latitude
            },
            date: etaDate,
        };
        console.log(payload);
        try {
            setIsSubmitting(true);
            const response = await fetch(`http://${process.env.REACT_APP_IP_ADDRESS}:8080/eta/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error("Failed to set ETA");
            }
            setEtaDate("");
            if (startDate === "" && endDate === "") {
                await refreshData();
            } else {
                await filterByDate();
                selectedMarkerRef.current = checkTypeAndMakeMarker(selectedDetails.longitude,selectedDetails.latitude,selectedDetails.message,etaDate);
                 selectedMarkerRef.current.openPopup();
            }

        } catch (err) {
            alert("Error setting ETA."+err.toString());
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        if (!mapRef.current) {
            mapRef.current = L.map("map").setView([46.77, 23.60], 13);
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                maxZoom: 19,
            }).addTo(mapRef.current);
        }
        if (!polylinesRef.current) {
            polylinesRef.current = L.layerGroup().addTo(mapRef.current);
        } else {
            polylinesRef.current.clearLayers();
        }
        if (markersRef.current) {
            markersRef.current.clearLayers();
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

            for (let i = 0; i < sorted.length - 1; i++) {
                const curr = sorted[i];
                const next = sorted[i + 1];
                const distanceKm = haversineDistance(curr.latitude, curr.longitude, next.latitude, next.longitude);
                const distanceMeters = distanceKm * 1000;
                if (distanceMeters <= 200) {
                    L.polyline(
                        [
                            [curr.latitude, curr.longitude],
                            [next.latitude, next.longitude],
                        ],
                        { color }
                    ).addTo(polylinesRef.current!);
                }
            }
        };
        drawPolyline(jams, "red");
        drawPolyline(closedRoads, "grey");
        if (selectedMarkerRef.current) {
            selectedMarkerRef.current.openPopup();
        }

    }, [representations]);

    useEffect(() => {
        if (representations.length === 0) {
            setSelectedDetails(null);
            selectedMarkerRef.current = null;
        }
    }, [representations]);
    return (
        <div style={{display: "flex", height: "99.9%", width: "100%"}}>
            <div id="map" style={{flex: 1}}/>

            <div
                style={{
                    width: "300px",
                    padding: "1rem",
                    backgroundColor: "#f9f9f9",
                    borderLeft: "1px solid #ccc",
                    overflowY: "auto"
                }}
            >
                {/*<h3>Selected Marker</h3>*/}
                {selectedDetails ? (
                    <div
                        style={{
                            width: "300px",
                            padding: "1rem",
                            backgroundColor: "#f9f9f9",
                            borderLeft: "1px solid #ccc",
                            overflowY: "auto"
                        }}
                    >
                        <h3></h3>
                        {selectedDetails ? (
                            <div>
                                <p><strong>Info:</strong> {selectedDetails.message}</p>
                                <p><strong>ETA:</strong> {selectedDetails.eta ?? "N/A"}</p>
                                <p><strong>Latitude:</strong> {selectedDetails.latitude.toFixed(5)}</p>
                                <p><strong>Longitude:</strong> {selectedDetails.longitude.toFixed(5)}</p>
                                <br/>
                                <label style={{display: "block", marginTop: "1rem"}}>
                                    <strong>Estimated time of Accomplishment:</strong>
                                    <input
                                        type="date"
                                        value={etaDate}
                                        onChange={(e) => setEtaDate(e.target.value)}
                                        style={{
                                            width: "80%", fontSize: "14px",
                                            borderRadius: "6px",
                                            border: "1px solid #ccc",
                                            backgroundColor: "#fafafa",
                                            padding: "9px 10px",
                                        }}
                                    />
                                </label>

                                <button
                                    onClick={handleSetEta}
                                    disabled={isSubmitting || !etaDate}
                                    style={{
                                        marginTop: "1rem",
                                        width: "86%",
                                        padding: "0.5rem",
                                        backgroundColor: "#007bff",
                                        color: "#fff",
                                        border: "none",
                                        cursor: "pointer",
                                        opacity: isSubmitting || !etaDate ? 0.6 : 1
                                    }}
                                >
                                    {isSubmitting ? "Submitting..." : "Save"}
                                </button>
                            </div>
                        ) : (
                            <p>No marker selected.</p>
                        )}
                    </div>
                ) : (
                    <p>No marker selected.</p>
                )}
            </div>
        </div>
    );


});

export default LeafletMap;
