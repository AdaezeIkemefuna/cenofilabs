const Footer = () => {
  return (
    <section className='flex flex-col bg-purple gap-8 md:flex-row justify-between items-center border-t border-gray/10 text-whitishgray py-6 md:px-20 '>
      <p>© 2024 Cenofilabs. All rights reserved.</p>
      <aside className='flex gap-8'>
        <a href='/'>cenofilabs</a>
      </aside>
    </section>
  );
};

export { Footer };
