import OrderSummaryTable from "./OrderSummaryTable";

export const containerStyle = {
  minHeight: "80vh",
  width: "70%",
  margin: "0 auto",
};

export default function OrderSummary() {
  return (
    <div style={containerStyle}>
      <OrderSummaryTable />
    </div>
  );
}
