import BlogsPreview from "@/custom/BlogsPreview/BlogsPreview";

const MyBlogs = () => {
  return (
    <section className="row">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-3xl font-bold text-primary sm:text-4xl font-pj">
            All Your Blogs in One Place
          </h2>
        </div>
        <BlogsPreview />
      </div>
    </section>
  );
};

export default MyBlogs;
