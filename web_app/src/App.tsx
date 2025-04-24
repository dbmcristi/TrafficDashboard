import LeafletMap from "./LeafletMap";
import React, {useState, useEffect} from "react";

interface RepresentationBasic {
    latitude: number;
    longitude: number;
    message: string;
    eta: string;
}

const App: React.FC = () => {
    console.log("App loaded");
    const [representationData, setRepresentationData] = useState<RepresentationBasic[]>([]);
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");

    const fetchRepresentations = async () => {
        try {
            const response = await fetch("http://localhost:8080/mvc/geoMap/list");
            const text = await response.text(); // Grab raw response
            console.log("Imported from DB"); // ← Should be JSON, not HTML

            const data = JSON.parse(text); // manually parse
            console.log("Parsed data:", data);
            setRepresentationData(data);
            console.log("Refreshed data:", data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };    // Fetch automatically on mount
    const importRepresentations = async () => {
        try {
            const response = await fetch("http://localhost:8080/mvc/geoMap/list");
            const text = await response.text(); // Grab raw response
            console.log("Imported from Waze API"); // ← Should be JSON, not HTML

            const data = JSON.parse(text); // manually parse
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
            const response = await fetch(`http://localhost:8080/mvc/filter?startDate=${startDate}&endDate=${endDate}`);
            const data = await response.json();
            setRepresentationData(data);
        } catch (error) {
            console.error("Error filtering data:", error);
        }
    };

    // Fetch automatically on mount
    useEffect(() => {
        const controller = new AbortController();
        fetchRepresentations();

        return () => {
            controller.abort();
        };
    }, []);

    // Called when the button is clicked
    const handleRefresh = () => {
        importRepresentations(); // without AbortSignal
    };

    return (<div style={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            fontFamily: "Arial, sans-serif",
            backgroundColor: "#fafafa"
        }}>
            <div style={{
                padding: "16px 24px",
                background: "#ffffff",
                borderBottom: "1px solid #ddd",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
                display: "flex",
                gap: "16px",
                alignItems: "center",
                flexWrap: "wrap"
            }}>
                <button onClick={importRepresentations} style={buttonStyle}>🔄 Refresh Map Data</button>

                <div>
                    <label htmlFor="start">Start Date:</label><br/>
                    <input
                        type="date"
                        id="start"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="end">End Date:</label><br/>
                    <input
                        type="date"
                        id="end"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>

                <button onClick={filterByDate} style={{...buttonStyle, backgroundColor: "#2196F3"}}>
                    📅 Filter by Date
                </button>
            </div>

            <div style={{flex: 1}}>
                <LeafletMap representations={representationData}/>
            </div>
        </div>
    );
};
const buttonStyle: React.CSSProperties = {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background-color 0.3s"
};
export default App;
