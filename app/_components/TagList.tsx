import { Badge } from "@/components/ui/badge";
import { Tag } from "@prisma/client";
import { X } from "lucide-react";
import React from "react";

type Tags = {
  [key: string]: boolean;
};
type TagListProps = {
  tags: Record<string, boolean>;
  setTags?: React.Dispatch<React.SetStateAction<Tags>>;
};

const TagList = ({ tags, setTags }: TagListProps) => {
  const removeTag = (tagToRemove: string) => {
    if (setTags) {
      setTags((prevTags) => {
        const updatedTags = { ...prevTags };
        delete updatedTags[tagToRemove];
        return updatedTags;
      });
    }
  };
  return (
    <div className="space-x-1">
      {Object.keys(tags).map((tag, i) => (
        <Badge key={i} className="inline-flex items-center px-5 py-1">
          <span>{tag}</span>
          {setTags && (
            <button
              type="button"
              onClick={() => {
                removeTag(tag);
              }}
            >
              <X size={15} />
            </button>
          )}
        </Badge>
      ))}
    </div>
  );
};

export default TagList;
