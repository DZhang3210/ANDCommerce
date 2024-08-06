import { Badge } from "@/components/ui/badge";
import { Tag } from "@prisma/client";
import React from "react";

type TagListProps = {
  tags: Tag[];
};

const TagList = ({ tags }: TagListProps) => {
  return (
    <>
      {tags.map((tag, i) => (
        <Badge key={i}>{tag.title}</Badge>
      ))}
    </>
  );
};

export default TagList;
