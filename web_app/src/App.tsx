import LeafletMap from "./LeafletMap";
import React, {useState, useEffect, useRef} from "react";

interface RepresentationBasic {
    latitude: number;
    longitude: number;
    message: string;
    eta: string;
}

const App: React.FC = () => {
    console.log("App loaded");
    console.log("MY IP:", process.env.REACT_APP_IP_ADDRESS);
    const mapRef = useRef<any>(null);
    const [representationData, setRepresentationData] = useState<RepresentationBasic[]>([]);
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");

    const fetchRepresentations = async () => {
        try {
            const response = await fetch(`http://${process.env.REACT_APP_IP_ADDRESS}:8080/mvc/geoMap/list`);
            const text = await response.text();
            console.log("Imported from DB");

            const data = JSON.parse(text);
            console.log("Parsed data:", data);
            setRepresentationData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const importRepresentations = async () => {
        try {
            const response = await fetch(`http://${process.env.REACT_APP_IP_ADDRESS}:8080/mvc/import`);
            const text = await response.text();
            console.log("Imported from Waze API");

            const data = JSON.parse(text);
            console.log("Parsed data:", data);
            setRepresentationData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const filterByDate = async () => {
        if (!startDate && !endDate) {
            alert("Please select atleast one date.");
            return;
        }
        try {
            const response = await fetch(`http://${process.env.REACT_APP_IP_ADDRESS}:8080/mvc/filter?startDate=${startDate}&endDate=${endDate}`);
            const data = await response.json();
            console.log("Parsed data from filter:", data);
            setRepresentationData(data);
        } catch (error) {
            console.error("Error filtering data:", error);
        }
    };

    useEffect(() => {
        const controller = new AbortController();
        fetchRepresentations();
        return () => {
            controller.abort();
        };
    }, []);

    const handleRefresh = () => {
        importRepresentations();
        setStartDate("");
        setEndDate("");
    };

    return (
        <div style={appContainer}>
            <div style={headerStyle}>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    flexWrap: "wrap",
                }}>
                    <div style={inputGroup}>
                        <label htmlFor="start" style={labelStyle}>Start Date:</label>
                        <input
                            type="date"
                            id="start"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            style={inputStyle}
                        />
                    </div>

                    <div style={inputGroup}>
                        <label htmlFor="end" style={labelStyle}>End Date:</label>
                        <input
                            type="date"
                            id="end"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            style={inputStyle}
                        />
                    </div>

                    <button onClick={filterByDate} style={buttonStyle}>📅 Filter</button>
                </div>

                <div>
                    <button onClick={handleRefresh} style={buttonStyleImport}>🔄 Import</button>
                </div>
            </div>
            <main style={{flex: 1, overflow: "hidden", padding: "16px"}}>
                <LeafletMap
                    ref={mapRef}
                    representations={representationData}
                    refreshData={fetchRepresentations}
                    filterByDate={filterByDate}
                    startDate={startDate}
                    endDate={endDate}
                />
            </main>
        </div>
    );
};

const appContainer: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f4f6f8",
};
const headerStyle: React.CSSProperties = {
    padding: "16px 24px",
    background: "#ffffff",
    borderBottom: "1px solid #ddd",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between", // <-- ADD THIS
    flexWrap: "wrap",
};
const buttonStyle: React.CSSProperties = {
    backgroundColor: "#007bff",
    color: "white",
    padding: "10px 18px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "14px",
    transition: "background-color 0.3s",
    minWidth: "160px",
};
const buttonStyleImport: React.CSSProperties = {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 18px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "14px",
    transition: "background-color 0.3s",
    minWidth: "160px",
};
const inputGroup: React.CSSProperties = {
    display: "flex",
    flexDirection: "row", // 🛠 row instead of column
    alignItems: "center",
    gap: "8px",
};
const labelStyle: React.CSSProperties = {
    fontSize: "14px",
    fontWeight: 700,
    color: "#333",
};
const inputStyle: React.CSSProperties = {
    padding: "8px 10px",
    fontSize: "14px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    minWidth: "160px",
    backgroundColor: "#fafafa",
    justifyContent: "center",

};
export default App;
