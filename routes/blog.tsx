import {
    HandlerContext,
    PageProps,
  } from "$fresh/server.ts";

  export const handler = async (
    _req: Request,
    ctx: HandlerContext
  ): Promise<Response> => {
    // console.log("ctx", ctx.params.name);

    const fileNames: string[] = [];

    for await (const dirEntry of Deno.readDir("./routes/posts/")) {
      if (dirEntry.isFile && dirEntry.name.match(/[a-z0-9].md/i)) {
        const fileName = dirEntry.name.slice(0, -3);

        fileNames.push(fileName);
      }
    }

    //console.log('files from index',fileNames);

    return ctx.render({ fileNames });
  };

  export default function Blog(props: PageProps) {
    const { fileNames } = props.data;

    return (
      <section>
        {fileNames.map((file: string) => (
          <h2>
            <a href={`posts/${file}`}>{file}</a>
          </h2>
        ))}
      </section>
    );
  }
