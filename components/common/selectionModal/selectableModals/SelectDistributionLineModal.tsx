import React, { useMemo } from "react";
import { distributionLines } from "@/mock/distributionLines";
import DistributionLineCard from "@/components/distributionLinesScreen/distributionLineCard/DistributionLineCard";
import SelectionModal from "@/components/common/selectionModal/SelectionModal";
import { DistributionLine } from "@/models/DistributionLine";

interface SelectDistributionLineModalProps {
  isVisible: boolean;
  onSelect: (selectedIds: number[]) => void;
  onClose: () => void;
  startButtonText?: string;
  filterRules?: (line: DistributionLine) => boolean;
  sort?: ((a: DistributionLine, b: DistributionLine) => number) | undefined;
}

const SelectDistributionLineModal = (
  props: SelectDistributionLineModalProps
) => {
  const shownDistributionLines = useMemo(() => {
    return props.filterRules
      ? distributionLines.filter(props.filterRules)
      : distributionLines;
  }, [distributionLines, props.filterRules]);

  const sortedDistributionLines = useMemo(() => {
    return props.sort
      ? shownDistributionLines.sort(props.sort)
      : shownDistributionLines;
  }, [shownDistributionLines, props.sort]);

  return (
    <SelectionModal
      isVisible={props.isVisible}
      onSelect={props.onSelect}
      onClose={props.onClose}
      itemIdExtractor={(line: DistributionLine) => line.id}
      title="בחר קו חלוקה"
      startButtonText={props.startButtonText ?? "התחל קו חלוקה"}
      items={sortedDistributionLines}
      noItemsText="אין קווי חלוקה"
      renderItem={(line: DistributionLine) => (
        <DistributionLineCard distributionLine={line} />
      )}
    />
  );
};

export default SelectDistributionLineModal;
