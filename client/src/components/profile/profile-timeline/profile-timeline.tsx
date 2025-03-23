"use client";

import PostCreator from "@/components/post-creator";
import ProfileIntroduction from "./profile-introduction";
import { useGetPostsByUsernameQuery } from "@/services/postApi";
import { useParams } from "react-router-dom";
import Loader from "@/components/loader";
import ErrorAlert from "@/components/error-alert";
import Post from "@/components/posts/post";
import { Card, CardContent } from "@/components/ui/card";
import { Inbox, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProfileTimeline = () => {
  const { username } = useParams<{ username: string }>();
  const { data, error, isLoading } = useGetPostsByUsernameQuery(username || "");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-screen-lg mx-auto px-4 py-8">
        <ErrorAlert message="Something went wrong. Please try again." />
      </div>
    );
  }

  return (
    <div className="container max-w-screen-lg mx-auto py-6 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Sidebar */}
        <div className="space-y-6">
          <ProfileIntroduction />

          {/* Additional cards can be added here */}
          <Card className="overflow-hidden border-none shadow-md">
            <CardContent className="p-5">
              <h3 className="font-medium mb-3">Photos</h3>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div
                    key={item}
                    className="aspect-square rounded-md bg-muted/50 overflow-hidden"
                    style={{
                      backgroundImage: `url(/placeholder.svg?height=100&width=100)`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                ))}
              </div>
              <Button variant="ghost" size="sm" className="w-full mt-3">
                See All Photos
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Post Creator - removed the extra Card wrapper to match post alignment */}
          <PostCreator />

          {data && data.length > 0 ? (
            <div className="space-y-4">
              {data.map((post) => (
                <Post key={post.id} postData={post} />
              ))}
            </div>
          ) : (
            <Card className="border-none shadow-md">
              <CardContent className="p-8 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-muted/30 flex items-center justify-center mb-4">
                  <Inbox className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">No Posts Yet</h3>
                <p className="text-muted-foreground mb-4">
                  There are no posts to display at the moment.
                </p>
                <Button variant="outline" size="sm" className="gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Refresh
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileTimeline;
