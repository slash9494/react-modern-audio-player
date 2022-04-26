import { FC } from "react";
import { useNonNullableContext } from "../../hooks/useNonNullableContext";
import { musicPlayerStateContext } from "../../lib/musicContext/StateContext";
import { SortableList } from "../SortableList";

interface ListProps {}

export const List: FC<ListProps> = ({}) => {
  const dummyData = [
    { id: 1, name: "A" },
    { id: 2, name: "B" },
    { id: 3, name: "C" },
    { id: 4, name: "D" },
  ];

  const { playList } = useNonNullableContext(musicPlayerStateContext);
  return (
    <div>
      <SortableList
        data={dummyData}
        renderItem={(dummyData, index) => (
          <div key={index}>{dummyData.name}</div>
        )}
        onDropCb={(newData) => console.log(newData)}
      />
    </div>
  );
};
