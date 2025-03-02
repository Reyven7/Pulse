import { Card } from "@/components/ui/card";
import { Building2, Home, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProfileIntroduction = () => {
  return (
    <Card className="rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium">Introduction</h2>
        <Button variant="link">•••</Button>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4" />
          <span>Student at Knu</span>
        </div>

        <div className="flex items-center gap-2">
          <Home className="h-4 w-4" />
          <span>Live in Kazanka, Ukraine</span>
        </div>

        <div className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span>Player name Reyven</span>
        </div>
      </div>
    </Card>
  );
};

export default ProfileIntroduction;
