import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, SmilePlus, Users } from "lucide-react";

export default function PostCreator() {
  return (
    <div className="rounded-lg p-4 border">
      {/* Tabs */}
      <Tabs defaultValue="status" className="mb-4">
        <TabsList>
          <TabsTrigger value="status" className="data-[state=active]">
            Status
          </TabsTrigger>
          <TabsTrigger value="photos" className="data-[state=active]">
            Photos
          </TabsTrigger>
          <TabsTrigger value="videos" className="data-[state=active]">
            Videos
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Post Input Area */}
      <div className="mb-4 flex gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
          <AvatarFallback>RN</AvatarFallback>
        </Avatar>
        <input
          type="text"
          placeholder="Write something..."
          className="flex-1 bg-transparent placeholder:text-slate-500 focus:outline-none"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          <Button variant="ghost" size="sm">
            <Users className="mr-2 h-4 w-4" />
            People
          </Button>
          <Button variant="ghost" size="sm">
            <MapPin className="mr-2 h-4 w-4" />
            Check in
          </Button>
          <Button variant="ghost" size="sm">
            <SmilePlus className="mr-2 h-4 w-4" />
            Mood
          </Button>
        </div>
        <Button>Share</Button>
      </div>
    </div>
  );
}
