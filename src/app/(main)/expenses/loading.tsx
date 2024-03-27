import { Separator } from "~/components/ui/separator";
import { Skeleton } from "~/components/ui/skeleton";

const ExpenseRowSkeleton = () => {
  return (
    <div className="mb-2 flex w-full gap-4 px-4 py-2">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[150px]" />
      </div>
    </div>
  );
};
const ExpenseBlockSkeleton = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full flex-col">
      <Skeleton className="h-4 w-[125px]" />
      <Separator className="my-2 animate-pulse" />
      {children}
    </div>
  );
};

export default function Loading() {
  return (
    <div className="flex w-full flex-col items-center gap-4 px-8 pt-24">
      <ExpenseBlockSkeleton>
        <ExpenseRowSkeleton />
        <ExpenseRowSkeleton />
        <ExpenseRowSkeleton />
      </ExpenseBlockSkeleton>
      <ExpenseBlockSkeleton>
        <ExpenseRowSkeleton />
        <ExpenseRowSkeleton />
      </ExpenseBlockSkeleton>
    </div>
  );
}
