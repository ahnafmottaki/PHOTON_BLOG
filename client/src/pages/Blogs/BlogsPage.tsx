import BlogsPreview from "@/custom/BlogsPreview/BlogsPreview";

const BlogsPage = () => {
  return (
    <section className="row">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-3xl font-bold text-primary sm:text-4xl font-pj">
            Read our blog
          </h2>
          <p className="mt-5 font-normal text-muted-foreground font-pj">
            With lots of unique blocks, you can easily build a page without
            coding. Build your next landing page.
          </p>
        </div>
        <BlogsPreview />
      </div>
    </section>
  );
};

export default BlogsPage;
