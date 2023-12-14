import { ResponsivePie } from "@nivo/pie";
import { formatAmount } from "../../../utils";

export default function PieChart({
  categoryTotals,
}: {
  categoryTotals: { [key: string]: number };
}) {
  const data = Object.entries(categoryTotals).map(([category, amount]) => {
    return {
      id: category,
      label: category,
      value: amount,
    };
  });

  return (
    <ResponsivePie
      data={data}
      sortByValue={true}
      valueFormat={(value) => formatAmount(value)}
      margin={{ top: 40, right: 0, bottom: 40, left: 0 }}
      startAngle={-180}
      innerRadius={0.5}
      padAngle={0.5}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1]],
      }}
      arcLinkLabelsSkipAngle={5}
      arcLinkLabelsTextColor="#A6ADBA"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLinkLabelsDiagonalLength={12}
      arcLinkLabelsStraightLength={18}
      arcLinkLabelsTextOffset={3}
      arcLabelsSkipAngle={20}
    />
  );
}
