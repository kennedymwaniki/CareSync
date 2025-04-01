import { PureComponent } from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { getAdherencePerPatient } from "../apis/DoctorService";

// Define TypeScript interface for the API response
interface AdherenceData {
  patient_id: number;
  patient_name: string;
  total_scheduled: number;
  total_taken: number;
  adherence_percentage: number;
}

export interface ApiResponse {
  error: boolean;
  data: AdherenceData[];
  message: string;
}

class AdherencePerPatient extends PureComponent {
  state = {
    adherenceData: [] as AdherenceData[],
    loading: true,
    error: null as string | null,
  };

  componentDidMount() {
    this.fetchAdherenceData();
  }

  fetchAdherenceData = async () => {
    try {
      const response = await getAdherencePerPatient();
      if (!response.data) {
        throw new Error("No data received from server");
      }
      this.setState({
        adherenceData: response.data,
        loading: false,
      });
    } catch (error) {
      if (error instanceof Error) {
        this.setState({
          error: `Failed to fetch adherence per patient: ${error.message}`,
          loading: false,
        });
      } else {
        this.setState({
          error:
            "An unexpected error occurred while fetching adherence per patient",
          loading: false,
        });
      }
    }
  };

  render() {
    const { adherenceData, loading, error } = this.state;

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
      <div className="w-1/2 border h-96 rounded-md shadow-md ml-2 p-4">
        <h2 className="text-center mb-4">% Adherence Per Patient</h2>
        <ResponsiveContainer width="100%" height="85%">
          <BarChart
            width={600}
            height={380}
            data={adherenceData}
            margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="patient_name" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="adherence_percentage"
              fill="#8884d8"
              radius={[0, 0, 0, 0]}
              barSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default AdherencePerPatient;
