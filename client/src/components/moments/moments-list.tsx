import { MomentPreview } from "@/models/types/content/moment";
import MomentsPreview from "@/components/moments/moment-preview";

type Props = {
  data: MomentPreview[];
};

const MomentsList = ({ data }: Props) => {
  return (
    <div>
      {data.map((item, index) => (
        <div className="py-1">
          <MomentsPreview key={index} data={item} />
        </div>
      ))}
    </div>
  );
};

export default MomentsList;
