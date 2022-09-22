export default function Header(props: { active: string }) {
  const items = [
    {
      name: "About",
      href: "/about",
    },
    {
      name: "Resume",
      href: "/resume",
    },
    {
      name: "Blog",
      href: "/blog",
    },
  ];
  return (
    <nav class="nav">
      <a class="nav__title" href="/">
        Sebastian Zelonka
      </a>
      <div>
        {items.map((item) => (
          <a
            class={`nav__link ${props.active == item.href ? "font-bold" : ""}`}
            href={item.href}
          >
            {item.name}
          </a>
        ))}
      </div>
    </nav>
  );
}
