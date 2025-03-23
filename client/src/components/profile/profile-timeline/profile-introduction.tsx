import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MoreHorizontal, MapPin, Briefcase, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const ProfileIntroduction = () => {
  return (
    <Card className="overflow-hidden border-none shadow-md">
      <CardHeader className="bg-background pb-3 pt-4 px-5 flex flex-row items-center justify-between">
        <h2 className="text-lg font-semibold">Introduction</h2>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full hover:bg-muted"
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">More options</span>
        </Button>
      </CardHeader>

      <Separator />

      <CardContent className="p-5 space-y-4">
        <div className="space-y-3.5">
          <div className="flex items-center gap-3 group">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-primary/10 text-primary">
              <Briefcase className="h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-medium">Student at KNU</span>
              <span className="text-xs text-muted-foreground">Education</span>
            </div>
          </div>

          <div className="flex items-center gap-3 group">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-primary/10 text-primary">
              <MapPin className="h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-medium">Lives in Kazanka, Ukraine</span>
              <span className="text-xs text-muted-foreground">Location</span>
            </div>
          </div>

          <div className="flex items-center gap-3 group">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-primary/10 text-primary">
              <Gamepad2 className="h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-medium">Player name Reyven</span>
              <span className="text-xs text-muted-foreground">Gaming</span>
            </div>
          </div>
        </div>

        <Button variant="outline" className="w-full mt-2">
          Edit Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProfileIntroduction;
