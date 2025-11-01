import type React from "react";

interface ShowMiniProps {
  imageUrl: string;
  title: string;
  postedAt: string;
}
const ShowMiniBlog: React.FC<ShowMiniProps> = ({
  imageUrl,
  title,
  postedAt,
}) => {
  return (
    <div className="relative group">
      <div className="overflow-hidden rounded-lg aspect-w-16 aspect-h-9">
        <img
          className="object-cover w-full h-full transition-all duration-300 transform group-hover:scale-125"
          src={imageUrl}
          alt={title}
        />
      </div>
      <p className="mt-6 text-sm font-normal text-card-foreground ">
        {postedAt}
      </p>
      <p className="mt-4 text-xl font-bold text-card-foreground/70">{title}</p>
    </div>
  );
};
const BlogsPreview = () => {
  return (
    <div className="grid  grid-cols-1 mx-auto mt-8 text-center sm:mt-16 sm:text-left sm:grid-cols-2 xl:grid-cols-3 gap-y-8 gap-x-8 lg:gap-x-20">
      <ShowMiniBlog
        imageUrl="https://cdn.rareblocks.xyz/collection/clarity/images/blog/1/blog-1.png"
        title="How To Optimize Progressive Web Apps: Going Beyond The Basics"
        postedAt="November 22, 2021"
      />
      <ShowMiniBlog
        imageUrl="https://cdn.rareblocks.xyz/collection/clarity/images/blog/1/blog-2.png"
        title="How To Optimize Progressive Web Apps: Going Beyond The Basics"
        postedAt="November 22, 2021"
      />
      <ShowMiniBlog
        imageUrl="https://cdn.rareblocks.xyz/collection/clarity/images/blog/1/blog-1.png"
        title="How To Optimize Progressive Web Apps: Going Beyond The Basics"
        postedAt="November 22, 2021"
      />
      <ShowMiniBlog
        imageUrl="https://cdn.rareblocks.xyz/collection/clarity/images/blog/1/blog-2.png"
        title="How To Optimize Progressive Web Apps: Going Beyond The Basics"
        postedAt="November 22, 2021"
      />
      <ShowMiniBlog
        imageUrl="https://cdn.rareblocks.xyz/collection/clarity/images/blog/1/blog-1.png"
        title="How To Optimize Progressive Web Apps: Going Beyond The Basics"
        postedAt="November 22, 2021"
      />
      <ShowMiniBlog
        imageUrl="https://cdn.rareblocks.xyz/collection/clarity/images/blog/1/blog-2.png"
        title="How To Optimize Progressive Web Apps: Going Beyond The Basics"
        postedAt="November 22, 2021"
      />
    </div>
  );
};

export default BlogsPreview;
