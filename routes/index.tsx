import { HandlerContext, PageProps } from "$fresh/server.ts";

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

  const latestArticles = fileNames.reverse().slice(-3);
  console.log("files from index", latestArticles);

  return ctx.render({ latestArticles });
};

export default function Home(props: PageProps) {
  const { latestArticles } = props.data;

  return (
    <>
      <section class="hello">
        <h1>Hello!</h1>
      </section>
      <section class="social">
        <div class="links">
          <a href="mailto:hi@sebazelonka.com">hi@sebazelonka.com</a>
          <a href="https://www.linkedin.com/in/sebastianzelonka/">Linkedin</a>
          <a href="https://github.com/sebazelonka">Github</a>
          <a href="https://twitter.com/sebazelonka">Twitter</a>
        </div>
      </section>
      <section class="personal">
        <img
          class="pic"
          src="https://2021-sebazelonka-com.vercel.app/_next/image?url=%2Fassets%2Fabout.jpg&w=3840&q=75"
          alt=""
        />
        <p class="bio">
          My name is Sebastian Zelonka and I'm working from Buenos Aires,
          Argentina.
          <br />
          <br />
          For the last 10+ years I have been working as experience designer &
          front end developer on digital products from web startups to industriy
          icons to help build their products.
        </p>
      </section>
      <section class="articles">
        <div className="title">
          <span class="latest">Latest</span>
          <span class="articles">Articles</span>
        </div>
        <div class="posts">
          {latestArticles.map((file: string) => (
            <a class="article" href={`posts/${file}`}>
              <h2>{file}</h2>
            </a>
          ))}
          <h2 class="article view-all">
            <a href="/blog">View all -&gt;</a>
          </h2>
        </div>
      </section>
    </>
  );
}
