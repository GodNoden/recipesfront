import Image from "next/image";
import RecipeReviewCard from "./components/RecipeReviewCard.";

export default function Home() {
  return (
    <div className="bg-neutral-900
    rounded-lg
    h-full
    w-full
    overflow-hidden
    overflow-y-auto">
      <div className="flex justify-center">
        <RecipeReviewCard />
      </div>
    </div>
  );
}
