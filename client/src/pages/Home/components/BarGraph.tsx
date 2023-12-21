import { ResponsiveBar } from "@nivo/bar";

type monthlyTotal = {
  month: string;
  amount: number;
};

export default function BarGraph({ data }: { data: monthlyTotal[] }) {
  return (
    <ResponsiveBar
      data={data}
      keys={["amount"]}
      indexBy="month"
      colors={"#21B2A6"}
      theme={{
        grid: {
          line: {
            stroke: "#A6ADBA",
            strokeWidth: 0.3,
          },
        },
        axis: {
          ticks: {
            text: {
              fill: "#A6ADBA",
              fontSize: 12,
            },
          },
        },
      }}
      margin={{ top: 50, right: 10, bottom: 50, left: 35 }}
      padding={0.2}
      borderRadius={4}
      axisLeft={{
        tickSize: 0,
        tickPadding: 5,
      }}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
      }}
      valueFormat={">-$.0~f"}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      isInteractive={false}
      ariaLabel="Monthly expenditure bar graph"
    />
  );
}
