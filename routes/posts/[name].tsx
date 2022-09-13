import { HandlerContext, PageProps } from "$fresh/server.ts";
import * as gfm from "https://deno.land/x/gfm@0.1.22/mod.ts";


import { extract } from "https://deno.land/std@0.152.0/encoding/front_matter.ts";

export const handler = async (
  _req: Request,
  ctx: HandlerContext
): Promise<Response> => {
  const fileContent = await Deno.readTextFile(
    `./routes/posts/${ctx.params.name}.md`
  );

  const { body: content, attrs: _data } = extract(fileContent);

  const html = gfm.render(content);

  const fileNames: string[] = [];

  for await (const dirEntry of Deno.readDir("./routes/posts/")) {
    if (dirEntry.isFile) {
      fileNames.push(dirEntry.name);
    }
  }

  return ctx.render({ html, _data });
};

export default function BlogPostPage(props: PageProps) {
  const { html, _data } = props.data;

  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = _data.date.toLocaleDateString("en-US", options);

  return (
    <>
      <section
        class="article-title"
        style={`background-image: url(${_data.image})`}
      >
        <div className="data">
          <h3>{date}</h3>
          <h1>{_data.title}</h1>
        </div>
      </section>
      <article
        class="article-container"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
  );
}
