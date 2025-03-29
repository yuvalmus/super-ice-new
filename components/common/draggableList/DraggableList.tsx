import React from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from "react-native-draggable-flatlist";

interface DraggableListProps {
  data: any[];
  renderItem: (renderItemProps: RenderItemParams<any>) => React.ReactNode;
  onDragEnd: ({ data }: { data: any[] }) => void;
}

const DraggableList = (props: DraggableListProps) => {
  const renderItem = ({ item, drag, isActive }: RenderItemParams<any>) => {
    return (
      <ScaleDecorator activeScale={1.05}>
        {props.renderItem({
          item,
          drag,
          isActive,
          getIndex: function (): number | undefined {
            return;
          },
        })}
      </ScaleDecorator>
    );
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <DraggableFlatList
        data={props.data}
        keyExtractor={(item) => item.id.toString()}
        onDragEnd={props.onDragEnd}
        renderItem={renderItem}
        containerStyle={styles.listContainer}
        dragItemOverflow={true}
        activationDistance={10}
        dragHitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}
        autoscrollThreshold={50}
        onPlaceholderIndexChange={(index) => {
          console.log("Current position:", index);
        }}
      />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  listContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "transparent",
  },
});

export default DraggableList;
