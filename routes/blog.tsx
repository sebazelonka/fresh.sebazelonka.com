import { HandlerContext, PageProps } from "$fresh/server.ts";

export const handler = async (
  _req: Request,
  ctx: HandlerContext
): Promise<Response> => {
  const fileNames: string[] = [];

  for await (const dirEntry of Deno.readDir("./routes/posts/")) {
    if (dirEntry.isFile && dirEntry.name.match(/[a-z0-9].md/i)) {
      const fileName = dirEntry.name.slice(0, -3);

      fileNames.push(fileName);
    }
  }

  return ctx.render({ fileNames });
};

export default function Blog(props: PageProps) {
  const { fileNames } = props.data;

  return (
    <>
      <section class="blog-header">
        <h1>Notes</h1>
      </section>
      <section class="blog-list">
        {fileNames.map((file: string) => (
          <a href={`posts/${file}`} class="blog-entry">
            <img src="https://fakeimg.pl/400x300/" alt=" " />
            <h2>{file}</h2>
          </a>
        ))}
      </section>
    </>
  );
}
