import { PRODUCT_AREA_ACCENT, PRODUCT_AREA_LABELS, type ProductArea } from "@/lib/types";
import { DotTag } from "./dot-tag";

export function ProductAreaTag({
  productArea,
  className,
}: {
  productArea: ProductArea;
  className?: string;
}) {
  return (
    <DotTag
      label={PRODUCT_AREA_LABELS[productArea]}
      color={PRODUCT_AREA_ACCENT[productArea]}
      className={className}
    />
  );
}
