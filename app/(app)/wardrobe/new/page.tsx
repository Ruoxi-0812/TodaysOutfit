import { PageHeader } from "@/components/layout/PageHeader";
import { ClothingForm } from "@/components/wardrobe/ClothingForm";

export default function NewClothingItemPage() {
  return (
    <div>
      <PageHeader title="Add New Item" description="Add a piece to your wardrobe" />
      <ClothingForm />
    </div>
  );
}
