import "./index.css";

export default function Index() {
  return<div id="about-page">
<main>
  <h2 className="main-title">Here are three paragraphs about cats</h2>
  <div className="sections">
      <section className="section-A">
          <h3>Paragraph 1</h3>
          <img className="page-images" src="/A.jpeg" alt="A random cat picture"/>
          <p>The cat (Felis catus), also referred to as domestic cat or house cat 
            is a small domesticated carnivorous mammal. It is the only domesticated 
            species of the family Felidae. Advances in archaeology and genetics 
            have shown that the domestication of the cat occurred in the Near East 
            around 7500 BC. It is commonly kept as a pet and farm cat, but also ranges 
            freely as a feral cat avoiding human contact. Valued by humans for companionship 
            and its ability to kill vermin, the cat's retractable claws are adapted to 
            killing small prey like mice and rats. It has a strong, flexible body, quick 
            reflexes, and sharp teeth, and its night vision and sense of smell are well 
            developed. It is a social species, but a solitary hunter and a crepuscular 
            predator. Cat communication includes vocalizations—including meowing, purring, 
            trilling, hissing, growling, and grunting as well as body language. It can hear 
            sounds too faint or too high in frequency for human ears, such as those made by 
            small mammals. It secretes and perceives pheromones.</p>
          <a className="read-more" href="null.html">read more</a>
      </section>

      <section className="section-B">
          <h3>Paragraph 2</h3>
          <img className="page-images" src="/B.jpeg" alt="A random cat picture"/>
          <p>Female domestic cats can have kittens from spring to late autumn in temperate 
            zones and throughout the year in equatorial regions, with litter sizes often ranging 
            from two to five kittens. Domestic cats are bred and shown at events as registered 
            pedigreed cats, a hobby known as cat fancy. Animal population control of cats may 
            be achieved by spaying and neutering, but their proliferation and the abandonment 
            of pets has resulted in large numbers of feral cats worldwide, contributing to the 
            extinction of bird, mammal, and reptile species.</p>
          <a className="read-more" href="null.html">read more</a>
      </section>
  </div>
</main>
</div>;
}
