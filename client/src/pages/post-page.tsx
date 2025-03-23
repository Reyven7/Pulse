"use client";

import ErrorAlert from "@/components/error-alert";
import Loader from "@/components/loader";
import Post from "@/components/posts/post";
import { useGetPostsQuery } from "@/services/postApi";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Inbox, RefreshCw, Filter, ArrowUpDown } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const PostPage = () => {
  const [sortOrder, setSortOrder] = useState<"latest" | "popular">("latest");
  const { data, error, isLoading, refetch } = useGetPostsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <Loader />
          <p className="text-muted-foreground mt-4">Loading posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container max-w-2xl mx-auto px-4 py-8">
        <ErrorAlert message="Something went wrong. Please try again." />
        <div className="flex justify-center mt-4">
          <Button variant="outline" onClick={() => refetch()} className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-2xl mx-auto py-6 px-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Feed</h1>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter Posts</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>All Posts</DropdownMenuItem>
              <DropdownMenuItem>Photos Only</DropdownMenuItem>
              <DropdownMenuItem>Videos Only</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowUpDown className="h-4 w-4" />
                <span className="hidden sm:inline">
                  {sortOrder === "latest" ? "Latest" : "Popular"}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Sort By</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setSortOrder("latest")}>
                Latest
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOrder("popular")}>
                Popular
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {data && data.length > 0 ? (
        <div className="space-y-6">
          {data.map((post) => (
            <div key={post.id} className="animate-in fade-in-50 duration-300">
              <Post postData={post} />
            </div>
          ))}
        </div>
      ) : (
        <Card className="border-none shadow-md">
          <CardContent className="p-8 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-muted/30 flex items-center justify-center mb-4">
              <Inbox className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No Posts Available</h3>
            <p className="text-muted-foreground mb-4 max-w-md">
              There are no posts to display at the moment. Check back later or
              follow more people to see their posts in your feed.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => refetch()}
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
          </CardContent>
        </Card>
      )}

      {data && data.length > 5 && (
        <div className="flex justify-center mt-8">
          <Button variant="outline">Load More</Button>
        </div>
      )}
    </div>
  );
};

export default PostPage;
