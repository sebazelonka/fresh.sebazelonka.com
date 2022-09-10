import { HandlerContext, PageProps } from "$fresh/server.ts";
import { renderMarkdown } from "https://deno.land/x/markdown_renderer@0.1.3/mod.ts";

import {extract }from "https://deno.land/std@0.152.0/encoding/front_matter.ts";


export const handler = async (_req: Request, ctx: HandlerContext): Promise<Response> => {
  const fileContent = await Deno.readTextFile(`./routes/posts/${ctx.params.name}.md`);

  const { body: content, attrs: _data } = extract(
    fileContent
  );

  console.log(content);
  console.log('attrs', _data);



  const fileNames: string[] = [];

  for await (const dirEntry of Deno.readDir("./routes/posts/")) {
    if (dirEntry.isFile) {
      fileNames.push(dirEntry.name);
    }
  }

  const md = renderMarkdown(content)
  return ctx.render({ md, _data });
};

export default function BlogPostPage(props: PageProps) {
  const { md, _data } = props.data;

  return (
    <>
     {/* <Head>
        <link rel="stylesheet" href="styles.css" />
      </Head> */}
      <h1>{_data.title}</h1>
      <article dangerouslySetInnerHTML={{ __html: md }} />
    </>
  );

}
