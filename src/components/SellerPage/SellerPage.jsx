import { useParams } from 'react-router-dom';
import Typography from '../Typography/Typography';
import SellerPageTable from "./SellerPageTable";

export default function SellerPage() {
  const { refId } = useParams();
  // Use refId to fetch seller data
  // Example: fetchSellerData(refId).then(data => setSeller(data));
  console.log(refId);
  return (
    <div style={{ minHeight: "80vh" }}>
      <Typography label={`Code: ${refId}`} variant="h6" sx={{ textAlign: "center" }} />
      <SellerPageTable />
    </div>
  );
};
