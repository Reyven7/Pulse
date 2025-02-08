import { MomentPreviewInfo } from "@/models/moment";
import MomentsPreview from "@/components/moments/moment-preview";

type Props = {
  data: MomentPreviewInfo[];
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
