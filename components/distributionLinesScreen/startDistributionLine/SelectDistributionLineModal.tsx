import React, { useMemo } from "react";
import { distributionLines } from "@/mock/distributionLines";
import { userState } from "@/mock/userState";
import DistributionLineCard from "../distributionLineCard/DistributionLineCard";
import { compareDates } from "@/utils/Date/dateUtils";
import SelectionModal from "@/components/common/selectionModal/SelectionModal";

interface SelectDistributionLineModalProps {
  isVisible: boolean;
  onSelect: (selectedLineId: number) => void;
  onClose: () => void;
}

const SelectDistributionLineModal = (
  props: SelectDistributionLineModalProps
) => {
  const driverLines = distributionLines.filter(
    (line) => line.driverId === userState.userId && !line.isCompleted
  );
  const sortedDriverLines = useMemo(() => {
    return driverLines.sort((a, b) =>
      compareDates(a.scheduledDate, b.scheduledDate)
    );
  }, [driverLines]);

  return (
    <SelectionModal
      isVisible={props.isVisible}
      onSelect={props.onSelect}
      onClose={props.onClose}
      itemIdExtractor={(line) => line.id}
      title="בחר קו חלוקה"
      startButtonText="התחל קו חלוקה"
      items={sortedDriverLines}
      renderItem={(line) => <DistributionLineCard distributionLine={line} />}
    />
  );
};

export default SelectDistributionLineModal;
